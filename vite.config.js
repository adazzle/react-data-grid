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
    browser: {
      enabled: false,
      name: 'chromium',
      provider: 'playwright'
    },
    coverage: {
      reporter: ['json']
    },
    environment: 'jsdom',
    globals: true,
    restoreMocks: true,
    setupFiles: ['./test/setup.ts', '@testing-library/jest-dom'],
    sequence: {
      shuffle: true
    },
    testTimeout: 2500,
    useAtomics: true
  }
});
