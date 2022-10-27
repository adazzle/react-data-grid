import { fireEvent } from '@testing-library/react';
import type { Column } from '../../src';
import { setup, getHeaderCells, getGrid } from '../utils';

const pointerId = 1;

// TODO: https://github.com/jsdom/jsdom/issues/2527
class PointerEvent extends Event {
  pointerId: number | undefined;
  clientX: number | undefined;

  constructor(type: string, { pointerId, clientX, ...rest }: PointerEventInit) {
    super(type, rest);
    this.pointerId = pointerId;
    this.clientX = clientX;
  }
}

// @ts-expect-error
globalThis.PointerEvent = PointerEvent;

interface Row {
  col1: number;
  col2: string;
}

interface ResizeEvent<K extends keyof DOMRect> {
  column: HTMLElement;
  clientXStart: number;
  clientXEnd: number;
  rect: Pick<DOMRect, K>;
}

function resize<K extends keyof DOMRect>({
  column,
  clientXStart,
  clientXEnd,
  rect
}: ResizeEvent<K>) {
  const original = column.getBoundingClientRect.bind(column);
  column.getBoundingClientRect = () => ({
    ...original(),
    ...rect
  });
  fireEvent.pointerDown(
    column,
    new PointerEvent('pointerdown', { pointerId, clientX: clientXStart })
  );
  fireEvent.pointerMove(column, new PointerEvent('pointermove', { clientX: clientXEnd }));
  fireEvent.lostPointerCapture(column, new PointerEvent('lostpointercapture', {}));
}

const columns: readonly Column<Row>[] = [
  {
    key: 'col1',
    name: 'col1',
    width: 100
  },
  {
    key: 'col2',
    name: 'col2',
    minWidth: 100,
    width: 200,
    maxWidth: 400,
    resizable: true
  }
];

test('should not resize column if resizable is not specified', () => {
  setup({ columns, rows: [] });
  const [col1] = getHeaderCells();
  expect(getGrid()).toHaveStyle({ gridTemplateColumns: '100px 200px' });
  resize({ column: col1, clientXStart: 95, clientXEnd: 200, rect: { right: 100, left: 0 } });
  expect(getGrid()).toHaveStyle({ gridTemplateColumns: '100px 200px' });
});

test('should not resize column if cursor offset is not within the allowed range', () => {
  setup({ columns, rows: [] });
  const [, col2] = getHeaderCells();
  expect(getGrid()).toHaveStyle({ gridTemplateColumns: '100px 200px' });
  resize({ column: col2, clientXStart: 288, clientXEnd: 250, rect: { right: 300, left: 100 } });
  expect(getGrid()).toHaveStyle({ gridTemplateColumns: '100px 200px' });
});

test("measuring cells should have the column's min/max widths set", () => {
  setup({ columns, rows: [] });
  expect(document.querySelector('[data-measuring-cell-key="col2"]')).toHaveStyle({
    gridColumnStart: 2,
    minWidth: '100px',
    maxWidth: '400px'
  });
});
