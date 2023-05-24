import { useRef, useState } from 'react';

import DataGrid from '../../src';
import type { Column, FormatterProps, DataGridHandle } from '../../src';
import type { Props } from './types';

type Row = number;
const rows: readonly Row[] = [...Array(200).keys()];
const columns: Column<Row>[] = [];
for (let i = 0; i < 200; i++) {
  const key = String(i);
  columns.push({
    key,
    name: key,
    width: 120,
    frozen: i < 5,
    resizable: true,
    formatter: cellFormatter
  });
}

export default function ScrollToCell({ direction }: Props) {
  const [idx, setIdx] = useState<number | undefined>(10);
  const [rowIdx, setRowIdx] = useState<number | undefined>(10);
  const gridRef = useRef<DataGridHandle>(null);

  function scrollToCell() {
    gridRef.current!.scrollToCell({ idx, rowIdx });
  }

  return (
    <>
      <div style={{ marginBlockEnd: 5 }}>
        <label>
          <span style={{ marginInlineEnd: 5 }}>Column index: </span>
          <input
            style={{ inlineSize: 50 }}
            type="number"
            value={idx}
            onChange={(event) => {
              const { valueAsNumber } = event.target;
              setIdx(Number.isNaN(valueAsNumber) ? undefined : valueAsNumber);
            }}
          />
        </label>
        <button type="button" onClick={scrollToCell}>
          Scroll to column
        </button>
        <label>
          <span style={{ marginInline: 5 }}>Row index: </span>
          <input
            style={{ inlineSize: 50 }}
            type="number"
            value={rowIdx}
            onChange={(event) => {
              const { valueAsNumber } = event.target;
              setRowIdx(Number.isNaN(valueAsNumber) ? undefined : valueAsNumber);
            }}
          />
          <button type="button" onClick={scrollToCell}>
            Scroll to row
          </button>
        </label>
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

function cellFormatter(props: FormatterProps<Row>) {
  return (
    <>
      {props.column.key}&times;{props.row}
    </>
  );
}
