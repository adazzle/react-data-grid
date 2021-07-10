import { isAbsolute } from 'path';
import linaria from '@linaria/rollup';
import { babel } from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import cssnano from 'cssnano';
import stylis from 'stylis';
import pkg from './package.json';

stylis.set({ prefix: false });
const cssList = [];
const extensions = ['.ts', '.tsx'];

export default {
  input: './src/index.ts',
  output: [
    {
      file: './lib/bundle.js',
      format: 'es',
      preferConst: true,
      sourcemap: true
    },
    {
      file: './lib/bundle.cjs',
      format: 'cjs',
      preferConst: true,
      sourcemap: true,
      interop: false
    }
  ],
  external: (id) => !id.startsWith('.') && !id.startsWith('@linaria:') && !isAbsolute(id),
  plugins: [
    linaria({
      classNameSlug(hash) {
        // We add the package version as suffix to avoid style conflicts
        // between multiple versions of RDG on the same page.
        return `${hash}${pkg.version.replaceAll('.', '')}`;
      }
    }),
    {
      name: 'css',
      transform(code, filename) {
        if (filename.endsWith('.css')) {
          cssList.push(code);
          return '';
        }

        return null;
      },
      async intro() {
        const result = await cssnano().process(cssList.join(''));
        return `const _css_ = ${JSON.stringify(result.css)};`;
      }
    },
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
