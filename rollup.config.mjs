import nodeResolve from '@rollup/plugin-node-resolve';

export default {
  input: './lib/index.js',
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
  external: [
    'clsx',
    'react',
    'react-dom'
  ],
  plugins: [
    nodeResolve()
  ]
};
