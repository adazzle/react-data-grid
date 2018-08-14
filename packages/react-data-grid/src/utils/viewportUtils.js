import * as columnUtils from '../ColumnUtils';

const OVERSCAN_ROWS = 2;

export const SCROLL_DIRECTION = {
  UP: 'upwards',
  DOWN: 'downwards',
  LEFT: 'left',
  RIGHT: 'right'
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

export const getVisibleColStart = (columns, scrollLeft) => {
  let remainingScroll = scrollLeft;
  let columnIndex = -1;
  while (remainingScroll >= 0 && columnIndex < columnUtils.getSize(columns)) {
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
  if (scrollTop !== lastScroll.scrollTop) {
    return scrollTop - lastScroll.scrollTop >= 0 ? SCROLL_DIRECTION.DOWN : SCROLL_DIRECTION.UP;
  }
  if (scrollLeft !== lastScroll.scrollLeft) {
    return scrollLeft - lastScroll.scrollLeft >= 0 ? SCROLL_DIRECTION.RIGHT : SCROLL_DIRECTION.LEFT;
  }
};

export const getRowOverscanStartIdx = (scrollDirection, rowVisibleStartIdx) => {
  return scrollDirection === SCROLL_DIRECTION.UP ? max(0, rowVisibleStartIdx - OVERSCAN_ROWS) : rowVisibleStartIdx;
};

export const getRowOverscanEndIdx = (scrollDirection, rowVisibleEndIdx, rowsCount) => {
  const overscanBoundaryIdx = rowVisibleEndIdx + OVERSCAN_ROWS;
  return scrollDirection === SCROLL_DIRECTION.DOWN ? min(overscanBoundaryIdx, rowsCount) : rowVisibleEndIdx;
};

const findFirstFrozenColumn = (columns) => {
  let index;
  // IE 11 support no findIndex
  columns.some((c, i) => {
    if (c.locked === true) {
      index = i;
      return true;
    }
  });
  return index;
};

export const getColOverscanStartIdx = (columns, scrollDirection, colVisibleStartIdx) => {
  const firstFrozenColumnIdx = findFirstFrozenColumn(columns);
  const firstVisibleColumn = firstFrozenColumnIdx > -1 ? firstFrozenColumnIdx : colVisibleStartIdx;
  return (scrollDirection === SCROLL_DIRECTION.LEFT || scrollDirection === SCROLL_DIRECTION.RIGHT) ? 0 : firstVisibleColumn;
};

export const getColOverscanEndIdx = (scrollDirection, colVisibleEndIdx, totalNumberColumns) => {
  return (scrollDirection === SCROLL_DIRECTION.LEFT || scrollDirection === SCROLL_DIRECTION.RIGHT) ? totalNumberColumns : colVisibleEndIdx;
};
