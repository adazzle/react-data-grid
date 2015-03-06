var faker = require('faker');
faker.locale = 'en_GB';
var SIZE = 2000;
var _cache = [];

function createFakeRowObjectData(/*number*/ index) {
  return {
    id: 'id_' + index,
    avartar: faker.image.avatar(),
    county: faker.address.county(),
    email: faker.internet.email(),
    title: faker.name.prefix(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    street: faker.address.streetName(),
    zipCode: faker.address.zipCode(),
    date: faker.date.past(),
    bs: faker.company.bs(),
    catchPhrase: faker.company.catchPhrase(),
    companyName: faker.company.companyName(),
    words: faker.lorem.words(),
    sentence: faker.lorem.sentence()
  };
}

function getRows(noRows){
  var rows = [];
  for (var i = 0; i < noRows; i++){
    rows.push(createFakeRowObjectData(i));
  }
  return rows;
}

var FakeObjectDataListStore = {
  getRows: getRows
};

module.exports = FakeObjectDataListStore;
