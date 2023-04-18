// Allow node-environment tests to properly fail when accessing DOM APIs,
// as @testing-library/jest-dom may polyfill some DOM APIs like `window.CSS`
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (globalThis.window !== undefined) {
  // TODO: use `await import()` instead of `require()`
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@testing-library/jest-dom');
}
