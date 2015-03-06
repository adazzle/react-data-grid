/* @flow offsetWidth in HTMLElement */
"use strict";

var size;

function getScrollbarSize() {
  if (size === undefined) {

    var outer = document.createElement('div');
    outer.style.width = '50px';
    outer.style.height = '50px';
    outer.style.overflowY = 'scroll';
    outer.style.position = 'absolute';
    outer.style.top = '-200px';
    outer.style.left = '-200px';

    var inner = document.createElement('div');
    inner.style.height = '100px';
    inner.style.width = '100%';

    outer.appendChild(inner);
    document.body.appendChild(outer);

    var outerWidth = outer.clientWidth;
    var innerWidth = inner.clientWidth;

    document.body.removeChild(outer);

    size = outerWidth - innerWidth;
  }

  return size;
}

module.exports = getScrollbarSize;
