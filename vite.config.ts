import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import wyw from '@wyw-in-js/vite';
import browserslist from 'browserslist';
import { defineConfig } from 'vite';

const isCI = process.env.CI === 'true';
const isTest = process.env.NODE_ENV === 'test';

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
    !isTest &&
      TanStackRouterVite({
        generatedRouteTree: 'website/routeTree.gen.ts',
        routesDirectory: 'website/routes'
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
    reporters: ['basic'],
    restoreMocks: true,
    sequence: {
      shuffle: true
    }
  }
}));
