import { act } from 'react-dom/test-utils';

// Allow node-environment tests to properly fail when accessing DOM APIs,
// as @testing-library/jest-dom may polyfill some DOM APIs like `window.CSS`
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (globalThis.window !== undefined) {
  await import('@testing-library/jest-dom/vitest');
}

if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  window.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  window.IntersectionObserver ??= class IntersectionObserver {
    root = null;
    rootMargin = '';
    thresholds = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  Element.prototype.setPointerCapture ??= () => {};
}
