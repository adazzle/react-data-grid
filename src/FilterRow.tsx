import React, { createElement } from 'react';
import classNames from 'classnames';

import FilterableHeaderCell from './headerCells/FilterableHeaderCell';
import { CalculatedColumn, Filters } from './common/types';
import { DataGridProps } from './DataGrid';

type SharedDataGridProps<R, K extends keyof R> = Pick<DataGridProps<R, K>,
| 'filters'
| 'onFiltersChange'
>;

export interface FilterRowProps<R, K extends keyof R> extends SharedDataGridProps<R, K> {
  height: number;
  width: number;
  lastFrozenColumnIndex: number;
  columns: readonly CalculatedColumn<R>[];
  scrollLeft: number | undefined;
}

export default function FilterRow<R, K extends keyof R>({
  height,
  width,
  columns,
  lastFrozenColumnIndex,
  scrollLeft,
  filters,
  onFiltersChange
}: FilterRowProps<R, K>) {
  function onChange(key: keyof R, value: unknown) {
    const newFilters: Filters<R> = { ...filters };
    newFilters[key] = value;
    onFiltersChange?.(newFilters);
  }

  return (
    <div
      className="rdg-header-row"
      style={{ width, height, lineHeight: `${height}px` }}
    >
      {columns.map(column => {
        const { key } = column;

        const renderer = column.filterRenderer || FilterableHeaderCell;
        const className = classNames('rdg-cell', {
          'rdg-cell-frozen': column.frozen,
          'rdg-cell-frozen-last': column.idx === lastFrozenColumnIndex
        });
        const style: React.CSSProperties = {
          width: column.width,
          left: column.left
        };

        if (column.frozen && typeof scrollLeft === 'number') {
          style.transform = `translateX(${scrollLeft}px)`;
        }

        return (
          <div
            key={key as string}
            style={style}
            className={className}
          >
            {column.filterable && createElement(renderer, {
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
