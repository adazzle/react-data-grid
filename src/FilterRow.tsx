import type { Filters } from './types';
import { getCellStyle, getCellClassname } from './utils';
import { filterRowClassname } from './style';
import { useColumns } from './hooks';

export interface FilterRowProps {
  /** The height of the header filter row in pixels */
  height?: number;
  filters?: Readonly<Filters>;
  onFiltersChange?: (filters: Filters) => void;
}

export default function FilterRow<R, SR>({
  filters,
  onFiltersChange
}: FilterRowProps) {
  const columns = useColumns<R, SR>();
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

        return (
          <div
            key={key}
            className={getCellClassname(column)}
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
