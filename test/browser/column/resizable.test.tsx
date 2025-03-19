import { commands, userEvent } from '@vitest/browser/context';

import type { Column } from '../../../src';
import { resizeHandleClassname } from '../../../src/HeaderCell';
import { getGrid, getHeaderCells, setup } from '../utils';

interface Row {
  readonly col1: number;
  readonly col2: string;
}

function queryResizeHandle(column: Element) {
  return column.querySelector(`.${resizeHandleClassname}`);
}

function getResizeHandle(column: Element) {
  const resizeHandle = column.querySelector(`.${resizeHandleClassname}`);

  if (resizeHandle === null) {
    throw new Error('Resize handle not found');
  }

  return resizeHandle;
}

interface ResizeArgs {
  readonly column: Element;
  readonly resizeBy: number;
}

async function resize({ column, resizeBy }: ResizeArgs) {
  expect(getResizeHandle(column)).toBeInTheDocument();

  // @ts-expect-error
  await commands.resizeColumn(resizeBy);
}

async function autoResize(column: Element) {
  const resizeHandle = getResizeHandle(column);

  await userEvent.dblClick(resizeHandle);
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

test('cannot not resize or auto resize column when resizable is not specified', () => {
  setup<Row, unknown>({ columns, rows: [] });
  const [col1] = getHeaderCells();
  expect(queryResizeHandle(col1)).not.toBeInTheDocument();
});

test('should resize column when dragging the handle', async () => {
  const onColumnResize = vi.fn();
  setup<Row, unknown>({ columns, rows: [], onColumnResize });
  const [, col2] = getHeaderCells();
  const grid = getGrid();
  expect(onColumnResize).not.toHaveBeenCalled();
  await expect.element(grid).toHaveStyle({ gridTemplateColumns: '100px 200px' });
  await resize({ column: col2, resizeBy: -50 });
  await expect.element(grid).toHaveStyle({ gridTemplateColumns: '100px 150px' });
  expect(onColumnResize).toHaveBeenCalledExactlyOnceWith(expect.objectContaining(columns[1]), 150);
});

test('should use the maxWidth if specified', async () => {
  setup<Row, unknown>({ columns, rows: [] });
  const [, col2] = getHeaderCells();
  const grid = getGrid();
  await expect.element(grid).toHaveStyle({ gridTemplateColumns: '100px 200px ' });
  await resize({ column: col2, resizeBy: 1000 });
  await expect.element(grid).toHaveStyle({ gridTemplateColumns: '100px 400px' });
});

test('should use the minWidth if specified', async () => {
  setup<Row, unknown>({ columns, rows: [] });
  const [, col2] = getHeaderCells();
  const grid = getGrid();
  await expect.element(grid).toHaveStyle({ gridTemplateColumns: '100px 200px' });
  await resize({ column: col2, resizeBy: -150 });
  await expect.element(grid).toHaveStyle({ gridTemplateColumns: '100px 100px' });
});

test('should auto resize column when resize handle is double clicked', async () => {
  setup<Row, unknown>({
    columns,
    rows: [
      {
        col1: 1,
        col2: 'a'.repeat(50)
      }
    ]
  });
  const [, col2] = getHeaderCells();
  const grid = getGrid();
  await expect.element(grid).toHaveStyle({ gridTemplateColumns: '100px 200px' });
  await autoResize(col2);
  await expect.element(grid).toHaveStyle({ gridTemplateColumns: '100px 327.703px' });
});

test('should use the maxWidth if specified on auto resize', async () => {
  setup<Row, unknown>({
    columns,
    rows: [
      {
        col1: 1,
        col2: 'a'.repeat(500)
      }
    ]
  });
  const [, col2] = getHeaderCells();
  const grid = getGrid();
  await expect.element(grid).toHaveStyle({ gridTemplateColumns: '100px 200px' });
  await autoResize(col2);
  await expect.element(grid).toHaveStyle({ gridTemplateColumns: '100px 400px' });
});

test('should use the minWidth if specified on auto resize', async () => {
  setup<Row, unknown>({
    columns,
    rows: [
      {
        col1: 1,
        col2: 'a'
      }
    ]
  });
  const [, col2] = getHeaderCells();
  const grid = getGrid();
  await expect.element(grid).toHaveStyle({ gridTemplateColumns: '100px 200px' });
  await autoResize(col2);
  await expect.element(grid).toHaveStyle({ gridTemplateColumns: '100px 100px' });
});
