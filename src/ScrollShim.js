/* TODO@flow mixin not compatible and HTMLElement classList */
/**
 * @jsx React.DOM


 */
'use strict';

var ScrollShim = {

  appendScrollShim() {
    if (!this._scrollShim) {
      var size = this._scrollShimSize();
      var shim = document.createElement('div');
      if (shim.classList) {
      	shim.classList.add('react-grid-ScrollShim'); //flow - not compatible with HTMLElement
	  }
	  else {
	  	shim.className += ' react-grid-ScrollShim';
	  }
      shim.style.position = 'absolute';
      shim.style.top = 0;
      shim.style.left = 0;
      shim.style.width = `${size.width}px`;
      shim.style.height = `${size.height}px`;
      this.getDOMNode().appendChild(shim);
      this._scrollShim = shim;
    }
    this._scheduleRemoveScrollShim();
  },

  _scrollShimSize(): {width: number; height: number } {
    return {
      width: this.props.width,
      height: this.props.length * this.props.rowHeight
    };
  },

  _scheduleRemoveScrollShim() {
    if (this._scheduleRemoveScrollShimTimer) {
      clearTimeout(this._scheduleRemoveScrollShimTimer);
    }
    this._scheduleRemoveScrollShimTimer = setTimeout(
      this._removeScrollShim, 200);
  },

  _removeScrollShim() {
    if (this._scrollShim) {
      this._scrollShim.parentNode.removeChild(this._scrollShim);
      this._scrollShim = undefined;
    }
  }
};

module.exports = ScrollShim;
