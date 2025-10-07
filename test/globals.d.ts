declare module '@vitest/browser/context' {
  interface BrowserCommands {
    dragFill: (from: string, to: string) => Promise<void>;
    resizeColumn: (name: string, resizeBy: number | readonly number[]) => Promise<void>;
    scrollGrid: (position: { scrollLeft?: number; scrollTop?: number }) => Promise<void>;
  }

  interface LocatorSelectors {
    getBySelector: (selector: string) => Locator;
  }
}

// somehow required to make `declare global` work
export {};
