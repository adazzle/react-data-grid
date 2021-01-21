import { memo } from 'react';
import clsx from 'clsx';

import { getCellStyle } from './utils';
import type { CalculatedColumn, Filters } from './types';
import type { DataGridProps } from './DataGrid';
import { cellClassname, cellFrozenClassname, cellFrozenLastClassname, filterRowClassname } from './style';

type SharedDataGridProps<R, SR> = Pick<DataGridProps<R, SR>,
  | 'filters'
  | 'onFiltersChange'
>;

interface FilterRowProps<R, SR> extends SharedDataGridProps<R, SR> {
  columns: readonly CalculatedColumn<R, SR>[];
}

function FilterRow<R, SR>({
  columns,
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
      role="row"
      aria-rowindex={2}
      className={filterRowClassname}
    >
      {columns.map(column => {
        const { key } = column;
        const className = clsx(cellClassname, {
          [cellFrozenClassname]: column.frozen,
          [cellFrozenLastClassname]: column.isLastFrozenColumn
        });

        return (
          <div
            key={key}
            className={className}
            style={getCellStyle(column)}
          >
            {column.filterRenderer && (
              <column.filterRenderer
                column={column}
                value={filters?.[column.key]}
                onChange={value => onChange(key, value)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default memo(FilterRow) as <R, SR>(props: FilterRowProps<R, SR>) => JSX.Element;
