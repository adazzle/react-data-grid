import { StrictMode, useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DataGrid, { TextEditor } from '../../src';
import type { Column } from '../../src';
import { getCellsAtRowIndex } from '../utils';

interface Row {
  col1: number;
  col2: string;
  col3: string;
  col4: string;
}
const columns: readonly Column<Row | null>[] = [
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
  { key: 'col2', name: 'Col2', editor: TextEditor },
  { key: 'col3', name: 'Col3', editor: TextEditor, editable: false },
  {
    key: 'col4',
    name: 'Col4',
    editor(p) {
      return (
        <select
          aria-label="col4-editor"
          value={p.row.col4}
          onChange={(e) => p.onRowChange({ ...p.row, col4: e.target.value })}
        >
          <option value="option1">option 1</option>
          <option value="option2">option 2</option>
          <option value="option3">option 3</option>
          <option value="option4">option 4</option>
        </select>
      );
    },
    editorOptions: {
      editOnClick: true
    }
  }
];

function EditorTest() {
  const [rows, setRows] = useState<readonly Row[]>(() => {
    return [{ col1: 1, col2: 'abc', col3: 'def', col4: '' }];
  });

  return (
    <StrictMode>
      <DataGrid columns={columns} rows={rows} onRowsChange={setRows} />
    </StrictMode>
  );
}

describe('Editor', () => {
  it('should open editor on double click', () => {
    render(<EditorTest />);
    // col1 is editable because editor is specified
    userEvent.dblClick(getCellsAtRowIndex(0)[0]);
    expect(screen.getByLabelText('col1-editor')).toHaveValue(1);
    // editor should be be focused when opened
    userEvent.type(document.activeElement!, '2');
    userEvent.tab();
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
});
