function createScrollShim(size) {
  const shim = document.createElement('div');
  if (shim.classList) {
    shim.classList.add('react-grid-ScrollShim'); // flow - not compatible with HTMLElement
  } else {
    shim.className += ' react-grid-ScrollShim';
  }
  shim.style.position = 'absolute';
  shim.style.top = 0;
  shim.style.left = 0;
  shim.style.width = `${size.width}px`;
  shim.style.height = `${size.height}px`;

  return shim;
}

export {
  createScrollShim
};
