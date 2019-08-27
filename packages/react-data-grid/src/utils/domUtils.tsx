let size: number | undefined;
let positionSticky: boolean | undefined;

export function getScrollbarSize(): number {
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

export function isPositionStickySupported() {
  if (positionSticky === undefined) {
    const el = document.createElement('a');
    const mStyle = el.style;
    mStyle.cssText = 'position:-webkit-sticky;position:sticky';

    positionSticky = mStyle.position ? mStyle.position.includes('sticky') : false;
  }
  return positionSticky;
}
