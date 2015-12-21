'use strict';

module.exports = {
  setScrollLeft(scrollLeft: number, gridWidth) {
    this.props.columns.forEach( (column, i) => {
      if (column.locked === 'left') {
        if(!this.refs[i]) return;
        this.refs[i].fixCellLeft(scrollLeft);
      } else if(column.locked === 'right') {
         this.refs[i].fixCellRight(scrollLeft, gridWidth);
      }
    });
  }
};
