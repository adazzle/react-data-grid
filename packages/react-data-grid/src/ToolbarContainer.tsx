import React from 'react';
import { isElement, isValidElementType } from 'react-is';
import { ColumnList } from './common/types';
import { ReactDataGridProps } from './ReactDataGrid';

export interface ToolbarProps {
  columns: ColumnList;
  rowsCount: number;
  onToggleFilter(): void;
}

type ToolbarContainerProps = ToolbarProps & Pick<ReactDataGridProps, 'toolbar'>;

export default function ToolbarContainer({ toolbar, columns, rowsCount, onToggleFilter }: ToolbarContainerProps) {
  if (!toolbar) {
    return null;
  }

  const toolBarProps = { columns, onToggleFilter, rowsCount };

  if (isElement(toolbar)) {
    return React.cloneElement(toolbar, toolBarProps);
  }

  if (isValidElementType(toolbar)) {
    return React.createElement(toolbar, toolBarProps);
  }

  return null;
}
