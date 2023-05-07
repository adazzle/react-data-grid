import linaria from '@linaria/rollup';
import react from '@vitejs/plugin-react';
import postcssNested from 'postcss-nested';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'website',
  base: process.env.CI === 'true' ? '/react-data-grid/' : '/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true
  },
  resolve: {
    alias: {
      lodash: 'lodash-es'
    }
  },
  plugins: [
    react({
      babel: {
        babelrc: false,
        configFile: false,
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
  }
});
