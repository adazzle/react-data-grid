const rewire = require('rewire');
const Selectors = rewire('../Selectors');
let filterSpy;
let groupRowsSpy;

function createRows() {
  let rows = [];
  for (let i = 0; i < 3; i++) {
    rows.push({ id: i, title: 'Title ' + i, count: i * 1000 });
  }
  return rows;
}

function setupSpies() {
  filterSpy = jasmine.createSpy();
  groupRowsSpy = jasmine.createSpy();
  Selectors.__set__('filterRows', filterSpy);
  Selectors.__set__('groupRows', groupRowsSpy);
}

function selectPerRow(rows, options) {
  for (let i = 0; i < rows.length; i++) {
    let filters = options.filters;
    let groupBy = options.groupBy;
    Selectors.selectRows({ rows, filters, groupBy });
  }
}


function executeSpyTests(fn) {

  describe('When filters are defined', () => {

    let options = { filters: { title: '1' } };

    it('should call filterRows the correct number of times', () => {
      let expectedRecalculations = fn(options);
      expect(filterSpy.callCount).toBe(expectedRecalculations);
    });
  });

  describe('When filters are undefined', () => {

    let options = {};

    it('should not call filterRows', () => {
      fn(options);
      expect(filterSpy.callCount).toBe(0);
    });
  });

  describe('When filters are an empty object', () => {

    let options = { filters: {} };

    it('should not call filterRows', () => {
      fn(options);
      expect(filterSpy.callCount).toBe(0);
    });
  });

  describe('When groupBy is defined', () => {

    let options = { groupBy: ['title'] };

    it('should call groupBy only once', () => {
      fn(options);
      expect(groupRowsSpy.callCount).toBe(1);
    });
  });

  describe('When groupBy is undefined', () => {

    let options = {};

    it('should not call groupBy', () => {
      fn(options);
      expect(groupRowsSpy.callCount).toBe(0);
    });
  });

  describe('When groupBy is an empty object', () => {

    let options = { groupBy: {} };

    it('should not call groupBy', () => {
      fn(options);
      expect(groupRowsSpy.callCount).toBe(0);
    });
  });

  describe('When groupBy is an empty array', () => {

    let options = { groupBy: [] };

    it('should not call groupBy', () => {
      fn(options);
      expect(groupRowsSpy.callCount).toBe(0);
    });
  });
}


describe('Grid Selectors', () => {

  beforeEach(() => {
    setupSpies();
  });

  describe('Calling getRows multiple times for the same array of rows', () => {

    const createRowsAndSelect = (options) => {
      let numberOfRowChanges = 0;
      let rows = createRows();
      numberOfRowChanges++;
      selectPerRow(rows, options);
      return numberOfRowChanges;
    };

    executeSpyTests(createRowsAndSelect);
  });


});
