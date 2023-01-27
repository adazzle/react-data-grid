import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import linaria from '@linaria/vite';
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
  },
  test: {
    root: '.',
    globals: true,
    coverage: {
      reporter: ['json']
    },
    restoreMocks: true,
    setupFiles: ['./test/setup.ts'],
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    environment: 'jsdom'
  }
});
