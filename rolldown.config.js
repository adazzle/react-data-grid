import { isAbsolute } from 'node:path';
import { defineConfig } from 'rolldown';
import wyw from '@wyw-in-js/rollup';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  input: './src/index.ts',
  output: [
    {
      file: './lib/bundle.js',
      format: 'es',
      generatedCode: 'es2015',
      sourcemap: true
    },
    {
      file: './lib/bundle.cjs',
      format: 'cjs',
      generatedCode: 'es2015',
      sourcemap: true
    }
  ],
  external: (id) => !id.startsWith('.') && !id.startsWith('@linaria:') && !isAbsolute(id),
  plugins: [
    wyw({
      preprocessor: 'none',
      classNameSlug(hash) {
        // We add the package version as suffix to avoid style conflicts
        // between multiple versions of RDG on the same page.
        return `${hash}${pkg.version.replaceAll('.', '-')}`;
      }
    }),
    postcss({
      extract: 'styles.css'
    })
  ]
});
