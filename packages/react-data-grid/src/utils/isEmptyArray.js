const isEmptyArray = (obj) => {
  return Array.isArray(obj) && obj.length === 0;
};

module.exports = isEmptyArray;
