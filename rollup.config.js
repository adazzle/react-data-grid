import { isAbsolute } from 'path';
import { babel } from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';

const extensions = ['.ts', '.tsx'];

export default {
  input: './src/index.ts',
  output: [{
    file: './lib/bundle.js',
    format: 'es',
    preferConst: true,
    sourcemap: true
  }, {
    file: './lib/bundle.cjs',
    format: 'cjs',
    preferConst: true,
    sourcemap: true,
    interop: false
  }],
  external: id => !id.startsWith('.') && !isAbsolute(id),
  plugins: [
    babel({
      babelHelpers: 'runtime',
      extensions,
      // remove all comments except terser annotations
      // https://github.com/terser/terser#annotations
      // https://babeljs.io/docs/en/options#shouldprintcomment
      shouldPrintComment: comment => /^[@#]__.+__$/.test(comment)
    }),
    nodeResolve({ extensions })
  ]
};
