import { useRef } from 'react';

import { useLayoutEffect } from './hooks';
import { scrollIntoView } from './utils';

export interface PartialPosition {
  readonly idx?: number | undefined;
  readonly rowIdx?: number | undefined;
}

export default function ScrollToCell({
  scrollToPosition: { idx, rowIdx },
  onScroll
}: {
  scrollToPosition: PartialPosition;
  onScroll: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    scrollIntoView(ref.current);
    onScroll();
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
