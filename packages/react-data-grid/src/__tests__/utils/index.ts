import { valueCellContentRenderer } from '../../Cell/cellContentRenderers';
import { CalculatedColumn } from '../../common/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createColumn(index: number): CalculatedColumn<{ [key: string]: any }> {
  const key = `Column${index}`;
  return {
    key,
    name: key,
    editable: true,
    idx: index,
    width: 100,
    left: 100 * index,
    cellContentRenderer: valueCellContentRenderer
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createColumns = (count: number): CalculatedColumn<{ [key: string]: any }>[] =>
  Array(count).fill(null).map((_, i) => createColumn(i));

export const sel = (id: string): string => `[data-test="${id}"]`;
