import React, { useState, useReducer, useMemo } from 'react';

import DataGrid, { Column } from '../../src';
import { CellExpanderFormatter, ChildRowDeleteButton } from './components/Formatters';
import Wrapper from './Wrapper';

interface Row {
  id: string;
  name: string;
  format: string;
  position: string;
  price: number;
  children?: Row[];
  parentId?: string;
  isExpanded?: boolean;
}

interface Action {
  type: 'toggleSubRow' | 'deleteSubRow';
  id: string;
}

function createRows(): Row[] {
  const rows = [];
  for (let i = 0; i < 100; i++) {
    const price = Math.random() * 30;
    const id = `row${i}`;
    const row: Row = {
      id,
      name: `supplier ${i}`,
      format: `package ${i}`,
      position: 'Run of site',
      price,
      children: [
        { id: `${id}-0`, parentId: id, name: `supplier ${i}`, format: '728x90', position: 'run of site', price: price / 2 },
        { id: `${id}-1`, parentId: id, name: `supplier ${i}`, format: '480x600', position: 'run of site', price: price * 0.25 },
        { id: `${id}-2`, parentId: id, name: `supplier ${i}`, format: '328x70', position: 'run of site', price: price * 0.25 }
      ],
      isExpanded: false
    };
    rows.push(row);
  }
  return rows;
}

function toggleSubRow(rows: Row[], id: string): Row[] {
  const rowIndex = rows.findIndex(r => r.id === id);
  const row = rows[rowIndex];
  const { children } = row;
  if (!children) return rows;

  const newRows = [...rows];
  newRows[rowIndex] = { ...row, isExpanded: !row.isExpanded };
  if (!row.isExpanded) {
    newRows.splice(rowIndex + 1, 0, ...children);
  } else {
    newRows.splice(rowIndex + 1, children.length);
  }
  return newRows;
}

function deleteSubRow(rows: Row[], id: string): Row[] {
  const row = rows.find(r => r.id === id);
  if (!row || !row.parentId) return rows;

  // Remove sub row from flattened rows.
  const newRows = rows.filter(r => r.id !== id);

  // Remove sub row from parent row.
  const parentRowIndex = newRows.findIndex(r => r.id === row.parentId);
  const { children } = newRows[parentRowIndex];
  if (children) {
    const newChildren = children.filter(sr => sr.id !== id);
    newRows[parentRowIndex] = { ...newRows[parentRowIndex], children: newChildren };
  }

  return newRows;
}

function reducer(rows: Row[], { type, id }: Action): Row[] {
  switch (type) {
    case 'toggleSubRow':
      return toggleSubRow(rows, id);
    case 'deleteSubRow':
      return deleteSubRow(rows, id);
    default:
      return rows;
  }
}

const defaultRows = createRows();

export default function() {
  const [rows, dispatch] = useReducer(reducer, defaultRows);
  const [allowDelete, setAllowDelete] = useState(true);
  const columns: Column<Row>[] = useMemo(() => {
    return [
      {
        key: 'id',
        name: 'id',
        frozen: true
      },
      {
        key: 'name',
        name: 'Name'
      },
      {
        key: 'format',
        name: 'format',
        formatter({ row }) {
          const hasChildren = row.children !== undefined;
          const style = !hasChildren ? { marginLeft: 30 } : undefined;
          return (
            <>
              {hasChildren && (
                <CellExpanderFormatter
                  expanded={row.isExpanded === true}
                  onCellExpand={() => dispatch({ id: row.id, type: 'toggleSubRow' })}
                />
              )}
              <div className="rdg-cell-value">
                {!hasChildren && (
                  <ChildRowDeleteButton
                    onDeleteSubRow={() => dispatch({ id: row.id, type: 'deleteSubRow' })}
                    isDeleteSubRowEnabled={allowDelete}
                  />
                )}
                <div style={style}>
                  {row.format}
                </div>
              </div>
            </>
          );
        }
      },
      {
        key: 'position',
        name: 'position'
      },
      {
        key: 'price',
        name: 'price'
      }
    ];
  }, [allowDelete]);

  return (
    <Wrapper title="Tree View">
      <>
        <label>
          Allow Delete
          <input
            type="checkbox"
            checked={allowDelete}
            onChange={() => setAllowDelete(!allowDelete)}
          />
        </label>
        <DataGrid<Row, 'id'>
          enableCellSelect
          columns={columns}
          rowGetter={i => rows[i]}
          rowsCount={rows.length}
          minHeight={500}
        />
      </>
    </Wrapper>
  );
}
