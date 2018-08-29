import ColumnMetrics from './ColumnMetrics';

export const shouldRowUpdate = (nextProps, currentProps) => {
  return !(ColumnMetrics.sameColumns(currentProps.columns, nextProps.columns, ColumnMetrics.sameColumn)) ||
    nextProps.row !== currentProps.row ||
    currentProps.colOverscanStartIdx !== nextProps.colOverscanStartIdx ||
    currentProps.colOverscanEndIdx !== nextProps.colOverscanEndIdx ||
    currentProps.colVisibleStartIdx !== nextProps.colVisibleStartIdx ||
    currentProps.colVisibleEndIdx !== nextProps.colVisibleEndIdx ||
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
