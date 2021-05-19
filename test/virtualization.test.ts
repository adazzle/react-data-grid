import type { Column } from '../src';
import { getCells, getCellsAtRowIndex, getGrid, getHeaderCells, getRows, setup } from './utils';

const rowHeight = 35;

function setupGrid(
  enableVirtualization: boolean,
  columnCount: number,
  rowCount: number,
  frozenColumnCount = 0,
  summaryRowCount = 0
) {
  const columns: Column<unknown>[] = [];
  const rows = Array(rowCount);
  const summaryRows = Array(summaryRowCount);

  for (let i = 0; i < columnCount; i++) {
    const key = String(i);
    columns.push({
      key,
      name: key,
      width: 100 + ((i * 10) % 50),
      frozen: i < frozenColumnCount
    });
  }

  return setup({ columns, rows, summaryRows, rowHeight, enableVirtualization });
}

function assertHeightFill(height: number) {
  // if there are not enough rows, we need to fill the rows viewport's height so summary rows stick to the bottom of the container
  expect(document.querySelector('.rdg-focus-sink + div')).toHaveStyle({ height: `${height}px` });
}

function assertElements(
  elements: readonly HTMLElement[],
  attribute: string,
  count: number,
  startIdx: number,
  endIdx: number
) {
  expect(elements).toHaveLength(count);
  expect(elements[0]).toHaveAttribute(attribute, String(startIdx));
  expect(elements[elements.length - 1]).toHaveAttribute(attribute, String(endIdx));
}

function assertHeaderCells(count: number, startIdx: number, endIdx: number) {
  assertElements(getHeaderCells(), 'aria-colindex', count, startIdx + 1, endIdx + 1);
}

function assertRows(count: number, startIdx: number, endIdx: number) {
  assertElements(getRows(), 'aria-rowindex', count, startIdx + 2, endIdx + 2);
}

function assertCells(rowIdx: number, count: number, startIdx: number, endIdx: number) {
  assertElements(getCellsAtRowIndex(rowIdx + 2), 'aria-colindex', count, startIdx + 1, endIdx + 1);
}

test('virtualization is enabled', () => {
  const { unmount } = setupGrid(true, 30, 100);

  const grid = getGrid();

  assertHeightFill(100 * rowHeight);

  assertHeaderCells(18, 0, 17);
  assertRows(41, 0, 40);
  assertCells(0, 18, 0, 17);

  grid.scrollTop = 249;
  assertRows(41, 0, 40);

  grid.scrollTop = 250;
  assertRows(49, 0, 48);

  grid.scrollTop = 419;
  assertRows(49, 0, 48);

  grid.scrollTop = 420;
  assertRows(41, 8, 48);

  grid.scrollTop = 529;
  assertRows(41, 8, 48);

  grid.scrollTop = 530;
  assertRows(49, 8, 56);

  grid.scrollTop = 1000;
  assertRows(41, 24, 64);

  // scroll height = header height + row height * row count
  // max top = scroll height - grid height
  grid.scrollTop = rowHeight + rowHeight * 100 - 1080;
  assertRows(36, 64, 99);

  grid.scrollLeft = 90;
  assertHeaderCells(18, 0, 17);
  assertCells(64, 18, 0, 17);

  grid.scrollLeft = 91;
  assertHeaderCells(19, 0, 18);
  assertCells(64, 19, 0, 18);

  grid.scrollLeft = 209;
  assertHeaderCells(19, 0, 18);
  assertCells(64, 19, 0, 18);

  grid.scrollLeft = 210;
  assertHeaderCells(18, 1, 18);
  assertCells(64, 18, 1, 18);

  // max left = row width - grid width
  grid.scrollLeft = parseInt(grid.style.getPropertyValue('--row-width'), 10) - 1920;
  assertHeaderCells(17, 13, 29);
  assertCells(64, 17, 13, 29);

  unmount();
});

xtest('virtualization is enabled with 4 frozen columns', () => {
  setupGrid(true, 20, 100, 4);

  assertHeightFill(100 * rowHeight);
});

xtest('virtualization is enabled with all columns frozen', () => {
  setupGrid(true, 20, 100, 0, 20);

  assertHeightFill(100 * rowHeight);
});

xtest('virtualization is enabled with 2 summary rows', () => {
  setupGrid(true, 20, 100, 0, 2);

  assertHeightFill(100 * rowHeight);
});

xtest('zero columns', () => {
  setupGrid(true, 0, 100);

  assertHeightFill(100 * rowHeight);
});

xtest('zero rows', () => {
  setupGrid(true, 20, 0);

  assertHeightFill(0 * rowHeight);
});

xtest('virtualization is enable with not enough columns or rows to virtualize', () => {
  setupGrid(true, 5, 5);

  assertHeightFill(5 * rowHeight);
});

test('enableVirtualization is disabled', () => {
  setupGrid(false, 40, 100);

  assertHeightFill(100 * rowHeight);

  assertHeaderCells(40, 0, 39);
  assertRows(100, 0, 99);

  const cells = getCells();
  expect(cells).toHaveLength(40 * 100);
});
