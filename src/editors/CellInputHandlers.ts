import { isKeyPrintable } from '../utils';

export function defaultCellInput({ key }: React.KeyboardEvent<HTMLDivElement>): boolean {
  return key === 'Enter';
}

export function legacyCellInput({ key, keyCode }: React.KeyboardEvent<HTMLDivElement>): boolean {
  return isKeyPrintable(keyCode) || ['Enter', 'Backspace', 'Delete'].includes(key);
}

export function onNumberCellInput({ key }: React.KeyboardEvent<HTMLDivElement>): boolean {
  return /^\d$/.test(key) || key === '-' || key === '.';
}
