module.exports = {

  getColumn(columns, idx) {
    if(Array.isArray(columns)){
      return columns[idx];
    }else if (typeof Immutable !== 'undefined') {
      return columns.get(idx);
    }
  },

  updateMetrics(metrics, idx, column){
    if(Array.isArray(metrics.columns)){
      metrics.columns.splice(idx, 1, column);
    }else if (typeof Immutable !== 'undefined') {
      metrics.columns = metrics.columns.splice(idx, 1, column);
    }
    return metrics;
  },

  getSize(columns) {
    if(Array.isArray(columns)){
      return columns.length;
    }else if (typeof Immutable !== 'undefined') {
      return columns.size;
    }
  },
}
