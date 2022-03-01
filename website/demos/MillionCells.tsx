import { useMemo, useRef, useState } from 'react';
import DataGrid from '../../src';
import type { Column, FormatterProps, DataGridHandle } from '../../src';
import type { Props } from './types';

type Row = number;
const rows: readonly Row[] = [...Array(1000).keys()];

function CellFormatter(props: FormatterProps<Row>) {
  return (
    <>
      {props.column.key}&times;{props.row}
    </>
  );
}

export default function MillionCells({ direction }: Props) {
  const [value, setValue] = useState('10');
  const [value1, setValue1] = useState('10');
  const gridRef = useRef<DataGridHandle>(null);
  const columns = useMemo((): readonly Column<Row>[] => {
    const columns: Column<Row>[] = [];

    for (let i = 0; i < 1000; i++) {
      const key = String(i);
      columns.push({
        key,
        name: key,
        frozen: i < 5,
        resizable: true,
        formatter: CellFormatter
      });
    }

    return columns;
  }, []);

  return (
    <>
      <div style={{ marginBlockEnd: 5 }}>
        <span style={{ marginInlineEnd: 5 }}>Row index: </span>
        <input
          style={{ inlineSize: 50 }}
          type="number"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <button type="button" onClick={() => gridRef.current!.scrollToColumn(Number(value))}>
          Scroll to column
        </button>
        <span style={{ marginInlineEnd: 5 }}>Row index: </span>
        <input
          style={{ inlineSize: 50 }}
          type="number"
          value={value1}
          onChange={(event) => setValue1(event.target.value)}
        />
        <button type="button" onClick={() => gridRef.current!.scrollToRow(Number(value1))}>
          Scroll to row
        </button>
      </div>
      <DataGrid
        ref={gridRef}
        columns={columns}
        rows={rows}
        rowHeight={22}
        className="fill-grid"
        direction={direction}
      />
    </>
  );
}
