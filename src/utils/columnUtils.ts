import type { CalculatedColumn } from '../types';

export function getColumnScrollPosition<R, SR>(columns: readonly CalculatedColumn<R, SR>[], idx: number, currentScrollLeft: number, currentClientWidth: number): number {
  let left = 0;
  let frozen = 0;

  for (let i = 0; i < idx; i++) {
    const column = columns[i];
    if (column) {
      if (column.width) {
        left += column.width;
      }
      if (column.frozen) {
        frozen += column.width;
      }
    }
  }

  const selectedColumn = columns[idx];
  if (selectedColumn) {
    const scrollLeft = left - frozen - currentScrollLeft;
    const scrollRight = left + selectedColumn.width - currentScrollLeft;

    if (scrollLeft < 0) {
      return scrollLeft;
    }
    if (scrollRight > currentClientWidth) {
      return scrollRight - currentClientWidth;
    }
  }

  return 0;
}

/**
 * By default, the following navigation keys are enabled while an editor is open, under specific conditions:
 * - Tab:
 *   - The editor must be an <input>, a <textarea>, or a <select> element.
 *   - The editor element must be the only immediate child of the editor container/a label.
 */
export function onEditorNavigation({ key, target }: React.KeyboardEvent<HTMLDivElement>): boolean {
  if (key === 'Tab' && (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement)) {
    return target.matches('.rdg-editor-container > :only-child, .rdg-editor-container > label:only-child > :only-child');
  }
  return false;
}
