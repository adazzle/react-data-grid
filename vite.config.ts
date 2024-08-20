import react from '@vitejs/plugin-react';
import wyw from '@wyw-in-js/vite';
import browserslist from 'browserslist';
import { defineConfig } from 'vite';
import type { BrowserCommand } from 'vitest/node';

const isCI = process.env.CI === 'true';

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

export default defineConfig(({ command }) => ({
  base: '/react-data-grid/',
  cacheDir: '.cache/vite',
  clearScreen: false,
  build: {
    target: browserslist().map((version) => version.replace(' ', '')),
    modulePreload: { polyfill: false },
    sourcemap: true,
    reportCompressedSize: false
  },
  json: {
    stringify: true
  },
  plugins: [
    react({
      exclude: ['./.cache/**/*']
    }),
    wyw({
      exclude: ['./.cache/**/*'],
      preprocessor: 'none',
      displayName: command === 'serve'
    })
  ],
  server: {
    open: true
  },
  test: {
    globals: true,
    coverage: {
      provider: 'istanbul',
      enabled: isCI,
      include: ['src/**/*.{ts,tsx}'],
      reporter: ['json']
    },
    testTimeout: isCI ? 10000 : 5000,
    setupFiles: ['test/setup.ts'],
    browser: {
      enabled: true,
      name: 'chromium',
      provider: 'playwright',
      commands: { resizeColumn },
      viewport: { width: 1920, height: 1080 },
      headless: true
    },
    restoreMocks: true,
    sequence: {
      shuffle: true
    }
  }
}));
