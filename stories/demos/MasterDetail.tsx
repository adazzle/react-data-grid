import { useEffect, useRef, useState } from 'react';
import { css } from '@linaria/core';
import faker from 'faker';

import DataGrid from '../../src';
import type { Column, RowsChangeData, DataGridHandle } from '../../src';
import { CellExpanderFormatter } from './components/Formatters';
import type { Position } from '../../src/types';

type DepartmentRow =
  | {
      type: 'MASTER';
      id: number;
      department: string;
      expanded: boolean;
    }
  | {
      type: 'DETAIL';
      id: number;
      parentId: number;
    };

interface ProductRow {
  id: number;
  product: string;
  description: string;
  price: string;
}

function createDepartments(): readonly DepartmentRow[] {
  const departments: DepartmentRow[] = [];
  for (let i = 1; i < 50; i++) {
    departments.push({
      type: 'MASTER',
      id: i,
      department: faker.commerce.department(),
      expanded: false
    });
  }
  return departments;
}

const productsMap = new Map<number, readonly ProductRow[]>();
function getProducts(parentId: number): readonly ProductRow[] {
  if (productsMap.has(parentId)) return productsMap.get(parentId)!;
  const products: ProductRow[] = [];
  for (let i = 0; i < 20; i++) {
    products.push({
      id: i,
      product: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price()
    });
  }
  productsMap.set(parentId, products);
  return products;
}

const productColumns: readonly Column<ProductRow>[] = [
  { key: 'id', name: 'ID', width: 35 },
  { key: 'product', name: 'Product' },
  { key: 'description', name: 'Description' },
  { key: 'price', name: 'Price' }
];

const departmentColumns: readonly Column<DepartmentRow>[] = [
  {
    key: 'expanded',
    name: '',
    minWidth: 30,
    width: 30,
    colSpan(args) {
      return args.type === 'ROW' && args.row.type === 'DETAIL' ? 3 : undefined;
    },
    cellClass(row) {
      return row.type === 'DETAIL'
        ? css`
            padding: 24px;
          `
        : undefined;
    },
    formatter({ row, isCellSelected, onRowChange }) {
      if (row.type === 'DETAIL') {
        return <ProductGrid isCellSelected={isCellSelected} parentId={row.parentId} />;
      }

      return (
        <CellExpanderFormatter
          expanded={row.expanded}
          isCellSelected={isCellSelected}
          onCellExpand={() => {
            onRowChange({ ...row, expanded: !row.expanded });
          }}
        />
      );
    }
  },
  { key: 'id', name: 'ID', width: 35 },
  { key: 'department', name: 'Department' }
];

export function MasterDetailStory() {
  const [rows, setRows] = useState(createDepartments);

  function onRowsChange(rows: DepartmentRow[], { indexes }: RowsChangeData<DepartmentRow>) {
    const row = rows[indexes[0]];
    if (row.type === 'MASTER') {
      if (!row.expanded) {
        rows.splice(indexes[0] + 1, 1);
      } else {
        rows.splice(indexes[0] + 1, 0, {
          type: 'DETAIL',
          id: row.id + 100,
          parentId: row.id
        });
      }
      setRows(rows);
    }
  }

  return (
    <DataGrid
      rowKeyGetter={rowKeyGetter}
      columns={departmentColumns}
      rows={rows}
      onRowsChange={onRowsChange}
      rowHeight={(args) => (args.type === 'ROW' && args.row.type === 'DETAIL' ? 300 : 35)}
      className="fill-grid"
    />
  );
}

function ProductGrid({ parentId, isCellSelected }: { parentId: number; isCellSelected: boolean }) {
  const gridRef = useRef<DataGridHandle>(null);
  const [selectedPosition, setSelectedPosition] = useState<Position>({ idx: -1, rowIdx: -2 });
  useEffect(() => {
    if (!isCellSelected) return;
    gridRef
      .current!.element!.querySelector<HTMLDivElement>('[tabindex="0"]')!
      .focus({ preventScroll: true });
  }, [isCellSelected]);
  const products = getProducts(parentId);

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const { idx, rowIdx } = selectedPosition;
    if (
      event.key === 'Tab' &&
      !event.shiftKey &&
      rowIdx === products.length - 1 &&
      idx === productColumns.length - 1
    ) {
      return;
    }

    if (event.key === 'Tab' && event.shiftKey && rowIdx === -1 && idx === 0) {
      return;
    }

    event.stopPropagation();
  }

  return (
    <div onKeyDown={onKeyDown}>
      <DataGrid
        ref={gridRef}
        rows={products}
        columns={productColumns}
        rowKeyGetter={rowKeyGetter}
        onSelectedCellChange={setSelectedPosition}
        style={{ height: 250 }}
      />
    </div>
  );
}

function rowKeyGetter(row: DepartmentRow | ProductRow) {
  return row.id;
}

MasterDetailStory.storyName = 'Master Detail';
