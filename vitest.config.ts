import react from '@vitejs/plugin-react';
import postcssNested from 'postcss-nested';
import { defineConfig } from 'vitest/config';
import linaria from '@linaria/vite';

// https://vitest.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['vitest/utils'],
    include: ['@vitest/utils']
  },
  plugins: [react({ fastRefresh: false }), linaria({ preprocessor: 'none' })],
  css: {
    postcss: {
      plugins: [postcssNested]
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.{ts,tsx}', '!src/types.ts'],
      all: true,
      reporter: ['text', 'json']
    },
    useAtomics: true,
    testTimeout: 5000,
    setupFiles: ['test/setup.ts'],
    browser: {
      enabled: true,
      name: 'chromium',
      provider: 'playwright'
    },
    restoreMocks: true,
    sequence: {
      shuffle: true
    }
  }
});
