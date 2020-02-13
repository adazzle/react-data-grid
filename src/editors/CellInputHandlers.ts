import { isKeyPrintable } from '../utils';

export function legacyCellInput(event: React.KeyboardEvent<HTMLDivElement>) {
  return isKeyPrintable(event.keyCode) || ['Backspace', 'Delete'].includes(event.key);
}
