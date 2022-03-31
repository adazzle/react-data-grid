import { useState, useReducer } from 'react';
import { createPortal } from 'react-dom';
import faker from '@faker-js/faker';
import { ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } from 'react-contextmenu';
import { css } from '@linaria/core';

import DataGrid, { Row as GridRow } from '../../src';
import type { Column, RowRendererProps } from '../../src';
import type { Props } from './types';

css`
  @at-root {
    .react-contextmenu-wrapper {
      display: contents;
    }

    .react-contextmenu {
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 0.25rem;
      color: #373a3c;
      font-size: 16px;
      margin-block-start: 2px;
      margin-block-end: 0;
      margin-inline-start: 0;
      margin-inline-end: 0;
      min-inline-size: 160px;
      outline: none;
      opacity: 0;
      padding-block: 5px;
      padding-inline: 0;
      pointer-events: none;
      text-align: start;
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
      padding-block: 3px;
      padding-inline: 20px;
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
      border-block-end: 1px solid rgba(0, 0, 0, 0.15);
      cursor: inherit;
      margin-block-end: 3px;
      padding-block: 2px;
      padding-inline: 0;
    }

    .react-contextmenu-item--divider:hover {
      background-color: transparent;
      border-color: rgba(0, 0, 0, 0.15);
    }

    .react-contextmenu-item.react-contextmenu-submenu {
      padding: 0;
    }

    .react-contextmenu-item.react-contextmenu-submenu > .react-contextmenu-item::after {
      content: '▶';
      display: inline-block;
      position: absolute;
      inset-inline-end: 7px;
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

export default function ContextMenuDemo({ direction }: Props) {
  const [rows, setRows] = useState(createRows);
  const [nextId, setNextId] = useReducer((id: number) => id + 1, rows[rows.length - 1].id + 1);

  function onRowDelete(e: React.MouseEvent<HTMLDivElement>, { rowIdx }: { rowIdx: number }) {
    setRows([...rows.slice(0, rowIdx), ...rows.slice(rowIdx + 1)]);
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

    setRows([...rows.slice(0, insertRowIdx), newRow, ...rows.slice(insertRowIdx)]);
    setNextId();
  }

  return (
    <>
      <DataGrid
        rowKeyGetter={rowKeyGetter}
        columns={columns}
        rows={rows}
        components={{ rowRenderer: RowRenderer }}
        className="fill-grid"
        direction={direction}
      />
      {createPortal(
        <div dir={direction}>
          <ContextMenu id="grid-context-menu" rtl={direction === 'rtl'}>
            <MenuItem onClick={onRowDelete}>Delete Row</MenuItem>
            <SubMenu title="Insert Row">
              <MenuItem onClick={onRowInsertAbove}>Above</MenuItem>
              <MenuItem onClick={onRowInsertBelow}>Below</MenuItem>
            </SubMenu>
          </ContextMenu>
        </div>,
        document.body
      )}
    </>
  );
}
