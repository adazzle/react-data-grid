import faker from 'faker';
faker.locale = 'en_GB';
const SIZE = 2000;
const _cache = [];

function createFakeRowObjectData(/*number*/ index) {
  return {
    id: `id_${index}`,
    avatar: faker.image.avatar(),
    county: faker.address.county(),
    email: faker.internet.email(),
    title: faker.name.prefix(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    street: faker.address.streetName(),
    zipCode: faker.address.zipCode(),
    date: faker.date.past().toLocaleDateString(),
    bs: faker.company.bs(),
    catchPhrase: faker.company.catchPhrase(),
    companyName: faker.company.companyName(),
    words: faker.lorem.words(),
    sentence: faker.lorem.sentence()
  };
}

function getObjectAt(/*number*/ index) /*?object*/ {
  if (index < 0 || index > SIZE) {
    return undefined;
  }
  if (_cache[index] === undefined) {
    _cache[index] = createFakeRowObjectData(index);
  }
  return _cache[index];
}

function getSize() {
  return SIZE;
}

function createRows(numberOfRows) {
  for (let i = 0; i < numberOfRows; i++) {
    _cache[i] = createFakeRowObjectData(i);
  }
  return _cache;
}

const FakeObjectDataListStore = {
  getObjectAt,
  getSize,
  createRows
};

export default FakeObjectDataListStore;
