import {memo, useMemo} from 'react';
import clsx from 'clsx';
import {css} from '@linaria/core';

import HeaderCell from './HeaderCell';
import {getColSpan} from './utils';
import {useRovingRowRef} from './hooks';
import type { CalculatedColumn } from './types';
import {DataGridProps} from "./DataGridProps";

type SharedDataGridProps<R, SR, K extends React.Key> = Pick<
  DataGridProps<R, SR, K>,
  'sortColumns' | 'onSortColumnsChange' | 'onHeaderContextMenu'
>;

export interface HeaderRowProps<R, SR, K extends React.Key> extends SharedDataGridProps<R, SR, K> {
  columns: readonly CalculatedColumn<R, SR>[];
  allRowsSelected: boolean;
  onAllRowsSelectionChange: (checked: boolean) => void;
  onColumnResize: (column: CalculatedColumn<R, SR>, width: number) => void;
  selectCell: (columnIdx: number) => void;
  lastFrozenColumnIndex: number;
  selectedCellIdx: number | undefined;
  shouldFocusGrid: boolean;
  left:number;
}

const headerRow = css`
  contain: strict;
  contain: size layout style paint;
  display: grid;
  grid-template-columns: var(--rdg-template-columns);
  grid-template-rows: var(--rdg-header-row-height);
  height: var(--rdg-header-row-height); /* needed on Firefox */
  line-height: var(--rdg-header-row-height);
  width: var(--rdg-row-width);
  position: absolute;
  top: 0;
  background-color: var(--rdg-header-background-color);
  font-weight: bold;
  z-index: 3;
  outline: none;

  &[aria-selected='true'] {
    box-shadow: inset 0 0 0 2px var(--rdg-selection-color);
  }
`;

const headerRowClassname = `rdg-header-row ${headerRow}`;

function HeaderRow<R, SR, K extends React.Key>({
  columns,
  allRowsSelected,
  onAllRowsSelectionChange,
  onColumnResize,
  sortColumns,
  onSortColumnsChange,
  lastFrozenColumnIndex,
  selectedCellIdx,
  selectCell,
  shouldFocusGrid,
    left,
  onHeaderContextMenu
}: HeaderRowProps<R, SR, K>) {
  const { ref, tabIndex, className } = useRovingRowRef(selectedCellIdx);

    const cells = useMemo(() => {
        const cells = [];
        for (let index = 0; index < columns.length; index++) {
            const column = columns[index];
            const colSpan = getColSpan(column, lastFrozenColumnIndex, {type: 'HEADER'});
            if (colSpan !== undefined) {
                index += colSpan - 1;
            }

            cells.push(
                <HeaderCell<R, SR>
                    key={column.key}
                    column={column}
                    colSpan={colSpan}
                    isCellSelected={false} //Header cell cannot be selected
                    onColumnResize={onColumnResize}
                    allRowsSelected={allRowsSelected}
                    onAllRowsSelectionChange={onAllRowsSelectionChange}
                    onSortColumnsChange={onSortColumnsChange}
                    sortColumns={sortColumns}
                    selectCell={selectCell}
                    shouldFocusGrid={shouldFocusGrid && index === 0}
                />
            );
        }
        return cells;
    }, [columns.length, columns]);

  return (
    <div
      role="row"
      aria-rowindex={1} // aria-rowindex is 1 based
      ref={ref}
      tabIndex={tabIndex}
      className={clsx(headerRowClassname, className)}
      style={{left:left}}
      onContextMenu={onHeaderContextMenu}
    >
      {cells}
    </div>
  );
}

export default memo(HeaderRow) as <R, SR, K extends React.Key>(
  props: HeaderRowProps<R, SR, K>
) => JSX.Element;
