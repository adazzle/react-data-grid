import { memo } from 'react';
import clsx from 'clsx';

import { getCellStyle } from './utils';
import type { CalculatedColumn, FilterRendererProps } from './types';

type SharedDataGridProps<R, SR, FR> = Pick<FilterRendererProps<R, SR, FR>,
  | 'filterRow'
  | 'onFilterRowChange'
>;

interface FilterRowProps<R, SR, FR> extends SharedDataGridProps<R, SR, FR> {
  columns: readonly CalculatedColumn<R, SR, FR>[];
}

function FilterRow<R, SR, FR>({
  columns,
  filterRow,
  onFilterRowChange
}: FilterRowProps<R, SR, FR>) {
  return (
    <div
      role="row"
      aria-rowindex={2}
      className="rdg-filter-row"
    >
      {columns.map(column => {
        const { key } = column;
        const className = clsx('rdg-cell', {
          'rdg-cell-frozen': column.frozen,
          'rdg-cell-frozen-last': column.isLastFrozenColumn
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
                filterRow={filterRow}
                onFilterRowChange={onFilterRowChange}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default memo(FilterRow) as <R, SR, FR>(props: FilterRowProps<R, SR, FR>) => JSX.Element;
