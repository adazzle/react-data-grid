import { css } from '@linaria/core';
import { useMemo } from 'react';
import DataGrid from '../../src';
import type { Column, FormatterProps, ParentColumn } from '../../src';

type Row = undefined;
const rows: readonly Row[] = Array(1000);

function CellFormatter(props: FormatterProps<Row>) {
  return <>{props.column.key}&times;{props.rowIdx}</>;
}

const parentClassName = css`
  text-align: center;
`;

const childRowCount = 5;

export function HeaderGroups() {
  const columns = useMemo((): readonly (Column<Row> | ParentColumn<Row>)[] => {
    const columns: (Column<Row> | ParentColumn<Row>)[] = [];

    for (let i = 0; i < 200; i++) {
      const children = Array(childRowCount).fill(0).map((val, j) => {
        const key = String(i * childRowCount + j);
        return {
          key,
          name: key,
          resizable: true,
          formatter: CellFormatter
        };
      });
      const parentKey = `${i}_parent`;
      columns.push({
        key: parentKey,
        name: parentKey,
        frozen: i === 0,
        children,
        parentHeaderCellClass: parentClassName
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
    />
  );
}

HeaderGroups.storyName = 'Header groups';
