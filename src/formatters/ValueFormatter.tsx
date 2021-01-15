import type { FormatterProps } from '../types';

export function ValueFormatter<R, SR, FR>(props: FormatterProps<R, SR, FR>) {
  try {
    return <>{props.row[props.column.key as keyof R]}</>;
  } catch {
    return null;
  }
}
