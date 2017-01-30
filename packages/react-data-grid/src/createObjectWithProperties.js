function createObjectWithProperties(originalObj: any, properties: any): any {
  let result = {};
  for (let property of properties) {
    if (originalObj[property]) {
      result[property] = originalObj[property];
    }
  }
  return result;
}

module.exports = createObjectWithProperties;
