import React, { useState, useReducer } from 'react';
import { createPortal } from 'react-dom';
import faker from 'faker';
import { AutoSizer } from 'react-virtualized';
import { ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } from 'react-contextmenu';

import DataGrid, { Column, Position } from '../../src';
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

function RowsContainer({ children }: { children: React.ReactNode }) {
  return (
    <ContextMenuTrigger id="grid-context-menu">
      {children}
    </ContextMenuTrigger>
  );
}

export default function ContextMenuStory() {
  const [rows, setRows] = useState(createRows);
  const [{ rowIdx }, setSelectedCell] = useState<Position>({ idx: -1, rowIdx: -1 });
  const [nextId, setNextId] = useReducer((id: number) => id + 1, rows[rows.length - 1].id + 1);

  function onRowDelete() {
    setRows([
      ...rows.slice(0, rowIdx),
      ...rows.slice(rowIdx + 1)
    ]);
  }

  function onRowInsertAbove() {
    insertRow(rowIdx);
  }

  function onRowInsertBelow() {
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
      ...rows.slice(insertRowIdx + 1)
    ]);
    setNextId();
  }

  return (
    <>
      <AutoSizer>
        {({ height, width }) => (
          <DataGrid
            rowKey="id"
            columns={columns}
            rows={rows}
            width={width}
            height={height}
            enableCellSelect
            onSelectedCellChange={setSelectedCell}
            rowsContainer={RowsContainer}
          />
        )}
      </AutoSizer>
      {createPortal(
        <ContextMenu id="grid-context-menu">
          <MenuItem onClick={onRowDelete}>Delete Row</MenuItem>
          <SubMenu title="Insert Row">
            <MenuItem onClick={onRowInsertAbove}>Above</MenuItem>
            <MenuItem onClick={onRowInsertBelow}>Below</MenuItem>
          </SubMenu>
        </ContextMenu>
        , document.body
      )}
    </>
  );
}
