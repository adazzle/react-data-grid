import ColumnMetrics from './ColumnMetrics';

function doesRowContainSelectedCell(props) {
  let selected = props.cellMetaData.selected;
  if (selected && selected.rowIdx === props.idx) {
    return true;
  }
  return false;
}

function willRowBeDraggedOver(props) {
  let dragged = props.cellMetaData.dragged;
  return dragged != null && (dragged.rowIdx >= 0 || dragged.complete === true);
}

function hasRowBeenCopied(props) {
  let copied = props.cellMetaData.copied;
  return copied != null && copied.rowIdx === props.idx;
}

export const shouldRowUpdate = (nextProps, currentProps) => {
  return !(ColumnMetrics.sameColumns(currentProps.columns, nextProps.columns, ColumnMetrics.sameColumn)) ||
    doesRowContainSelectedCell(currentProps) ||
    doesRowContainSelectedCell(nextProps) ||
    willRowBeDraggedOver(nextProps) ||
    nextProps.row !== currentProps.row ||
    currentProps.colOverscanStartIdx !== nextProps.colOverscanStartIdx ||
    currentProps.colOverscanEndIdx !== nextProps.colOverscanEndIdx ||
    currentProps.colVisibleStartIdx !== nextProps.colVisibleStartIdx ||
    currentProps.colVisibleEndIdx !== nextProps.colVisibleEndIdx ||
    hasRowBeenCopied(currentProps) ||
    currentProps.isSelected !== nextProps.isSelected ||
    currentProps.isScrolling !== nextProps.isScrolling ||
    nextProps.height !== currentProps.height ||
    currentProps.isOver !== nextProps.isOver ||
    currentProps.expandedRows !== nextProps.expandedRows ||
    currentProps.canDrop !== nextProps.canDrop ||
    currentProps.forceUpdate === true ||
    currentProps.extraClasses !== nextProps.extraClasses;
};

export default shouldRowUpdate;
