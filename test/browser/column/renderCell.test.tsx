import { useState } from 'react';
import { page, userEvent } from 'vitest/browser';

import { DataGrid } from '../../../src';
import type { Column } from '../../../src';
import defaultRenderHeaderCell from '../../../src/renderHeaderCell';
import { getCells, getCellsAtRowIndex, setup } from '../utils';

interface Row {
  id: number;
}

describe('renderValue', () => {
  const columns = [
    { key: 'id', name: 'ID' },
    { key: 'name', name: 'Name' }
  ] as const satisfies Column<Row | null>[];

  const rows: readonly Row[] = [{ id: 101 }];

  it('should be used by default', () => {
    setup({ columns, rows });
    const [cell1, cell2] = getCells();
    expect(cell1).toHaveTextContent('101');
    expect(cell2).toBeEmptyDOMElement();
  });

  it('should handle non-object values', () => {
    setup({ columns, rows: [null] });
    const [cell1, cell2] = getCells();
    expect(cell1).toBeEmptyDOMElement();
    expect(cell2).toBeEmptyDOMElement();
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

  it('should replace the default cell renderer', () => {
    setup({ columns, rows });
    const [cell1, cell2] = getCells();
    expect(cell1).toHaveTextContent('#101');
    expect(cell2).toHaveTextContent('No name');
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
    expect(cell).toHaveTextContent('value: 1');
    await userEvent.click(page.getByRole('button'));
    expect(cell).toHaveTextContent('value: 2');
    expect(onChange).toHaveBeenCalledExactlyOnceWith([{ id: 2 }], {
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
        width: 'auto',
        renderHeaderCell: defaultRenderHeaderCell
      },
      indexes: [0]
    });
  });
});

test('Focus child if it sets tabIndex', async () => {
  const column: Column<Row> = {
    key: 'test',
    name: 'test',
    renderCell(props) {
      return (
        <>
          <button type="button" tabIndex={props.tabIndex}>
            Button 1
          </button>
          <span>Text</span>
          <button type="button" tabIndex={-1}>
            Button 2
          </button>
        </>
      );
    }
  };

  page.render(<DataGrid columns={[column]} rows={[{ id: 1 }]} />);

  const button1 = page.getByRole('button', { name: 'Button 1' });
  const button2 = page.getByRole('button', { name: 'Button 2' });
  const cell = page.getByRole('gridcell', { name: 'Button 1 Text Button 2' });
  expect(button1).toHaveAttribute('tabindex', '-1');
  expect(cell).toHaveAttribute('tabindex', '-1');
  await userEvent.click(page.getByText('Text'));
  expect(button1).toHaveFocus();
  expect(button1).toHaveAttribute('tabindex', '0');
  await userEvent.tab({ shift: true });
  expect(button1).not.toHaveFocus();
  expect(button1).toHaveAttribute('tabindex', '-1');
  expect(cell).toHaveAttribute('tabindex', '-1');
  await userEvent.click(button1);
  expect(button1).toHaveFocus();
  expect(button1).toHaveAttribute('tabindex', '0');
  expect(cell).toHaveAttribute('tabindex', '-1');
  await userEvent.tab({ shift: true });
  await userEvent.click(button2);
  expect(button2).toHaveFocus();
  // It is user's responsibilty to set the tabIndex on button2
  expect(button1).toHaveAttribute('tabindex', '0');
  expect(cell).toHaveAttribute('tabindex', '-1');
  await userEvent.click(button1);
  expect(button1).toHaveFocus();
  expect(button1).toHaveAttribute('tabindex', '0');
  expect(cell).toHaveAttribute('tabindex', '-1');
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

  await userEvent.click(getCellsAtRowIndex(0)[0]);
  expect(getCellsAtRowIndex(0)[0]).toHaveFocus();

  const button = page.getByRole('button', { name: 'Test' }).element();
  expect(button).not.toHaveFocus();
  await userEvent.click(button);
  expect(getCellsAtRowIndex(0)[0]).not.toHaveFocus();
  expect(button).toHaveFocus();
});
