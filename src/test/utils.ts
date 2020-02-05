import { ValueFormatter } from '../formatters';
import { CalculatedColumn } from '../common/types';

function createColumn(index: number): CalculatedColumn<{ [key: string]: React.ReactNode }, never> {
  const key = `Column${index}`;
  return {
    key,
    name: key,
    editable: true,
    idx: index,
    width: 100,
    left: 100 * index,
    formatter: ValueFormatter
  };
}

export const createColumns = (count: number): CalculatedColumn<{ [key: string]: React.ReactNode }, never>[] =>
  Array(count).fill(null).map((_, i) => createColumn(i));

export const sel = (id: string): string => `[data-test="${id}"]`;
