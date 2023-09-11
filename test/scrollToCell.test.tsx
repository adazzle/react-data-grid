import { useRef } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { Column, DataGridHandle } from '../src';
import DataGrid from '../src';
import type { PartialPosition } from '../src/ScrollToCell';
import { render } from './utils';

type Row = undefined;

const rows: readonly Row[] = Array(50);
const summaryRows: readonly Row[] = [undefined, undefined];

const columns: Column<Row>[] = [];

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

async function testScroll(p: PartialPosition, didScroll: boolean) {
  const spy = vi.spyOn(window.HTMLElement.prototype, 'scrollIntoView');
  position = p;
  await userEvent.click(screen.getByRole('button'));
  if (didScroll) {
    expect(spy).toHaveBeenCalled();
  } else {
    expect(spy).not.toHaveBeenCalled();
  }
  spy.mockRestore();
}

test('scrollToCell', async () => {
  render(<Grid />);
  // should scroll to a cell when a valid position is specified
  await testScroll({ idx: 30, rowIdx: 30 }, true);

  // should scroll to a column when a valid idx is specified
  await testScroll({ idx: 30 }, true);

  // should scroll to a row when a valid rowIdx is specified
  await testScroll({ rowIdx: 30 }, true);

  // should not scroll if scroll to column is frozen
  await testScroll({ idx: 2 }, false);

  // should not scroll if rowIdx is header row
  await testScroll({ idx: -1 }, false);

  // should not scroll if rowIdx is summary row
  await testScroll({ idx: 50 }, false);

  // should not scroll if position is out of bound
  await testScroll({ idx: 60, rowIdx: 60 }, false);
});
