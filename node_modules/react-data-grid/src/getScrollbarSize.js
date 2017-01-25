let size;

function getScrollbarSize() {
  if (size === undefined) {
    let outer = document.createElement('div');
    outer.style.width = '50px';
    outer.style.height = '50px';
    outer.style.position = 'absolute';
    outer.style.top = '-200px';
    outer.style.left = '-200px';

    let inner = document.createElement('div');
    inner.style.height = '100px';
    inner.style.width = '100%';

    outer.appendChild(inner);
    document.body.appendChild(outer);

    let outerWidth = outer.clientWidth;
    outer.style.overflowY = 'scroll';
    let innerWidth = inner.clientWidth;

    document.body.removeChild(outer);

    size = outerWidth - innerWidth;
  }

  return size;
}

module.exports = getScrollbarSize;
