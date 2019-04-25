import { Column } from '../../common/types';

function createColumn(index: number): Column {
  const key = `Column${index}`;
  return {
    key,
    name: key,
    editable: true,
    width: 100,
    left: 100 * index
  };
}

export const createColumns = (count: number): Column[] =>
  Array(count).fill(null).map((_, i) => createColumn(i));

export const sel = (id: string): string => `[data-test="${id}"]`;
