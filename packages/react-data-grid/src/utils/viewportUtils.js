import * as columnUtils from '../ColumnUtils';

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
    isScrolling: false
  };
};

export const getRenderedColumnCount = (columnMetrics, getDOMNodeOffsetWidth, colVisibleStartIdx, width) => {
  let remainingWidth = width && width > 0 ? width : columnMetrics.totalWidth;
  if (remainingWidth === 0) {
    remainingWidth = getDOMNodeOffsetWidth();
  }
  const visibleColumnBuffer = 1;
  let columnIndex = colVisibleStartIdx + visibleColumnBuffer; // ensure to start counting from first fully visible column
  let columnCount = visibleColumnBuffer;
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


// No IE support for Array.findIndex
const findLastLockedColumnIndex = (columns) => {
  let index = -1;
  columns.forEach((c, i) => {
    if (c.locked === true) {
      index = i;
    }
  });
  return index;
};

export const getNonLockedVisibleColStartIdx = (columns, scrollLeft) => {
  let remainingScroll = scrollLeft;
  const lastLockedColumnIndex = findLastLockedColumnIndex(columns);
  const nonLockedColumns = columns.slice(lastLockedColumnIndex + 1);
  let columnIndex = lastLockedColumnIndex;
  while (remainingScroll >= 0 && columnIndex < columnUtils.getSize(nonLockedColumns)) {
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

export const getColOverscanStartIdx = (scrollDirection, colVisibleStartIdx) => {
  return (scrollDirection === SCROLL_DIRECTION.LEFT || scrollDirection === SCROLL_DIRECTION.RIGHT) ? 0 : colVisibleStartIdx;
};

export const getColOverscanEndIdx = (scrollDirection, colVisibleEndIdx, totalNumberColumns) => {
  return (scrollDirection === SCROLL_DIRECTION.LEFT || scrollDirection === SCROLL_DIRECTION.RIGHT) ? totalNumberColumns : colVisibleEndIdx;
};
