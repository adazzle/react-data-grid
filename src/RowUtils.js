var RowUtils = {
  get: function(row, property){
    if(typeof row.get === 'function'){
      return row.get(property);
    }else{
      return row[property];
    }
  }
}

module.exports = RowUtils;
