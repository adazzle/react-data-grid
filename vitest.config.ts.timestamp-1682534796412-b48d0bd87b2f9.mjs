// vitest.config.ts
import react from "file:///C:/Users/amahaj200/GitHub/react-data-grid/node_modules/@vitejs/plugin-react/dist/index.mjs";
import postcssNested from "file:///C:/Users/amahaj200/GitHub/react-data-grid/node_modules/postcss-nested/index.js";
import { defineConfig } from "file:///C:/Users/amahaj200/GitHub/react-data-grid/node_modules/vitest/dist/config.js";
import linaria from "file:///C:/Users/amahaj200/GitHub/react-data-grid/node_modules/@linaria/vite/dist/index.mjs";
var isCI = process.env.CI === "true";
var vitest_config_default = defineConfig({
  // https://github.com/vitest-dev/vitest/issues/3124#issuecomment-1505908243
  optimizeDeps: {
    exclude: ["vitest/utils"],
    include: ["@vitest/utils"]
  },
  plugins: [react(), linaria({ preprocessor: "none" })],
  css: {
    postcss: {
      plugins: [postcssNested]
    }
  },
  test: {
    globals: true,
    coverage: {
      provider: "istanbul",
      enabled: isCI,
      include: ["src/**/*.{ts,tsx}", "!src/types.ts"],
      all: true,
      reporter: ["text", "json"]
    },
    useAtomics: true,
    setupFiles: ["test/setup.ts"],
    browser: {
      enabled: true,
      name: "chromium",
      provider: "playwright"
    },
    restoreMocks: true,
    sequence: {
      shuffle: true
    }
  }
});
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtYWhhajIwMFxcXFxHaXRIdWJcXFxccmVhY3QtZGF0YS1ncmlkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWFoYWoyMDBcXFxcR2l0SHViXFxcXHJlYWN0LWRhdGEtZ3JpZFxcXFx2aXRlc3QuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hbWFoYWoyMDAvR2l0SHViL3JlYWN0LWRhdGEtZ3JpZC92aXRlc3QuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCBwb3N0Y3NzTmVzdGVkIGZyb20gJ3Bvc3Rjc3MtbmVzdGVkJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVzdC9jb25maWcnO1xuaW1wb3J0IGxpbmFyaWEgZnJvbSAnQGxpbmFyaWEvdml0ZSc7XG5cbmNvbnN0IGlzQ0kgPSBwcm9jZXNzLmVudi5DSSA9PT0gJ3RydWUnO1xuXG4vLyBodHRwczovL3ZpdGVzdC5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVzdC1kZXYvdml0ZXN0L2lzc3Vlcy8zMTI0I2lzc3VlY29tbWVudC0xNTA1OTA4MjQzXG4gIG9wdGltaXplRGVwczoge1xuICAgIGV4Y2x1ZGU6IFsndml0ZXN0L3V0aWxzJ10sXG4gICAgaW5jbHVkZTogWydAdml0ZXN0L3V0aWxzJ11cbiAgfSxcbiAgcGx1Z2luczogW3JlYWN0KCksIGxpbmFyaWEoeyBwcmVwcm9jZXNzb3I6ICdub25lJyB9KV0sXG4gIGNzczoge1xuICAgIHBvc3Rjc3M6IHtcbiAgICAgIHBsdWdpbnM6IFtwb3N0Y3NzTmVzdGVkXVxuICAgIH1cbiAgfSxcbiAgdGVzdDoge1xuICAgIGdsb2JhbHM6IHRydWUsXG4gICAgY292ZXJhZ2U6IHtcbiAgICAgIHByb3ZpZGVyOiAnaXN0YW5idWwnLFxuICAgICAgZW5hYmxlZDogaXNDSSxcbiAgICAgIGluY2x1ZGU6IFsnc3JjLyoqLyoue3RzLHRzeH0nLCAnIXNyYy90eXBlcy50cyddLFxuICAgICAgYWxsOiB0cnVlLFxuICAgICAgcmVwb3J0ZXI6IFsndGV4dCcsICdqc29uJ11cbiAgICB9LFxuICAgIHVzZUF0b21pY3M6IHRydWUsXG4gICAgc2V0dXBGaWxlczogWyd0ZXN0L3NldHVwLnRzJ10sXG4gICAgYnJvd3Nlcjoge1xuICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgIG5hbWU6ICdjaHJvbWl1bScsXG4gICAgICBwcm92aWRlcjogJ3BsYXl3cmlnaHQnXG4gICAgfSxcbiAgICByZXN0b3JlTW9ja3M6IHRydWUsXG4gICAgc2VxdWVuY2U6IHtcbiAgICAgIHNodWZmbGU6IHRydWVcbiAgICB9XG4gIH1cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyVCxPQUFPLFdBQVc7QUFDN1UsT0FBTyxtQkFBbUI7QUFDMUIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxhQUFhO0FBRXBCLElBQU0sT0FBTyxRQUFRLElBQUksT0FBTztBQUdoQyxJQUFPLHdCQUFRLGFBQWE7QUFBQTtBQUFBLEVBRTFCLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxjQUFjO0FBQUEsSUFDeEIsU0FBUyxDQUFDLGVBQWU7QUFBQSxFQUMzQjtBQUFBLEVBQ0EsU0FBUyxDQUFDLE1BQU0sR0FBRyxRQUFRLEVBQUUsY0FBYyxPQUFPLENBQUMsQ0FBQztBQUFBLEVBQ3BELEtBQUs7QUFBQSxJQUNILFNBQVM7QUFBQSxNQUNQLFNBQVMsQ0FBQyxhQUFhO0FBQUEsSUFDekI7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixTQUFTO0FBQUEsSUFDVCxVQUFVO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixTQUFTO0FBQUEsTUFDVCxTQUFTLENBQUMscUJBQXFCLGVBQWU7QUFBQSxNQUM5QyxLQUFLO0FBQUEsTUFDTCxVQUFVLENBQUMsUUFBUSxNQUFNO0FBQUEsSUFDM0I7QUFBQSxJQUNBLFlBQVk7QUFBQSxJQUNaLFlBQVksQ0FBQyxlQUFlO0FBQUEsSUFDNUIsU0FBUztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLElBQ1o7QUFBQSxJQUNBLGNBQWM7QUFBQSxJQUNkLFVBQVU7QUFBQSxNQUNSLFNBQVM7QUFBQSxJQUNYO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
