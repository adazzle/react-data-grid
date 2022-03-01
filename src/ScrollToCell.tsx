import { useRef } from 'react';

import { useLayoutEffect } from './hooks';
import type { Position } from './types';
import { scrollIntoView } from './utils';

export default function ScrollToCell({
  scrollToCell: { idx, rowIdx },
  setScrollToCell
}: {
  scrollToCell: Partial<Position>;
  setScrollToCell: (cell: null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    scrollIntoView(ref.current, 'smooth');
    setScrollToCell(null);
  }, [setScrollToCell]);

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
