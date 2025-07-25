import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-oxc';
import wyw from '@wyw-in-js/vite';
import { defineConfig } from 'vite';
import type { BrowserCommand } from 'vitest/node';

const isCI = process.env.CI === 'true';
const isTest = process.env.NODE_ENV === 'test';

// TODO: remove when `userEvent.pointer` is supported
const resizeColumn: BrowserCommand<[resizeBy: number | readonly number[]]> = async (
  context,
  resizeBy
) => {
  const page = context.page;
  const frame = await context.frame();
  const resizeHandle = frame.locator('[role="columnheader"][aria-colindex="2"] div');
  const { x, y } = (await resizeHandle.boundingBox())!;
  await resizeHandle.hover({
    position: { x: 5, y: 5 }
  });
  await page.mouse.down();
  resizeBy = Array.isArray(resizeBy) ? resizeBy : [resizeBy];
  let newX = x + 5;
  for (const value of resizeBy) {
    newX += value;
    await page.mouse.move(newX, y);
  }
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

const viewport = { width: 1920, height: 1080 } as const;

export default defineConfig(({ command, isPreview }) => ({
  base: '/react-data-grid/',
  cacheDir: '.cache/vite',
  clearScreen: false,
  build: {
    modulePreload: { polyfill: false },
    sourcemap: true,
    reportCompressedSize: false,
    // https://github.com/parcel-bundler/lightningcss/issues/873
    cssMinify: 'esbuild'
  },
  plugins: [
    (!isTest || isPreview) &&
      tanstackRouter({
        target: 'react',
        generatedRouteTree: 'website/routeTree.gen.ts',
        routesDirectory: 'website/routes',
        autoCodeSplitting: true,
        verboseFileRoutes: false
      }),
    react({
      exclude: ['./.cache/**/*']
    }),
    wyw({
      exclude: ['./.cache/**/*', '**/*.d.ts', '**/*.gen.ts'],
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
    projects: [
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
                browser: 'chromium',
                context: { viewport }
              }
            ],
            commands: { resizeColumn, dragFill },
            viewport,
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
