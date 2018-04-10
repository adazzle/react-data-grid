import * as constants from '../constants/';
import * as rowUtils from '../RowUtils';
import * as columnUtils from '../ColumnUtils';

const getRowTop = (rowIdx, rowHeight) => rowIdx * rowHeight;

export const getSelectedRowIndex = (selectArgs) => {
  const { selectedPosition: { rowIdx } } = selectArgs;
  return rowIdx;
};

export const getSelectedRow = (selectArgs) => {
  const { rowGetter } = selectArgs;
  const rowIdx = getSelectedRowIndex(selectArgs);
  return rowGetter(rowIdx);
};

export const getSelectedDimensions = (selectArgs) => {
  const { idx, rowIdx } = selectArgs.selectedPosition;
  const {
    columns,
    rowHeight
  } = selectArgs;
  const column = columnUtils.getColumn(columns, idx);
  const width = idx >= 0 ? column.width : 0;
  const left = idx >= 0 ? column.left : 0;
  const top = getRowTop(rowIdx, rowHeight);
  return { width, left, top, height: rowHeight };
};

export const getSelectedColumn = (selectArgs) => {
  const { selectedPosition: { idx }, columns } = selectArgs;
  return columnUtils.getColumn(columns, idx);
};

export const getSelectedCellValue = (selectArgs) => {
  const column = getSelectedColumn(selectArgs);
  const row = getSelectedRow(selectArgs);

  return row && column ? rowUtils.get(row, column.key) : null;
};

export const isSelectedCellEditable = (selectArgs) => {
  const column = getSelectedColumn(selectArgs);
  const row = getSelectedRow(selectArgs);
  return columnUtils.canEdit(column, row, selectArgs.enableCellSelect);
};

export const getNextSelectedCellPosition = (selectArgs, nextPosition) => {
  const { cellNavigationMode, columns, rowsCount } = selectArgs;
  if (cellNavigationMode !== constants.cellNavigationMode.NONE) {
    const { idx, rowIdx } = nextPosition;
    const isAfterLastColumn = idx === columns.length;
    const isBeforeFirstColumn = idx === -1;

    if (isAfterLastColumn) {
      if (cellNavigationMode === constants.cellNavigationMode.CHANGE_ROW) {
        const isLastRow = rowIdx === rowsCount;
        if (!isLastRow) {
          return {
            idx: 0,
            rowIdx: rowIdx + 1,
            changeRowOrColumn: true
          };
        }
      } else if (cellNavigationMode === constants.cellNavigationMode.LOOP_OVER_ROW) {
        return {
          rowIdx,
          idx: 0,
          changeRowOrColumn: true
        };
      }
    } else if (isBeforeFirstColumn) {
      if (cellNavigationMode === constants.cellNavigationMode.CHANGE_ROW) {
        const isFirstRow = rowIdx === 0;
        if (!isFirstRow) {
          return {
            rowIdx: rowIdx - 1,
            idx: columns.length - 1,
            changeRowOrColumn: true
          };
        }
      } else if (cellNavigationMode === constants.cellNavigationMode.LOOP_OVER_ROW) {
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
