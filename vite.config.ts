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
    globals: true,
    coverage: {
      provider: 'v8',
      enabled: isCI,
      include: ['src/**/*.{ts,tsx}', '!src/types.ts'],
      all: true,
      reporter: ['text', 'json']
    },
    useAtomics: true,
    setupFiles: ['test/setup.ts'],
    restoreMocks: true,
    sequence: {
      shuffle: true
    }
  }
});
