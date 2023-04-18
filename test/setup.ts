// Allow node-environment tests to properly fail when accessing DOM APIs,
// as @testing-library/jest-dom may polyfill some DOM APIs like `window.CSS`
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (globalThis.window !== undefined) {
  await import('@testing-library/jest-dom');
}
