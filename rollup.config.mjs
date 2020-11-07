import { isAbsolute } from 'path';
import { babel } from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';

const extensions = ['.ts', '.tsx'];

export default {
  input: './src/index.ts',
  output: [{
    file: './lib/bundle.mjs',
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
      skipPreflightCheck: true,
      extensions
    }),
    nodeResolve({ extensions })
  ]
};
