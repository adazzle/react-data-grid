import ColumnMetrics from './ColumnMetrics';

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
    willRowBeDraggedOver(nextProps) ||
    nextProps.row !== currentProps.row ||
    currentProps.colDisplayStart !== nextProps.colDisplayStart ||
    currentProps.colDisplayEnd !== nextProps.colDisplayEnd ||
    currentProps.colVisibleStart !== nextProps.colVisibleStart ||
    currentProps.colVisibleEnd !== nextProps.colVisibleEnd ||
    hasRowBeenCopied(currentProps) ||
    currentProps.isSelected !== nextProps.isSelected ||
    nextProps.height !== currentProps.height ||
    currentProps.isOver !== nextProps.isOver ||
    currentProps.expandedRows !== nextProps.expandedRows ||
    currentProps.canDrop !== nextProps.canDrop ||
    currentProps.forceUpdate === true ||
    currentProps.extraClasses !== nextProps.extraClasses;
};

export default shouldRowUpdate;
