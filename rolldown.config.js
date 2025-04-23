// @ts-check
import { isAbsolute } from 'node:path';
import wyw from '@wyw-in-js/rollup';
import pkg from './package.json' with { type: 'json' };
import { defineConfig } from 'rolldown';
import react from '@vitejs/plugin-react';

export default defineConfig({
  input: './src/index.ts',
  output: {
    dir: 'lib',
    entryFileNames: 'bundle.js',
    cssEntryFileNames: 'styles.css',
    sourcemap: true
  },
  platform: 'browser',
  external: (id) => !id.startsWith('.') && !isAbsolute(id),
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', { target: '19' }]]
      }
    }),
    // @ts-expect-error
    wyw({
      preprocessor: 'none',
      classNameSlug(/** @type {string} */ hash) {
        // We add the package version as suffix to avoid style conflicts
        // between multiple versions of RDG on the same page.
        return `${hash}${pkg.version.replaceAll('.', '-')}`;
      }
    })
  ]
});
