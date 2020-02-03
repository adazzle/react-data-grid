import { CellNavigationMode } from '../common/enums';
import { canEdit } from './columnUtils';
import { CalculatedColumn, Position, Range, Dimension } from '../common/types';

const zCellMask = 1;
const zFrozenCellMask = 3;

interface GetSelectedDimensionsOpts<R> {
  selectedPosition: Position;
  columns: readonly CalculatedColumn<R>[];
  rowHeight: number;
  scrollLeft: number;
}

export function getSelectedDimensions<R>({ selectedPosition: { idx, rowIdx }, columns, rowHeight, scrollLeft }: GetSelectedDimensionsOpts<R>): Dimension {
  if (idx < 0) {
    return { width: 0, left: 0, top: 0, height: rowHeight, zIndex: 1 };
  }
  const column = columns[idx];
  const { width } = column;
  const left = column.frozen ? column.left + scrollLeft : column.left;
  const top = rowIdx * rowHeight;
  const zIndex = column.frozen ? zFrozenCellMask : zCellMask;
  return { width, left, top, height: rowHeight, zIndex };
}

interface GetSelectedRangeDimensionsOpts<R> {
  selectedRange: Range;
  columns: readonly CalculatedColumn<R>[];
  rowHeight: number;
}

export function getSelectedRangeDimensions<R>({ selectedRange: { topLeft, bottomRight }, columns, rowHeight }: GetSelectedRangeDimensionsOpts<R>): Dimension {
  if (topLeft.idx < 0) {
    return { width: 0, left: 0, top: 0, height: rowHeight, zIndex: zCellMask };
  }

  let width = 0;
  let anyColFrozen = false;
  for (let i = topLeft.idx; i <= bottomRight.idx; i++) {
    const column = columns[i];
    width += column.width;
    if (column.frozen) anyColFrozen = true;
  }

  const { left } = columns[topLeft.idx];
  const top = topLeft.rowIdx * rowHeight;
  const height = (bottomRight.rowIdx - topLeft.rowIdx + 1) * rowHeight;
  const zIndex = anyColFrozen ? zFrozenCellMask : zCellMask;

  return { width, left, top, height, zIndex };
}

interface IsSelectedCellEditableOpts<R> {
  selectedPosition: Position;
  columns: readonly CalculatedColumn<R>[];
  rows: readonly R[];
  onCheckCellIsEditable?(arg: { row: R; column: CalculatedColumn<R> } & Position): boolean;
}

export function isSelectedCellEditable<R>({ selectedPosition, columns, rows, onCheckCellIsEditable }: IsSelectedCellEditableOpts<R>): boolean {
  const column = columns[selectedPosition.idx];
  const row = rows[selectedPosition.rowIdx];
  const isCellEditable = onCheckCellIsEditable ? onCheckCellIsEditable({ row, column, ...selectedPosition }) : true;
  return isCellEditable && canEdit<R>(column, row);
}

interface GetNextSelectedCellPositionOpts<R> {
  cellNavigationMode: CellNavigationMode;
  columns: readonly CalculatedColumn<R>[];
  rowsCount: number;
  nextPosition: Position;
}

export function getNextSelectedCellPosition<R>({ cellNavigationMode, columns, rowsCount, nextPosition }: GetNextSelectedCellPositionOpts<R>): Position {
  if (cellNavigationMode !== CellNavigationMode.NONE) {
    const { idx, rowIdx } = nextPosition;
    const columnsCount = columns.length;
    const isAfterLastColumn = idx === columnsCount;
    const isBeforeFirstColumn = idx === -1;

    if (isAfterLastColumn) {
      if (cellNavigationMode === CellNavigationMode.CHANGE_ROW) {
        const isLastRow = rowIdx === rowsCount - 1;
        if (!isLastRow) {
          return {
            idx: 0,
            rowIdx: rowIdx + 1
          };
        }
      } else if (cellNavigationMode === CellNavigationMode.LOOP_OVER_ROW) {
        return {
          rowIdx,
          idx: 0
        };
      }
    } else if (isBeforeFirstColumn) {
      if (cellNavigationMode === CellNavigationMode.CHANGE_ROW) {
        const isFirstRow = rowIdx === 0;
        if (!isFirstRow) {
          return {
            rowIdx: rowIdx - 1,
            idx: columnsCount - 1
          };
        }
      } else if (cellNavigationMode === CellNavigationMode.LOOP_OVER_ROW) {
        return {
          rowIdx,
          idx: columnsCount - 1
        };
      }
    }
  }

  return nextPosition;
}

interface CanExitGridOpts<R> {
  cellNavigationMode: CellNavigationMode;
  columns: readonly CalculatedColumn<R>[];
  rowsCount: number;
  selectedPosition: Position;
}

export function canExitGrid<R>(event: React.KeyboardEvent, { cellNavigationMode, columns, rowsCount, selectedPosition: { rowIdx, idx } }: CanExitGridOpts<R>): boolean {
  // When the cellNavigationMode is 'none' or 'changeRow', you can exit the grid if you're at the first or last cell of the grid
  // When the cellNavigationMode is 'loopOverRow', there is no logical exit point so you can't exit the grid
  if (cellNavigationMode === CellNavigationMode.NONE || cellNavigationMode === CellNavigationMode.CHANGE_ROW) {
    const atLastCellInRow = idx === columns.length - 1;
    const atFirstCellInRow = idx === 0;
    const atLastRow = rowIdx === rowsCount - 1;
    const atFirstRow = rowIdx === 0;
    const shift = event.shiftKey === true;

    return shift ? atFirstCellInRow && atFirstRow : atLastCellInRow && atLastRow;
  }

  return false;
}

export function selectedRangeIsSingleCell({ topLeft, bottomRight }: Range): boolean {
  return topLeft.idx === bottomRight.idx && topLeft.rowIdx === bottomRight.rowIdx;
}
