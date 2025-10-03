declare module 'vitest/browser' {
  interface BrowserCommands {
    dragFill: (from: string, to: string) => Promise<void>;
    resizeColumn: (resizeBy: number | readonly number[]) => Promise<void>;
    scrollGrid: (position: { scrollLeft?: number; scrollTop?: number }) => Promise<void>;
  }
}

// somehow required to make `declare global` work
export {};
