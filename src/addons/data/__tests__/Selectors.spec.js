const rewire = require('rewire');
const Selectors = rewire('../Selectors');

let filterSpy;

function createRows() {
  let rows = [];
  for (let i = 0; i < 3; i++) {
    rows.push({id: i, title: 'Title ' + i, count: i * 1000});
  }
  return rows;
}

function setupSpies() {
  filterSpy = jasmine.createSpy();
  Selectors.__set__('filterRows', filterSpy);
}

function callGetRowsXTimes(timesToCall, options, rows = createRows()) {
  for (let i = 0; i < timesToCall; i++) {
    let filters = options.filters;
    Selectors.getRows({rows, filters});
  }
}


ddescribe('Grid Selectors', () => {
  describe('Calling getRows multiple times for the same inputs', () => {
    const NUMBER_CALLS_TO_GET_ROWS = 3;

    describe('When filters are defined', () => {
      beforeEach(() => {
        setupSpies();
        let options = {filters: {title: '1'}};
        callGetRowsXTimes(NUMBER_CALLS_TO_GET_ROWS, options);
      });

      iit('should call filterRows only once', () => {
        expect(filterSpy.callCount).toBe(1);
      });
    });

    describe('When filters are undefined', () => {
      beforeEach(() => {
        setupSpies();
        let options = {};
        callGetRowsXTimes(NUMBER_CALLS_TO_GET_ROWS, options);
      });

      iit('should not call filterRows', () => {
        expect(filterSpy.callCount).toBe(0);
      });
   });

    describe('When filters are an empty object', () => {
      beforeEach(() => {
        setupSpies();
        let options = {filters: {}};
        callGetRowsXTimes(NUMBER_CALLS_TO_GET_ROWS, options);
      });

      iit('should not call filterRows', () => {
        expect(filterSpy.callCount).toBe(0);
      });
    });
  });
});
