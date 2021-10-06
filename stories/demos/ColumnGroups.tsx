import { useMemo } from 'react';

import DataGrid from '../../src';
import type { Column, FormatterProps, ColumnGroup } from '../../src';

type Row = number;
const rows: readonly Row[] = [...Array(100).keys()];

function CellFormatter(props: FormatterProps<Row>) {
  return (
    <>
      {props.column.key}&times;{props.rowIdx}
    </>
  );
}

export function ColumnGroups() {
  const columns = useMemo((): readonly ColumnGroup<Row>[] => {
    const columns: ColumnGroup<Row>[] = [];

    for (let i = 0; i < 10; i++) {
      const childColumns: Column<Row>[] = [];
      const parentKey = String(i);
      for (let j = 0; j < 5; j++) {
        const key = String(j);
        childColumns.push({
          key: `${parentKey}_${key}`,
          name: key,
          frozen: i === 0,
          formatter: CellFormatter
        });
      }
      columns.push({
        key: parentKey,
        name: parentKey,
        children: childColumns
      });
    }

    // TODO: Multi-level parent categories
    // for (let i = 0; i < 10; i++) {
    //   const rootKey = String(i);
    //   const middleColumns: ColumnGroup<Row>[] = [];
    //   for (let j = 0; j < 10; j++) {
    //     const childColumns: Column<Row>[] = [];
    //     const parentKey = `${rootKey}_${j}`;
    //     for (let k = 0; k < 5; k++) {
    //       const key = String(k);
    //       childColumns.push({
    //         key: `${parentKey}_${key}`,
    //         name: key,
    //         frozen: k === 0,
    //         formatter: CellFormatter
    //       });
    //     }
    //     middleColumns.push({
    //       key: parentKey,
    //       name: parentKey,
    //       children: childColumns
    //     });
    //   }
    //   columns.push({
    //     key: rootKey,
    //     name: rootKey,
    //     children: middleColumns
    //   });
    // }

    return columns;
  }, []);

  return <DataGrid columns={columns} rows={rows} rowHeight={22} className="fill-grid" />;
}

ColumnGroups.storyName = 'Column Groups';
