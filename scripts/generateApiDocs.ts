import { readFile, writeFile } from 'node:fs/promises';
import GithubSlugger from 'github-slugger';
import { SyntaxKind } from 'typescript/ast';
import type {
  Declaration as DeclarationNode,
  FunctionDeclaration,
  InterfaceDeclaration,
  JSDoc,
  JSDocComment,
  NodeArray,
  Node,
  ParameterDeclaration,
  PropertySignatureDeclaration,
  SourceFile,
  TypeElement,
  VariableStatement
} from 'typescript/ast';
import {
  isExportDeclaration,
  isFunctionTypeNode,
  isIdentifier,
  isImportDeclaration,
  isInterfaceDeclaration,
  isJSDocText,
  isTypeAliasDeclaration,
  isTypeLiteralNode,
  isVariableStatement
} from 'typescript/ast/is';
import { API } from 'typescript/sync';

// Generates the API reference of the README from the declarations and JSDoc comments of `lib/index.d.ts`,
// which `vp pack` bundles from the sources. The items are listed in the order they are exported from `src/index.ts`.

const declarationsPath = 'lib/index.d.ts';
const entryPath = 'src/index.ts';
const readmePath = 'README.md';
const startMarker = '<!-- api:start -->';
const endMarker = '<!-- api:end -->';
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

using api = new API();
using declarationsFile = api.createSourceFile(
  declarationsPath,
  await readFile(declarationsPath, 'utf8')
);
using entryFile = api.createSourceFile(entryPath, await readFile(entryPath, 'utf8'));

const declarations = new Map<string, Declaration>();
// exported name -> declared name, e.g. `Cell` -> `MemoCell`
const exportedNames = new Map<string, string>();

for (const statement of declarationsFile.sourceFile.statements) {
  if (isImportDeclaration(statement)) continue;
  if (isExportDeclaration(statement)) {
    for (const specifier of getExportSpecifiers(statement)) {
      exportedNames.set(
        specifier.name.getText(),
        (specifier.propertyName ?? specifier.name).getText()
      );
    }
    continue;
  }
  const name = getDeclarationName(statement);
  const { modifiers } = statement as InterfaceDeclaration;
  if (modifiers?.some((modifier) => modifier.kind === SyntaxKind.ExportKeyword)) {
    exportedNames.set(name, name);
  }
  declarations.set(name, { name, node: statement, doc: getDoc(statement) });
}

// group the exports by their `@group` tag, in the order they are exported from the entry point
const groups = new Map<string, Declaration[]>(sections.map((section) => [section, []]));
for (const name of getExportOrder(entryFile.sourceFile)) {
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
    const [description, ...props] = doc.summary.split('\n\n');
    if (props.length === 0) {
      throw new Error(`${name} must describe its props after the first paragraph`);
    }
    return [title, description, ...renderTags(doc), heading(5, 'Props'), ...props].join('\n\n');
  }

  const isFunction = !isVariableStatement(node);
  return [
    heading(4, `\`${name}${isFunction ? '()' : ''}\``, name),
    codeBlock(
      isFunction
        ? getFunctionSignature(name, node as FunctionDeclaration)
        : getVariableSignature(name, node)
    ),
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

  if (isInterfaceDeclaration(node) && hasRichMembers(node)) {
    // a heading per member, as their docs have examples, lists, or several paragraphs
    md.push(...renderTags(doc), ...renderMembers(node.members, level + 1, name));
  } else {
    codeBlockTypes.add(name);
    md.push(codeBlock(getTypeDeclarations(node)), ...renderTags(doc));
  }

  return md.join('\n\n');
}

function renderMembers(members: NodeArray<TypeElement>, level: number, parent: string): string[] {
  return members.flatMap((member) => {
    const name = getMemberName(member);
    const doc = getDoc(member);
    const typeLiteral = findTypeLiteral(member);
    // e.g. `editorOptions`, which is an object, has a heading per option
    if (typeLiteral !== undefined) {
      return [
        heading(level, `\`${name}\``, `${parent}.${name}`),
        ...renderSummary(doc),
        ...renderTags(doc),
        ...renderMembers(typeLiteral.members, Math.min(level + 1, 6), `${parent}.${name}`)
      ];
    }
    const isOptional = (member as PropertySignatureDeclaration).postfixToken !== undefined;
    return [
      heading(level, `\`${name}${isOptional ? '?' : ''}\``, `${parent}.${name}`),
      codeBlock(member.getText()),
      ...renderSummary(doc),
      ...renderTags(doc)
    ];
  });
}

function renderSummary({ summary }: Doc) {
  return summary === '' ? [] : [summary];
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
    .map(({ name, text }) => `${labels[name]}${text}`);
}

// e.g. `RenderRowProps<R, SR>`
function getComponentPropsType(node: Node) {
  const signature = isVariableStatement(node) ? getVariableDeclaration(node).type! : node;
  if (!isFunctionTypeNode(signature) && signature.kind !== SyntaxKind.FunctionDeclaration) {
    throw new Error(`${getDeclarationName(node)} must be a function component`);
  }
  return cleanCode((signature as FunctionDeclaration).parameters[0].type!.getText());
}

// e.g. `function renderHeaderCell<R, SR>(props: RenderHeaderCellContentProps<R, SR>): …`
function getFunctionSignature(name: string, node: FunctionDeclaration) {
  const params = node.parameters.map((param: ParameterDeclaration) => {
    // destructured parameters are named `props`
    const paramName = isIdentifier(param.name) ? param.name.text : 'props';
    return `${paramName}: ${param.type!.getText()}`;
  });
  const returnType = node.type === undefined ? '' : `: ${node.type.getText()}`;
  return `function ${name}${getTypeParameters(node)}(${params.join(', ')})${returnType};`;
}

// e.g. `const SelectColumn: Column<any, any>;` or `const SELECT_COLUMN_KEY = 'rdg-select-column';`
function getVariableSignature(name: string, node: VariableStatement) {
  const { initializer, type } = getVariableDeclaration(node);
  if (initializer !== undefined) {
    return `const ${name} = ${initializer.getText().replaceAll('"', "'")};`;
  }
  return `const ${name}: ${type!.getText()};`;
}

// e.g. `<R, SR = unknown>`
function getTypeParameters(node: { typeParameters?: NodeArray<Node> | undefined }) {
  const { typeParameters } = node;
  if (typeParameters === undefined) return '';
  return `<${typeParameters.map((parameter) => parameter.getText()).join(', ')}>`;
}

// the declaration of a type: an interface includes the members of the helper interfaces it extends,
// e.g. `RenderRowProps` and `BaseRenderRowProps`, and a type alias is followed by the helper types it references,
// e.g. `CellKeyDownArgs` and `ActiveCellKeyDownArgs`
function getTypeDeclarations(node: Node) {
  if (isInterfaceDeclaration(node)) return getInterfaceDeclaration(node);

  const referenced = new Set(
    Array.from(node.getText().matchAll(/\b\w+\b/g), ([name]) => helperTypes.get(name)?.node)
  );
  referenced.delete(undefined);
  referenced.delete(node);
  return [node, ...referenced]
    .map((declaration) =>
      isInterfaceDeclaration(declaration!)
        ? getInterfaceDeclaration(declaration)
        : declaration!.getText()
    )
    .join('\n\n');
}

function getInterfaceDeclaration(node: InterfaceDeclaration) {
  if (getBaseTypes(node).every((base) => !helperTypes.has(getBaseTypeName(base)))) {
    return node.getText();
  }

  const { heritage, members } = getInterfaceParts(node);
  const extendsClause = heritage.length === 0 ? '' : ` extends ${heritage.join(', ')}`;
  const body = Array.from(members.values(), (member) => `  ${member}`).join('\n');
  return `interface ${node.name.text}${getTypeParameters(node)}${extendsClause} {\n${body}\n}`;
}

// the base types and members of an interface, with the members of the helper interfaces it extends
function getInterfaceParts(node: InterfaceDeclaration) {
  const heritage: string[] = [];
  const members = new Map<string, string>();

  for (const base of getBaseTypes(node)) {
    const helperType = helperTypes.get(getBaseTypeName(base));
    if (helperType !== undefined && isInterfaceDeclaration(helperType.node)) {
      const parts = getInterfaceParts(helperType.node);
      heritage.push(...parts.heritage);
      for (const [name, member] of parts.members) members.set(name, member);
    } else {
      heritage.push(base.getText());
    }
  }

  for (const member of node.members) {
    const name = getMemberName(member);
    const jsDoc = getJSDoc(member);
    // a redeclared member replaces the inherited one
    members.delete(name);
    members.set(name, `${jsDoc === undefined ? '' : `${jsDoc.getText()}\n  `}${member.getText()}`);
  }

  return { heritage, members };
}

function getBaseTypes(node: InterfaceDeclaration): readonly Node[] {
  return node.heritageClauses?.flatMap((clause) => clause.types) ?? [];
}

// e.g. `BaseRenderRowProps` for `BaseRenderRowProps<R, SR>`
function getBaseTypeName(base: Node) {
  return /^[\w.]+/.exec(base.getText())![0];
}

function compareNames(a: Declaration, b: Declaration) {
  return a.name.localeCompare(b.name);
}

function isType(node: Node) {
  return isInterfaceDeclaration(node) || isTypeAliasDeclaration(node);
}

// members with more than a single paragraph can't be shown as comments of a code block
function hasRichMembers(node: InterfaceDeclaration) {
  return node.members.some((member) => {
    const { summary, tags } = getDoc(member);
    return (
      tags.some((tag) => tag.name !== 'defaultValue') ||
      summary.includes('\n\n') ||
      summary.includes('```') ||
      /^\s*(?:[-*+]|\d+\.) /m.test(summary)
    );
  });
}

// the object type of a member, e.g. `Maybe<{ … }>`
function findTypeLiteral(node: Node) {
  return node.forEachChild(function find(child): DeclarationNode | undefined {
    return isTypeLiteralNode(child) ? child : child.forEachChild(find);
  }) as { members: NodeArray<TypeElement> } | undefined;
}

function getDeclarationName(node: Node) {
  if (isVariableStatement(node)) return getVariableDeclaration(node).name.getText();
  return (node as InterfaceDeclaration).name.text;
}

function getVariableDeclaration(node: VariableStatement) {
  return node.declarationList.declarations[0];
}

function getMemberName(member: TypeElement) {
  // e.g. `'aria-label'`
  return (member as PropertySignatureDeclaration).name.getText().replaceAll(/^['"]|['"]$/g, '');
}

function getExportSpecifiers(node: Node) {
  if (!isExportDeclaration(node) || node.exportClause?.kind !== SyntaxKind.NamedExports) return [];
  return node.exportClause.elements;
}

// the exported names of the entry point, in order
function getExportOrder(entry: SourceFile) {
  const names = entry.statements.flatMap((statement) =>
    getExportSpecifiers(statement).map((specifier) => specifier.name.getText())
  );
  for (const name of exportedNames.keys()) {
    if (!names.includes(name))
      throw new Error(`${name} must be exported by name from ${entryPath}`);
  }
  return names;
}

// the JSDoc comment directly before the node
function getJSDoc(node: Node) {
  return node.jsDoc?.at(-1) as JSDoc | undefined;
}

function getDoc(node: Node): Doc {
  const jsDoc = getJSDoc(node);
  return {
    summary: renderComment(jsDoc?.comment),
    tags: (jsDoc?.tags ?? []).map((tag) => ({
      name: tag.tagName.text,
      text: renderComment(tag.comment)
    }))
  };
}

// the text of a comment, with its links as "[`width`](#!Column.width)", resolved by `resolveLinks`
function renderComment(comment: NodeArray<JSDocComment> | undefined) {
  if (comment === undefined) return '';
  return comment
    .map((part) => {
      if (isJSDocText(part)) return part.text;
      const target = part.name!.getText();
      // e.g. `| width` for `{@linkcode Column.width | width}`
      const label = part.text.replace(/^\s*\|/, '').trim();
      return `[\`${label === '' ? target : label}\`](#!${target})`;
    })
    .join('')
    .trim();
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
    .replaceAll(
      /\{@link(?:code|plain)?\s+([^}|]+?)\s*(?:\|\s*([^}]+?)\s*)?\}/g,
      (_, target: string, label: string | undefined) => label ?? target
    )
    .replaceAll(/NoInfer<([^<>]+)>/g, '$1');
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
