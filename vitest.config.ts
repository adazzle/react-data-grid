import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import linaria from '@linaria/vite';

// https://vitest.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['vitest/utils'],
    include: ['@vitest/utils']
  },
  plugins: [react({ fastRefresh: false }), linaria({ preprocessor: 'none' })],
  worker: {
    plugins: [react()]
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      all: true,
      reporter: ['text', 'html', 'cobertura']
    },
    useAtomics: true,
    testTimeout: 2500,
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
