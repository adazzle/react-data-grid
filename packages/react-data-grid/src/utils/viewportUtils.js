import * as columnUtils from '../ColumnUtils';

export const SCROLL_DIRECTION = {
  UP: 'upwards',
  DOWN: 'downwards',
  LEFT: 'left',
  RIGHT: 'right'
}

const min = Math.min;
const max = Math.max;
const ceil = Math.ceil;

function getGridState(props) {
  const totalNumberColumns = columnUtils.getSize(props.columnMetrics.columns);
  const canvasHeight = props.minHeight - props.rowOffsetHeight;
  const renderedRowsCount = ceil((props.minHeight - props.rowHeight) / props.rowHeight);
  const totalRowCount = min(renderedRowsCount * 4, props.rowsCount);
  return {
    rowOverscanStartIdx: 0,
    rowOverscanEndIdx: totalRowCount,
    rowVisibleStartIdx: 0,
    visibleEnd: totalRowCount,
    height: canvasHeight,
    scrollTop: 0,
    scrollLeft: 0,
    colVisibleStartIdx: 0,
    colVisibleEndIdx: 9,
    colOverscanStartIdx: 0,
    colOverscanEndIdx: 18
  };
}

function getRenderedColumnCount(props, getDOMNodeOffsetWidth, rowOverscanStartIdx, width) {
  let remainingWidth = width && width > 0 ? width : props.columnMetrics.totalWidth;
  if (remainingWidth === 0) {
    remainingWidth = getDOMNodeOffsetWidth();
  }
  let columnIndex = rowOverscanStartIdx;
  let columnCount = 0;
  while (remainingWidth > 0) {
    let column = columnUtils.getColumn(props.columnMetrics.columns, columnIndex);

    if (!column) {
      break;
    }

    columnCount++;
    columnIndex++;
    remainingWidth -= column.width;
  }
  return columnCount;
}

function getVisibleColStart(props, scrollLeft) {
  let remainingScroll = scrollLeft;
  let columnIndex = -1;
  while (remainingScroll >= 0) {
    columnIndex++;
    remainingScroll -= columnUtils.getColumn(props.columnMetrics.columns, columnIndex).width;
  }
  return columnIndex;
}

export const getVisibleBoundaries = (gridHeight, rowHeight, scrollTop, totalNumberRows) => {
  const renderedRowsCount = ceil(gridHeight / rowHeight);
  const rowVisibleStartIdx = max(0, Math.round(scrollTop / rowHeight));
  const rowVisibleEndIdx  = min(rowVisibleStartIdx  + renderedRowsCount, totalNumberRows);
  return { rowVisibleStartIdx , rowVisibleEndIdx  };
};


const getScrollDirection = (lastScroll, scrollTop, scrollLeft) => {
  if (scrollTop !== lastScroll.scrollTop) {
    return scrollTop - lastScroll.scrollTop >= 0 ? SCROLL_DIRECTION.DOWN : SCROLL_DIRECTION.UP;
  }
  if (scrollLeft !== lastScroll.scrollLeft) {
    return scrollLeft - lastScroll.scrollLeft >= 0 ? SCROLL_DIRECTION.RIGHT : SCROLL_DIRECTION.LEFT;
  }
}

const OVERSCAN_COLUMNS = 2;

const getOverscanStartIdx = (scrollDirection, colVisibleStartIdx) => {
  return scrollDirection = SCROLL_DIRECTION.LEFT ? max(0, colVisibleStartIdx - OVERSCAN_COLUMNS) : colVisibleStartIdx;
}

const getOverscanEndIdx = (scrollDirection, colVisibleEndIdx) => {
  return scrollDirection = SCROLL_DIRECTION.right ? min(colVisibleEndIdx + OVERSCAN_COLUMNS, totalNumberColumns) : colVisibleEndIdx;
}


function getNextScrollState(props, lastScroll, getDOMNodeOffsetWidth, scrollTop, scrollLeft, height, rowHeight, length, width) {
  const isScrolling = true;
  const { rowVisibleStartIdx , rowVisibleEndIdx  } = getVisibleBoundaries(height, rowHeight, scrollTop, length);
  const rowOverscanStartIdx = max(0, rowVisibleStartIdx  - props.overScan.rowsStart);
  const rowOverscanEndIdx = min(rowVisibleEndIdx  + props.overScan.rowsEnd, length);
  const totalNumberColumns = columnUtils.getSize(props.columnMetrics.columns);
  const colVisibleStartIdx = (totalNumberColumns > 0) ? max(0, getVisibleColStart(props, scrollLeft)) : 0;
  const renderedColumnCount = getRenderedColumnCount(props, getDOMNodeOffsetWidth, colVisibleStartIdx, width);
  const colVisibleEndIdx = (renderedColumnCount !== 0) ? colVisibleStartIdx + renderedColumnCount : totalNumberColumns;
  const colOverscanStartIdx = getOverscanStartIdx(scrollDirection, colVisibleStartIdx);
  const colOverscanEndIdx = getOverscanEndIdx(scrollDirection, colVisibleEndIdx, totalNumberColumns);
  const scrollDirection = getScrollDirection(lastScroll, scrollTop, scrollLeft);

  return {
    height,
    scrollTop,
    scrollLeft,
    rowVisibleStartIdx,
    rowVisibleEndIdx,
    rowOverscanStartIdx,
    rowOverscanEndIdx,
    colVisibleStartIdx,
    colVisibleEndIdx,
    colOverscanStartIdx,
    colOverscanEndIdx,
    scrollDirection,
    isScrolling
  };
}

export {
  getGridState,
  getNextScrollState,
  getRenderedColumnCount
};
