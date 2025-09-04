declare module 'react' {
  interface CSSProperties {
    anchorName?: string;
    positionAnchor?: string;
    [key: `--${string}`]: string | number | undefined;
  }
}

// somehow required to make `declare global` work
export {};
