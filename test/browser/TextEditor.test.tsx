import { useState } from 'react';
import { page, userEvent } from '@vitest/browser/context';

import { DataGrid, textEditor } from '../../src';
import type { Column } from '../../src';
import { getCells } from './utils';

interface Row {
  readonly name: string;
}

const columns: readonly Column<Row>[] = [
  {
    key: 'name',
    name: 'Name',
    renderEditCell: textEditor,
    editorOptions: {
      commitOnOutsideClick: false
    }
  }
];
const initialRows: readonly Row[] = [{ name: 'Tacitus Kilgore' }];

function Test() {
  const [rows, setRows] = useState(initialRows);

  return <DataGrid columns={columns} rows={rows} onRowsChange={setRows} />;
}

test('TextEditor', async () => {
  page.render(<Test />);

  await userEvent.dblClick(getCells()[0]);
  let input = page.getByRole('textbox').element() as HTMLInputElement;
  expect(input).toHaveClass('rdg-text-editor');
  // input value is row[column.key]
  expect(input).toHaveValue(initialRows[0].name);
  // input is focused
  expect(input).toHaveFocus();
  // input value is fully selected
  expect(input.selectionStart).toBe(0);
  expect(input.selectionEnd).toBe(initialRows[0].name.length);

  // pressing escape closes the editor without committing
  await userEvent.keyboard('Test{escape}');
  expect(input).not.toBeInTheDocument();
  await expect.element(getCells()[0]).toHaveTextContent(/^Tacitus Kilgore$/);

  // blurring the input closes and commits the editor
  await userEvent.dblClick(getCells()[0]);
  input = page.getByRole('textbox').element() as HTMLInputElement;
  await userEvent.fill(input, 'Jim Milton');
  await userEvent.tab();
  expect(input).not.toBeInTheDocument();
  await expect.element(getCells()[0]).toHaveTextContent(/^Jim Milton$/);
});
