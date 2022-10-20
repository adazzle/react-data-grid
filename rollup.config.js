import { isAbsolute } from 'node:path';
import linaria from '@linaria/rollup';
import postcss from 'rollup-plugin-postcss';
import postcssNested from 'postcss-nested';
import { babel } from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import pkg from './package.json' assert { type: 'json' };

const extensions = ['.ts', '.tsx'];

export default {
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
    linaria({
      preprocessor: 'none',
      classNameSlug(hash) {
        // We add the package version as suffix to avoid style conflicts
        // between multiple versions of RDG on the same page.
        return `${hash}${pkg.version.replaceAll('.', '-')}`;
      }
    }),
    postcss({
      plugins: [postcssNested],
      extract: 'styles.css'
    }),
    babel({
      babelHelpers: 'runtime',
      extensions,
      // remove all comments except terser annotations
      // https://github.com/terser/terser#annotations
      // https://babeljs.io/docs/en/options#shouldprintcomment
      shouldPrintComment: (comment) => /^[@#]__.+__$/.test(comment)
    }),
    nodeResolve({ extensions })
  ]
};
