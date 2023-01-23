import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import linaria from '@linaria/vite';
import postcssNested from 'postcss-nested';

export default defineConfig({
  root: 'website',
  plugins: [react(), linaria({ preprocessor: 'none' })],
  css: {
    postcss: {
      plugins: [postcssNested]
    }
  },
  server: {
    open: true
  },
  test: {
    root: '.',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    environment: 'jsdom'
  }
});
