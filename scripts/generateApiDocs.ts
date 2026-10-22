import { readFile, writeFile } from 'node:fs/promises';
import { registerHooks } from 'node:module';
import type { SomeType } from 'typedoc';

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
  Context,
  Converter,
  DeclarationReflection,
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

// only list the members that are inherited from internal types,
// the members inherited from public types are listed in their own section
for (const reflection of project.getReflectionsByKind(ReflectionKind.Interface)) {
  if (!(reflection instanceof DeclarationReflection)) continue;

  // e.g. `extends Column` or `extends Omit<DataGridProps, 'columns'>`
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

  const membersInheritedFromPublicTypes =
    reflection.children?.filter((child) => {
      const baseType = child.inheritedFrom?.name.split('.')[0];
      return baseType !== undefined && publicBaseTypes.has(baseType);
    }) ?? [];

  for (const child of membersInheritedFromPublicTypes) {
    project.removeReflection(child);
  }

  // `removeReflection` doesn't remove the members from the groups that are rendered
  const remainingMembers = new Set<unknown>(reflection.children);
  for (const group of reflection.groups ?? []) {
    group.children = group.children.filter((child) => remainingMembers.has(child));
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

const before = readme.slice(0, startIndex + startMarker.length);
const after = readme.slice(endIndex);

await writeFile(readmePath, `${before}\n\n${replaceAnchors(api.trim(), before)}\n\n${after}`);

// typedoc-plugin-markdown adds an HTML anchor before each heading and links to it,
// replace them with the anchors GitHub generates for the headings,
// which are numbered across the whole README, starting with the headings before the API reference
function replaceAnchors(api: string, precedingMarkdown: string) {
  const slugCounts = new Map<string, number>();
  function slug(heading: string) {
    const base = heading
      .replaceAll(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replaceAll(/\\(.)/g, '$1')
      .replaceAll('`', '')
      .toLowerCase()
      .replaceAll(/[^\p{L}\p{M}\p{N}\p{Pc} -]/gu, '')
      .replaceAll(' ', '-');
    const count = slugCounts.get(base) ?? 0;
    slugCounts.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  }

  forEachLine(precedingMarkdown, (line, isInCodeBlock) => {
    const heading = isInCodeBlock ? null : /^#{1,6} (.+)$/.exec(line);
    if (heading !== null) slug(heading[1]);
  });

  const anchors = new Map<string, string>();
  const lines: string[] = [];
  let pendingAnchor: string | undefined;
  forEachLine(api, (line, isInCodeBlock) => {
    if (!isInCodeBlock) {
      const anchor = /^<a id="([^"]+)"><\/a>$/.exec(line);
      if (anchor !== null) {
        pendingAnchor = anchor[1];
        return;
      }

      const heading = /^#{1,6} (.+)$/.exec(line);
      if (heading !== null) {
        const headingSlug = slug(heading[1]);
        if (pendingAnchor !== undefined) {
          anchors.set(pendingAnchor, headingSlug);
          pendingAnchor = undefined;
        }
      } else if (pendingAnchor !== undefined && line === '') {
        // the empty line between the anchor and its heading
        return;
      }
    }

    lines.push(line);
  });

  // the anchors of the rows of the type parameter tables have no heading
  const removedAnchors = new Set<string>();
  const markdown = lines.join('\n').replaceAll(/<a id="([^"]+)"><\/a> /g, (_, id: string) => {
    removedAnchors.add(id);
    return '';
  });

  return markdown.replaceAll(/\]\(#([^)]+)\)/g, (link, id: string) => {
    if (removedAnchors.has(id)) {
      throw new Error(`The link to #${id} has no heading to link to`);
    }
    const anchor = anchors.get(id);
    return anchor === undefined ? link : `](#${anchor})`;
  });
}

function forEachLine(markdown: string, callback: (line: string, isInCodeBlock: boolean) => void) {
  let isInCodeBlock = false;
  for (const line of markdown.split('\n')) {
    const isFence = line.trimStart().startsWith('```');
    callback(line, isInCodeBlock || isFence);
    if (isFence) isInCodeBlock = !isInCodeBlock;
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
