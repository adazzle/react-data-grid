export function get(row, property) {
  if (typeof row.get === 'function') {
    return row.get(property);
  }

  return row[property];
}

export function isRowSelected(keys, indexes, isSelectedKey, rowData, rowIdx) {
  if (indexes && Object.prototype.toString.call(indexes) === '[object Array]') {
    return indexes.indexOf(rowIdx) > -1;
  } else if (keys && keys.rowKey && keys.values && Object.prototype.toString.call(keys.values) === '[object Array]') {
    return keys.values.indexOf(rowData[keys.rowKey]) > -1;
  } else if (isSelectedKey && rowData && typeof isSelectedKey === 'string') {
    return rowData[isSelectedKey];
  }
  return false;
}
