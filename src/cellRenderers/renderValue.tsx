import type { RenderCellProps } from '../types';

export function renderValue<R, SR>(props: RenderCellProps<R, SR>) {
  try {
    return props.row[props.column.key as keyof R] as React.ReactNode;
  } catch {
    return null;
  }
}
