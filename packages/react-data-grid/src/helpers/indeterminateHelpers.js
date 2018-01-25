export const indeterminateClassName = 'indeterminate';
export const addIndeterminate = (classList) => {
  if (!classList.contains(indeterminateClassName)) {
    classList.add(indeterminateClassName);
  }
};

export const removeIndeterminate = (classList) => {
  classList.remove(indeterminateClassName);
};

export const deselect = (classList, rowsCount, nextselectedRowCounts) => {
  if (nextselectedRowCounts > 0 && nextselectedRowCounts < rowsCount) {
    addIndeterminate(classList);
  }

  if (nextselectedRowCounts === 0) {
    removeIndeterminate(classList);
  }
};

export const select = (classList, rowsCount, nextselectedRowCounts) => {
  if (nextselectedRowCounts > 0 && nextselectedRowCounts < rowsCount) {
    addIndeterminate(classList);
  }

  if (nextselectedRowCounts === rowsCount) {
    removeIndeterminate(classList);
  }
};

export const populateSelectAllIndeterminate = (classList, options) => {
  const { rowsCount, selectedRowCounts, isPreviouslySelected } = options;

  if (isPreviouslySelected) {
    deselect(classList, rowsCount, selectedRowCounts - 1);
  } else {
    select(classList, rowsCount, selectedRowCounts + 1);
  }
};

module.export = { addIndeterminate, removeIndeterminate, populateSelectAllIndeterminate };
