import { fireEvent } from '@testing-library/react';
import type { Column } from '../../src';
import { setup, getHeaderCells, getGrid } from '../utils';

const pointerId = 1;

// TODO: https://github.com/jsdom/jsdom/issues/2527
class PointerEvent extends Event {
  pointerId: number | undefined;
  pointerType: string | undefined;
  clientX: number | undefined;
  buttons: number | undefined;

  constructor(
    type: string,
    { pointerId, pointerType, clientX, buttons, ...rest }: PointerEventInit
  ) {
    super(type, rest);
    this.pointerId = pointerId;
    this.pointerType = pointerType;
    this.clientX = clientX;
    this.buttons = buttons;
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
    new PointerEvent('pointerdown', {
      pointerId,
      buttons: 1,
      clientX: clientXStart
    })
  );
  fireEvent.pointerMove(
    column,
    new PointerEvent('pointermove', {
      pointerId,
      clientX: clientXEnd
    })
  );
  fireEvent.pointerUp(
    column,
    new PointerEvent('pointerup', {
      pointerId
    })
  );
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
  expect(getGrid()).toHaveStyle({ '--template-columns': '100px 200px' });
  resize({ column: col1, clientXStart: 95, clientXEnd: 200, rect: { right: 100, left: 0 } });
  expect(getGrid()).toHaveStyle({ '--template-columns': '100px 200px' });
});

test('should not resize column if cursor offset is not within the allowed range', () => {
  setup({ columns, rows: [] });
  const [, col2] = getHeaderCells();
  expect(getGrid()).toHaveStyle({ '--template-columns': '100px 200px' });
  resize({ column: col2, clientXStart: 288, clientXEnd: 250, rect: { right: 300, left: 100 } });
  expect(getGrid()).toHaveStyle({ '--template-columns': '100px 200px' });
});

test('should resize column if cursor offset is within the allowed range', () => {
  setup({ columns, rows: [] });
  const [, col2] = getHeaderCells();
  expect(getGrid()).toHaveStyle({ '--template-columns': '100px 200px' });
  resize({ column: col2, clientXStart: 289, clientXEnd: 250, rect: { right: 300, left: 100 } });
  expect(getGrid()).toHaveStyle({ '--template-columns': '100px 161px' });
});

test('should use the maxWidth if specified', () => {
  setup({ columns, rows: [] });
  const [, col2] = getHeaderCells();
  expect(getGrid()).toHaveStyle({ '--template-columns': '100px 200px' });
  resize({ column: col2, clientXStart: 295, clientXEnd: 1000, rect: { right: 300, left: 100 } });
  expect(getGrid()).toHaveStyle({ '--template-columns': '100px 400px' });
});

test('should use the minWidth if specified', () => {
  setup({ columns, rows: [] });
  const [, col2] = getHeaderCells();
  expect(getGrid()).toHaveStyle({ '--template-columns': '100px 200px' });
  resize({ column: col2, clientXStart: 295, clientXEnd: 100, rect: { right: 300, left: 100 } });
  expect(getGrid()).toHaveStyle({ '--template-columns': '100px 100px' });
});
