import React from 'react';

export interface SimpleCellFormatterProps {
  value: string | number | boolean;
}

export function SimpleCellFormatter({ value }: SimpleCellFormatterProps) {
  return <div title={String(value)}>{value}</div>;
}
