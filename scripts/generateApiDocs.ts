import { readFile, writeFile } from 'node:fs/promises';
import { registerHooks } from 'node:module';
import GithubSlugger from 'github-slugger';
import type { ContainerReflection, SignatureReflection as SignatureModel, SomeType } from 'typedoc';

// TODO: remove when TypeDoc supports TypeScript 7
// TypeDoc relies on the TypeScript API, which TypeScript 7 does not provide yet,
// so TypeDoc's `typescript` imports resolve to TypeScript 6 instead
registerHooks({
  resolve(specifier, context, nextResolve) {
    return nextResolve(specifier === 'typescript' ? '@typescript/typescript6' : specifier, context);
  }
});

const {
  Application,
  Comment,
  Context,
  Converter,
  DeclarationReflection,
  i18n,
  ParameterReflection,
  ReferenceType,
  ReflectionGroup,
  ReflectionKind,
  SignatureReflection,
  TSConfigReader,
  Type,
  TypeDocReader,
  TypeParameterReflection
} = await import('typedoc');
const { MarkdownTheme, MarkdownThemeContext } = await import('typedoc-plugin-markdown');

const readmePath = 'README.md';
const startMarker = '<!-- api:start -->';
const endMarker = '<!-- api:end -->';

const app = await Application.bootstrapWithPlugins({}, [new TypeDocReader(), new TSConfigReader()]);

// TODO: remove when TypeDoc supports TypeScript 7
// TypeDoc identifies TypeScript's lib types, like `NoInfer`, by their package name,
// which it derives from the path of TypeScript 6: `node_modules/@typescript/old`
const { createSymbolReference } = Context.prototype;
Context.prototype.createSymbolReference = function (...args) {
  const reference = createSymbolReference.apply(this, args);
  if (reference.package === '@typescript/old') {
    reference.package = 'typescript';
  }
  return reference;
};

class ReadmeThemeContext extends MarkdownThemeContext {
  constructor(...args: ConstructorParameters<typeof MarkdownThemeContext>) {
    super(...args);

    const { groups } = this.partials;
    const { useTableFormat: isDefaultTableFormat } = this.helpers;
    let isTableInterface = false;

    this.partials = {
      ...this.partials,
      // list the properties of an interface in a table, unless a property has more than a short description
      groups(model: ContainerReflection, options: Parameters<typeof groups>[1]) {
        isTableInterface =
          model.kindOf(ReflectionKind.Interface) && model.children?.every(hasShortComment) === true;
        return groups(model, options);
      },
      // the signatures already show the return types
      signatureReturns: (model: SignatureModel, options: { headingLevel: number }) => {
        const returnsTag = model.comment?.getTag('@returns');
        if (returnsTag === undefined) return '';
        return `${'#'.repeat(options.headingLevel)} ${i18n.theme_returns()}\n\n${this.helpers.getCommentParts(returnsTag.content)}`;
      },
      // the "Extends" sections already link to the base types
      inheritance: () => ''
    };

    this.helpers = {
      ...this.helpers,
      useTableFormat: (key, reflectionKind) =>
        key === 'properties' && reflectionKind === ReflectionKind.Interface
          ? isTableInterface
          : isDefaultTableFormat(key, reflectionKind)
    };
  }
}

class ReadmeTheme extends MarkdownTheme {
  override getRenderContext(
    page: Parameters<InstanceType<typeof MarkdownTheme>['getRenderContext']>[0]
  ) {
    return new ReadmeThemeContext(this, page, this.application.options);
  }
}

app.renderer.defineTheme('readme', ReadmeTheme);
app.options.setValue('theme', 'readme');

// collect the public exports before typedoc-plugin-missing-exports adds the internal types,
// its listener has a priority of 1e9
const publicNames = new Set<string>();
app.converter.on(
  Converter.EVENT_RESOLVE_BEGIN,
  ({ project }) => {
    for (const child of project.children ?? []) {
      publicNames.add(child.name);
    }
  },
  Number.POSITIVE_INFINITY
);

// `NoInfer` only affects type inference, show the type it wraps instead
app.converter.on(Converter.EVENT_RESOLVE_END, ({ project }) => {
  for (const reflection of Object.values(project.reflections)) {
    if (
      (reflection instanceof DeclarationReflection ||
        reflection instanceof ParameterReflection ||
        reflection instanceof SignatureReflection ||
        reflection instanceof TypeParameterReflection) &&
      reflection.type !== undefined
    ) {
      reflection.type = unwrapNoInfer(reflection.type);
    }

    if (reflection instanceof TypeParameterReflection && reflection.default !== undefined) {
      reflection.default = unwrapNoInfer(reflection.default);
    }

    // the default values of inferred object types, like the return types of the hooks,
    // are implementation details
    if (
      reflection instanceof DeclarationReflection &&
      reflection.parent?.kindOf(ReflectionKind.TypeLiteral) === true
    ) {
      delete reflection.defaultValue;
    }
  }
});

const project = await app.convert();

if (project === undefined) {
  throw new Error('TypeDoc failed to convert the project');
}

app.validate(project);

if (app.logger.hasErrors() || app.logger.hasWarnings()) {
  throw new Error('TypeDoc reported errors or warnings');
}

// public exports must be in one of the sections of `groupOrder`, set with a `@group` tag,
// the remaining groups only contain the types that are referenced by the public API but not exported
const sections = new Set(app.options.getValue('groupOrder').filter((title) => title !== '*'));
const internalGroup = new ReflectionGroup('Internal Types', project);
const publicGroups = (project.groups ?? []).filter((group) => {
  if (sections.has(group.title)) return true;

  for (const child of group.children) {
    if (publicNames.has(child.name)) {
      throw new Error(
        `${child.name} must have a @group tag with one of: ${[...sections].join(', ')}`
      );
    }
  }

  internalGroup.children.push(...group.children);
  return false;
});
internalGroup.children.sort((a, b) => a.name.localeCompare(b.name));
project.groups = [...publicGroups, internalGroup];

const interfaces = project
  .getReflectionsByKind(ReflectionKind.Interface)
  .filter((reflection) => reflection instanceof DeclarationReflection);

// only list the members that are inherited from internal types,
// the members inherited from public types are listed in their own section
const membersInheritedFromPublicTypes = interfaces.flatMap(
  (reflection) => reflection.children?.filter(isInheritedFromPublicType) ?? []
);

for (const member of membersInheritedFromPublicTypes) {
  project.removeReflection(member);
}

for (const reflection of interfaces) {
  // `removeReflection` doesn't remove the members from the groups that are rendered
  const remainingMembers = new Set<unknown>(reflection.children);
  if (reflection.groups !== undefined) {
    for (const group of reflection.groups) {
      group.children = group.children.filter((child) => remainingMembers.has(child));
    }
    reflection.groups = reflection.groups.filter((group) => group.children.length > 0);
  }

  // TypeDoc copies the comments of the members a member redeclares,
  // like `CalculatedColumn` redeclaring the properties of `Column` with their resolved types,
  // but their descriptions and defaults don't apply to the redeclared members
  for (const child of reflection.children ?? []) {
    const overwrittenComment = child.overwrites?.reflection?.comment;
    if (
      child.comment !== undefined &&
      overwrittenComment !== undefined &&
      Comment.combineDisplayParts(child.comment.summary) ===
        Comment.combineDisplayParts(overwrittenComment.summary)
    ) {
      delete child.comment;
    }
  }
}

const outputDirectory = app.options.getValue('out');
await app.generateOutputs(project);

const api = await readFile(`${outputDirectory}/README.md`, 'utf8');
const readme = await readFile(readmePath, 'utf8');

const startIndex = readme.indexOf(startMarker);
const endIndex = readme.indexOf(endMarker);

if (startIndex === -1 || endIndex < startIndex) {
  throw new Error(`${readmePath} must contain ${startMarker} followed by ${endMarker}`);
}

await writeFile(
  readmePath,
  replaceAnchors(
    readme.slice(0, startIndex + startMarker.length),
    api.trim(),
    readme.slice(endIndex)
  )
);

// e.g. `extends Column` or `extends Omit<DataGridProps, 'columns'>`
function getPublicBaseTypes(reflection: InstanceType<typeof DeclarationReflection>) {
  const publicBaseTypes = new Set<string>();
  for (const type of reflection.extendedTypes ?? []) {
    if (!(type instanceof ReferenceType)) continue;
    const [typeArgument] = type.typeArguments ?? [];
    if (
      publicNames.has(type.name) ||
      ((type.name === 'Omit' || type.name === 'Pick') &&
        typeArgument instanceof ReferenceType &&
        publicNames.has(typeArgument.name))
    ) {
      publicBaseTypes.add(type.name);
    }
  }
  return publicBaseTypes;
}

// a member is inherited from a public type directly, or through internal types,
// e.g. `RenderCellProps` inherits `onCellClick` from `BaseRenderCellProps`, which picks it from `DataGridProps`
function isInheritedFromPublicType(member: InstanceType<typeof DeclarationReflection>): boolean {
  const { inheritedFrom, parent } = member;
  if (inheritedFrom === undefined) return false;

  if (
    parent instanceof DeclarationReflection &&
    getPublicBaseTypes(parent).has(inheritedFrom.name.split('.')[0])
  ) {
    return true;
  }

  const inheritedMember = inheritedFrom.reflection;
  return (
    inheritedMember instanceof DeclarationReflection && isInheritedFromPublicType(inheritedMember)
  );
}

// a property can be listed in a table if its comment is a single paragraph
function hasShortComment(reflection: InstanceType<typeof DeclarationReflection>) {
  const { comment } = reflection;
  if (comment === undefined) return true;
  const summary = Comment.combineDisplayParts(comment.summary);
  return (
    comment.blockTags.every((tag) => tag.tag === '@defaultValue') &&
    !summary.includes('\n\n') &&
    !summary.includes('```') &&
    !/^\s*(?:[-*+]|\d+\.) /m.test(summary)
  );
}

// typedoc-plugin-markdown adds an HTML anchor before each heading and links to it,
// replace them with the anchors GitHub generates for the headings,
// which are numbered across the whole README, starting with the headings before the API reference.
// Links outside of the API reference can link to a member with its name as the link title,
// e.g. `[width](#width "Column.width")`, to update the anchor when the numbering changes.
function replaceAnchors(precedingMarkdown: string, api: string, followingMarkdown: string) {
  const slugger = new GithubSlugger();
  function slug(heading: string) {
    return slugger.slug(getHeadingText(heading));
  }

  forEachLine(precedingMarkdown, (line, isInCodeBlock) => {
    const heading = isInCodeBlock ? null : /^#{1,6} (.+)$/.exec(line);
    if (heading !== null) slug(heading[1]);
  });

  // anchors of the plugin, and of the API reference members, e.g. `Column.width`
  const anchors = new Map<string, string>();
  const memberAnchors = new Map<string, string>();
  const lines: string[] = [];
  let pendingAnchor: string | undefined;
  let item: string | undefined;
  forEachLine(api, (line, isInCodeBlock) => {
    if (!isInCodeBlock) {
      const anchor = /^<a id="([^"]+)"><\/a>$/.exec(line);
      if (anchor !== null) {
        pendingAnchor = anchor[1];
        return;
      }

      const heading = /^(#{1,6}) (.+)$/.exec(line);
      if (heading !== null) {
        const headingSlug = slug(heading[2]);
        const name = getHeadingText(heading[2]).replace(/(?:\(\)|\?)$/, '');
        if (heading[1].length === 3) {
          item = name;
          memberAnchors.set(name, headingSlug);
        } else if (pendingAnchor !== undefined && item !== undefined) {
          memberAnchors.set(`${item}.${name}`, headingSlug);
        }
        if (pendingAnchor !== undefined) {
          anchors.set(pendingAnchor, headingSlug);
          pendingAnchor = undefined;
        }
      } else if (pendingAnchor !== undefined) {
        // the empty line between the anchor and its heading
        if (line === '') return;
        throw new Error(`The anchor #${pendingAnchor} is not followed by a heading: ${line}`);
      }
    }

    lines.push(line);
  });

  // the anchors of table rows have no heading to link to
  const tableAnchors = new Set<string>();
  const markdown = lines.join('\n').replaceAll(/<a id="([^"]+)"><\/a> /g, (_, id: string) => {
    tableAnchors.add(id);
    return '';
  });

  const apiMarkdown = markdown.replaceAll(/\]\(#([^)]+)\)/g, (_, id: string) => {
    const anchor = anchors.get(id);
    if (anchor === undefined) {
      throw new Error(
        tableAnchors.has(id)
          ? `The link to #${id} links to a table row, which has no heading to link to`
          : `The link to #${id} does not match any heading`
      );
    }
    return `](#${anchor})`;
  });

  const linkedPrecedingMarkdown = precedingMarkdown.replaceAll(
    /\]\(#[^ )]+ "([^"]+)"\)/g,
    (_, member: string) => {
      const anchor = memberAnchors.get(member);
      if (anchor === undefined) {
        throw new Error(`The link to "${member}" does not match any API reference heading`);
      }
      return `](#${anchor} "${member}")`;
    }
  );

  return `${linkedPrecedingMarkdown}\n\n${apiMarkdown}\n\n${followingMarkdown}`;
}

function getHeadingText(heading: string) {
  return heading
    .replaceAll(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replaceAll(/\\(.)/g, '$1')
    .replaceAll('`', '');
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

function unwrapNoInfer(type: SomeType): SomeType {
  if (
    type instanceof ReferenceType &&
    type.name === 'NoInfer' &&
    type.typeArguments?.length === 1
  ) {
    return unwrapNoInfer(type.typeArguments[0]);
  }

  // `Type` is the base class of all the `SomeType` types
  for (const [key, value] of Object.entries(type)) {
    if (value instanceof Type) {
      Reflect.set(type, key, unwrapNoInfer(value as SomeType));
    } else if (Array.isArray(value)) {
      Reflect.set(
        type,
        key,
        value.map((item: unknown) =>
          item instanceof Type ? unwrapNoInfer(item as SomeType) : item
        )
      );
    }
  }

  return type;
}
