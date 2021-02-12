import { useEffect, useMemo, useState } from 'react';
import DataGrid from '../../src';
import type { Column, FormatterProps } from '../../src';

type Row = undefined;
const rows: readonly Row[] = Array(1000);

function CellFormatter(props: FormatterProps<Row>) {
  return <>{props.column.key}&times;{props.rowIdx}</>;
}

// simulating a case where scroll could be store in redux or similar storage outside the components
let externalScroll = [0, 0];

export function InitialScroll() {
  const [scroll, setScroll] = useState(externalScroll);

  useEffect(() => {
    externalScroll = scroll;
  }, [scroll]);

  const [top, left] = scroll;

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
    <DataGrid
      columns={columns}
      rows={rows}
      rowHeight={22}
      className="fill-grid"
      onScroll={(e) => setScroll([(e.target as HTMLDivElement).scrollTop, (e.target as HTMLDivElement).scrollLeft])}
      initialScrollLeft={left}
      initialScrollTop={top}
    />
  );
}

InitialScroll.storyName = 'Initial scroll';
