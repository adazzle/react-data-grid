// @ts-check
import { isAbsolute } from 'node:path';
import wyw from '@wyw-in-js/rollup';
import pkg from './package.json' with { type: 'json' };
import { defineConfig } from 'rolldown';

// TODO: can't preserve minifier annotations, open issue
// const annotationRegexp = /^[@#]__.+__$/;

/**
 * @type {readonly import('rolldown').OutputOptions[]}
 */
const outputs = [
  {
    dir: 'lib',
    entryFileNames: 'bundle.js',
    cssEntryFileNames: 'styles.css',
    format: 'es',
    sourcemap: true
  },
  {
    dir: 'lib',
    entryFileNames: 'bundle.cjs',
    cssEntryFileNames: 'styles.css',
    format: 'cjs',
    sourcemap: true
  }
];

export default outputs.map((output) =>
  defineConfig({
    input: './src/index.ts',
    output,
    platform: 'browser',
    external: (id) => !id.startsWith('.') && !isAbsolute(id),
    plugins: [
      // @ts-expect-error
      wyw({
        preprocessor: 'none',
        /**
         * @param {string} hash
         */
        classNameSlug(hash) {
          // We add the package version as suffix to avoid style conflicts
          // between multiple versions of RDG on the same page.
          return `${hash}${pkg.version.replaceAll('.', '-')}`;
        }
      })
    ]
  })
);
