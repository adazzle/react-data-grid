import getRows from './Selectors';

const DataView = {

  getSize(rows, options) {
    return this.getRows(rows, options).length;
  },

  getRows(rows, options) {
    return getRows(rows, options);
  }
};

export default DataView;
