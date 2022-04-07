import { act } from 'react-dom/test-utils';

if (typeof window !== 'undefined') {
  window.ResizeObserver ??= class {
    callback: ResizeObserverCallback;

    constructor(callback: ResizeObserverCallback) {
      this.callback = callback;
    }

    observe() {
      // patch inlineSize/blockSize to pretend we're rendering DataGrid at 1920p/1080p
      // @ts-expect-error
      this.callback([{ contentBoxSize: [{ inlineSize: 1920, blockSize: 1080 }] }], this);
    }

    unobserve() {}
    disconnect() {}
  };

  window.HTMLElement.prototype.scrollIntoView ??= () => {};

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

  // Basic scroll polyfill
  const scrollStates = new WeakMap<Element, { scrollTop: number; scrollLeft: number }>();

  function getScrollState(div: Element) {
    if (scrollStates.has(div)) {
      return scrollStates.get(div)!;
    }
    const scrollState = { scrollTop: 0, scrollLeft: 0 };
    scrollStates.set(div, scrollState);
    return scrollState;
  }

  Object.defineProperties(Element.prototype, {
    scrollTop: {
      get(this: Element) {
        return getScrollState(this).scrollTop;
      },
      set(this: Element, value: number) {
        getScrollState(this).scrollTop = value;
        act(() => {
          this.dispatchEvent(new Event('scroll'));
        });
      }
    },
    scrollLeft: {
      get(this: Element) {
        return getScrollState(this).scrollLeft;
      },
      set(this: Element, value: number) {
        getScrollState(this).scrollLeft = value;
        act(() => {
          this.dispatchEvent(new Event('scroll'));
        });
      }
    }
  });

  Element.prototype.setPointerCapture ??= () => {};
}
