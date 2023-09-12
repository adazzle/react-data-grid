import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { Column } from '../../src';
import { resizeHandleClassname } from '../../src/HeaderCell';
import { getGrid, getHeaderCells, setup } from '../utils';

interface Row {
  readonly col1: number;
  readonly col2: string;
}

interface ResizeArgs {
  readonly column: HTMLElement;
  readonly resizeBy: number;
  readonly startOffset?: number;
}

async function resize({ column, resizeBy, startOffset = 0 }: ResizeArgs) {
  // wait for layout to settle
  await waitFor(() => {
    expect(column.getBoundingClientRect().right % 100).not.toBe(0);
  });

  const resizeHandle = column.querySelector(`.${resizeHandleClassname}`);
  if (resizeHandle === null) return;

  const clientXStart = column.getBoundingClientRect().right + startOffset;

  await userEvent.pointer([
    { keys: '[TouchA>]', target: column, coords: { clientX: clientXStart } },
    { pointerName: 'TouchA', coords: { clientX: clientXStart + resizeBy } },
    { keys: '[/TouchA]' }
  ]);
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

test('should not resize column if resizable is not specified', async () => {
  setup({ columns, rows: [] });
  const [col1] = getHeaderCells();
  expect(getGrid()).toHaveStyle({ gridTemplateColumns: '100px 200px' });
  await resize({ column: col1, resizeBy: 50 });
  expect(getGrid()).toHaveStyle({ gridTemplateColumns: '100px 200px' });
  await resize({ column: col1, resizeBy: -50 });
  expect(getGrid()).toHaveStyle({ gridTemplateColumns: '100px 200px' });
});

test('should resize column when dragging the handle', async () => {
  setup({ columns, rows: [] });
  const [, col2] = getHeaderCells();
  expect(getGrid()).toHaveStyle({ gridTemplateColumns: '100px 200px' });
  await resize({ column: col2, resizeBy: -50 });
  expect(getGrid()).toHaveStyle({ gridTemplateColumns: '100px 150px' });
});

test('should use the maxWidth if specified', async () => {
  setup({ columns, rows: [] });
  const [, col2] = getHeaderCells();
  expect(getGrid()).toHaveStyle({ gridTemplateColumns: '100px 200px' });
  await resize({ column: col2, resizeBy: 1000 });
  expect(getGrid()).toHaveStyle({ gridTemplateColumns: '100px 400px' });
});

test('should use the minWidth if specified', async () => {
  setup({ columns, rows: [] });
  const [, col2] = getHeaderCells();
  expect(getGrid()).toHaveStyle({ gridTemplateColumns: '100px 200px' });
  await resize({ column: col2, resizeBy: -150 });
  expect(getGrid()).toHaveStyle({ gridTemplateColumns: '100px 100px' });
});
