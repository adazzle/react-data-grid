import { getColumn, isFrozen } from '../ColumnUtils';

function getColumnScrollPosition(columns, idx, currentScrollLeft, currentClientWidth) {
  let left = 0;
  let frozen = 0;

  for (let i = 0; i < idx; i++) {
    const column = getColumn(columns, i);
    if (column) {
      if (column.width) {
        left += column.width;
      }
      if (isFrozen(column)) {
        frozen += column.width;
      }
    }
  }

  const selectedColumn = getColumn(columns, idx);
  if (selectedColumn) {
    const scrollLeft = left - frozen - currentScrollLeft;
    const scrollRight = left + selectedColumn.width - currentScrollLeft;

    if (scrollLeft < 0) {
      return scrollLeft;
    } else if (scrollRight > currentClientWidth) {
      const scrollAmount = scrollRight - currentClientWidth;
      return scrollAmount;
    }
  }
}

export {
  getColumnScrollPosition
};
