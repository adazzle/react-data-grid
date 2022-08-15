import { StrictMode, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DataGrid, { textEditor } from '../src';
import type { Column } from '../src';
import { getCells } from './utils';

interface Row {
  readonly name: string;
}

const columns: readonly Column<Row>[] = [{ key: 'name', name: 'Name', editor: textEditor }];
const initialRows: readonly Row[] = [{ name: 'Tacitus Kilgore' }];

function Test() {
  const [rows, setRows] = useState(initialRows);

  return <DataGrid columns={columns} rows={rows} onRowsChange={setRows} />;
}

test('TextEditor', async () => {
  render(
    <StrictMode>
      <Test />
    </StrictMode>
  );

  await userEvent.dblClick(getCells()[0]);
  let input: HTMLInputElement | null = screen.getByRole<HTMLInputElement>('textbox');
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
  input = null;
  expect(getCells()[0]).toHaveTextContent(/^Tacitus Kilgore$/);

  // blurring the input closes and commits the editor
  await userEvent.dblClick(getCells()[0]);
  input = screen.getByRole<HTMLInputElement>('textbox');
  await userEvent.keyboard('Jim Milton');
  fireEvent.blur(input);
  expect(input).not.toBeInTheDocument();
  expect(getCells()[0]).toHaveTextContent(/^Jim Milton$/);
});
