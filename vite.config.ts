import linaria from '@linaria/vite';
import react from '@vitejs/plugin-react';
import postcssNested from 'postcss-nested';
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
    !isTest && linaria({ preprocessor: 'none' })
  ],
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
    environment: 'jsdom',
    pool: 'vmThreads',
    globals: true,
    coverage: {
      provider: 'v8',
      enabled: isCI,
      include: ['src/**/*.{ts,tsx}', '!src/types.ts'],
      reporter: ['text', 'json']
    },
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
