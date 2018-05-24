function createObjectWithProperties(originalObj, properties) {
  return properties.reduce((result, property) => {
    if (property in originalObj) {
      result[property] = originalObj[property];
    }
    return result;
  }, {});
}

module.exports = createObjectWithProperties;
