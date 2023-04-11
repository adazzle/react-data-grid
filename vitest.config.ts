import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import linaria from '@linaria/vite';

// https://vitest.dev/config/
export default defineConfig({
  plugins: [react(), linaria()],
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
