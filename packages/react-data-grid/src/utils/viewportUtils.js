import ColumnUtils from '../ColumnUtils';

const min = Math.min;
const max = Math.max;
const floor = Math.floor;
const ceil = Math.ceil;

function getGridState(props) {
  const totalNumberColumns = ColumnUtils.getSize(props.columnMetrics.columns);
  const canvasHeight = props.minHeight - props.rowOffsetHeight;
  const renderedRowsCount = ceil((props.minHeight - props.rowHeight) / props.rowHeight);
  const totalRowCount = min(renderedRowsCount * 4, props.rowsCount);
  return {
    displayStart: 0,
    displayEnd: totalRowCount,
    visibleStart: 0,
    visibleEnd: totalRowCount,
    height: canvasHeight,
    scrollTop: 0,
    scrollLeft: 0,
    colVisibleStart: 0,
    colVisibleEnd: totalNumberColumns,
    colDisplayStart: 0,
    colDisplayEnd: totalNumberColumns
  };
}

function getRenderedColumnCount(props, getDOMNodeOffsetWidth, displayStart, width) {
  let remainingWidth = width && width > 0 ? width : props.columnMetrics.totalWidth;
  if (remainingWidth === 0) {
    remainingWidth = getDOMNodeOffsetWidth();
  }
  let columnIndex = displayStart;
  let columnCount = 0;
  while (remainingWidth > 0) {
    let column = ColumnUtils.getColumn(props.columnMetrics.columns, columnIndex);

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
    remainingScroll -= ColumnUtils.getColumn(props.columnMetrics.columns, columnIndex).width;
  }
  return columnIndex;
}

function getNextScrollState(props, getDOMNodeOffsetWidth, scrollTop, scrollLeft, height, rowHeight, length, width) {
  const isScrolling = true;
  const renderedRowsCount = ceil(height / rowHeight);
  const visibleStart = max(0, floor(scrollTop / rowHeight));
  const visibleEnd = min(visibleStart + renderedRowsCount, length);
  const displayStart = max(0, visibleStart - props.overScan.rowsStart);
  const displayEnd = min(visibleEnd + props.overScan.rowsEnd, length);
  const totalNumberColumns = ColumnUtils.getSize(props.columnMetrics.columns);
  const colVisibleStart = (totalNumberColumns > 0) ? max(0, getVisibleColStart(props, scrollLeft)) : 0;
  const renderedColumnCount = getRenderedColumnCount(props, getDOMNodeOffsetWidth, colVisibleStart, width);
  const colVisibleEnd = (renderedColumnCount !== 0) ? colVisibleStart + renderedColumnCount : totalNumberColumns;
  const colDisplayStart = max(0, colVisibleStart - props.overScan.colsStart);
  const colDisplayEnd = min(colVisibleEnd + props.overScan.colsEnd, totalNumberColumns);

  const nextScrollState = {
    visibleStart,
    visibleEnd,
    displayStart,
    displayEnd,
    height,
    scrollTop,
    scrollLeft,
    colVisibleStart,
    colVisibleEnd,
    colDisplayStart,
    colDisplayEnd,
    isScrolling
  };

  return nextScrollState;
}

export {
  getGridState,
  getNextScrollState,
  getRenderedColumnCount
};
