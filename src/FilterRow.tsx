import { memo } from 'react';

import { getCellStyle, getCellClassname } from './utils';
import type { CalculatedColumn, FilterRendererProps } from './types';
import { filterRowClassname } from './style';

type SharedFilterRendererProps<R, SR, FR> = Pick<
  FilterRendererProps<R, SR, FR>,
  'filterRow' | 'onFilterRowChange'
>;

interface FilterRowProps<R, SR, FR> extends SharedFilterRendererProps<R, SR, FR> {
  columns: readonly CalculatedColumn<R, SR, FR>[];
}

function FilterRow<R, SR, FR>({
  columns,
  filterRow,
  onFilterRowChange
}: FilterRowProps<R, SR, FR>) {
  return (
    <div role="row" aria-rowindex={2} className={filterRowClassname}>
      {columns.map((column) => (
        <div key={column.key} className={getCellClassname(column)} style={getCellStyle(column)}>
          {column.filterRenderer && (
            <column.filterRenderer
              column={column}
              filterRow={filterRow}
              onFilterRowChange={onFilterRowChange}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default memo(FilterRow) as <R, SR, FR>(props: FilterRowProps<R, SR, FR>) => JSX.Element;
