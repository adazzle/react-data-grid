import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DataGrid from '../src';
import type { Column, DataGridProps } from '../src';
import { getCellsAtRowIndex, render } from './utils';

interface Row {
  col1: number;
  col2: string;
}

const columns: readonly Column<Row>[] = [
  {
    key: 'col1',
    name: 'Col1',
    renderEditCell(p) {
      return (
        <input
          autoFocus
          type="number"
          aria-label="col1-editor"
          value={p.row.col1}
          onChange={(e) => p.onRowChange({ ...p.row, col1: e.target.valueAsNumber })}
        />
      );
    }
  },
  {
    key: 'col2',
    name: 'Col2',
    renderEditCell({ row, onRowChange }) {
      return (
        <input
          autoFocus
          aria-label="col2-editor"
          value={row.col2}
          onChange={(e) => onRowChange({ ...row, col2: e.target.value })}
        />
      );
    }
  }
];

const rows: readonly Row[] = [
  {
    col1: 1,
    col2: 'a1'
  },
  {
    col1: 2,
    col2: 'a2'
  }
];

describe('Events', () => {
  it('should not select cell if onCellClick prevents grid default', async () => {
    render(
      <EventTest
        onCellClick={(args, event) => {
          if (args.column.key === 'col1') {
            event.preventGridDefault();
          }
        }}
      />
    );
    await userEvent.click(getCellsAtRowIndex(0)[0]);
    expect(getCellsAtRowIndex(0)[0]).toHaveAttribute('aria-selected', 'false');
    await userEvent.click(getCellsAtRowIndex(0)[1]);
    expect(getCellsAtRowIndex(0)[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('should be able to open editor editor on single click using onCellClick', async () => {
    render(
      <EventTest
        onCellClick={(args, event) => {
          if (args.column.key === 'col2') {
            event.preventGridDefault();
            args.selectCell(true);
          }
        }}
      />
    );
    await userEvent.click(getCellsAtRowIndex(0)[0]);
    expect(screen.queryByLabelText('col1-editor')).not.toBeInTheDocument();
    await userEvent.click(getCellsAtRowIndex(0)[1]);
    expect(screen.getByLabelText('col2-editor')).toBeInTheDocument();
  });

  it('should not open editor editor on double click if onCellDoubleClick prevents default', async () => {
    render(
      <EventTest
        onCellDoubleClick={(args, event) => {
          if (args.column.key === 'col1') {
            event.preventGridDefault();
          }
        }}
      />
    );
    await userEvent.dblClick(getCellsAtRowIndex(0)[0]);
    expect(screen.queryByLabelText('col1-editor')).not.toBeInTheDocument();
    await userEvent.dblClick(getCellsAtRowIndex(0)[1]);
    expect(screen.getByLabelText('col2-editor')).toBeInTheDocument();
  });

  it('should call onCellContextMenu when cell is right clicked', async () => {
    render(
      <EventTest
        onCellContextMenu={(args, event) => {
          if (args.column.key === 'col1') {
            event.preventGridDefault();
          }
        }}
      />
    );
    await userEvent.pointer({ target: getCellsAtRowIndex(0)[0], keys: '[MouseRight]' });
    expect(getCellsAtRowIndex(0)[0]).toHaveAttribute('aria-selected', 'false');
    await userEvent.pointer({ target: getCellsAtRowIndex(0)[1], keys: '[MouseRight]' });
    expect(getCellsAtRowIndex(0)[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('should call onSelectedCellChange when cell selection is changed', async () => {
    const onSelectedCellChange = vi.fn();

    render(<EventTest onSelectedCellChange={onSelectedCellChange} />);

    expect(onSelectedCellChange).not.toHaveBeenCalled();

    // Selected by click
    await userEvent.click(getCellsAtRowIndex(0)[1]);
    expect(onSelectedCellChange).toHaveBeenCalledWith({
      column: expect.objectContaining(columns[1]),
      row: rows[0],
      rowIdx: 0
    });
    expect(onSelectedCellChange).toHaveBeenCalledTimes(1);

    // Selected by double click
    await userEvent.dblClick(getCellsAtRowIndex(0)[0]);
    expect(onSelectedCellChange).toHaveBeenCalledWith({
      column: expect.objectContaining(columns[0]),
      row: rows[0],
      rowIdx: 0
    });
    expect(onSelectedCellChange).toHaveBeenCalledTimes(2);

    // Selected by right-click
    await userEvent.pointer({ target: getCellsAtRowIndex(1)[0], keys: '[MouseRight]' });
    expect(onSelectedCellChange).toHaveBeenCalledWith({
      column: expect.objectContaining(columns[0]),
      row: rows[1],
      rowIdx: 1
    });
    expect(onSelectedCellChange).toHaveBeenCalledTimes(3);

    // Selected by ←↑→↓ keys
    await userEvent.keyboard('{ArrowUp}');
    expect(onSelectedCellChange).toHaveBeenCalledWith({
      column: expect.objectContaining(columns[0]),
      row: rows[0],
      rowIdx: 0
    });
    expect(onSelectedCellChange).toHaveBeenCalledTimes(4);

    // Selected by tab key
    await userEvent.keyboard('{Tab}');
    expect(onSelectedCellChange).toHaveBeenCalledWith({
      column: expect.objectContaining(columns[1]),
      row: rows[0],
      rowIdx: 0
    });
    expect(onSelectedCellChange).toHaveBeenCalledTimes(5);
  });
});

type EventProps = Pick<
  DataGridProps<Row>,
  'onCellClick' | 'onCellDoubleClick' | 'onCellContextMenu' | 'onSelectedCellChange'
>;

function EventTest(props: EventProps) {
  return <DataGrid columns={columns} rows={rows} {...props} />;
}
