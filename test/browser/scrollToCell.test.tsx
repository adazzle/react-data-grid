import { useRef } from 'react';
import { page, userEvent } from '@vitest/browser/context';

import { DataGrid } from '../../src';
import type { Column, DataGridHandle } from '../../src';
import type { PartialPosition } from '../../src/ScrollToCell';
import { getGrid } from './utils';

type Row = undefined;

const rows: readonly Row[] = new Array(50);
const summaryRows: readonly Row[] = [undefined, undefined];

const columns: Column<Row, Row>[] = [];

for (let i = 0; i < 50; i++) {
  const key = String(i);
  columns.push({
    key,
    name: key,
    frozen: i < 5
  });
}

let position: PartialPosition;

function Grid() {
  const ref = useRef<DataGridHandle>(null);
  return (
    <>
      <button
        type="button"
        onClick={() => {
          ref.current!.scrollToCell(position);
        }}
      >
        Scroll to cell
      </button>
      <DataGrid
        ref={ref}
        columns={columns}
        rows={rows}
        topSummaryRows={summaryRows}
        rowHeight={60}
      />
    </>
  );
}

async function testScroll(p: PartialPosition) {
  position = p;
  await userEvent.click(page.getByRole('button'));
}

test('scrollToCell', async () => {
  page.render(<Grid />);
  const grid = getGrid().element();
  validateScrollPosition(0, 0);

  // should scroll to a cell when a valid position is specified
  await testScroll({ idx: 40, rowIdx: 30 });
  validateScrollPosition(1572, 132);

  // should scroll to a column when a valid idx is specified
  await testScroll({ idx: 6 });
  validateScrollPosition(1572, 50);
  await testScroll({ idx: 40 });
  validateScrollPosition(1572, 132);

  // should scroll to a row when a valid rowIdx is specified
  await testScroll({ rowIdx: 1 });
  validateScrollPosition(0, 132);
  await testScroll({ rowIdx: 30 });
  validateScrollPosition(1572, 132);

  // should not scroll if scroll to column is frozen
  await testScroll({ idx: 2 });
  validateScrollPosition(1572, 132);

  // should not scroll if rowIdx is header row
  await testScroll({ idx: -1 });
  validateScrollPosition(1572, 132);

  // should not scroll if rowIdx is summary row
  await testScroll({ idx: 50 });
  validateScrollPosition(1572, 132);

  // should not scroll if position is out of bound
  await testScroll({ idx: 60, rowIdx: 60 });
  validateScrollPosition(1572, 132);

  function validateScrollPosition(scrollTop: number, scrollLeft: number) {
    expect(grid.scrollTop).toBe(scrollTop);
    expect(grid.scrollLeft).toBe(scrollLeft);
  }
});
