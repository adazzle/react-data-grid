// @ts-expect-error
window.ResizeObserver ??= function ResizeObserver(callback: () => void) {
  callback();

  return {
    observe() {},
    disconnect() {}
  };
};

// patch clientWidth/clientHeight to pretend we're rendering DataGrid at 1080p
Object.defineProperties(HTMLDivElement.prototype, {
  clientWidth: {
    get(this: HTMLDivElement) {
      return this.classList.contains('rdg') ? 1920 : 0;
    }
  },
  clientHeight: {
    get(this: HTMLDivElement) {
      return this.classList.contains('rdg') ? 1080 : 0;
    }
  }
});
