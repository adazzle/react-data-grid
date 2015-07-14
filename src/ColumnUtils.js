module.exports = {

  getColumn(columns, idx) {
    if(Array.isArray(columns)){
      return columns[idx];
    }else if (typeof Immutable !== 'undefined') {
      return columns.get(idx);
    }
  },

  getSize(columns) {
    if(Array.isArray(columns)){
      return columns.length;
    }else if (typeof Immutable !== 'undefined') {
      return columns.size;
    }
  },
}
