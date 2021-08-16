import { StrictMode, useMemo, useState } from 'react';
import { act, fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DataGrid from '../../src';
import type { Column } from '../../src';
import { getCellsAtRowIndex, getGrid } from '../utils';

interface Row {
  col1: number;
  col2: string;
}

describe('Editor', () => {
  it('should open editor on double click', () => {
    render(<EditorTest />);
    userEvent.click(getCellsAtRowIndex(0)[0]);
    expect(screen.queryByLabelText('col1-editor')).not.toBeInTheDocument();
    userEvent.dblClick(getCellsAtRowIndex(0)[0]);
    expect(screen.getByLabelText('col1-editor')).toHaveValue(1);
    userEvent.type(document.activeElement!, '2');
    userEvent.tab();
    expect(screen.queryByLabelText('col1-editor')).not.toBeInTheDocument();
    expect(getCellsAtRowIndex(0)[0]).toHaveTextContent(/^12$/);
  });

  it('should open and commit changes on enter', () => {
    render(<EditorTest />);
    userEvent.click(getCellsAtRowIndex(0)[0]);
    expect(screen.queryByLabelText('col1-editor')).not.toBeInTheDocument();
    userEvent.keyboard('{enter}');
    expect(screen.getByLabelText('col1-editor')).toHaveValue(1);
    userEvent.keyboard('3{enter}');
    expect(getCellsAtRowIndex(0)[0]).toHaveTextContent(/^13$/);
    expect(screen.queryByLabelText('col1-editor')).not.toBeInTheDocument();
  });

  it('should commit changes on enter if the editor is rendered in a portal', () => {
    render(
      <EditorTest
        editorOptions={{
          createPortal: true
        }}
      />
    );
    userEvent.click(getCellsAtRowIndex(0)[1]);
    expect(screen.queryByLabelText('col2-editor')).not.toBeInTheDocument();
    userEvent.keyboard('{enter}');
    expect(screen.getByLabelText('col2-editor')).toHaveValue('a1');
    userEvent.keyboard('23');
    // The cell value should update as the editor value is changed
    expect(getCellsAtRowIndex(0)[1]).toHaveTextContent('a123');
    userEvent.keyboard('{enter}');
    expect(getCellsAtRowIndex(0)[1]).toHaveTextContent('a123');
    expect(screen.queryByLabelText('col2-editor')).not.toBeInTheDocument();
  });

  it('should open editor when user types', () => {
    render(<EditorTest />);
    userEvent.click(getCellsAtRowIndex(0)[0]);
    userEvent.keyboard('123{enter}');
    expect(getCellsAtRowIndex(0)[0]).toHaveTextContent(/^1123$/);
  });

  it('should close editor and discard changes on escape', () => {
    render(<EditorTest />);
    userEvent.dblClick(getCellsAtRowIndex(0)[0]);
    expect(screen.getByLabelText('col1-editor')).toHaveValue(1);
    userEvent.keyboard('2222{escape}');
    expect(screen.queryByLabelText('col1-editor')).not.toBeInTheDocument();
    expect(getCellsAtRowIndex(0)[0]).toHaveTextContent(/^1$/);
  });

  it('should commit changes and close editor when clicked outside', async () => {
    render(<EditorTest />);
    userEvent.dblClick(getCellsAtRowIndex(0)[0]);
    expect(screen.getByLabelText('col1-editor')).toHaveValue(1);
    userEvent.keyboard('2222');
    userEvent.click(screen.getByText('outside'));
    await waitForElementToBeRemoved(screen.queryByLabelText('col1-editor'));
    expect(getCellsAtRowIndex(0)[0]).toHaveTextContent(/^12222$/);
  });

  it('should commit quickly enough on outside clicks so click event handlers access the latest rows state', async () => {
    const onSave = jest.fn();
    render(<EditorTest onSave={onSave} />);
    userEvent.dblClick(getCellsAtRowIndex(0)[0]);
    userEvent.keyboard('234');
    expect(onSave).not.toHaveBeenCalled();
    const saveButton = screen.getByRole('button', { name: 'save' });
    fireEvent.mouseDown(saveButton);
    // userEvent.click() triggers both mousedown and click, but without delay,
    // which isn't realistic, and isn't enough to trigger outside click detection
    await act(async () => {
      await new Promise(requestAnimationFrame);
    });
    fireEvent.click(saveButton);
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith([
      { col1: 1234, col2: 'a1' },
      { col1: 2, col2: 'a2' }
    ]);
  });

  it('should scroll to the editor if selected cell is not in the viewport', () => {
    const rows: Row[] = [];
    for (let i = 0; i < 99; i++) {
      rows.push({ col1: i, col2: `${i}` });
    }

    render(<EditorTest gridRows={rows} />);
    userEvent.click(getCellsAtRowIndex(0)[0]);
    expect(getCellsAtRowIndex(0)).toHaveLength(2);

    const grid = getGrid();
    grid.scrollTop = 2000;
    expect(getCellsAtRowIndex(0)).toHaveLength(1);
    expect(screen.queryByLabelText('col1-editor')).not.toBeInTheDocument();
    userEvent.keyboard('123');
    expect(screen.getByLabelText('col1-editor')).toHaveValue(123);
    userEvent.keyboard('{enter}');
    expect(getCellsAtRowIndex(0)).toHaveLength(2);
  });

  describe('editable', () => {
    it('should be editable if an editor is specified and editable is undefined/null', () => {
      render(<EditorTest />);
      userEvent.dblClick(getCellsAtRowIndex(0)[1]);
      expect(screen.getByLabelText('col2-editor')).toBeInTheDocument();
    });

    it('should be editable if an editor is specified and editable is set to true', () => {
      render(<EditorTest editable />);
      userEvent.dblClick(getCellsAtRowIndex(0)[1]);
      expect(screen.getByLabelText('col2-editor')).toBeInTheDocument();
    });

    it('should not be editable if editable is false', () => {
      render(<EditorTest editable={false} />);
      userEvent.dblClick(getCellsAtRowIndex(0)[1]);
      expect(screen.queryByLabelText('col2-editor')).not.toBeInTheDocument();
    });

    it('should not be editable if editable function returns false', () => {
      render(<EditorTest editable={(row) => row.col1 === 2} />);
      userEvent.dblClick(getCellsAtRowIndex(0)[1]);
      expect(screen.queryByLabelText('col2-editor')).not.toBeInTheDocument();

      userEvent.dblClick(getCellsAtRowIndex(1)[1]);
      expect(screen.getByLabelText('col2-editor')).toBeInTheDocument();
    });
  });

  describe('editorOptions', () => {
    it('should open editor on single click if editOnClick is true', () => {
      render(
        <EditorTest
          editorOptions={{
            editOnClick: true
          }}
        />
      );
      userEvent.click(getCellsAtRowIndex(0)[0]);
      expect(screen.queryByLabelText('col1-editor')).not.toBeInTheDocument();
      userEvent.click(getCellsAtRowIndex(0)[1]);
      expect(screen.getByLabelText('col2-editor')).toBeInTheDocument();
    });

    it('should render the editor in a portal if createPortal is true', async () => {
      render(
        <EditorTest
          editorOptions={{
            createPortal: true
          }}
        />
      );
      userEvent.dblClick(getCellsAtRowIndex(0)[1]);
      const editor = screen.getByLabelText('col2-editor');
      expect(editor.parentElement).toBe(document.body);
      // clicking in a portal does not count as an outside click
      userEvent.click(editor);
      expect(editor).toBeInTheDocument();
      // true outside clicks are still detected
      userEvent.click(screen.getByText('outside'));
      await waitForElementToBeRemoved(editor);
    });

    it('should not open editor if onCellKeyDown prevents the default event', () => {
      render(
        <EditorTest
          editorOptions={{
            onCellKeyDown(event) {
              if (event.key === 'x') {
                event.preventDefault();
              }
            }
          }}
        />
      );
      userEvent.click(getCellsAtRowIndex(0)[1]);
      userEvent.keyboard('yz{enter}');
      expect(getCellsAtRowIndex(0)[1]).toHaveTextContent(/^a1yz$/);
      userEvent.keyboard('x');
      expect(screen.queryByLabelText('col2-editor')).not.toBeInTheDocument();
    });

    it('should prevent navigation if onNavigation returns false', () => {
      render(
        <EditorTest
          editorOptions={{
            onNavigation(event) {
              return event.key === 'ArrowDown';
            }
          }}
        />
      );
      userEvent.dblClick(getCellsAtRowIndex(0)[1]);
      userEvent.keyboard('a{arrowleft}b{arrowright}c{arrowdown}'); // should commit changes on arrowdown
      expect(getCellsAtRowIndex(0)[1]).toHaveTextContent(/^a1bac$/);
    });
  });
});

interface EditorTestProps extends Pick<Column<Row>, 'editorOptions' | 'editable'> {
  onSave?: (rows: readonly Row[]) => void;
  gridRows?: readonly Row[];
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

function EditorTest({ editable, editorOptions, onSave, gridRows = initialRows }: EditorTestProps) {
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
        editor(p) {
          return (
            <input
              autoFocus
              aria-label="col2-editor"
              value={p.row.col2}
              onChange={(e) => p.onRowChange({ ...p.row, col2: e.target.value })}
            />
          );
        },
        editorOptions
      }
    ];
  }, [editable, editorOptions]);

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
      <DataGrid columns={columns} rows={rows} onRowsChange={setRows} />
    </StrictMode>
  );
}
