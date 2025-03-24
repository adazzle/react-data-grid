import type { RenderCellProps } from '../../src';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function renderCoordinates(props: RenderCellProps<number, any>) {
  return `${props.column.key}×${props.row}`;
}
