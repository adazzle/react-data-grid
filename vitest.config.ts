import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vitest.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      all: true,
      reporter: ['json']
    },
    useAtomics: true,
    testTimeout: 2500,
    setupFiles: ['./test/setup.ts', '@testing-library/jest-dom'],
    browser: {
      enabled: false,
      name: 'chromium',
      provider: 'playwright'
    },
    restoreMocks: true,
    sequence: {
      shuffle: true
    }
  }
});
