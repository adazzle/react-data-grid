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
