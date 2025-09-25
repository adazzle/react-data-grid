import { useCallback, useRef, useState, useSyncExternalStore } from 'react';

type Dimensions = [inlineSize: number, blockSize: number, horizontalScrollbarHeight: number];

const defaultDimensions: Dimensions = [1, 1, 0];

class GridDimensions {
  #dimensions = defaultDimensions;

  subscribe(element: HTMLDivElement, callback: () => void) {
    const { clientWidth, clientHeight, offsetWidth, offsetHeight } = element;
    const { width, height } = element.getBoundingClientRect();
    const initialHorizontalScrollbarHeight = offsetHeight - clientHeight;
    const initialWidth = width - offsetWidth + clientWidth;
    const initialHeight = height - initialHorizontalScrollbarHeight;
    this.#dimensions = [initialWidth, initialHeight, initialHorizontalScrollbarHeight];

    const resizeObserver = new ResizeObserver((entries) => {
      const size = entries[0].contentBoxSize[0];
      const { clientHeight, offsetHeight } = element;
      this.#dimensions = [size.inlineSize, size.blockSize, offsetHeight - clientHeight];
      callback();
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }

  getSnapshot() {
    return this.#dimensions;
  }
}

function getServerSnapshot() {
  return defaultDimensions;
}

export function useGridDimensions() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridDimensions] = useState(() => new GridDimensions());

  const subscribe = useCallback(
    (callback: () => void) => {
      return gridDimensions.subscribe(gridRef.current!, callback);
    },
    [gridDimensions]
  );

  const getSnapShot = useCallback(() => {
    return gridDimensions.getSnapshot();
  }, [gridDimensions]);

  const [inlineSize, blockSize, horizontalScrollbarHeight] = useSyncExternalStore(
    subscribe,
    getSnapShot,
    getServerSnapshot
  );

  return [gridRef, inlineSize, blockSize, horizontalScrollbarHeight] as const;
}
