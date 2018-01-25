export const indeterminateClassName = 'indeterminate';
export const addIndeterminate = (classList) => {
  if (!classList.contains(indeterminateClassName)) {
    classList.add(indeterminateClassName);
  }
};

export const removeIndeterminate = (classList) => {
  classList.remove(indeterminateClassName);
};

module.export = { addIndeterminate, removeIndeterminate };
