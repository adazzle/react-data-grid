import React, { createElement } from 'react';
import classNames from 'classnames';

import { CalculatedColumn, Filters } from './common/types';
import { CanvasProps } from './Canvas';

type SharedCanvasProps<R, SR> = Pick<CanvasProps<R, never, SR>,
  | 'filters'
  | 'onFiltersChange'
  | 'headerRowHeight'
>;

export interface FilterRowProps<R, SR> extends SharedCanvasProps<R, SR> {
  height: number;
  width: number;
  lastFrozenColumnIndex: number;
  columns: readonly CalculatedColumn<R, SR>[];
  scrollLeft: number | undefined;
}

export default function FilterRow<R, SR>({
  headerRowHeight,
  height,
  width,
  columns,
  lastFrozenColumnIndex,
  scrollLeft,
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

        if (column.frozen && typeof scrollLeft === 'number') {
          style.transform = `translateX(${scrollLeft}px)`;
        }

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
