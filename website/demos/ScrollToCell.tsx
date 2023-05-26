import { useRef, useState } from 'react';
import { css } from '@linaria/core';

import DataGrid from '../../src';
import type { Column, DataGridHandle } from '../../src';
import { renderCoordinates } from './renderers';
import type { Props } from './types';

type Row = number;
const rows: readonly Row[] = Array.from({ length: 200 }, (_, i) => i);
const columns: Column<Row>[] = [];
for (let i = 0; i < 200; i++) {
  const key = String(i);
  columns.push({
    key,
    name: key,
    width: 120,
    frozen: i < 5,
    resizable: true,
    renderCell: renderCoordinates
  });
}

const flexClassname = css`
  display: flex;
  gap: 5px;
  margin-block-end: 5px;
`;

export default function ScrollToCell({ direction }: Props) {
  const [idx, setIdx] = useState<number | undefined>(10);
  const [rowIdx, setRowIdx] = useState<number | undefined>(10);
  const gridRef = useRef<DataGridHandle>(null);

  function scrollToColumn() {
    gridRef.current!.scrollToCell({ idx });
  }

  function scrollToRow() {
    gridRef.current!.scrollToCell({ rowIdx });
  }

  function scrollToCell() {
    gridRef.current!.scrollToCell({ idx, rowIdx });
  }

  return (
    <>
      <div className={flexClassname}>
        <label>
          <span>Column index: </span>
          <input
            style={{ inlineSize: 50 }}
            type="number"
            value={idx ?? ''}
            onChange={(event) => {
              const { valueAsNumber } = event.target;
              setIdx(Number.isNaN(valueAsNumber) ? undefined : valueAsNumber);
            }}
          />
        </label>
        <label>
          <span>Row index: </span>
          <input
            style={{ inlineSize: 50 }}
            type="number"
            value={rowIdx ?? ''}
            onChange={(event) => {
              const { valueAsNumber } = event.target;
              setRowIdx(Number.isNaN(valueAsNumber) ? undefined : valueAsNumber);
            }}
          />
        </label>
      </div>
      <div className={flexClassname}>
        <button type="button" onClick={scrollToCell}>
          Scroll to cell
        </button>
        <button type="button" onClick={scrollToColumn}>
          Scroll to column
        </button>
        <button type="button" onClick={scrollToRow}>
          Scroll to row
        </button>
      </div>
      <DataGrid
        ref={gridRef}
        columns={columns}
        rows={rows}
        className="fill-grid"
        direction={direction}
      />
    </>
  );
}
