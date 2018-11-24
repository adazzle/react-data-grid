import {getSize, getColumn, isFrozen} from '../ColumnUtils';

export const OVERSCAN_ROWS = 2;

export const SCROLL_DIRECTION = {
  UP: 'upwards',
  DOWN: 'downwards',
  LEFT: 'left',
  RIGHT: 'right',
  NONE: 'none'
};

const min = Math.min;
const max = Math.max;
const ceil = Math.ceil;

export const getGridState = (props) => {
  const totalNumberColumns = getSize(props.columnMetrics.columns);
  const canvasHeight = props.minHeight - props.rowOffsetHeight;
  const renderedRowsCount = ceil((props.minHeight - props.rowHeight) / props.rowHeight);
  const rowOverscanEndIdx = min(props.rowsCount, renderedRowsCount * 2);
  return {
    rowOverscanStartIdx: 0,
    rowOverscanEndIdx,
    rowVisibleStartIdx: 0,
    rowVisibleEndIdx: renderedRowsCount,
    height: canvasHeight,
    scrollTop: 0,
    scrollLeft: 0,
    colVisibleStartIdx: 0,
    colVisibleEndIdx: totalNumberColumns,
    colOverscanStartIdx: 0,
    colOverscanEndIdx: totalNumberColumns,
    isScrolling: false,
    lastFrozenColumnIndex: 0
  };
};

// No IE support for Array.findIndex
export const findLastFrozenColumnIndex = (columns) => {
  let index = -1;
  columns.forEach((c, i) => {
    if (isFrozen(c)) {
      index = i;
    }
  });
  return index;
};

const getTotalFrozenColumnWidth = (columns) => {
  const lastFrozenColumnIndex = findLastFrozenColumnIndex(columns);
  if (lastFrozenColumnIndex > -1) {
    const lastFrozenColumn = getColumn(columns, lastFrozenColumnIndex);
    return lastFrozenColumn.left + lastFrozenColumn.width;
  }
  return 0;
};

const getColumnCountForWidth = (columns, initialWidth, colVisibleStartIdx) => {
  const initialValue = {width: initialWidth, count: 0};
  return columns.slice(colVisibleStartIdx).reduce(({width, count}, column) => {
    const remainingWidth = width - column.width;
    const columnCount = remainingWidth >= 0 ? count + 1 : count;
    return {width: remainingWidth, count: columnCount};
  }, initialValue);
};

export const getNonFrozenVisibleColStartIdx = (columns, scrollLeft) => {
  let remainingScroll = scrollLeft;
  const lastFrozenColumnIndex = findLastFrozenColumnIndex(columns);
  const nonFrozenColumns = columns.slice(lastFrozenColumnIndex + 1);
  let columnIndex = lastFrozenColumnIndex;
  while (remainingScroll >= 0 && columnIndex < getSize(nonFrozenColumns)) {
    columnIndex++;
    const column = getColumn(columns, columnIndex);
    remainingScroll -= column ? column.width : 0;
  }
  return Math.max(columnIndex, 0);
};

export const getNonFrozenRenderedColumnCount = (columnMetrics, viewportDomWidth, scrollLeft) => {
  const {columns} = columnMetrics;
  if (getSize(columns) === 0) {
    return 0;
  }
  const colVisibleStartIdx = getNonFrozenVisibleColStartIdx(columnMetrics.columns, scrollLeft);
  const totalFrozenColumnWidth = getTotalFrozenColumnWidth(columnMetrics.columns);
  const viewportWidth = viewportDomWidth > 0 ? viewportDomWidth : columnMetrics.totalColumnWidth;
  const firstColumn = getColumn(columnMetrics.columns, colVisibleStartIdx);
  // calculate the portion width of first column hidden behind frozen columns
  const scrolledFrozenWidth = totalFrozenColumnWidth + scrollLeft;
  const firstColumnHiddenWidth = scrolledFrozenWidth  > firstColumn.left ? scrolledFrozenWidth - firstColumn.left : 0;
  const initialWidth = viewportWidth - totalFrozenColumnWidth + firstColumnHiddenWidth;
  const {count} = getColumnCountForWidth(columnMetrics.columns, initialWidth,  colVisibleStartIdx);
  return count;
};

export const getVisibleBoundaries = (gridHeight, rowHeight, scrollTop, rowsCount) => {
  const renderedRowsCount = ceil(gridHeight / rowHeight);
  const rowVisibleStartIdx = max(0, Math.round(scrollTop / rowHeight));
  const rowVisibleEndIdx  = min(rowVisibleStartIdx  + renderedRowsCount, rowsCount);
  return { rowVisibleStartIdx, rowVisibleEndIdx  };
};


export const getScrollDirection = (lastScroll, scrollTop, scrollLeft) => {
  if (scrollTop !== lastScroll.scrollTop && lastScroll.scrollTop !== undefined) {
    return scrollTop - lastScroll.scrollTop >= 0 ? SCROLL_DIRECTION.DOWN : SCROLL_DIRECTION.UP;
  }
  if (scrollLeft !== lastScroll.scrollLeft && lastScroll.scrollLeft !== undefined) {
    return scrollLeft - lastScroll.scrollLeft >= 0 ? SCROLL_DIRECTION.RIGHT : SCROLL_DIRECTION.LEFT;
  }
  return SCROLL_DIRECTION.NONE;
};

export const getRowOverscanStartIdx = (scrollDirection, rowVisibleStartIdx) => {
  return scrollDirection === SCROLL_DIRECTION.UP ? max(0, rowVisibleStartIdx - OVERSCAN_ROWS) : max(0, rowVisibleStartIdx);
};

export const getRowOverscanEndIdx = (scrollDirection, rowVisibleEndIdx, rowsCount) => {
  const overscanBoundaryIdx = rowVisibleEndIdx + OVERSCAN_ROWS;
  return scrollDirection === SCROLL_DIRECTION.DOWN ? min(overscanBoundaryIdx, rowsCount) : rowVisibleEndIdx;
};

export const getColOverscanStartIdx = (scrollDirection, colVisibleStartIdx, lastFrozenColumnIdx) => {
  const leftMostBoundIdx = lastFrozenColumnIdx > -1 ? lastFrozenColumnIdx + 1 : 0;
  return (scrollDirection === SCROLL_DIRECTION.LEFT || scrollDirection === SCROLL_DIRECTION.RIGHT) ? leftMostBoundIdx : colVisibleStartIdx;
};

export const getColOverscanEndIdx = (scrollDirection, colVisibleEndIdx, totalNumberColumns) => {
  if (scrollDirection === SCROLL_DIRECTION.DOWN || scrollDirection === SCROLL_DIRECTION.UP) {
    return colVisibleEndIdx;
  }
  return totalNumberColumns;
};
