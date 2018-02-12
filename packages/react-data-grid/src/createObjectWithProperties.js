function createObjectWithProperties(originalObj: any, properties: any): any {
  let result = {};
  for (let property of properties) {
    if (property in originalObj) {
      result[property] = originalObj[property];
    }
  }
  return result;
}

module.exports = createObjectWithProperties;
