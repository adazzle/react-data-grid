let size;

export default function getScrollbarSize() {
  if (size === undefined) {
    const outer = document.createElement('div');
    outer.style.width = '50px';
    outer.style.height = '50px';
    outer.style.position = 'absolute';
    outer.style.top = '-200px';
    outer.style.left = '-200px';

    const inner = document.createElement('div');
    inner.style.height = '100px';
    inner.style.width = '100%';

    outer.appendChild(inner);
    document.body.appendChild(outer);

    const outerWidth = outer.clientWidth;
    outer.style.overflowY = 'scroll';
    const innerWidth = inner.clientWidth;

    document.body.removeChild(outer);

    size = outerWidth - innerWidth;
  }

  return size;
}
