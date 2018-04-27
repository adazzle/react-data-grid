import { CellNavigationMode } from '../constants/';
import isFunction from './isFunction';
import * as rowUtils from '../RowUtils';
import * as columnUtils from '../ColumnUtils';

const getRowTop = (rowIdx, rowHeight) => rowIdx * rowHeight;

export const getSelectedRow = ({ selectedPosition, rowGetter }) => {
  const { rowIdx } = selectedPosition;
  return rowGetter(rowIdx);
};

export const getSelectedDimensions = ({ selectedPosition, columns, rowHeight }) => {
  const { idx, rowIdx } = selectedPosition;
  if (idx >= 0) {
    const column = columnUtils.getColumn(columns, idx);
    const { width, left, locked } = column;
    const top = getRowTop(rowIdx, rowHeight);
    const zIndex = locked ? 2 : 1;
    return { width, left, top, height: rowHeight, zIndex };
  }
  return { width: 0, left: 0, top: 0, height: rowHeight, zIndex: 1 };
};

export const getSelectedColumn = ({ selectedPosition, columns }) => {
  const { idx } = selectedPosition;
  return columnUtils.getColumn(columns, idx);
};

export const getSelectedCellValue = ({ selectedPosition, columns, rowGetter }) => {
  const column = getSelectedColumn({ selectedPosition, columns });
  const row = getSelectedRow({ selectedPosition, rowGetter });

  return row && column ? rowUtils.get(row, column.key) : null;
};

export const isSelectedCellEditable = ({ enableCellSelect, selectedPosition, columns, rowGetter, onCheckCellIsEditable }) => {
  const column = getSelectedColumn({ selectedPosition, columns });
  const row = getSelectedRow({ selectedPosition, rowGetter });
  const isCellEditable = isFunction(onCheckCellIsEditable) ? onCheckCellIsEditable({ row, column, ...selectedPosition }) : true;
  return columnUtils.canEdit(column, row, enableCellSelect) && isCellEditable;
};

export const getNextSelectedCellPosition = ({ cellNavigationMode, columns, rowsCount }, nextPosition) => {
  if (cellNavigationMode !== CellNavigationMode.NONE) {
    const { idx, rowIdx } = nextPosition;
    const isAfterLastColumn = idx === columns.length;
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
            idx: columns.length - 1,
            changeRowOrColumn: true
          };
        }
      } else if (cellNavigationMode === CellNavigationMode.LOOP_OVER_ROW) {
        return {
          rowIdx: rowIdx,
          idx: columns.length - 1,
          changeRowOrColumn: true
        };
      }
    }
  }

  return { ...nextPosition, changeRowOrColumn: false };
};

export function canExitGrid(e, { cellNavigationMode, columns, rowsCount, selectedPosition: { rowIdx, idx } }) {
  // When the cellNavigationMode is 'none' or 'changeRow', you can exit the grid if you're at the first or last cell of the grid
  // When the cellNavigationMode is 'loopOverRow', there is no logical exit point so you can't exit the grid
  if (cellNavigationMode === CellNavigationMode.NONE || cellNavigationMode === CellNavigationMode.CHANGE_ROW) {
    const atLastCellInRow = idx === columns.length - 1;
    const atFirstCellInRow = idx === 0;
    const atLastRow = rowIdx === rowsCount - 1;
    const atFirstRow = rowIdx === 0;
    const shift = e.shiftKey === true;

    return shift ? atFirstCellInRow && atFirstRow : atLastCellInRow && atLastRow;
  }

  return false;
}
