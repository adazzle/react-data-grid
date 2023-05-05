import react from '@vitejs/plugin-react';
import postcssNested from 'postcss-nested';
import { warmup } from 'vite-plugin-warmup';
import { defineConfig } from 'vitest/config';
import linaria from '@linaria/rollup';

const isCI = process.env.CI === 'true';

// https://vitest.dev/config/
export default defineConfig({
  plugins: [
    warmup({ clientFiles: ['./test/**/*.test.tsx'] }),
    react({ fastRefresh: false }),
    linaria({ preprocessor: 'none' })
  ],
  css: {
    postcss: {
      plugins: [postcssNested]
    }
  },
  test: {
    globals: true,
    coverage: {
      provider: 'istanbul',
      enabled: isCI,
      include: ['src/**/*.{ts,tsx}', '!src/types.ts'],
      all: true,
      reporter: ['text', 'json']
    },
    useAtomics: true,
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
