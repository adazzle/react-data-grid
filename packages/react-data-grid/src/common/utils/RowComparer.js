export default function shouldRowUpdate(nextProps, currentProps) {
  return currentProps.columns !== nextProps.columns ||
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
}

