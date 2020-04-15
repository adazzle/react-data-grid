import React, { createElement } from 'react';
import classNames from 'classnames';

import { CalculatedColumn, Filters } from './common/types';
import { DataGridProps } from './DataGrid';

type SharedDataGridProps<R, SR> = Pick<DataGridProps<R, never, SR>,
  | 'filters'
  | 'onFiltersChange'
  > & Pick<Required<DataGridProps<R, never, SR>>,
  | 'headerRowHeight'
>;

export interface FilterRowProps<R, SR> extends SharedDataGridProps<R, SR> {
  height: number;
  width: number;
  lastFrozenColumnIndex: number;
  columns: readonly CalculatedColumn<R, SR>[];
}

export default function FilterRow<R, SR>({
  headerRowHeight,
  height,
  width,
  columns,
  lastFrozenColumnIndex,
  filters,
  onFiltersChange
}: FilterRowProps<R, SR>) {
  function onChange(key: string, value: unknown) {
    const newFilters: Filters = { ...filters };
    newFilters[key] = value;
    onFiltersChange?.(newFilters);
  }

  return (
    <div
      className="rdg-header-row"
      style={{ top: headerRowHeight, width, height, lineHeight: `${height}px` }}
    >
      {columns.map(column => {
        const { key } = column;

        const className = classNames('rdg-cell', {
          'rdg-cell-frozen': column.frozen,
          'rdg-cell-frozen-last': column.idx === lastFrozenColumnIndex
        });
        const style: React.CSSProperties = {
          width: column.width,
          left: column.left
        };

        return (
          <div
            key={key}
            style={style}
            className={className}
          >
            {column.filterRenderer && createElement(column.filterRenderer, {
              column,
              value: filters?.[column.key],
              onChange: value => onChange(key, value)
            })}
          </div>
        );
      })}
    </div>
  );
}
