import React, { createElement, memo } from 'react';
import clsx from 'clsx';

import { CalculatedColumn, Filters } from './common/types';
import { DataGridProps } from './DataGrid';

type SharedDataGridProps<R, SR> = Pick<DataGridProps<R, never, SR>,
  | 'filters'
  | 'onFiltersChange'
>;

export interface FilterRowProps<R, SR> extends SharedDataGridProps<R, SR> {
  lastFrozenColumnIndex: number;
  columns: readonly CalculatedColumn<R, SR>[];
}

function FilterRow<R, SR>({
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
    <div className="rdg-filter-row">
      {columns.map(column => {
        const { key } = column;

        const className = clsx('rdg-cell', {
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

export default memo(FilterRow) as <R, SR>(props: FilterRowProps<R, SR>) => JSX.Element;
