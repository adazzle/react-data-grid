import react from '@vitejs/plugin-react';
import wyw from '@wyw-in-js/vite';
import { defineConfig } from 'vite';

const isCI = process.env.CI === 'true';
const isTest = process.env.NODE_ENV === 'test';

export default defineConfig({
  base: isCI ? '/react-data-grid/' : '/',
  build: {
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
    !isTest && wyw({ preprocessor: 'none' })
  ],
  server: {
    open: true
  },
  test: {
    root: '.',
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      enabled: isCI,
      include: ['src/**/*.{ts,tsx}', '!src/types.ts'],
      reporter: ['text', 'json']
    },
    pool: 'vmThreads',
    poolOptions: {
      vmThreads: {
        useAtomics: true
      }
    },
    testTimeout: isCI ? 10000 : 5000,
    setupFiles: ['test/setup.ts'],
    restoreMocks: true,
    sequence: {
      shuffle: true
    }
  }
});
