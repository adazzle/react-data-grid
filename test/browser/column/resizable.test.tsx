import { act } from 'react';
import { commands, userEvent } from '@vitest/browser/context';

import type { Column } from '../../../src';
import { resizeHandleClassname } from '../../../src/HeaderCell';
import { getGridOld, getHeaderCellsOld, setup } from '../utils';

interface Row {
  readonly col1: number;
  readonly col2: string;
}

function queryResizeHandle(column: HTMLElement) {
  return column.querySelector(`.${resizeHandleClassname}`);
}

function getResizeHandle(column: HTMLElement) {
  const resizeHandle = column.querySelector(`.${resizeHandleClassname}`);

  if (resizeHandle === null) {
    throw new Error('Resize handle not found');
  }

  return resizeHandle;
}

interface ResizeArgs {
  readonly column: HTMLElement;
  readonly resizeBy: number;
}

async function resize({ column, resizeBy }: ResizeArgs) {
  expect(getResizeHandle(column)).toBeInTheDocument();

  await act(async () => {
    // @ts-expect-error
    await commands.resizeColumn(resizeBy);
  });
}

async function autoResize(column: HTMLElement) {
  const resizeHandle = getResizeHandle(column);

  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    await userEvent.dblClick(resizeHandle);
  });
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
  const [col1] = getHeaderCellsOld();
  expect(queryResizeHandle(col1)).not.toBeInTheDocument();
});

test('should resize column when dragging the handle', async () => {
  setup<Row, unknown>({ columns, rows: [] });
  const [, col2] = getHeaderCellsOld();
  const grid = getGridOld();
  expect(grid).toHaveStyle({ gridTemplateColumns: '100px 200px' });
  await resize({ column: col2, resizeBy: -50 });
  expect(getGridOld()).toHaveStyle({ gridTemplateColumns: '100px 150px' });
});

test('should use the maxWidth if specified', async () => {
  setup<Row, unknown>({ columns, rows: [] });
  const [, col2] = getHeaderCellsOld();
  expect(getGridOld()).toHaveStyle({ gridTemplateColumns: '100px 200px ' });
  await resize({ column: col2, resizeBy: 1000 });
  expect(getGridOld()).toHaveStyle({ gridTemplateColumns: '100px 400px' });
});

test('should use the minWidth if specified', async () => {
  setup<Row, unknown>({ columns, rows: [] });
  const [, col2] = getHeaderCellsOld();
  expect(getGridOld()).toHaveStyle({ gridTemplateColumns: '100px 200px' });
  await resize({ column: col2, resizeBy: -150 });
  expect(getGridOld()).toHaveStyle({ gridTemplateColumns: '100px 100px' });
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
  const [, col2] = getHeaderCellsOld();
  expect(getGridOld()).toHaveStyle({ gridTemplateColumns: '100px 200px' });
  await autoResize(col2);
  expect(getGridOld()).toHaveStyle({ gridTemplateColumns: '100px 327.703px' });
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
  const [, col2] = getHeaderCellsOld();
  expect(getGridOld()).toHaveStyle({ gridTemplateColumns: '100px 200px' });
  await autoResize(col2);
  expect(getGridOld()).toHaveStyle({ gridTemplateColumns: '100px 400px' });
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
  const [, col2] = getHeaderCellsOld();
  expect(getGridOld()).toHaveStyle({ gridTemplateColumns: '100px 200px' });
  await autoResize(col2);
  expect(getGridOld()).toHaveStyle({ gridTemplateColumns: '100px 100px' });
});
