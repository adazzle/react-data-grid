import react from '@vitejs/plugin-react';
import wyw from '@wyw-in-js/vite';
import { defineConfig } from 'vite';
import type { BrowserCommand } from 'vitest/node';

const isCI = process.env.CI === 'true';
const isTest = process.env.NODE_ENV === 'test';

// TODO: remove when `userEvent.pointer` is supported
const resizeColumn: BrowserCommand<[resizeBy: number]> = async (context, resizeBy) => {
  const page = context.page;
  const frame = await context.frame();
  const resizeHandle = frame.locator('[role="columnheader"][aria-colindex="2"]  div');
  const { x, y } = (await resizeHandle.boundingBox())!;
  await resizeHandle.hover({
    position: { x: 5, y: 5 }
  });
  await page.mouse.down();
  await page.mouse.move(x + resizeBy + 5, y);
  await page.mouse.up();
};

export default defineConfig({
  base: isCI ? '/react-data-grid/' : '/',
  build: {
    emptyOutDir: true,
    sourcemap: true
  },
  resolve: {
    alias: {
      lodash: isTest ? 'lodash' : 'lodash-es',
      'lodash-es': isTest ? 'lodash' : 'lodash-es'
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
    wyw({ preprocessor: 'none' })
  ],
  server: {
    open: true
  },
  test: {
    root: '.',
    globals: true,
    coverage: {
      provider: 'istanbul',
      enabled: isCI,
      include: ['src/**/*.{ts,tsx}', '!src/types.ts'],
      reporter: ['text', 'json']
    },
    testTimeout: isCI ? 10000 : 5000,
    setupFiles: ['test/setup.ts'],
    browser: {
      enabled: true,
      name: 'chromium',
      provider: 'playwright',
      commands: { resizeColumn },
      viewport: { width: 1920, height: 1080 }
    },
    restoreMocks: true,
    sequence: {
      shuffle: true
    }
  }
});
