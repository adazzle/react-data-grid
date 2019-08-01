import React from 'react';
import { isElement, isValidElementType } from 'react-is';
import { ColumnList } from './common/types';
import { ReactDataGridProps } from './ReactDataGrid';

export interface ToolbarProps<R> {
  columns: ColumnList<R>;
  rowsCount: number;
  onToggleFilter(): void;
}

type ToolbarContainerProps<R extends {}> = ToolbarProps<R> & Pick<ReactDataGridProps<R>, 'toolbar'>;

export default function ToolbarContainer<R extends {}>({ toolbar, columns, rowsCount, onToggleFilter }: ToolbarContainerProps<R>) {
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
