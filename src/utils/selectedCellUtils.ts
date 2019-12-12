import { CellNavigationMode, Z_INDEXES } from '../common/enums';
import { isFrozen, canEdit } from './columnUtils';
import { CalculatedColumn, Position, Range, Dimension, RowGetter } from '../common/types';

const getRowTop = (rowIdx: number, rowHeight: number): number => rowIdx * rowHeight;

interface getSelectedDimensionsOpts<R> {
  selectedPosition: Position;
  columns: CalculatedColumn<R>[];
  rowHeight: number;
  scrollLeft: number;
}

export function getSelectedDimensions<R>({ selectedPosition: { idx, rowIdx }, columns, rowHeight, scrollLeft }: getSelectedDimensionsOpts<R>): Dimension {
  if (idx < 0) {
    return { width: 0, left: 0, top: 0, height: rowHeight, zIndex: 1 };
  }
  const column = columns[idx];
  const frozen = isFrozen(column);
  const { width } = column;
  const left = frozen ? column.left + scrollLeft : column.left;
  const top = getRowTop(rowIdx, rowHeight);
  const zIndex = frozen ? Z_INDEXES.FROZEN_CELL_MASK : Z_INDEXES.CELL_MASK;
  return { width, left, top, height: rowHeight, zIndex };
}

interface getSelectedRangeDimensionsOpts<R> {
  selectedRange: Range;
  columns: CalculatedColumn<R>[];
  rowHeight: number;
}

export function getSelectedRangeDimensions<R>({ selectedRange: { topLeft, bottomRight }, columns, rowHeight }: getSelectedRangeDimensionsOpts<R>): Dimension {
  if (topLeft.idx < 0) {
    return { width: 0, left: 0, top: 0, height: rowHeight, zIndex: Z_INDEXES.CELL_MASK };
  }

  let width = 0;
  let anyColFrozen = false;
  for (let i = topLeft.idx; i <= bottomRight.idx; i++) {
    const column = columns[i];
    width += column.width;
    anyColFrozen = anyColFrozen || isFrozen(column);
  }

  const { left } = columns[topLeft.idx];
  const top = getRowTop(topLeft.rowIdx, rowHeight);
  const height = (bottomRight.rowIdx - topLeft.rowIdx + 1) * rowHeight;
  const zIndex = anyColFrozen ? Z_INDEXES.FROZEN_CELL_MASK : Z_INDEXES.CELL_MASK;

  return { width, left, top, height, zIndex };
}

interface getSelectedCellValueOpts<R> {
  selectedPosition: Position;
  columns: CalculatedColumn<R>[];
  rowGetter: RowGetter<R>;
}

export function getSelectedCellValue<R>({ selectedPosition, columns, rowGetter }: getSelectedCellValueOpts<R>) {
  const column = columns[selectedPosition.idx];
  const row = rowGetter(selectedPosition.rowIdx);

  return row && column ? row[column.key] : null;
}

interface isSelectedCellEditableOpts<R> {
  enableCellSelect: boolean;
  selectedPosition: Position;
  columns: CalculatedColumn<R>[];
  rowGetter: RowGetter<R>;
  onCheckCellIsEditable?(arg: { row: R; column: CalculatedColumn<R> } & Position): boolean;
}

export function isSelectedCellEditable<R>({ enableCellSelect, selectedPosition, columns, rowGetter, onCheckCellIsEditable }: isSelectedCellEditableOpts<R>): boolean {
  const column = columns[selectedPosition.idx];
  const row = rowGetter(selectedPosition.rowIdx);
  const isCellEditable = onCheckCellIsEditable ? onCheckCellIsEditable({ row, column, ...selectedPosition }) : true;
  return isCellEditable && canEdit<R>(column, row, enableCellSelect);
}

interface getNextSelectedCellPositionOpts<R> {
  cellNavigationMode: CellNavigationMode;
  columns: CalculatedColumn<R>[];
  rowsCount: number;
  nextPosition: Position;
}

export interface NextSelectedCellPosition extends Position {
  changeRowOrColumn: boolean;
}

export function getNextSelectedCellPosition<R>({ cellNavigationMode, columns, rowsCount, nextPosition }: getNextSelectedCellPositionOpts<R>): NextSelectedCellPosition {
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
            rowIdx: rowIdx + 1,
            changeRowOrColumn: true
          };
        }
      } else if (cellNavigationMode === CellNavigationMode.LOOP_OVER_ROW) {
        return {
          rowIdx,
          idx: 0,
          changeRowOrColumn: true
        };
      }
    } else if (isBeforeFirstColumn) {
      if (cellNavigationMode === CellNavigationMode.CHANGE_ROW) {
        const isFirstRow = rowIdx === 0;
        if (!isFirstRow) {
          return {
            rowIdx: rowIdx - 1,
            idx: columnsCount - 1,
            changeRowOrColumn: true
          };
        }
      } else if (cellNavigationMode === CellNavigationMode.LOOP_OVER_ROW) {
        return {
          rowIdx,
          idx: columnsCount - 1,
          changeRowOrColumn: true
        };
      }
    }
  }

  return { ...nextPosition, changeRowOrColumn: false };
}

interface canExitGridOpts<R> {
  cellNavigationMode: CellNavigationMode;
  columns: CalculatedColumn<R>[];
  rowsCount: number;
  selectedPosition: Position;
}

export function canExitGrid<R>(event: React.KeyboardEvent, { cellNavigationMode, columns, rowsCount, selectedPosition: { rowIdx, idx } }: canExitGridOpts<R>): boolean {
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
