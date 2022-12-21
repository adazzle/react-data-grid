import { useMemo } from 'react';
import DataGrid from '../../src';
import type { Column, FormatterProps } from '../../src';
import type { Props } from './types';

type Row = number;
const rows: readonly Row[] = [...Array(1000).keys()];

function cellFormatter(props: FormatterProps<Row>) {
  return (
    <>
      {props.column.key}&times;{props.row}
    </>
  );
}

export default function MillionCells({ direction }: Props) {
  const columns = useMemo((): readonly Column<Row>[] => {
    const columns: Column<Row>[] = [];

    for (let i = 0; i < 1000; i++) {
      const key = String(i);
      columns.push({
        key,
        name: key,
        frozen: i < 5,
        width: 80,
        resizable: true,
        formatter: cellFormatter
      });
    }

    return columns;
  }, []);

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      rowHeight={22}
      className="fill-grid"
      direction={direction}
    />
  );
}
