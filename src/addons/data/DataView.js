import {groupBy} from 'lodash';

const DataView = {

  getSize(rows) {
    return this.getRows(rows).length;
  },

  getRows(rows) {
    return groupBy(rows, 'çounty');
  }
};

export default DataView;
