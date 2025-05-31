import { isAbsolute } from 'node:path';
import wyw from '@wyw-in-js/rollup';
import { defineConfig } from 'rolldown';
import { dts } from 'rolldown-plugin-dts';

import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  input: './src/index.ts',
  output: {
    dir: 'lib',
    cssEntryFileNames: 'styles.css',
    sourcemap: true
  },
  platform: 'browser',
  external: (id) => !id.startsWith('.') && !isAbsolute(id),
  plugins: [
    dts({
      tsconfig: './tsconfig.lib.json'
    }),
    wyw({
      exclude: ['**/*.d.ts'],
      preprocessor: 'none',
      classNameSlug(hash) {
        // We add the package version as suffix to avoid style conflicts
        // between multiple versions of RDG on the same page.
        return `${hash}${pkg.version.replaceAll('.', '-')}`;
      }
    })
  ]
});
