import { StrictMode, useMemo, useState } from 'react';
import { act, fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DataGrid from '../../src';
import type { Column, DataGridProps } from '../../src';
import { getCellsAtRowIndex, getGrid, getSelectedCell } from '../utils';
import { createPortal } from 'react-dom';

interface Row {
  col1: number;
  col2: string;
}

describe('Editor', () => {
  it('should open editor on double click', async () => {
    render(<EditorTest />);
    await userEvent.click(getCellsAtRowIndex(0)[0]);
    expect(screen.queryByLabelText('col1-editor')).not.toBeInTheDocument();
    await userEvent.dblClick(getCellsAtRowIndex(0)[0]);
    expect(screen.getByLabelText('col1-editor')).toHaveValue(1);
    await userEvent.keyboard('2');
    await userEvent.tab();
    expect(screen.queryByLabelText('col1-editor')).not.toBeInTheDocument();
    expect(getCellsAtRowIndex(0)[0]).toHaveTextContent(/^21$/);
  });

  it('should open and commit changes on enter', async () => {
    render(<EditorTest />);
    await userEvent.click(getCellsAtRowIndex(0)[0]);
    expect(screen.queryByLabelText('col1-editor')).not.toBeInTheDocument();
    await userEvent.keyboard('{enter}');
    expect(screen.getByLabelText('col1-editor')).toHaveValue(1);
    await userEvent.keyboard('3{enter}');
    expect(getCellsAtRowIndex(0)[0]).toHaveTextContent(/^31$/);
    expect(getCellsAtRowIndex(0)[0]).toHaveFocus();
    expect(screen.queryByLabelText('col1-editor')).not.toBeInTheDocument();
  });

  it('should open editor when user types', async () => {
    render(<EditorTest />);
    await userEvent.click(getCellsAtRowIndex(0)[0]);
    await userEvent.keyboard('123{enter}');
    expect(getCellsAtRowIndex(0)[0]).toHaveTextContent(/^1231$/);
  });

  it('should close editor and discard changes on escape', async () => {
    render(<EditorTest />);
    await userEvent.dblClick(getCellsAtRowIndex(0)[0]);
    expect(screen.getByLabelText('col1-editor')).toHaveValue(1);
    await userEvent.keyboard('2222{escape}');
    expect(screen.queryByLabelText('col1-editor')).not.toBeInTheDocument();
    expect(getCellsAtRowIndex(0)[0]).toHaveTextContent(/^1$/);
    expect(getCellsAtRowIndex(0)[0]).toHaveFocus();
  });

  it('should commit changes and close editor when clicked outside', async () => {
    render(<EditorTest />);
    await userEvent.dblClick(getCellsAtRowIndex(0)[0]);
    expect(screen.getByLabelText('col1-editor')).toHaveValue(1);
    await userEvent.keyboard('2222');
    await userEvent.click(screen.getByText('outside'));
    await waitForElementToBeRemoved(screen.queryByLabelText('col1-editor'));
    expect(getCellsAtRowIndex(0)[0]).toHaveTextContent(/^22221$/);
  });

  it('should commit quickly enough on outside clicks so click event handlers access the latest rows state', async () => {
    const onSave = jest.fn();
    render(<EditorTest onSave={onSave} />);
    await userEvent.dblClick(getCellsAtRowIndex(0)[0]);
    await userEvent.keyboard('234');
    expect(onSave).not.toHaveBeenCalled();
    const saveButton = screen.getByRole('button', { name: 'save' });
    fireEvent.mouseDown(saveButton);
    // await userEvent.click() triggers both mousedown and click, but without delay,
    // which isn't realistic, and isn't enough to trigger outside click detection
    await act(async () => {
      await new Promise(requestAnimationFrame);
    });
    fireEvent.click(saveButton);
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith([
      { col1: 2341, col2: 'a1' },
      { col1: 2, col2: 'a2' }
    ]);
  });

  it('should scroll to the editor if selected cell is not in the viewport', async () => {
    const rows: Row[] = [];
    for (let i = 0; i < 99; i++) {
      rows.push({ col1: i, col2: `${i}` });
    }

    render(<EditorTest gridRows={rows} />);
    await userEvent.click(getCellsAtRowIndex(0)[0]);
    expect(getCellsAtRowIndex(0)).toHaveLength(2);

    const grid = getGrid();
    grid.scrollTop = 2000;
    expect(getCellsAtRowIndex(0)).toHaveLength(1);
    expect(screen.queryByLabelText('col1-editor')).not.toBeInTheDocument();
    await userEvent.keyboard('123');
    expect(screen.getByLabelText('col1-editor')).toHaveValue(1230);
    const spy = jest.spyOn(window.HTMLElement.prototype, 'scrollIntoView');
    await userEvent.keyboard('{enter}');
    expect(spy).toHaveBeenCalled();
  });

  describe('editable', () => {
    it('should be editable if an editor is specified and editable is undefined/null', async () => {
      render(<EditorTest />);
      await userEvent.dblClick(getCellsAtRowIndex(0)[1]);
      expect(screen.getByLabelText('col2-editor')).toBeInTheDocument();
    });

    it('should be editable if an editor is specified and editable is set to true', async () => {
      render(<EditorTest editable />);
      await userEvent.dblClick(getCellsAtRowIndex(0)[1]);
      expect(screen.getByLabelText('col2-editor')).toBeInTheDocument();
    });

    it('should not be editable if editable is false', async () => {
      render(<EditorTest editable={false} />);
      await userEvent.dblClick(getCellsAtRowIndex(0)[1]);
      expect(screen.queryByLabelText('col2-editor')).not.toBeInTheDocument();
    });

    it('should not be editable if editable function returns false', async () => {
      render(<EditorTest editable={(row) => row.col1 === 2} />);
      await userEvent.dblClick(getCellsAtRowIndex(0)[1]);
      expect(screen.queryByLabelText('col2-editor')).not.toBeInTheDocument();

      await userEvent.dblClick(getCellsAtRowIndex(1)[1]);
      expect(screen.getByLabelText('col2-editor')).toBeInTheDocument();
    });
  });

  describe('editorOptions', () => {
    it('should detect outside click if editor is rendered in a portal', async () => {
      render(<EditorTest createEditorPortal editorOptions={{ renderFormatter: true }} />);
      await userEvent.dblClick(getCellsAtRowIndex(0)[1]);
      let editor = screen.getByLabelText('col2-editor');
      expect(editor).toHaveValue('a1');
      await userEvent.keyboard('23');
      // The cell value should update as the editor value is changed
      expect(getCellsAtRowIndex(0)[1]).toHaveTextContent(/^a123$/);
      // clicking in a portal does not count as an outside click
      await userEvent.click(editor);
      expect(editor).toBeInTheDocument();
      // true outside clicks are still detected
      await userEvent.click(screen.getByText('outside'));
      await waitForElementToBeRemoved(editor);
      expect(getCellsAtRowIndex(0)[1]).not.toHaveFocus();

      await userEvent.dblClick(getCellsAtRowIndex(0)[1]);
      editor = screen.getByLabelText('col2-editor');
      await userEvent.click(editor);
      await userEvent.keyboard('{enter}');
      expect(getCellsAtRowIndex(0)[1]).toHaveFocus();
    });

    it('should not commit on outside click if commitOnOutsideClick is false', async () => {
      render(
        <EditorTest
          editorOptions={{
            commitOnOutsideClick: false
          }}
        />
      );
      await userEvent.dblClick(getCellsAtRowIndex(0)[1]);
      const editor = screen.getByLabelText('col2-editor');
      expect(editor).toBeInTheDocument();
      await userEvent.click(screen.getByText('outside'));
      await act(async () => {
        await new Promise(requestAnimationFrame);
      });
      expect(editor).toBeInTheDocument();
      await userEvent.click(editor);
      await userEvent.keyboard('{enter}');
      expect(editor).not.toBeInTheDocument();
    });

    it('should not open editor if onCellKeyDown prevents the default event', async () => {
      render(
        <EditorTest
          onCellKeyDown={(args, event) => {
            if (args.mode === 'SELECT' && event.key === 'x') {
              event.preventGridDefault();
            }
          }}
        />
      );
      await userEvent.click(getCellsAtRowIndex(0)[1]);
      await userEvent.keyboard('yz{enter}');
      expect(getCellsAtRowIndex(0)[1]).toHaveTextContent(/^a1yz$/);
      await userEvent.keyboard('x');
      expect(screen.queryByLabelText('col2-editor')).not.toBeInTheDocument();
    });

    it('should prevent navigation if onCellKeyDown prevents the default event', async () => {
      render(
        <EditorTest
          onCellKeyDown={(args, event) => {
            if (args.mode === 'EDIT' && event.key === 'ArrowDown') {
              event.preventGridDefault();
              args.onClose(true);
            }
          }}
        />
      );
      await userEvent.dblClick(getCellsAtRowIndex(0)[1]);
      await userEvent.keyboard('a{arrowleft}b{arrowright}c{arrowdown}'); // should commit changes on arrowdown
      expect(getCellsAtRowIndex(0)[1]).toHaveTextContent(/^a1bac$/);
    });
  });

  describe('editor focus', () => {
    it('should not steal focus back to the cell if the editor is not in the viewport and another cell is clicked', async () => {
      const rows: Row[] = [];
      for (let i = 0; i < 99; i++) {
        rows.push({ col1: i, col2: `${i}` });
      }

      render(<EditorTest gridRows={rows} />);
      const grid = getGrid();

      await userEvent.dblClick(getCellsAtRowIndex(0)[1]);
      await userEvent.keyboard('abc');

      grid.scrollTop = 1500;

      expect(getCellsAtRowIndex(40)[1]).toHaveTextContent(/^40$/);
      await userEvent.click(getCellsAtRowIndex(40)[1]);
      expect(getSelectedCell()).toHaveTextContent(/^40$/);
      grid.scrollTop = 0;
      expect(getCellsAtRowIndex(0)[1]).toHaveTextContent(/^0abc$/);
    });

    it('should not steal focus back to the cell after being closed by clicking outside the grid', async () => {
      const columns: readonly Column<unknown>[] = [
        {
          key: 'col1',
          name: 'Column1',
          editor() {
            return <input aria-label="col1-input" value="123" readOnly autoFocus />;
          }
        },
        {
          key: 'col2',
          name: 'Column2',
          editor({ onClose }) {
            return (
              <input
                aria-label="col2-input"
                value="123"
                readOnly
                autoFocus
                onBlur={() => {
                  onClose(true);
                }}
              />
            );
          },
          editorOptions: {
            commitOnOutsideClick: false
          }
        }
      ];

      render(
        <>
          <input aria-label="outer-input" value="abc" readOnly />
          <DataGrid columns={columns} rows={[{}]} />
        </>
      );

      const outerInput = screen.getByLabelText('outer-input');
      await userEvent.dblClick(getCellsAtRowIndex(0)[0]);
      const col1Input = screen.getByLabelText('col1-input');
      expect(col1Input).toHaveFocus();
      await userEvent.click(outerInput);
      expect(outerInput).toHaveFocus();
      await waitForElementToBeRemoved(col1Input);
      expect(outerInput).toHaveFocus();

      await userEvent.dblClick(getCellsAtRowIndex(0)[1]);
      const col2Input = screen.getByLabelText('col2-input');
      expect(col2Input).toHaveFocus();
      await userEvent.click(outerInput);
      expect(outerInput).toHaveFocus();
      expect(col2Input).not.toBeInTheDocument();
      expect(outerInput).toHaveFocus();
    });
  });
});

interface EditorTestProps
  extends Pick<Column<Row>, 'editorOptions' | 'editable'>,
    Pick<DataGridProps<Row>, 'onCellKeyDown'> {
  onSave?: (rows: readonly Row[]) => void;
  gridRows?: readonly Row[];
  createEditorPortal?: boolean;
}

const initialRows: readonly Row[] = [
  {
    col1: 1,
    col2: 'a1'
  },
  {
    col1: 2,
    col2: 'a2'
  }
];

function EditorTest({
  editable,
  editorOptions,
  onCellKeyDown,
  onSave,
  gridRows = initialRows,
  createEditorPortal
}: EditorTestProps) {
  const [rows, setRows] = useState(gridRows);

  const columns = useMemo((): readonly Column<Row>[] => {
    return [
      {
        key: 'col1',
        name: 'Col1',
        editor(p) {
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
        editable,
        editor({ row, onRowChange }) {
          const editor = (
            <input
              autoFocus
              aria-label="col2-editor"
              value={row.col2}
              onChange={(e) => onRowChange({ ...row, col2: e.target.value })}
            />
          );

          return createEditorPortal ? createPortal(editor, document.body) : editor;
        },
        editorOptions
      }
    ];
  }, [editable, editorOptions, createEditorPortal]);

  return (
    <StrictMode>
      <div
        onClick={(e) => e.stopPropagation()}
        onClickCapture={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseDownCapture={(e) => e.stopPropagation()}
      >
        outside
      </div>
      <button type="button" onClick={() => onSave?.(rows)}>
        save
      </button>
      <DataGrid
        columns={columns}
        rows={rows}
        onRowsChange={setRows}
        onCellKeyDown={onCellKeyDown}
      />
    </StrictMode>
  );
}
