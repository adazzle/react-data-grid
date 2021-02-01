import { useState, useReducer } from 'react';
import { createPortal } from 'react-dom';
import faker from 'faker';
import { ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } from 'react-contextmenu';
import { css } from '@linaria/core';

import DataGrid, { Row as GridRow } from '../../src';
import type { Column, RowRendererProps } from '../../src';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
css`
:global() {
  .react-contextmenu {
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    color: #373a3c;
    font-size: 16px;
    margin: 2px 0 0;
    min-width: 160px;
    outline: none;
    opacity: 0;
    padding: 5px 0;
    pointer-events: none;
    text-align: left;
    transition: opacity 250ms ease !important;
  }

  .react-contextmenu.react-contextmenu--visible {
    opacity: 1;
    pointer-events: auto;
  }

  .react-contextmenu-item {
    background: 0 0;
    border: 0;
    color: #373a3c;
    cursor: pointer;
    font-weight: 400;
    line-height: 1.5;
    padding: 3px 20px;
    text-align: inherit;
    white-space: nowrap;
  }

  .react-contextmenu-item.react-contextmenu-item--active,
  .react-contextmenu-item.react-contextmenu-item--selected {
    color: #fff;
    background-color: #20a0ff;
    border-color: #20a0ff;
    text-decoration: none;
  }

  .react-contextmenu-item.react-contextmenu-item--disabled,
  .react-contextmenu-item.react-contextmenu-item--disabled:hover {
    background-color: transparent;
    border-color: rgba(0, 0, 0, 0.15);
    color: #878a8c;
  }

  .react-contextmenu-item--divider {
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    cursor: inherit;
    margin-bottom: 3px;
    padding: 2px 0;
  }

  .react-contextmenu-item--divider:hover {
    background-color: transparent;
    border-color: rgba(0, 0, 0, 0.15);
  }

  .react-contextmenu-item.react-contextmenu-submenu {
    padding: 0;
  }

  .react-contextmenu-item.react-contextmenu-submenu > .react-contextmenu-item::after {
    content: "▶";
    display: inline-block;
    position: absolute;
    right: 7px;
  }

  .example-multiple-targets::after {
    content: attr(data-count);
    display: block;
  }
}
`;

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
