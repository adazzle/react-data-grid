import { readFile, writeFile } from 'node:fs/promises';
import GithubSlugger from 'github-slugger';
import { parseSync } from 'oxc-parser';

// Generates the API reference of the README from the declarations and JSDoc comments of `lib/index.d.ts`,
// which `vp pack` bundles from the sources. The items are listed in the order they are exported from `src/index.ts`.

const declarationsPath = 'lib/index.d.ts';
const entryPath = 'src/index.ts';
const readmePath = 'README.md';
const startMarker = '<!-- api:start -->';
const endMarker = '<!-- api:end -->';
// e.g. `{@linkcode Column.width | width}`
const linkTag = /\{@link(?:code|plain)?\s+([^}|]+?)\s*(?:\|\s*([^}]+?)\s*)?\}/g;
// the `@group` tags of the exports
const sections = ['Components', 'Hooks', 'Render Functions', 'Context', 'Other', 'Types'];

interface Doc {
  summary: string;
  tags: { name: string; text: string }[];
}

interface GeneratedHeading {
  line: string;
  key: string | undefined;
}

interface Declaration {
  name: string;
  node: Node;
  doc: Doc;
}

// the subset of the oxc AST that is used
interface Node {
  type: string;
  start: number;
  end: number;
  id?: Node & { name: string };
  name?: string;
  optional?: boolean;
  key?: { type: string; name?: string; value?: string };
  body?: { body: Node[] };
  members?: Node[];
  params?: Node[] | { params: Node[] };
  typeParameters?: Node | null;
  typeAnnotation?: Node;
  returnType?: Node | null;
  extends?: Node[];
  expression?: Node;
  typeArguments?: { params: Node[] } | null;
  declarations?: Node[];
  init?: Node | null;
  types?: Node[];
  elementType?: Node;
}

const code = await readFile(declarationsPath, 'utf8');
const { program, comments } = parseSync(declarationsPath, code);

const declarations = new Map<string, Declaration>();
// exported name -> declared name, e.g. `Cell` -> `MemoCell`
const exportedNames = new Map<string, string>();

for (const statement of program.body as unknown as Node[]) {
  if (statement.type === 'ImportDeclaration') continue;
  if (statement.type === 'ExportNamedDeclaration') {
    const { declaration, specifiers } = statement as unknown as {
      declaration: Node | null;
      specifiers: { local: { name: string }; exported: { name: string } }[];
    };
    if (declaration === null) {
      for (const { local, exported } of specifiers) exportedNames.set(exported.name, local.name);
      continue;
    }
    exportedNames.set(getDeclarationName(declaration), getDeclarationName(declaration));
    addDeclaration(declaration, statement);
  } else {
    addDeclaration(statement, statement);
  }
}

// group the exports by their `@group` tag, in the order they are exported from the entry point
const groups = new Map<string, Declaration[]>(sections.map((section) => [section, []]));
for (const name of await getExportOrder()) {
  const declaration = declarations.get(exportedNames.get(name)!)!;
  const group = declaration.doc.tags.find((tag) => tag.name === 'group')?.text;
  const items = group === undefined ? undefined : groups.get(group);
  if (items === undefined) {
    throw new Error(`${name} must have a @group tag with one of: ${sections.join(', ')}`);
  }
  items.push({ ...declaration, name });
}

// the types that are referenced by the exports, but not exported:
// the documented ones are listed after the exported types,
// the other ones are shown with the types that reference them
const exportedDeclarations = new Set(exportedNames.values());
const internalTypes = [...declarations.values()].filter(
  // `Omit` works like the built-in `Omit`
  ({ name, node }) => !exportedDeclarations.has(name) && isType(node) && name !== 'Omit'
);
const helperTypes = new Map(
  internalTypes.filter(({ doc }) => doc.summary === '').map((type) => [type.name, type])
);
groups
  .get('Types')!
  .push(...internalTypes.filter(({ name }) => !helperTypes.has(name)).toSorted(compareNames));

// the generated headings, with the key to resolve the links to them
const generatedHeadings: GeneratedHeading[] = [];
// the types shown as a code block, whose members link to the type
const codeBlockTypes = new Set<string>();
const markdown: string[] = [];

for (const [section, items] of groups) {
  markdown.push(heading(3, section));
  const propsInterfaces = new Map(
    items.filter(({ node }) => isType(node)).map((item) => [item.name, item])
  );
  for (const item of items) {
    if (section === 'Components' && isType(item.node)) continue;
    // e.g. `DataGridProps` after `DataGrid`
    const propsInterface =
      section === 'Components' ? propsInterfaces.get(`${item.name}Props`) : undefined;
    markdown.push(renderItem(item, section, propsInterface !== undefined));
    if (propsInterface !== undefined) markdown.push(renderType(propsInterface, 5));
  }
}

const readme = await readFile(readmePath, 'utf8');
const startIndex = readme.indexOf(startMarker);
const endIndex = readme.indexOf(endMarker);

if (startIndex === -1 || endIndex < startIndex) {
  throw new Error(`${readmePath} must contain ${startMarker} followed by ${endMarker}`);
}

await writeFile(
  readmePath,
  resolveLinks(
    readme.slice(0, startIndex + startMarker.length),
    markdown.join('\n\n'),
    readme.slice(endIndex)
  )
);

function renderItem(item: Declaration, section: string, hasPropsInterface: boolean) {
  const { name, node, doc } = item;
  if (isType(node)) return renderType(item, 4);

  if (section === 'Components') {
    const title = heading(4, `\`<${name} />\``, name);
    // the props interface of a component is listed after it, e.g. `DataGridProps` after `DataGrid`
    if (hasPropsInterface) return [title, ...renderSummary(doc), ...renderTags(doc)].join('\n\n');

    const propsType = getComponentPropsType(node);
    const typeName = /^\w+/.exec(propsType)![0];
    if (!helperTypes.has(typeName)) {
      return [
        title,
        ...renderSummary(doc),
        ...renderTags(doc),
        heading(5, 'Props'),
        `[\`${propsType}\`](#!${typeName})`
      ].join('\n\n');
    }

    // the props of a component with an undocumented props type are described
    // by the paragraphs after the first, e.g. `SelectCheckbox`
    const [description, ...props] = renderSummary(doc).join('').split('\n\n');
    if (props.length === 0) {
      throw new Error(`${name} must describe its props after the first paragraph`);
    }
    return [title, description, ...renderTags(doc), heading(5, 'Props'), ...props].join('\n\n');
  }

  const isFunction = node.type !== 'VariableDeclaration';
  return [
    heading(4, `\`${name}${isFunction ? '()' : ''}\``, name),
    codeBlock(isFunction ? getFunctionSignature(name, node) : getVariableSignature(name, node)),
    ...renderSummary(doc),
    ...renderTags(doc)
  ].join('\n\n');
}

function renderType({ name, node, doc }: Declaration, level: number) {
  const isInternal = !exportedDeclarations.has(name);
  // the props interfaces of the components are titled by their name, e.g. `DataGridProps`
  const md = [
    heading(level, level === 4 ? `\`${name}\`${isInternal ? ' (internal)' : ''}` : name, name),
    ...renderSummary(doc)
  ];

  if (hasRichMembers(node)) {
    // a heading per member, as their docs have examples, lists, or several paragraphs
    md.push(...renderTags(doc), ...renderMembers(node.body!.body, level + 1, name));
  } else {
    codeBlockTypes.add(name);
    md.push(codeBlock(getTypeDeclarations(node)), ...renderTags(doc));
  }

  return md.join('\n\n');
}

function renderMembers(members: Node[], level: number, parent: string): string[] {
  return members.flatMap((member) => {
    const name = getMemberName(member);
    const doc = parseDoc(getComment(member));
    const typeLiteral = findTypeLiteral(member.typeAnnotation);
    // e.g. `editorOptions`, which is an object, has a heading per option
    if (typeLiteral !== undefined) {
      return [
        heading(level, `\`${name}\``, `${parent}.${name}`),
        ...renderSummary(doc),
        ...renderTags(doc),
        ...renderMembers(typeLiteral.members!, Math.min(level + 1, 6), `${parent}.${name}`)
      ];
    }
    return [
      heading(level, `\`${name}${member.optional === true ? '?' : ''}\``, `${parent}.${name}`),
      codeBlock(source(member)),
      ...renderSummary(doc),
      ...renderTags(doc)
    ];
  });
}

function renderSummary({ summary }: Doc) {
  return summary === '' ? [] : [convertLinks(summary)];
}

function renderTags({ tags }: Doc) {
  const labels: Record<string, string> = {
    defaultValue: '**Default:** ',
    example: '**Example:**\n\n',
    see: '**See also:** ',
    returns: '**Returns:**\n\n'
  };
  return tags
    .filter(({ name }) => {
      // `@group` sets the section, and the type parameters are described in the "Generics" section
      if (name === 'group' || name === 'typeParam') return false;
      if (name in labels) return true;
      throw new Error(`The @${name} tag is not supported in the API reference`);
    })
    .map(({ name, text }) => `${labels[name]}${convertLinks(text)}`);
}

// e.g. `RenderRowProps<R, SR>`
function getComponentPropsType(node: Node) {
  const signature =
    node.type === 'VariableDeclaration'
      ? node.declarations![0].id!.typeAnnotation!.typeAnnotation!
      : node;
  return cleanCode(source(getParams(signature)[0].typeAnnotation!.typeAnnotation!));
}

// e.g. `function renderHeaderCell<R, SR>(props: RenderHeaderCellContentProps<R, SR>): …`
function getFunctionSignature(name: string, node: Node) {
  const typeParameters = node.typeParameters == null ? '' : source(node.typeParameters);
  const params = getParams(node).map((param) => {
    // destructured parameters are named `props`
    const paramName = param.type === 'Identifier' ? param.name : 'props';
    return `${paramName}: ${source(param.typeAnnotation!.typeAnnotation!)}`;
  });
  const returnType = node.returnType == null ? '' : source(node.returnType);
  return `function ${name}${typeParameters}(${params.join(', ')})${returnType};`;
}

// e.g. `const SelectColumn: Column<any, any>;` or `const SELECT_COLUMN_KEY = 'rdg-select-column';`
function getVariableSignature(name: string, node: Node) {
  const declarator = node.declarations![0];
  if (declarator.init !== null && declarator.init !== undefined) {
    return `const ${name} = ${source(declarator.init).replaceAll('"', "'")};`;
  }
  return `const ${name}${source(declarator.id!.typeAnnotation!)};`;
}

function getParams(node: Node) {
  const { params } = node;
  return Array.isArray(params) ? params : params!.params;
}

// the declaration of a type: an interface includes the members of the helper interfaces it extends,
// e.g. `RenderRowProps` and `BaseRenderRowProps`, and a type alias is followed by the helper types it references,
// e.g. `CellKeyDownArgs` and `ActiveCellKeyDownArgs`
function getTypeDeclarations(node: Node) {
  if (node.type === 'TSInterfaceDeclaration') return getInterfaceDeclaration(node);

  const referenced = new Set(
    Array.from(source(node).matchAll(/\b\w+\b/g), ([name]) => helperTypes.get(name)?.node)
  );
  referenced.delete(undefined);
  referenced.delete(node);
  return [node, ...referenced]
    .map((declaration) =>
      declaration!.type === 'TSInterfaceDeclaration'
        ? getInterfaceDeclaration(declaration!)
        : source(declaration!)
    )
    .join('\n\n');
}

function getInterfaceDeclaration(node: Node) {
  if (node.extends?.every((base) => !helperTypes.has(source(base.expression!))) !== false) {
    return source(node);
  }

  const { heritage, members } = getInterfaceParts(node);
  const typeParameters = node.typeParameters == null ? '' : source(node.typeParameters);
  const extendsClause = heritage.length === 0 ? '' : ` extends ${heritage.join(', ')}`;
  const body = Array.from(members.values(), (member) => `  ${member}`).join('\n');
  return `interface ${node.id!.name}${typeParameters}${extendsClause} {\n${body}\n}`;
}

// the base types and members of an interface, with the members of the helper interfaces it extends
function getInterfaceParts(node: Node) {
  const heritage: string[] = [];
  const members = new Map<string, string>();

  for (const base of node.extends ?? []) {
    const helperType = helperTypes.get(source(base.expression!));
    if (helperType?.node.type === 'TSInterfaceDeclaration') {
      const parts = getInterfaceParts(helperType.node);
      heritage.push(...parts.heritage);
      for (const [name, member] of parts.members) members.set(name, member);
    } else {
      heritage.push(source(base));
    }
  }

  for (const member of node.body!.body) {
    const name = getMemberName(member);
    const comment = getComment(member);
    // a redeclared member replaces the inherited one
    members.delete(name);
    members.set(name, `${comment === '' ? '' : `/*${comment}*/\n  `}${source(member)}`);
  }

  return { heritage, members };
}

function compareNames(a: Declaration, b: Declaration) {
  return a.name.localeCompare(b.name);
}

function isType(node: Node) {
  return node.type === 'TSInterfaceDeclaration' || node.type === 'TSTypeAliasDeclaration';
}

// members with more than a single paragraph can't be shown as comments of a code block
function hasRichMembers(node: Node) {
  return (
    node.type === 'TSInterfaceDeclaration' &&
    node.body!.body.some((member) => {
      const { summary, tags } = parseDoc(getComment(member));
      return (
        tags.some((tag) => tag.name !== 'defaultValue') ||
        summary.includes('\n\n') ||
        summary.includes('```') ||
        /^\s*(?:[-*+]|\d+\.) /m.test(summary)
      );
    })
  );
}

// the object type of a member, e.g. `Maybe<{ … }>`
function findTypeLiteral(node: Node | undefined): Node | undefined {
  if (node === undefined) return undefined;
  if (node.type === 'TSTypeLiteral') return node;
  for (const child of [
    node.typeAnnotation,
    node.elementType,
    ...(node.types ?? []),
    ...(node.typeArguments?.params ?? [])
  ]) {
    const typeLiteral = findTypeLiteral(child);
    if (typeLiteral !== undefined) return typeLiteral;
  }
  return undefined;
}

function addDeclaration(node: Node, statement: Node) {
  const name = getDeclarationName(node);
  declarations.set(name, { name, node, doc: parseDoc(getComment(statement)) });
}

function getDeclarationName(node: Node) {
  return node.id?.name ?? node.declarations![0].id!.name;
}

function getMemberName({ key }: Node) {
  return key!.type === 'Identifier' ? key!.name! : key!.value!;
}

// the exported names of the entry point, in order
async function getExportOrder() {
  const entry = await readFile(entryPath, 'utf8');
  const names = (parseSync(entryPath, entry).program.body as unknown as Node[]).flatMap(
    (statement) =>
      statement.type === 'ExportNamedDeclaration'
        ? (statement as unknown as { specifiers: { exported: { name: string } }[] }).specifiers.map(
            ({ exported }) => exported.name
          )
        : []
  );
  for (const name of exportedNames.keys()) {
    if (!names.includes(name))
      throw new Error(`${name} must be exported by name from ${entryPath}`);
  }
  return names;
}

// the JSDoc comment directly before the node
function getComment({ start }: Node) {
  const comment = comments.findLast(
    (comment) =>
      comment.type === 'Block' &&
      comment.value.startsWith('*') &&
      comment.end <= start &&
      code.slice(comment.end, start).trim() === ''
  );
  return comment?.value ?? '';
}

function parseDoc(comment: string): Doc {
  const summary: string[] = [];
  const tags: { name: string; lines: string[] }[] = [];

  forEachLine(
    comment
      .split('\n')
      .map((line) => line.replace(/^\s*\*\s?/, ''))
      .join('\n'),
    (line, isInCodeBlock) => {
      const tag = isInCodeBlock ? null : /^@(\w+)\s?(.*)$/.exec(line);
      if (tag === null) {
        (tags.at(-1)?.lines ?? summary).push(line);
      } else {
        tags.push({ name: tag[1], lines: [tag[2]] });
      }
    }
  );

  return {
    summary: summary.join('\n').trim(),
    tags: tags.map(({ name, lines }) => ({ name, text: lines.join('\n').trim() }))
  };
}

function source({ start, end }: Node) {
  return code.slice(start, end);
}

function heading(level: number, text: string, key?: string) {
  const line = `${'#'.repeat(level)} ${text}`;
  generatedHeadings.push({ line, key });
  return line;
}

function codeBlock(text: string) {
  return `\`\`\`tsx\n${cleanCode(text)}\n\`\`\``;
}

// show the declarations without the `declare` keyword, link tags, and `NoInfer`,
// which only affects type inference
function cleanCode(text: string) {
  return text
    .replaceAll(/^(?:export )?declare /gm, '')
    .replaceAll('import("react").', 'React.')
    .replaceAll(linkTag, (_, target: string, label: string | undefined) => label ?? target)
    .replaceAll(/NoInfer<([^<>]+)>/g, '$1');
}

// `{@linkcode Column.width | width}` -> "[`width`](#!Column.width)", resolved by `resolveLinks`
function convertLinks(text: string) {
  return text.replaceAll(
    linkTag,
    (_, target: string, label: string | undefined) => `[\`${label ?? target}\`](#!${target})`
  );
}

// replace the links to items and members, e.g. `#!Column` and `#!Column.width`,
// with the anchors GitHub generates for their headings, which are numbered across the whole README.
// Links in the hand-written sections of the README can link to an item or member with its name as
// the link title, e.g. `[width](#width "Column.width")`, to update the anchor when the numbering changes.
function resolveLinks(precedingMarkdown: string, api: string, followingMarkdown: string) {
  const slugger = new GithubSlugger();
  const anchors = new Map<string, string>();
  const slugHeadings = (markdown: string, headings?: GeneratedHeading[]) => {
    forEachLine(markdown, (line, isInCodeBlock) => {
      const match = isInCodeBlock ? null : /^#{1,6} (.+)$/.exec(line);
      if (match === null) return;
      const anchor = slugger.slug(match[1].replaceAll('`', ''));
      if (headings === undefined) return;
      // the generated headings are matched in order
      const generated = headings.shift();
      if (generated?.line !== line) {
        throw new Error(`The heading "${line}" must not be in a JSDoc comment`);
      }
      if (generated.key !== undefined) anchors.set(generated.key, anchor);
    });
  };

  slugHeadings(precedingMarkdown);
  slugHeadings(api, [...generatedHeadings]);
  slugHeadings(followingMarkdown);

  const getAnchor = (target: string) => {
    const [type, ...members] = target.split('.');
    // the members of types shown as a code block link to their type
    const anchor =
      anchors.get(target) ??
      (members.length === 1 && codeBlockTypes.has(type) ? anchors.get(type) : undefined);
    if (anchor === undefined) throw new Error(`The link to ${target} does not match any heading`);
    return anchor;
  };

  return `${precedingMarkdown}\n\n${api}\n\n${followingMarkdown}`
    .replaceAll(/\]\(#!([^)]+)\)/g, (_, target: string) => `](#${getAnchor(target)})`)
    .replaceAll(
      /\]\(#[^ )]+ (["'])([\w.]+)\1\)/g,
      (_, quote: string, target: string) => `](#${getAnchor(target)} ${quote}${target}${quote})`
    );
}

function forEachLine(markdown: string, callback: (line: string, isInCodeBlock: boolean) => void) {
  let fence: string | undefined;
  for (const line of markdown.split('\n')) {
    const fenceMatch = /^ {0,3}(`{3,}|~{3,})/.exec(line);
    if (fence === undefined) {
      if (fenceMatch !== null) fence = fenceMatch[1];
      callback(line, fence !== undefined);
    } else {
      callback(line, true);
      // a closing fence uses the same character, at least as many times, and has no info string
      if (
        fenceMatch !== null &&
        fenceMatch[1].startsWith(fence[0]) &&
        fenceMatch[1].length >= fence.length &&
        line.trim() === fenceMatch[1]
      ) {
        fence = undefined;
      }
    }
  }
}
