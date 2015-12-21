'use strict';

module.exports = {
  fixCellRight(scrollLeft, gridWidth) {
    var ctrl: any = this; //flow on windows has an outdated react declaration, once that gets updated, we can remove this
    if (ctrl.isMounted()) {
      var node = this.getDOMNode();
      var transform;
      if(node.offsetLeft > gridWidth){
        transform = -1 * (node.offsetLeft - (gridWidth - this.props.column.width));
      } else {
        transform = gridWidth - node.offsetLeft - this.props.column.width;
      }
      var scroll = scrollLeft + transform;
      var transform = `translate3d(${scroll}px, 0px, 0px)`;
      node.style.webkitTransform = transform;
      node.style.transform = transform;
    }
  },

  fixCellLeft(scrollLeft) {
    var ctrl: any = this; //flow on windows has an outdated react declaration, once that gets updated, we can remove this
    if (ctrl.isMounted()) {
      var node = this.getDOMNode();
      var transform = `translate3d(${scrollLeft}px, 0px, 0px)`;
      node.style.webkitTransform = transform;
      node.style.transform = transform;
    }
  }
};
