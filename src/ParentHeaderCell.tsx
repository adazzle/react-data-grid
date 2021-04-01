import type { CalculatedParentColumn } from './types';
import { getParentCellClassname, getParentCellStyle } from './utils';

export interface HeaderCellProps<R, SR> {
  column: CalculatedParentColumn<R, SR>;
}

export default function ParentHeaderCell<R, SR>({
  column
}: HeaderCellProps<R, SR>) {
  function getCell() {
    if (column.parentHeaderRenderer) {
      return (
        <column.parentHeaderRenderer
          column={column}
        />
      );
    }

    return column.name;
  }

  const className = getParentCellClassname(column, column.parentHeaderCellClass);

  return (
    <div
      role="columnheader"
      aria-colindex={column.idx + 1}
      className={className}
      style={getParentCellStyle(column)}
    >
      {getCell()}
    </div>
  );
}
