import { defineWorkspace } from 'vitest/config';
import type { BrowserCommand } from 'vitest/node';

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

export default defineWorkspace([
  {
    extends: './vite.config.ts',
    test: {
      name: 'browser',
      include: ['test/browser/**/*.test.*'],
      browser: {
        enabled: true,
        name: 'chromium',
        provider: 'playwright',
        commands: { resizeColumn },
        viewport: { width: 1920, height: 1080 },
        headless: true,
        screenshotFailures: process.env.CI !== 'true'
      },
      setupFiles: ['test/setupBrowser.ts'],
      expect: {
        poll: { timeout: 10000 }
      }
    }
  },
  {
    extends: './vite.config.ts',
    test: {
      name: 'node',
      include: ['test/node/**/*.test.*'],
      environment: 'node',
      setupFiles: ['test/setupNode.ts']
    }
  }
]);
