import React from 'react';
import { FormatterProps } from '../common/types';

export function ValueFormatter<R>(props: FormatterProps<unknown, R>) {
  return <>{props.row[props.column.key]}</>;
}
