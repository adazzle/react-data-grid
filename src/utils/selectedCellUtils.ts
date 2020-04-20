import { CellNavigationMode } from '../common/enums';
import { canEdit } from './columnUtils';
import { CalculatedColumn, Position, Dimension } from '../common/types';

// above unfrozen cells, below frozen cells
const zCellMask = 1;
// above frozen cells, below header/filter/summary rows
const zFrozenCellMask = 2;

interface GetSelectedDimensionsOpts<R, SR> {
  selectedPosition: Position;
  columns: readonly CalculatedColumn<R, SR>[];
  rowHeight: number;
  scrollLeft: number;
}

export function getSelectedDimensions<R, SR>({ selectedPosition: { idx, rowIdx }, columns, rowHeight, scrollLeft }: GetSelectedDimensionsOpts<R, SR>): Dimension {
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

interface IsSelectedCellEditableOpts<R, SR> {
  selectedPosition: Position;
  columns: readonly CalculatedColumn<R, SR>[];
  rows: readonly R[];
  onCheckCellIsEditable?: (arg: { row: R; column: CalculatedColumn<R, SR> } & Position) => boolean;
}

export function isSelectedCellEditable<R, SR>({ selectedPosition, columns, rows, onCheckCellIsEditable }: IsSelectedCellEditableOpts<R, SR>): boolean {
  const column = columns[selectedPosition.idx];
  const row = rows[selectedPosition.rowIdx];
  const isCellEditable = onCheckCellIsEditable ? onCheckCellIsEditable({ row, column, ...selectedPosition }) : true;
  return isCellEditable && canEdit<R, SR>(column, row);
}

interface GetNextSelectedCellPositionOpts<R, SR> {
  cellNavigationMode: CellNavigationMode;
  columns: readonly CalculatedColumn<R, SR>[];
  rowsCount: number;
  nextPosition: Position;
}

export function getNextSelectedCellPosition<R, SR>({ cellNavigationMode, columns, rowsCount, nextPosition }: GetNextSelectedCellPositionOpts<R, SR>): Position {
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

interface CanExitGridOpts<R, SR> {
  cellNavigationMode: CellNavigationMode;
  columns: readonly CalculatedColumn<R, SR>[];
  rowsCount: number;
  selectedPosition: Position;
}

export function canExitGrid<R, SR>(event: React.KeyboardEvent, { cellNavigationMode, columns, rowsCount, selectedPosition: { rowIdx, idx } }: CanExitGridOpts<R, SR>): boolean {
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
