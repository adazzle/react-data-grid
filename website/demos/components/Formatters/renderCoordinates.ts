import type { FormatterProps } from '../../../../src';

export function renderCoordinates(props: FormatterProps<number>) {
  return `${props.column.key}×${props.row}`;
}
