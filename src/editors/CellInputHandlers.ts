import { CellInputEvent } from '../common/types';

export function onTextCellInput<TRow>({ column, event: { key }, onChange }: CellInputEvent<TRow>): boolean | void {
  if (key.length === 1) {
    onChange({ [column.key]: key } as {}); // TODO: fix type
    return true;
  }

  if (key === 'Backspace' || key === 'Delete') {
    onChange({ [column.key]: '' } as {}); // TODO: fix type
    return true;
  }
}

export function onNumberCellInput<TRow>({ column, event: { key }, onChange }: CellInputEvent<TRow>): boolean | void {
  if (/^\d$/.test(key)) {
    onChange({ [column.key]: parseInt(key, 10) } as {}); // TODO: fix type
    return true;
  }

  if (key === 'Backspace' || key === 'Delete') {
    onChange({ [column.key]: 0 } as {}); // TODO: fix type
    return true;
  }
}
