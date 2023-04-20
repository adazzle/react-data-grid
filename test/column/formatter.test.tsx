import { useState } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DataGrid from '../../src';
import type { Column } from '../../src';
import { setup, getCells, getCellsAtRowIndex, render } from '../utils';

interface Row {
  id: number;
}

describe('ValueFormatter', () => {
  const columns: readonly Column<Row | null>[] = [
    { key: 'id', name: 'ID' },
    { key: 'name', name: 'Name' }
  ];

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

describe('Custom formatter component', () => {
  const columns: readonly Column<Row>[] = [
    {
      key: 'id',
      name: 'ID',
      formatter: (props) => <>#{props.row.id}</>
    },
    {
      key: 'name',
      name: 'Name',
      formatter: () => <>No name</>
    }
  ];

  const rows: readonly Row[] = [{ id: 101 }];

  it('should replace the default formatter', () => {
    setup({ columns, rows });
    const [cell1, cell2] = getCells();
    expect(cell1).toHaveTextContent('#101');
    expect(cell2).toHaveTextContent('No name');
  });

  it('can update rows', async () => {
    const onChange = jest.fn();

    const column: Column<Row> = {
      key: 'test',
      name: 'test',
      formatter(props) {
        function onClick() {
          props.onRowChange({ id: props.row.id + 1 });
        }

        return <button onClick={onClick}>value: {props.row.id}</button>;
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

    render(<Test />);

    const [cell] = getCells();
    expect(cell).toHaveTextContent('value: 1');
    await userEvent.click(screen.getByRole('button'));
    expect(cell).toHaveTextContent('value: 2');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith([{ id: 2 }], {
      column: {
        ...column,
        frozen: false,
        idx: 0,
        isLastFrozenColumn: false,
        maxWidth: undefined,
        minWidth: 80,
        resizable: false,
        rowGroup: false,
        sortable: false,
        width: 'auto'
      },
      indexes: [0]
    });
  });
});

test.skip('Cell should not steal focus when the focus is outside the grid and cell is recreated', async () => {
  const columns: readonly Column<Row>[] = [{ key: 'id', name: 'ID' }];
  function FormatterTest() {
    const [rows, setRows] = useState((): readonly Row[] => [{ id: 1 }]);

    function onClick() {
      setRows([{ id: 2 }]);
    }

    return (
      <>
        <button onClick={onClick}>Test</button>
        <DataGrid
          columns={columns}
          rows={rows}
          onRowsChange={setRows}
          rowKeyGetter={(row) => row.id}
        />
      </>
    );
  }

  render(<FormatterTest />);

  await userEvent.click(getCellsAtRowIndex(0)[0]);
  expect(getCellsAtRowIndex(0)[0]).toHaveFocus();

  const button = screen.getByRole('button', { name: 'Test' });
  expect(button).not.toHaveFocus();
  await userEvent.click(button);
  expect(getCellsAtRowIndex(0)[0]).not.toHaveFocus();
  expect(button).toHaveFocus();
});
