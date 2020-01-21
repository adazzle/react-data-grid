import { CellInputEvent } from '../common/types';

export function onTextCellInput<TRow>({ column, event: { key }, onChange }: CellInputEvent<TRow>): boolean {
  if (key.length === 1) {
    onChange({ [column.key]: key } as {}); // TODO: fix type
    return true;
  }

  if (key === 'Backspace' || key === 'Delete') {
    onChange({ [column.key]: '' } as {}); // TODO: fix type
    return true;
  }

  return key === 'Enter';
}
