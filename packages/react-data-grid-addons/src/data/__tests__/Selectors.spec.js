const rewire = require('rewire');
const Selectors = rewire('../Selectors');

let originalFilter = Selectors.__get__('filterRows');
let originalGroupBy = Selectors.__get__('groupRows');
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

function resetSpies() {
  Selectors.__set__('filterRows', originalFilter);
  Selectors.__set__('groupRows', originalGroupBy);
}

function selectPerRow(rows, options) {
  for (let i = 0; i < rows.length; i++) {
    let filters = options.filters;
    let groupBy = options.groupBy;
    Selectors.getRows({ rows, filters, groupBy });
  }
}


function executeSpyTests(fn) {
  describe('When filters are defined', () => {
    let options = { filters: { title: { filterTerm: '1' } } };

    it('should call filterRows the correct number of times', () => {
      let expectedComputations = fn(options);
      expect(filterSpy.calls.count()).toBe(expectedComputations);
    });

    it('should have filterTerm in every filter object', () => {
      let filters = options.filters;
      for (let i = 0; i < filters.length; i++) {
        expect(filter.filterTerm).toBeDefined();
      }
    });
  });

  describe('When filters are undefined', () => {
    let options = {};

    it('should not call filterRows', () => {
      fn(options);
      expect(filterSpy.calls.count()).toBe(0);
    });
  });

  describe('When filters are an empty object', () => {
    let options = { filters: {} };

    it('should not call filterRows', () => {
      fn(options);
      expect(filterSpy.calls.count()).toBe(0);
    });
  });

  describe('When groupBy is defined', () => {
    let options = { groupBy: ['title'] };

    it('should call groupBy only once', () => {
      let expectedComputations = fn(options);
      expect(groupRowsSpy.calls.count()).toBe(expectedComputations);
    });
  });

  describe('When groupBy is defined as an array of objects', () => {
    let options = { groupBy: [{key: 'title', name: 'Title'}] };

    it('should call groupBy only once', () => {
      let expectedComputations = fn(options);
      expect(groupRowsSpy.calls.count()).toBe(expectedComputations);
    });
  });


  describe('When groupBy is undefined', () => {
    let options = {};

    it('should not call groupBy', () => {
      fn(options);
      expect(groupRowsSpy.calls.count()).toBe(0);
    });
  });

  describe('When groupBy is an empty object', () => {
    let options = { groupBy: {} };

    it('should not call groupBy', () => {
      fn(options);
      expect(groupRowsSpy.calls.count()).toBe(0);
    });
  });

  describe('When groupBy is an empty array', () => {
    let options = { groupBy: [] };

    it('should not call groupBy', () => {
      fn(options);
      expect(groupRowsSpy.calls.count()).toBe(0);
    });
  });
}

describe('Grid Selectors', () => {
  let rows;

  describe('Spy Tests', () => {
    beforeEach(() => {
      setupSpies();
      rows = createRows();
    });

    afterEach(() => {
      resetSpies();
    });

    describe('Calling getRows multiple times for the same array of rows', () => {
      const testSelectRows = (options) => {
        let expectedComputations = 1;
        selectPerRow(rows, options);
        return expectedComputations;
      };

      executeSpyTests(testSelectRows);
    });

    describe('After adding a new row', () => {
      const testAfterAddRows = (options) => {
        let expectedComputations = 1;
        selectPerRow(rows, options);
        // do not mutate state
        let newRows = rows.slice(0);
        newRows.push({ id: 3, title: 'Title 3', count: 3000 });
        expectedComputations++;
        selectPerRow(newRows, options);
        return expectedComputations;
      };

      executeSpyTests(testAfterAddRows);
    });

    describe('After removing a new row', () => {
      const testAfterRemoveRows = (options) => {
        let expectedComputations = 1;
        selectPerRow(rows, options);
        let newRows = rows.slice(0);
        newRows.pop();
        expectedComputations++;
        selectPerRow(newRows, options);
        return expectedComputations;
      };

      executeSpyTests(testAfterRemoveRows);
    });

    describe('After updating a row', () => {
      const testAfterRemoveRows = (options) => {
        let expectedComputations = 1;
        selectPerRow(rows, options);
        let newRows = rows.slice(0);
        newRows[1].count = 400;
        expectedComputations++;
        selectPerRow(newRows, options);
        return expectedComputations;
      };

      executeSpyTests(testAfterRemoveRows);
    });
  });

  describe('functional tests', () => {
    beforeEach(() => {
      rows = createRows();
    });

    it('can filter on a single column', () => {
      let filters = { title: { filterTerm: '1' } };
      let computedRows = Selectors.getRows({ rows, filters });
      expect(computedRows.length).toBe(1);
      expect(computedRows[0].title).toBe('Title 1');
    });

    it('can filter on multiple columns', () => {
      let filters = { title: { filterTerm: 'title' }, count: { filterTerm: '2000' } };
      let computedRows = Selectors.getRows({ rows, filters });
      expect(computedRows.length).toBe(1);
      expect(computedRows[0].count).toBe(2000);
    });

    it('can group by a single column', () => {
      let groupBy = ['title'];
      let computedRows = Selectors.getRows({ rows, groupBy });
      expect(computedRows.length).toBe(6);
      expect(computedRows[0].__metaData).toEqual(jasmine.objectContaining({ columnGroupName: 'title', isExpanded: true, isGroup: true, treeDepth: 0 }));
      expect(computedRows[0].name).toEqual('Title 0');
      expect(computedRows[1]).toEqual(jasmine.objectContaining({ count: 0, id: 0, title: 'Title 0' }));
      expect(computedRows[2].__metaData).toEqual(jasmine.objectContaining({ columnGroupName: 'title', isExpanded: true, isGroup: true, treeDepth: 0 }));
      expect(computedRows[2].name).toEqual('Title 1');
      expect(computedRows[4].__metaData).toEqual(jasmine.objectContaining({ columnGroupName: 'title', isExpanded: true, isGroup: true, treeDepth: 0 }));
      expect(computedRows[4].name).toEqual('Title 2');
    });

    it('can group by multiple columns', () => {
      let groupBy = ['title', 'count', 'id'];
      let computedRows = Selectors.getRows({ rows, groupBy });
      expect(computedRows.length).toBe(12);
      expect(computedRows[0].__metaData).toEqual(jasmine.objectContaining({ columnGroupName: 'title', isExpanded: true, isGroup: true, treeDepth: 0 }));
      expect(computedRows[1].__metaData).toEqual(jasmine.objectContaining({ columnGroupName: 'count', isExpanded: true, isGroup: true, treeDepth: 1 }));
      expect(computedRows[2].__metaData).toEqual(jasmine.objectContaining({ columnGroupName: 'id', isExpanded: true, isGroup: true, treeDepth: 2 }));
      expect(computedRows[3]).toEqual(jasmine.objectContaining({ count: 0, id: 0, title: 'Title 0' }));
    });

    it('can filter and then group by column', () => {
      let filters = { title: { filterTerm: '1' } };
      let groupBy = ['title'];
      let computedRows = Selectors.getRows({ rows, filters, groupBy });
      expect(computedRows.length).toBe(2);
      expect(computedRows[0].__metaData).toEqual(jasmine.objectContaining({ columnGroupName: 'title', isExpanded: true, isGroup: true, treeDepth: 0 }));
      expect(computedRows[0].name).toEqual('Title 1');
      expect(computedRows[1]).toEqual(jasmine.objectContaining({ count: 1000, id: 1, title: 'Title 1' }));
    });

    it('can group by a single column when groupBy is an object array', () => {
      let groupBy = [{key: 'title', name: 'title'}];
      let computedRows = Selectors.getRows({ rows, groupBy });
      expect(computedRows.length).toBe(6);
      expect(computedRows[0].__metaData).toEqual(jasmine.objectContaining({ columnGroupName: 'title', isExpanded: true, isGroup: true, treeDepth: 0 }));
      expect(computedRows[0].name).toEqual('Title 0');
      expect(computedRows[1]).toEqual(jasmine.objectContaining({ count: 0, id: 0, title: 'Title 0' }));
      expect(computedRows[2].__metaData).toEqual(jasmine.objectContaining({ columnGroupName: 'title', isExpanded: true, isGroup: true, treeDepth: 0 }));
      expect(computedRows[2].name).toEqual('Title 1');
      expect(computedRows[4].__metaData).toEqual(jasmine.objectContaining({ columnGroupName: 'title', isExpanded: true, isGroup: true, treeDepth: 0 }));
      expect(computedRows[4].name).toEqual('Title 2');
    });

    it('can group by multiple columns when groupBy is an object array', () => {
      let groupBy = [{key: 'title', name: 'title'}, {key: 'count', name: 'count'}, {key: 'id', name: 'id'}];
      let computedRows = Selectors.getRows({ rows, groupBy });
      expect(computedRows.length).toBe(12);
      expect(computedRows[0].__metaData).toEqual(jasmine.objectContaining({ columnGroupName: 'title', isExpanded: true, isGroup: true, treeDepth: 0 }));
      expect(computedRows[1].__metaData).toEqual(jasmine.objectContaining({ columnGroupName: 'count', isExpanded: true, isGroup: true, treeDepth: 1 }));
      expect(computedRows[2].__metaData).toEqual(jasmine.objectContaining({ columnGroupName: 'id', isExpanded: true, isGroup: true, treeDepth: 2 }));
      expect(computedRows[3]).toEqual(jasmine.objectContaining({ count: 0, id: 0, title: 'Title 0' }));
    });

    it('can filter and then group by column when groupBy is an object array', () => {
      let filters = { title: { filterTerm: '1' } };
      let groupBy = [{key: 'title', name: 'title'}];
      let computedRows = Selectors.getRows({ rows, filters, groupBy });
      expect(computedRows.length).toBe(2);
      expect(computedRows[0].__metaData).toEqual(jasmine.objectContaining({ columnGroupName: 'title', isExpanded: true, isGroup: true, treeDepth: 0 }));
      expect(computedRows[0].name).toEqual('Title 1');
      expect(computedRows[1]).toEqual(jasmine.objectContaining({ count: 1000, id: 1, title: 'Title 1' }));
    });
  });
});
