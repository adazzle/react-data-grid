import { defineConfig } from 'rolldown';
import { dts } from 'rolldown-plugin-dts';
import wyw from '@wyw-in-js/rollup';
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  input: './src/index.ts',
  output: {
    dir: 'lib',
    cssEntryFileNames: 'styles.css',
    sourcemap: true
  },
  platform: 'browser',
  plugins: [
    dts({
      tsconfig: './tsconfig.lib.json',
      sourcemap: false
    }),
    wyw({
      exclude: ['**/*.d.ts'],
      preprocessor: 'none',
      classNameSlug(/** @type {string} */ hash) {
        // We add the package version as suffix to avoid style conflicts
        // between multiple versions of RDG on the same page.
        return `${hash}${pkg.version.replaceAll('.', '-')}`;
      }
    })
  ]
});
