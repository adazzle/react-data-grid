import type { CalculatedColumn, Position, GroupRow, CellNavigationMode } from '../types';
import { getColSpan } from './colSpanUtils';

interface IsSelectedCellEditableOpts<R, SR> {
  selectedPosition: Position;
  columns: readonly CalculatedColumn<R, SR>[];
  rows: readonly (R | GroupRow<R>)[];
  isGroupRow: (row: R | GroupRow<R>) => row is GroupRow<R>;
}

export function isSelectedCellEditable<R, SR>({ selectedPosition, columns, rows, isGroupRow }: IsSelectedCellEditableOpts<R, SR>): boolean {
  const column = columns[selectedPosition.idx];
  const row = rows[selectedPosition.rowIdx];
  return column.editor != null
    && !column.rowGroup
    && !isGroupRow(row)
    && (typeof column.editable === 'function' ? column.editable(row) : column.editable) !== false;
}

interface GetNextSelectedCellPositionOpts<R, SR> {
  cellNavigationMode: CellNavigationMode;
  columns: readonly CalculatedColumn<R, SR>[];
  colSpanColumns: readonly CalculatedColumn<R, SR>[];
  rows: readonly (R | GroupRow<R>)[];
  currentPosition: Readonly<Position>;
  nextPosition: Position;
  lastFrozenColumnIndex: number;
  isCellWithinBounds: (position: Position) => boolean;
  isGroupRow: (row: R | GroupRow<R>) => row is GroupRow<R>;
}

export function getNextSelectedCellPosition<R, SR>({
  cellNavigationMode,
  columns,
  colSpanColumns,
  rows,
  currentPosition,
  nextPosition,
  lastFrozenColumnIndex,
  isCellWithinBounds,
  isGroupRow
}: GetNextSelectedCellPositionOpts<R, SR>): Position {
  const rowsCount = rows.length;
  let position = nextPosition;

  const setColSpan = (moveRight: boolean) => {
    const row = rows[position.rowIdx];
    if (!isGroupRow(row)) {
      // If a cell within the colspan range is selected then move to the
      // previous or the next cell depending on the navigation direction
      const posIdx = position.idx;
      for (const column of colSpanColumns) {
        const colIdx = column.idx;
        if (colIdx > posIdx) break;
        const colSpan = getColSpan<R, SR>(column, lastFrozenColumnIndex, { type: 'ROW', row });
        if (colSpan && posIdx > colIdx && posIdx < colSpan + colIdx) {
          position.idx = colIdx + (moveRight ? colSpan : 0);
          break;
        }
      }
    }
  };

  if (isCellWithinBounds(position)) {
    setColSpan(position.idx - currentPosition.idx > 0);
  }

  if (cellNavigationMode !== 'NONE') {
    const { idx, rowIdx } = nextPosition;
    const columnsCount = columns.length;
    const isAfterLastColumn = idx === columnsCount;
    const isBeforeFirstColumn = idx === -1;

    if (isAfterLastColumn) {
      if (cellNavigationMode === 'CHANGE_ROW') {
        const isLastRow = rowIdx === rowsCount - 1;
        if (!isLastRow) {
          position = {
            idx: 0,
            rowIdx: rowIdx + 1
          };
        }
      } else {
        position = {
          rowIdx,
          idx: 0
        };
      }
      setColSpan(true);
    } else if (isBeforeFirstColumn) {
      if (cellNavigationMode === 'CHANGE_ROW') {
        const isFirstRow = rowIdx === 0;
        if (!isFirstRow) {
          position = {
            rowIdx: rowIdx - 1,
            idx: columnsCount - 1
          };
        }
      } else {
        position = {
          rowIdx,
          idx: columnsCount - 1
        };
      }
    }
    setColSpan(false);
  }

  return position;
}

interface CanExitGridOpts<R, SR> {
  cellNavigationMode: CellNavigationMode;
  columns: readonly CalculatedColumn<R, SR>[];
  rowsCount: number;
  selectedPosition: Position;
  shiftKey: boolean;
}

export function canExitGrid<R, SR>({ cellNavigationMode, columns, rowsCount, selectedPosition: { rowIdx, idx }, shiftKey }: CanExitGridOpts<R, SR>): boolean {
  // When the cellNavigationMode is 'none' or 'changeRow', you can exit the grid if you're at the first or last cell of the grid
  // When the cellNavigationMode is 'loopOverRow', there is no logical exit point so you can't exit the grid
  if (cellNavigationMode === 'NONE' || cellNavigationMode === 'CHANGE_ROW') {
    const atLastCellInRow = idx === columns.length - 1;
    const atFirstCellInRow = idx === 0;
    const atLastRow = rowIdx === rowsCount - 1;
    const atFirstRow = rowIdx === 0;

    return shiftKey ? atFirstCellInRow && atFirstRow : atLastCellInRow && atLastRow;
  }

  return false;
}
