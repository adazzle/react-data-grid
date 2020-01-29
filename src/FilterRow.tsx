import React, { createElement } from 'react';
import classNames from 'classnames';

import { CalculatedColumn, Filters, ExtractIDKeys } from './common/types';
import { DataGridProps } from './DataGrid';

type SharedDataGridProps<R, K extends ExtractIDKeys<R>> = Pick<DataGridProps<R, K>,
| 'filters'
| 'onFiltersChange'
>;

export interface FilterRowProps<R, K extends ExtractIDKeys<R>> extends SharedDataGridProps<R, K> {
  height: number;
  width: number;
  lastFrozenColumnIndex: number;
  columns: readonly CalculatedColumn<R>[];
  scrollLeft: number | undefined;
}

export default function FilterRow<R, K extends ExtractIDKeys<R>>({
  height,
  width,
  columns,
  lastFrozenColumnIndex,
  scrollLeft,
  filters,
  onFiltersChange
}: FilterRowProps<R, K>) {
  function onChange(key: ExtractIDKeys<R>, value: unknown) {
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
