import { isAbsolute } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import nodeResolve from '@rollup/plugin-node-resolve';
import linaria from '@linaria/vite';
import postcssNested from 'postcss-nested';
import pkg from './package.json' assert { type: 'json' };

const extensions = ['.ts', '.tsx'];

export default defineConfig({
  plugins: [
    react(),
    linaria({
      preprocessor: 'none',
      classNameSlug(hash) {
        // We add the package version as suffix to avoid style conflicts
        // between multiple versions of RDG on the same page.
        return `${hash}${pkg.version.replaceAll('.', '-')}`;
      }
    })
  ],
  css: {
    postcss: {
      plugins: [postcssNested],
      extract: 'styles.css'
    }
  },
  build: {
    target: 'es2015',
    outDir: './lib',
    sourcemap: 'true',
    lib: {
      formats: ['es', 'cjs'],
      entry: './src/index.ts',
      fileName: 'bundle'
    },
    rollupOptions: {
      external: (id) => !id.startsWith('.') && !id.startsWith('@linaria:') && !isAbsolute(id),
      plugins: [nodeResolve({ extensions })]
    }
  }
});
