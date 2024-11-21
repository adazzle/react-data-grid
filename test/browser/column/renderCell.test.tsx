import { useState } from 'react';
import { page, userEvent } from '@vitest/browser/context';

import DataGrid from '../../../src';
import type { Column } from '../../../src';
import { getCells, getCellsAtRowIndexOld, setup } from '../utils';

interface Row {
  id: number;
}

describe('renderValue', () => {
  const columns = [
    { key: 'id', name: 'ID' },
    { key: 'name', name: 'Name' }
  ] as const satisfies Column<Row | null>[];

  const rows: readonly Row[] = [{ id: 101 }];

  it('should be used by default', async () => {
    setup({ columns, rows });
    const [cell1, cell2] = getCells();
    await expect.element(cell1).toHaveTextContent('101');
    await expect.element(cell2).toBeEmptyDOMElement();
  });

  it('should handle non-object values', async () => {
    setup({ columns, rows: [null] });
    const [cell1, cell2] = getCells();
    await expect.element(cell1).toBeEmptyDOMElement();
    await expect.element(cell2).toBeEmptyDOMElement();
  });
});

describe('Custom cell renderer', () => {
  const columns: readonly Column<Row>[] = [
    {
      key: 'id',
      name: 'ID',
      renderCell: (props) => `#${props.row.id}`
    },
    {
      key: 'name',
      name: 'Name',
      renderCell: () => 'No name'
    }
  ];

  const rows: readonly Row[] = [{ id: 101 }];

  it('should replace the default cell renderer', async () => {
    setup({ columns, rows });
    const [cell1, cell2] = getCells();
    await expect.element(cell1).toHaveTextContent('#101');
    await expect.element(cell2).toHaveTextContent('No name');
  });

  it('can update rows', async () => {
    const onChange = vi.fn();

    const column: Column<Row> = {
      key: 'test',
      name: 'test',
      renderCell(props) {
        function onClick() {
          props.onRowChange({ id: props.row.id + 1 });
        }

        return (
          <button type="button" onClick={onClick}>
            value: {props.row.id}
          </button>
        );
      }
    };

    function Test() {
      const [rows, setRows] = useState<readonly Row[]>([{ id: 1 }]);

      return (
        <DataGrid
          columns={[column]}
          rows={rows}
          onRowsChange={(rows, data) => {
            setRows(rows);
            onChange(rows, data);
          }}
        />
      );
    }

    page.render(<Test />);

    const [cell] = getCells();
    await expect.element(cell).toHaveTextContent('value: 1');
    await userEvent.click(page.getByRole('button'));
    await expect.element(cell).toHaveTextContent('value: 2');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith([{ id: 2 }], {
      column: {
        ...column,
        frozen: false,
        idx: 0,
        level: 0,
        maxWidth: undefined,
        minWidth: 50,
        parent: undefined,
        resizable: false,
        sortable: false,
        draggable: false,
        width: 'auto'
      },
      indexes: [0]
    });
  });
});

test('Cell should not steal focus when the focus is outside the grid and cell is recreated', async () => {
  const columns: readonly Column<Row>[] = [{ key: 'id', name: 'ID' }];

  function FormatterTest() {
    const [rows, setRows] = useState((): readonly Row[] => [{ id: 1 }]);

    function onClick() {
      setRows([{ id: 2 }]);
    }

    return (
      <>
        <button type="button" onClick={onClick}>
          Test
        </button>
        <DataGrid
          columns={columns}
          rows={rows}
          onRowsChange={setRows}
          rowKeyGetter={(row) => row.id}
        />
      </>
    );
  }

  page.render(<FormatterTest />);

  await userEvent.click(getCellsAtRowIndexOld(0)[0]);
  expect(getCellsAtRowIndexOld(0)[0]).toHaveFocus();

  const button = page.getByRole('button', { name: 'Test' });
  await expect.element(button).not.toHaveFocus();
  await userEvent.click(button);
  expect(getCellsAtRowIndexOld(0)[0]).not.toHaveFocus();
  await expect.element(button).toHaveFocus();
});
