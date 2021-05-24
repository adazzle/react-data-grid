import { StrictMode, useMemo, useState } from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DataGrid, { TextEditor } from '../../src';
import type { Column } from '../../src';
import { getCellsAtRowIndex } from '../utils';

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
    expect(getCellsAtRowIndex(0)[0]).toHaveTextContent('2');
  });

  it('should open and commit changes on enter', () => {
    render(<EditorTest />);
    userEvent.click(getCellsAtRowIndex(0)[0]);
    expect(screen.queryByLabelText('col1-editor')).not.toBeInTheDocument();
    userEvent.type(document.activeElement!, '{enter}');
    expect(screen.getByLabelText('col1-editor')).toHaveValue(1);
    userEvent.type(document.activeElement!, '3');
    userEvent.tab();
    expect(getCellsAtRowIndex(0)[0]).toHaveTextContent('3');
  });

  it('should open editor when user types', () => {
    render(<EditorTest />);
    userEvent.click(getCellsAtRowIndex(0)[0]);
    userEvent.type(document.activeElement!, '123{enter}');
    expect(getCellsAtRowIndex(0)[0]).toHaveTextContent('123');
  });

  it('should close editor and discard changes on escape', () => {
    render(<EditorTest />);
    userEvent.dblClick(getCellsAtRowIndex(0)[0]);
    expect(screen.getByLabelText('col1-editor')).toHaveValue(1);
    userEvent.type(document.activeElement!, '2222{escape}');
    expect(screen.queryByLabelText('col1-editor')).not.toBeInTheDocument();
    expect(getCellsAtRowIndex(0)[0]).toHaveTextContent('1');
  });

  it('should commit changes and close editor when clicked outside', async () => {
    render(<EditorTest />);
    userEvent.dblClick(getCellsAtRowIndex(0)[0]);
    expect(screen.getByLabelText('col1-editor')).toHaveValue(1);
    userEvent.type(document.activeElement!, '2222');
    userEvent.click(screen.getByText('outside'));
    await waitForElementToBeRemoved(screen.queryByLabelText('col1-editor'));
    expect(getCellsAtRowIndex(0)[0]).toHaveTextContent('2222');
  });

  describe('editable', () => {
    it('should be editable if an editor is specified and editable is undefined/null', () => {
      render(<EditorTest />);
      userEvent.dblClick(getCellsAtRowIndex(0)[1]);
      expect(document.querySelector('input')).toBeInTheDocument();
    });

    it('should be editable if an editor is specified and editable is set to true', () => {
      render(<EditorTest editable />);
      userEvent.dblClick(getCellsAtRowIndex(0)[1]);
      expect(document.querySelector('input')).toBeInTheDocument();
    });

    it('should not be editable if editable is false', () => {
      render(<EditorTest editable={false} />);
      userEvent.dblClick(getCellsAtRowIndex(0)[1]);
      expect(document.querySelector('input')).not.toBeInTheDocument();
    });

    it('should not be editable if editable function returns false', () => {
      render(<EditorTest editable={(row) => row.col1 === 2} />);
      userEvent.dblClick(getCellsAtRowIndex(0)[1]);
      expect(document.querySelector('input')).not.toBeInTheDocument();

      userEvent.dblClick(getCellsAtRowIndex(1)[1]);
      expect(document.querySelector('input')).toBeInTheDocument();
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
      expect(document.querySelector('input')).toBeInTheDocument();
    });

    it('should render the editor in a portal if createPortal is true', () => {
      render(
        <EditorTest
          editorOptions={{
            createPortal: true
          }}
        />
      );
      userEvent.dblClick(getCellsAtRowIndex(0)[1]);
      expect(document.querySelector('input')!.parentElement).toBe(document.body);
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
      userEvent.type(document.activeElement!, 'yz{enter}');
      expect(getCellsAtRowIndex(0)[1]).toHaveTextContent('yz');
      userEvent.type(document.activeElement!, 'x');
      expect(document.querySelector('input')).not.toBeInTheDocument();
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
      userEvent.type(document.activeElement!, 'a{arrowleft}b{arrowright}c{arrowdown}'); // should commit changes on arrowdown
      expect(getCellsAtRowIndex(0)[1]).toHaveTextContent('bac');
    });
  });
});

function EditorTest({ editable, editorOptions }: Pick<Column<Row>, 'editorOptions' | 'editable'>) {
  const [rows, setRows] = useState((): readonly Row[] => {
    return [
      {
        col1: 1,
        col2: 'a1'
      },
      {
        col1: 2,
        col2: 'a2'
      }
    ];
  });

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
        editor: TextEditor,
        editorOptions
      }
    ];
  }, [editable, editorOptions]);

  return (
    <StrictMode>
      <div>outside</div>
      <DataGrid columns={columns} rows={rows} onRowsChange={setRows} />
    </StrictMode>
  );
}
