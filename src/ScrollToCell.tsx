import { useRef } from 'react';

import { useLayoutEffect } from './hooks';
import { scrollIntoView } from './utils';

export interface PartialPosition {
  readonly idx?: number | undefined;
  readonly rowIdx?: number | undefined;
}

export default function ScrollToCell({
  scrollToPosition: { idx, rowIdx },
  gridElement,
  setScrollToCellPosition
}: {
  scrollToPosition: PartialPosition;
  gridElement: HTMLDivElement;
  setScrollToCellPosition: (cell: null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    function removeScrollToCell() {
      setScrollToCellPosition(null);
    }

    const observer = new IntersectionObserver(removeScrollToCell, {
      root: gridElement,
      threshold: 1.0
    });

    observer.observe(ref.current!);

    return () => {
      observer.disconnect();
    };
  }, [gridElement, setScrollToCellPosition]);

  useLayoutEffect(() => {
    scrollIntoView(ref.current);
  });

  return (
    <div
      ref={ref}
      style={{
        gridColumn: idx === undefined ? '1/-1' : idx + 1,
        gridRow: rowIdx === undefined ? '1/-1' : rowIdx + 2
      }}
    />
  );
}
