import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import wyw from '@wyw-in-js/vite';
import browserslist from 'browserslist';
import { defineConfig } from 'vite';
import type { BrowserCommand } from 'vitest/node';

const isCI = process.env.CI === 'true';
const isTest = process.env.NODE_ENV === 'test';

// TODO: remove when `userEvent.pointer` is supported
const resizeColumn: BrowserCommand<[resizeBy: number]> = async (context, resizeBy) => {
  const page = context.page;
  const frame = await context.frame();
  const resizeHandle = frame.locator('[role="columnheader"][aria-colindex="2"] div');
  const { x, y } = (await resizeHandle.boundingBox())!;
  await resizeHandle.hover({
    position: { x: 5, y: 5 }
  });
  await page.mouse.down();
  await page.mouse.move(x + resizeBy + 5, y);
  await page.mouse.up();
};

// TODO: remove when `userEvent.pointer` is supported
const dragFill: BrowserCommand<[from: string, to: string]> = async (context, from, to) => {
  const page = context.page;
  const frame = await context.frame();
  await frame.getByRole('gridcell', { name: from }).click();
  await frame.locator('.rdg-cell-drag-handle').hover();
  await page.mouse.down();
  const toCell = frame.getByRole('gridcell', { name: to });
  await toCell.hover();
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
  plugins: [
    !isTest &&
      TanStackRouterVite({
        generatedRouteTree: 'website/routeTree.gen.ts',
        routesDirectory: 'website/routes',
        autoCodeSplitting: true
      }),
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
  optimizeDeps: {
    include: ['@vitest/coverage-v8/browser']
  },
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      enabled: isCI,
      include: ['src/**/*.{ts,tsx}'],
      reporter: ['json']
    },
    testTimeout: isCI ? 10000 : 5000,
    restoreMocks: true,
    sequence: {
      shuffle: true
    },
    workspace: [
      {
        extends: true,
        test: {
          name: 'browser',
          include: ['test/browser/**/*.test.*'],
          browser: {
            enabled: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium'
              }
            ],
            commands: { resizeColumn, dragFill },
            viewport: { width: 1920, height: 1080 },
            headless: true,
            screenshotFailures: process.env.CI !== 'true'
          },
          setupFiles: ['test/setupBrowser.ts']
        }
      },
      {
        extends: true,
        test: {
          name: 'node',
          include: ['test/node/**/*.test.*'],
          environment: 'node'
        }
      }
    ]
  }
}));
