import { readFile, writeFile } from 'node:fs/promises';
import GithubSlugger from 'github-slugger';
import { parseSync } from 'oxc-parser';

// Generates the API reference of the README from the declarations and JSDoc comments of `lib/index.d.ts`,
// which `vp pack` bundles from the sources.

const declarationsPath = 'lib/index.d.ts';
const readmePath = 'README.md';
const startMarker = '<!-- api:start -->';
const endMarker = '<!-- api:end -->';
// the `@group` tags of the exports
const sections = ['Components', 'Hooks', 'Render Functions', 'Context', 'Other', 'Types'];

interface Doc {
  summary: string;
  tags: { name: string; text: string }[];
}

interface Declaration {
  name: string;
  // e.g. an interface, a type alias, a function, or a variable
  node: Node;
  doc: Doc;
}

// the subset of the oxc AST that is used
interface Node {
  type: string;
  start: number;
  end: number;
  id?: { name: string; typeAnnotation?: Node };
  optional?: boolean;
  key?: { type: string; name?: string; value?: string };
  body?: { body: Node[] };
  params?: Node[];
  typeAnnotation?: Node;
  declarations?: Node[];
}

const code = await readFile(declarationsPath, 'utf8');
const { program, comments } = parseSync(declarationsPath, code);

const declarations = new Map<string, Declaration>();
// exported name -> declared name, e.g. `Cell` -> `MemoCell`
const exportedNames = new Map<string, string>();

for (const statement of program.body as unknown as Node[]) {
  if (statement.type === 'ExportNamedDeclaration') {
    const { declaration, specifiers } = statement as unknown as {
      declaration: Node | null;
      specifiers: { local: { name: string }; exported: { name: string } }[];
    };
    if (declaration === null) {
      for (const { local, exported } of specifiers) exportedNames.set(exported.name, local.name);
    } else {
      const name = getDeclarationName(declaration);
      exportedNames.set(name, name);
      declarations.set(name, { name, node: declaration, doc: parseDoc(getComment(statement)) });
    }
  } else if (statement.type !== 'ImportDeclaration') {
    const name = getDeclarationName(statement);
    declarations.set(name, { name, node: statement, doc: parseDoc(getComment(statement)) });
  }
}

// group the exports by their `@group` tag, the remaining types are referenced by the exports
const groups = new Map<string, Declaration[]>(sections.map((section) => [section, []]));
for (const [name, declaredName] of exportedNames) {
  const declaration = declarations.get(declaredName)!;
  const group = declaration.doc.tags.find((tag) => tag.name === 'group')?.text;
  const items = group === undefined ? undefined : groups.get(group);
  if (items === undefined) {
    throw new Error(`${name} must have a @group tag with one of: ${sections.join(', ')}`);
  }
  items.push({ ...declaration, name });
}

const exportedDeclarations = new Set(exportedNames.values());
const internalTypes = [...declarations.values()].filter(
  ({ name, node }) => !exportedDeclarations.has(name) && isType(node)
);

const markdown: string[] = [];
for (const [section, items] of [...groups, ['Internal Types', internalTypes] as const]) {
  markdown.push(`### ${section}`);
  for (const item of items.toSorted(section === 'Components' ? compareComponents : compareNames)) {
    markdown.push(renderItem(item, section === 'Components' && !isType(item.node)));
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
    `${readme.slice(0, startIndex + startMarker.length)}\n\n${markdown.join('\n\n')}\n\n${readme.slice(endIndex)}`
  )
);

function renderItem({ name, node, doc }: Declaration, isComponent: boolean) {
  const md: string[] = [];

  if (isComponent) {
    md.push(
      `#### \`<${name} />\``,
      ...renderSummary(doc),
      `**Props:** ${renderComponentProps(node)}`
    );
  } else if (isType(node)) {
    md.push(`#### \`${name}\``, ...renderSummary(doc));
    if (hasRichMembers(node)) {
      // a heading per member, as their docs have examples, lists, or several paragraphs
      md.push(codeBlock(`${source(node).slice(0, source(node).indexOf('{')).trim()} { … }`));
    } else {
      md.push(codeBlock(source(node)));
    }
  } else {
    const isFunction = node.type === 'TSDeclareFunction' || node.type === 'FunctionDeclaration';
    md.push(
      `#### \`${name}${isFunction ? '()' : ''}\``,
      codeBlock(source(node)),
      ...renderSummary(doc)
    );
  }

  md.push(...renderTags(doc));

  if (isType(node) && hasRichMembers(node)) {
    for (const member of node.body!.body) {
      const memberDoc = parseDoc(getComment(member));
      md.push(
        `##### \`${getMemberName(member)}${member.optional === true ? '?' : ''}\``,
        codeBlock(source(member)),
        ...renderSummary(memberDoc),
        ...renderTags(memberDoc)
      );
    }
  }

  return md.join('\n\n');
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
    .filter(({ name }) => name in labels)
    .map(({ name, text }) => `${labels[name]}${convertLinks(text)}`);
}

// e.g. "**Props:** [`DataGridProps<R, SR, K>`](#datagridprops)"
function renderComponentProps(node: Node) {
  const signature =
    node.type === 'VariableDeclaration'
      ? node.declarations![0].id!.typeAnnotation!.typeAnnotation!
      : node;
  const propsType = cleanCode(source(signature.params![0].typeAnnotation!.typeAnnotation!));
  return `[\`${propsType}\`](#!${/^\w+/.exec(propsType)![0]})`;
}

function compareNames(a: Declaration, b: Declaration) {
  return a.name.localeCompare(b.name);
}

// the components with a props interface first, each followed by its props interface,
// e.g. `DataGrid` and `DataGridProps`, then the other components
function compareComponents(a: Declaration, b: Declaration) {
  return getComponentSortKey(a).localeCompare(getComponentSortKey(b));
}

function getComponentSortKey({ name }: Declaration) {
  const component = name.endsWith('Props') ? name.slice(0, -'Props'.length) : name;
  return exportedNames.has(`${component}Props`) ? `0 ${component} ${name}` : `1 ${name}`;
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

function getDeclarationName(node: Node) {
  return node.id?.name ?? node.declarations![0].id!.name;
}

function getMemberName({ key }: Node) {
  return key!.type === 'Identifier' ? key!.name! : key!.value!;
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

function codeBlock(text: string) {
  return `\`\`\`ts\n${cleanCode(text)}\n\`\`\``;
}

// show the declarations without the `declare` keyword, link tags, and `NoInfer`,
// which only affects type inference
function cleanCode(text: string) {
  return text
    .replace(/^(?:export )?declare /, '')
    .replaceAll(
      /\{@link(?:code)? ([^}|]+?)(?: \| ([^}]+))?\}/g,
      (_, target: string, label: string | undefined) => label ?? target
    )
    .replaceAll(/NoInfer<([^<>]+)>/g, '$1');
}

// `{@linkcode Column.width | width}` -> "[`width`](#!Column.width)", resolved by `resolveLinks`
function convertLinks(text: string) {
  return text.replaceAll(
    /\{@link(?:code)? ([^}|]+?)(?: \| ([^}]+))?\}/g,
    (_, target: string, label: string | undefined) => `[\`${label ?? target}\`](#!${target.trim()})`
  );
}

// replace the links to items and members, e.g. `#!Column` and `#!Column.width`,
// with the anchors GitHub generates for their headings, which are numbered across the whole README.
// Links in the hand-written sections of the README can link to an item or member with its name as
// the link title, e.g. `[width](#width "Column.width")`, to update the anchor when the numbering changes.
function resolveLinks(markdown: string) {
  const slugger = new GithubSlugger();
  const anchors = new Map<string, string>();
  let item: string | undefined;

  forEachLine(markdown, (line, isInCodeBlock) => {
    const heading = isInCodeBlock ? null : /^(#{1,6}) (.+)$/.exec(line);
    if (heading === null) return;

    const text = heading[2].replaceAll('`', '');
    const anchor = slugger.slug(text);
    // e.g. `DataGrid` for `<DataGrid />`, `renderCheckbox` for `renderCheckbox()`
    const name = text.replace(/^<(.+) \/>$/, '$1').replace(/(?:\(\)|\?)$/, '');
    if (heading[1].length === 4) {
      item = name;
      anchors.set(name, anchor);
    } else if (heading[1].length === 5 && item !== undefined) {
      anchors.set(`${item}.${name}`, anchor);
    }
  });

  const getAnchor = (target: string) => {
    // members listed in the code block of their type link to the type
    const anchor = anchors.get(target) ?? anchors.get(target.split('.')[0]);
    if (anchor === undefined) throw new Error(`The link to ${target} does not match any heading`);
    return anchor;
  };

  return markdown
    .replaceAll(/\]\(#!([\w.]+)\)/g, (_, target: string) => `](#${getAnchor(target)})`)
    .replaceAll(
      /\]\(#[^ )]+ "([\w.]+)"\)/g,
      (_, target: string) => `](#${getAnchor(target)} "${target}")`
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
