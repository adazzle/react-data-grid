import React, { useState, useReducer, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { css } from '@linaria/core';
import { faker } from '@faker-js/faker';

import DataGrid from '../../src';
import type { Column } from '../../src';
import type { Props } from './types';

const contextMenuClassname = css`
  position: absolute;
  top: var(--top);
  left: var(--left);
  background-color: #ffffff;
  border: 1px solid black;
  padding: 16px;
  list-style: none;

  > li {
    padding: 8px;
  }
`;

interface Row {
  id: number;
  product: string;
  price: string;
}

function createRows(): Row[] {
  const rows: Row[] = [];

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

export default function ContextMenuDemo({ direction }: Props) {
  const [rows, setRows] = useState(createRows);
  const [nextId, setNextId] = useReducer((id: number) => id + 1, rows[rows.length - 1].id + 1);
  const [contextMenuProps, setContextMenuProps] = useState<{
    rowIdx: number;
    top: number;
    left: number;
  } | null>(null);
  const menuRef = useRef<HTMLMenuElement | null>(null);

  useLayoutEffect(() => {
    if (contextMenuProps === null) return;

    function onClick(event: MouseEvent) {
      if (event.target instanceof Node && menuRef.current?.contains(event.target)) {
        return;
      }
      setContextMenuProps(null);
    }

    addEventListener('click', onClick);

    return () => {
      removeEventListener('click', onClick);
    };
  }, [contextMenuProps]);

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
        className="fill-grid"
        direction={direction}
        onCellContextMenu={({ row }, event) => {
          event.preventDefault();
          setContextMenuProps({
            rowIdx: rows.indexOf(row),
            top: event.clientY,
            left: event.clientX
          });
        }}
      />
      {contextMenuProps !== null &&
        createPortal(
          <menu
            ref={menuRef}
            className={contextMenuClassname}
            style={
              {
                '--top': `${contextMenuProps.top}px`,
                '--left': `${contextMenuProps.left}px`
              } as unknown as React.CSSProperties
            }
          >
            <li>
              <button
                onClick={() => {
                  const { rowIdx } = contextMenuProps;
                  setRows([...rows.slice(0, rowIdx), ...rows.slice(rowIdx + 1)]);
                  setContextMenuProps(null);
                }}
              >
                Delete Row
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  const { rowIdx } = contextMenuProps;
                  insertRow(rowIdx);
                  setContextMenuProps(null);
                }}
              >
                Insert Row Above
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  const { rowIdx } = contextMenuProps;
                  insertRow(rowIdx + 1);
                  setContextMenuProps(null);
                }}
              >
                Insert Row Below
              </button>
            </li>
          </menu>,
          document.body
        )}
    </>
  );
}
