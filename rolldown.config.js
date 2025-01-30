// @ts-check
import { isAbsolute } from 'node:path';
import wyw from '@wyw-in-js/rollup';
import pkg from './package.json' with { type: 'json' };
import { defineConfig } from 'rolldown';

export default defineConfig({
  input: './src/index.ts',
  output: [
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
  ],
  platform: 'browser',
  external: (/** @type {string} */ id) => !id.startsWith('.') && !isAbsolute(id),
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
});
