import columnUtils from '../ColumnUtils';

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
  const totalNumberColumns = columnUtils.getSize(props.columnMetrics.columns);
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
    if (columnUtils.isFrozen(c)) {
      index = i;
    }
  });
  return index;
};

export const getNonFrozenRenderedColumnCount = (columnMetrics, getDOMNodeOffsetWidth, colVisibleStartIdx, width) => {
  let remainingWidth = width && width > 0 ? width : columnMetrics.totalWidth;
  const lastFrozenColumnIndex = findLastFrozenColumnIndex(columnMetrics.columns);
  if (remainingWidth === 0) {
    remainingWidth = getDOMNodeOffsetWidth();
  }
  if (lastFrozenColumnIndex > -1) {
    const lastFrozenColumn = columnUtils.getColumn(columnMetrics.columns, lastFrozenColumnIndex);
    remainingWidth = remainingWidth - lastFrozenColumn.left - lastFrozenColumn.width;
  }
  let columnIndex = colVisibleStartIdx;

  let columnCount = 0;
  while (remainingWidth > 0) {
    let column = columnUtils.getColumn(columnMetrics.columns, columnIndex);

    if (!column) {
      break;
    }

    columnCount++;
    columnIndex++;
    remainingWidth -= column.width;
  }
  return columnCount;
};

export const getNonFrozenVisibleColStartIdx = (columns, scrollLeft) => {
  let remainingScroll = scrollLeft;
  const lastFrozenColumnIndex = findLastFrozenColumnIndex(columns);
  const nonFrozenColumns = columns.slice(lastFrozenColumnIndex + 1);
  let columnIndex = lastFrozenColumnIndex;
  while (remainingScroll >= 0 && columnIndex < columnUtils.getSize(nonFrozenColumns)) {
    columnIndex++;
    remainingScroll -= columnUtils.getColumn(columns, columnIndex).width;
  }
  return columnIndex;
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
  return (scrollDirection === SCROLL_DIRECTION.LEFT || scrollDirection === SCROLL_DIRECTION.RIGHT) ? totalNumberColumns : colVisibleEndIdx;
};
