import { css } from '@linaria/core';
import type { EditorProps } from '../types';

const textEditor = css`
  appearance: none;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0px 6px 0 6px;
  border: 2px solid #ccc;
  vertical-align: top;
  color: var(--color);
  background-color: var(--background-color);

  font-family: inherit;
  font-size: var(--font-size);

  &:focus {
    border-color: var(--selection-color);
    outline: none;
  }

  &::placeholder {
    color: #999;
    opacity: 1;
  }
`;

export const textEditorClassname = `rdg-text-editor ${textEditor}`;

function autoFocusAndSelect(input: HTMLInputElement | null) {
  input?.focus();
  input?.select();
}

export default function TextEditor<TRow, TSummaryRow = unknown>({
  row,
  column,
  onRowChange,
  onClose
}: EditorProps<TRow, TSummaryRow>) {
  return (
    <input
      className={textEditorClassname}
      ref={autoFocusAndSelect}
      value={row[column.key as keyof TRow] as unknown as string}
      onChange={event => onRowChange({ ...row, [column.key]: event.target.value })}
      onBlur={() => onClose(true)}
    />
  );
}
