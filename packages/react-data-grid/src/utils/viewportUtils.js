import * as columnUtils from '../ColumnUtils';

const OVERSCAN_ROWS = 8;

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
  const totalRowCount = min(renderedRowsCount * 4, props.rowsCount);
  return {
    rowOverscanStartIdx: 0,
    rowOverscanEndIdx: totalRowCount,
    rowVisibleStartIdx: 0,
    rowVisibleEndIdx: totalRowCount,
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

export const getRenderedColumnCount = (columnMetrics, getDOMNodeOffsetWidth, rowOverscanStartIdx, width) => {
  let remainingWidth = width && width > 0 ? width : columnMetrics.totalWidth;
  if (remainingWidth === 0) {
    remainingWidth = getDOMNodeOffsetWidth();
  }
  let columnIndex = rowOverscanStartIdx;
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
  while (remainingScroll >= 0) {
    columnIndex++;
    remainingScroll -= columnUtils.getColumn(columns, columnIndex).width;
  }
  return columnIndex;
};

export const getVisibleBoundaries = (gridHeight, rowHeight, scrollTop, totalNumberRows) => {
  const renderedRowsCount = ceil(gridHeight / rowHeight);
  const rowVisibleStartIdx = max(0, Math.round(scrollTop / rowHeight));
  const rowVisibleEndIdx  = min(rowVisibleStartIdx  + renderedRowsCount, totalNumberRows);
  return { rowVisibleStartIdx , rowVisibleEndIdx  };
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

export const getRowOverscanEndIdx = (scrollDirection, rowVisibleEndIdx, totalNumberRows) => {
  const overscanBoundaryIdx = rowVisibleEndIdx + OVERSCAN_ROWS;
  return scrollDirection === SCROLL_DIRECTION.DOWN ? min(overscanBoundaryIdx, totalNumberRows) : rowVisibleEndIdx;
};

export const getColOverscanStartIdx = (columns, scrollDirection, colVisibleStartIdx) => {
  const firstFrozenColumnIdx = columns.findIndex(c => c.locked === true);
  const firstVisibleColumn = firstFrozenColumnIdx > -1 ? firstFrozenColumnIdx : colVisibleStartIdx;
  return (scrollDirection === SCROLL_DIRECTION.LEFT || scrollDirection === SCROLL_DIRECTION.RIGHT) ? 0 : firstVisibleColumn;
};

export const getColOverscanEndIdx = (scrollDirection, colVisibleEndIdx, totalNumberColumns) => {
  return (scrollDirection === SCROLL_DIRECTION.LEFT || scrollDirection === SCROLL_DIRECTION.RIGHT) ? totalNumberColumns : colVisibleEndIdx;
};
