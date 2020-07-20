import React from 'react';
import { FormatterProps } from '../types';

export function SimpleCellFormatter({ row, column }: FormatterProps) {
  const value = row[column.key];
  return <span title={String(value)}>{value}</span>;
}
