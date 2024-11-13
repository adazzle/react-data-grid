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
    reporters: ['basic'],
    restoreMocks: true,
    sequence: {
      shuffle: true
    }
  }
}));
