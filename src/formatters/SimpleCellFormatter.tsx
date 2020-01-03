import React from 'react';

export interface SimpleCellFormatterProps {
  value?: string | number | boolean;
}

export function SimpleCellFormatter({ value }: SimpleCellFormatterProps) {
  return <span title={String(value)}>{value}</span>;
}
