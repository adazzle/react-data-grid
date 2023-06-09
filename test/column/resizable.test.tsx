import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';

import type { Column } from '../../src';
import { getGrid, getHeaderCells, setup } from '../utils';

interface Row {
  readonly col1: number;
  readonly col2: string;
}

interface ResizeArgs {
  readonly cell: HTMLElement;
  readonly resizeBy: number;
  readonly startOffset?: number;
}

async function resize({ cell, resizeBy, startOffset = 0 }: ResizeArgs) {
  // wait for layout to settle
  await waitFor(() => {
    expect(cell.getBoundingClientRect().right % 100).not.toBe(0);
  });

  const clientXStart = cell.getBoundingClientRect().right + startOffset;

  await userEvent.pointer([
    { keys: '[TouchA>]', target: cell, coords: { clientX: clientXStart } },
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
  await resize({ cell: col1, resizeBy: 50 });
  expect(getGrid()).toHaveStyle({ gridTemplateColumns: '100px 200px' });
  await resize({ cell: col1, resizeBy: -50 });
  expect(getGrid()).toHaveStyle({ gridTemplateColumns: '100px 200px' });
});

test('should not resize column if cursor offset is not within the allowed range', async () => {
  setup({ columns, rows: [] });
  const [, col2] = getHeaderCells();
  expect(getGrid()).toHaveStyle({ gridTemplateColumns: '100px 200px' });
  await resize({ cell: col2, resizeBy: -50, startOffset: -12 });
  expect(getGrid()).toHaveStyle({ gridTemplateColumns: '100px 200px' });
});

test('should resize column if cursor offset is within the allowed range', async () => {
  setup({ columns, rows: [] });
  const [, col2] = getHeaderCells();
  expect(getGrid()).toHaveStyle({ gridTemplateColumns: '100px 200px' });
  await resize({ cell: col2, resizeBy: -50 });
  expect(getGrid()).toHaveStyle({ gridTemplateColumns: '100px 150px' });
});

test('should use the maxWidth if specified', async () => {
  setup({ columns, rows: [] });
  const [, col2] = getHeaderCells();
  expect(getGrid()).toHaveStyle({ gridTemplateColumns: '100px 200px' });
  await resize({ cell: col2, resizeBy: 1000 });
  expect(getGrid()).toHaveStyle({ gridTemplateColumns: '100px 400px' });
});

test('should use the minWidth if specified', async () => {
  setup({ columns, rows: [] });
  const [, col2] = getHeaderCells();
  expect(getGrid()).toHaveStyle({ gridTemplateColumns: '100px 200px' });
  await resize({ cell: col2, resizeBy: -150 });
  expect(getGrid()).toHaveStyle({ gridTemplateColumns: '100px 100px' });
});
