declare module '@vitest/browser/context' {
  interface BrowserCommands {
    resizeColumn: (resizeBy: number | readonly number[]) => Promise<void>;
    dragFill: (from: string, to: string) => Promise<void>;
  }
}

// somehow required to make `declare global` work
export {};
