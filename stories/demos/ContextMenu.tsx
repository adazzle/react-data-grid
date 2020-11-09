import { useState, useReducer } from 'react';
import { createPortal } from 'react-dom';
import faker from 'faker';
import { ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } from 'react-contextmenu';

import DataGrid, { Row as GridRow } from '../../src';
import type { Column, RowRendererProps } from '../../src';
import './react-contextmenu.less';

interface Row {
  id: number;
  product: string;
  price: string;
}

function createRows(): Row[] {
  const rows = [];
  for (let i = 1; i < 1000; i++) {
    rows.push({
      id: i,
      product: faker.commerce.productName(),
      price: faker.commerce.price()
    });
  }
  return rows;
}

const columns: readonly Column<Row>[] = [
  { key: 'id', name: 'ID' },
  { key: 'product', name: 'Product' },
  { key: 'price', name: 'Price' }
];

function rowKeyGetter(row: Row) {
  return row.id;
}

function RowRenderer(props: RowRendererProps<Row>) {
  return (
    <ContextMenuTrigger id="grid-context-menu" collect={() => ({ rowIdx: props.rowIdx })}>
      <GridRow {...props} />
    </ContextMenuTrigger>
  );
}

export function ContextMenuStory() {
  const [rows, setRows] = useState(createRows);
  const [nextId, setNextId] = useReducer((id: number) => id + 1, rows[rows.length - 1].id + 1);

  function onRowDelete(e: React.MouseEvent<HTMLDivElement>, { rowIdx }: { rowIdx: number }) {
    setRows([
      ...rows.slice(0, rowIdx),
      ...rows.slice(rowIdx + 1)
    ]);
  }

  function onRowInsertAbove(e: React.MouseEvent<HTMLDivElement>, { rowIdx }: { rowIdx: number }) {
    insertRow(rowIdx);
  }

  function onRowInsertBelow(e: React.MouseEvent<HTMLDivElement>, { rowIdx }: { rowIdx: number }) {
    insertRow(rowIdx + 1);
  }

  function insertRow(insertRowIdx: number) {
    const newRow: Row = {
      id: nextId,
      product: faker.commerce.productName(),
      price: faker.commerce.price()
    };

    setRows([
      ...rows.slice(0, insertRowIdx),
      newRow,
      ...rows.slice(insertRowIdx)
    ]);
    setNextId();
  }

  return (
    <>
      <DataGrid
        rowKeyGetter={rowKeyGetter}
        columns={columns}
        rows={rows}
        rowRenderer={RowRenderer}
        className="fill-grid"
      />
      {createPortal(
        <ContextMenu id="grid-context-menu">
          <MenuItem onClick={onRowDelete}>Delete Row</MenuItem>
          <SubMenu title="Insert Row">
            <MenuItem onClick={onRowInsertAbove}>Above</MenuItem>
            <MenuItem onClick={onRowInsertBelow}>Below</MenuItem>
          </SubMenu>
        </ContextMenu>,
        document.body
      )}
    </>
  );
}

ContextMenuStory.storyName = 'Context Menu';
