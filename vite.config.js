import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import linaria from '@linaria/rollup';
import postcssNested from 'postcss-nested';

export default defineConfig({
  root: 'website',
  plugins: [
    react({
      babel: {
        plugins: [['optimize-clsx', { functionNames: ['getCellClassname'] }]]
      }
    }),
    linaria({ preprocessor: 'none' })
  ],
  css: {
    postcss: {
      plugins: [postcssNested]
    }
  },
  server: {
    open: true
  },
  build: {
    outDir: '../dist',
    sourcemap: 'true'
  }
});
