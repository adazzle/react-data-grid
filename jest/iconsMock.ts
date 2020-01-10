module.exports = new Proxy({}, {
  get(obj, prop) {
    if (prop === '__esModule') return false;
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require(`@material-ui/icons/${prop as string}`).default;
  }
});
