const getValueForKey = (key, model) => {
  let returnVal = model;
  const keyArray = key.split('.');
  keyArray.forEach(subkey => {
    if (subkey && returnVal[subkey]) {
      returnVal = returnVal[key];
    }
  });
  return returnVal;
};

module.exports = getValueForKey;
