import type { FormatterProps } from '../types';

export function renderValue<R, SR>(props: FormatterProps<R, SR>) {
  try {
    return props.row[props.column.key as keyof R] as React.ReactNode;
  } catch {
    return null;
  }
}
