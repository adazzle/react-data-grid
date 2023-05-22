import { scrollIntoView } from './utils';

export interface PartialPosition {
  readonly idx?: number | undefined;
  readonly rowIdx?: number | undefined;
}

export default function ScrollToCell({
  scrollToPosition: { idx, rowIdx },
  setScrollToCellPosition
}: {
  scrollToPosition: PartialPosition;
  setScrollToCellPosition: (cell: null) => void;
}) {
  function ref(node: HTMLDivElement | null) {
    if (node === null) return;
    scrollIntoView(node, 'smooth');
    setScrollToCellPosition(null);
  }

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
