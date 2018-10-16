function shallowCloneObject(obj) {
  let result = {};
  for (let k in obj) {
    if (obj.hasOwnProperty(k)) {
      result[k] = obj[k];
    }
  }
  return result;
}

module.exports = shallowCloneObject;
