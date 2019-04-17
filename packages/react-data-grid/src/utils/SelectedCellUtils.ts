import { CellNavigationMode, Z_INDEXES } from '../common/enums';
import * as rowUtils from '../RowUtils';
import { getColumn, isFrozen, canEdit, getSize } from '../ColumnUtils';
import { Column, ColumnList, Position, Range, Dimension, RowGetter } from '../common/types';

const getRowTop = (rowIdx: number, rowHeight: number): number => rowIdx * rowHeight;

interface getSelectedRowOpts {
  selectedPosition: Position;
  rowGetter: RowGetter;
}

export function getSelectedRow({ selectedPosition, rowGetter }: getSelectedRowOpts): unknown {
  return rowGetter(selectedPosition.rowIdx);
}

interface getSelectedDimensionsOpts {
  selectedPosition: Position;
  columns: ColumnList;
  rowHeight: number;
  scrollLeft: number;
}

export function getSelectedDimensions({ selectedPosition: { idx, rowIdx }, columns, rowHeight, scrollLeft }: getSelectedDimensionsOpts): Dimension {
  if (idx < 0) {
    return { width: 0, left: 0, top: 0, height: rowHeight, zIndex: 1 };
  }
  const column = getColumn(columns, idx);
  const frozen = isFrozen(column);
  const { width } = column;
  const left = frozen ? column.left + scrollLeft : column.left;
  const top = getRowTop(rowIdx, rowHeight);
  const zIndex = frozen ? Z_INDEXES.FROZEN_CELL_MASK : Z_INDEXES.CELL_MASK;
  return { width, left, top, height: rowHeight, zIndex };
}

interface getSelectedRangeDimensionsOpts {
  selectedRange: Range;
  columns: ColumnList;
  rowHeight: number;
}

export function getSelectedRangeDimensions({ selectedRange: { topLeft, bottomRight }, columns, rowHeight }: getSelectedRangeDimensionsOpts): Dimension {
  if (topLeft.idx < 0) {
    return { width: 0, left: 0, top: 0, height: rowHeight, zIndex: Z_INDEXES.CELL_MASK };
  }

  let width = 0;
  let anyColFrozen = false;
  for (let i = topLeft.idx; i <= bottomRight.idx; i++) {
    const column = getColumn(columns, i);
    width += column.width;
    anyColFrozen = anyColFrozen || isFrozen(column);
  }

  const { left } = getColumn(columns, topLeft.idx);
  const top = getRowTop(topLeft.rowIdx, rowHeight);
  const height = (bottomRight.rowIdx - topLeft.rowIdx + 1) * rowHeight;
  const zIndex = anyColFrozen ? Z_INDEXES.FROZEN_CELL_MASK : Z_INDEXES.CELL_MASK;

  return { width, left, top, height, zIndex };
}

interface getSelectedColumnOpts {
  selectedPosition: Position;
  columns: ColumnList;
}

export function getSelectedColumn({ selectedPosition, columns }: getSelectedColumnOpts): Column {
  return getColumn(columns, selectedPosition.idx);
}

interface getSelectedCellValueOpts {
  selectedPosition: Position;
  columns: ColumnList;
  rowGetter: RowGetter;
}

export function getSelectedCellValue({ selectedPosition, columns, rowGetter }: getSelectedCellValueOpts) {
  const column = getSelectedColumn({ selectedPosition, columns });
  const row = getSelectedRow({ selectedPosition, rowGetter });

  return row && column ? rowUtils.get(row, column.key) : null;
}

interface isSelectedCellEditableOpts {
  enableCellSelect: boolean;
  selectedPosition: Position;
  columns: ColumnList;
  rowGetter: RowGetter;
  onCheckCellIsEditable?(arg: { row: unknown; column: Column } & Position): boolean;
}

export function isSelectedCellEditable({ enableCellSelect, selectedPosition, columns, rowGetter, onCheckCellIsEditable }: isSelectedCellEditableOpts): boolean {
  const column = getSelectedColumn({ selectedPosition, columns });
  const row = getSelectedRow({ selectedPosition, rowGetter });
  const isCellEditable = onCheckCellIsEditable ? onCheckCellIsEditable({ row, column, ...selectedPosition }) : true;
  return isCellEditable && canEdit(column, row, enableCellSelect);
}

interface getNextSelectedCellPositionOpts {
  cellNavigationMode: CellNavigationMode;
  columns: ColumnList;
  rowsCount: number;
  nextPosition: Position;
}

export interface NextSelectedCellPosition extends Position {
  changeRowOrColumn: boolean;
}

export function getNextSelectedCellPosition({ cellNavigationMode, columns, rowsCount, nextPosition }: getNextSelectedCellPositionOpts): NextSelectedCellPosition {
  if (cellNavigationMode !== CellNavigationMode.NONE) {
    const { idx, rowIdx } = nextPosition;
    const columnsCount = getSize(columns);
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

interface canExitGridOpts {
  cellNavigationMode: CellNavigationMode;
  columns: ColumnList;
  rowsCount: number;
  selectedPosition: Position;
}

export function canExitGrid(event: React.KeyboardEvent, { cellNavigationMode, columns, rowsCount, selectedPosition: { rowIdx, idx } }: canExitGridOpts): boolean {
  // When the cellNavigationMode is 'none' or 'changeRow', you can exit the grid if you're at the first or last cell of the grid
  // When the cellNavigationMode is 'loopOverRow', there is no logical exit point so you can't exit the grid
  if (cellNavigationMode === CellNavigationMode.NONE || cellNavigationMode === CellNavigationMode.CHANGE_ROW) {
    const atLastCellInRow = idx === getSize(columns) - 1;
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
