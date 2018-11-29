import Selectors from '../Selectors';
import * as filterRows from '../RowFilterer';
import * as groupRows from '../RowGrouper';
let filterSpy;
let groupRowsSpy;

function createRows() {
  const rows = [];
  for (let i = 0; i < 3; i++) {
    rows.push({ id: i, title: 'Title ' + i, count: i * 1000 });
  }
  return rows;
}

function setupSpies() {
  filterSpy = spyOn(filterRows, 'default');
  groupRowsSpy = spyOn(groupRows, 'default');
}

function selectPerRow(rows, options) {
  for (let i = 0; i < rows.length; i++) {
    const filters = options.filters;
    const groupBy = options.groupBy;
    Selectors.getRows({ rows, filters, groupBy });
  }
}


function executeSpyTests(fn) {
  describe('When filters are defined', () => {
    const options = { filters: { title: { filterTerm: '1' } } };

    it('should call filterRows the correct number of times', () => {
      const expectedComputations = fn(options);
      expect(filterSpy.calls.count()).toBe(expectedComputations);
    });

    it('should have filterTerm in every filter object', () => {
      const filters = options.filters;
      for (let i = 0; i < filters.length; i++) {
        expect(filters[i].filterTerm).toBeDefined();
      }
    });
  });

  describe('When filters are undefined', () => {
    const options = {};

    it('should not call filterRows', () => {
      fn(options);
      expect(filterSpy.calls.count()).toBe(0);
    });
  });

  describe('When filters are an empty object', () => {
    const options = { filters: {} };

    it('should not call filterRows', () => {
      fn(options);
      expect(filterSpy.calls.count()).toBe(0);
    });
  });

  describe('When groupBy is defined', () => {
    const options = { groupBy: ['title'] };

    it('should call groupBy only once', () => {
      const expectedComputations = fn(options);
      expect(groupRowsSpy.calls.count()).toBe(expectedComputations);
    });
  });

  describe('When groupBy is defined as an array of objects', () => {
    const options = { groupBy: [{ key: 'title', name: 'Title' }] };

    it('should call groupBy only once', () => {
      const expectedComputations = fn(options);
      expect(groupRowsSpy.calls.count()).toBe(expectedComputations);
    });
  });


  describe('When groupBy is undefined', () => {
    const options = {};

    it('should not call groupBy', () => {
      fn(options);
      expect(groupRowsSpy.calls.count()).toBe(0);
    });
  });

  describe('When groupBy is an empty object', () => {
    const options = { groupBy: {} };

    it('should not call groupBy', () => {
      fn(options);
      expect(groupRowsSpy.calls.count()).toBe(0);
    });
  });

  describe('When groupBy is an empty array', () => {
    const options = { groupBy: [] };

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

    describe('Calling getRows multiple times for the same array of rows', () => {
      const testSelectRows = (options) => {
        const expectedComputations = 1;
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
        const newRows = rows.slice(0);
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
        const newRows = rows.slice(0);
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
        const newRows = rows.slice(0);
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
      const filters = { title: { filterTerm: '1' } };
      const computedRows = Selectors.getRows({ rows, filters });
      expect(computedRows.length).toBe(1);
      expect(computedRows[0].title).toBe('Title 1');
    });

    it('can filter on multiple columns', () => {
      const filters = { title: { filterTerm: 'title' }, count: { filterTerm: '2000' } };
      const computedRows = Selectors.getRows({ rows, filters });
      expect(computedRows.length).toBe(1);
      expect(computedRows[0].count).toBe(2000);
    });

    it('can group by a single column', () => {
      const groupBy = ['title'];
      const computedRows = Selectors.getRows({ rows, groupBy });
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
      const groupBy = ['title', 'count', 'id'];
      const computedRows = Selectors.getRows({ rows, groupBy });
      expect(computedRows.length).toBe(12);
      expect(computedRows[0].__metaData).toEqual(jasmine.objectContaining({ columnGroupName: 'title', isExpanded: true, isGroup: true, treeDepth: 0 }));
      expect(computedRows[1].__metaData).toEqual(jasmine.objectContaining({ columnGroupName: 'count', isExpanded: true, isGroup: true, treeDepth: 1 }));
      expect(computedRows[2].__metaData).toEqual(jasmine.objectContaining({ columnGroupName: 'id', isExpanded: true, isGroup: true, treeDepth: 2 }));
      expect(computedRows[3]).toEqual(jasmine.objectContaining({ count: 0, id: 0, title: 'Title 0' }));
    });

    it('can filter and then group by column', () => {
      const filters = { title: { filterTerm: '1' } };
      const groupBy = ['title'];
      const computedRows = Selectors.getRows({ rows, filters, groupBy });
      expect(computedRows.length).toBe(2);
      expect(computedRows[0].__metaData).toEqual(jasmine.objectContaining({ columnGroupName: 'title', isExpanded: true, isGroup: true, treeDepth: 0 }));
      expect(computedRows[0].name).toEqual('Title 1');
      expect(computedRows[1]).toEqual(jasmine.objectContaining({ count: 1000, id: 1, title: 'Title 1' }));
    });

    it('can group by a single column when groupBy is an object array', () => {
      const groupBy = [{ key: 'title', name: 'title' }];
      const computedRows = Selectors.getRows({ rows, groupBy });
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
      const groupBy = [{ key: 'title', name: 'title' }, { key: 'count', name: 'count' }, { key: 'id', name: 'id' }];
      const computedRows = Selectors.getRows({ rows, groupBy });
      expect(computedRows.length).toBe(12);
      expect(computedRows[0].__metaData).toEqual(jasmine.objectContaining({ columnGroupName: 'title', isExpanded: true, isGroup: true, treeDepth: 0 }));
      expect(computedRows[1].__metaData).toEqual(jasmine.objectContaining({ columnGroupName: 'count', isExpanded: true, isGroup: true, treeDepth: 1 }));
      expect(computedRows[2].__metaData).toEqual(jasmine.objectContaining({ columnGroupName: 'id', isExpanded: true, isGroup: true, treeDepth: 2 }));
      expect(computedRows[3]).toEqual(jasmine.objectContaining({ count: 0, id: 0, title: 'Title 0' }));
    });

    it('can filter and then group by column when groupBy is an object array', () => {
      const filters = { title: { filterTerm: '1' } };
      const groupBy = [{ key: 'title', name: 'title' }];
      const computedRows = Selectors.getRows({ rows, filters, groupBy });
      expect(computedRows.length).toBe(2);
      expect(computedRows[0].__metaData).toEqual(jasmine.objectContaining({ columnGroupName: 'title', isExpanded: true, isGroup: true, treeDepth: 0 }));
      expect(computedRows[0].name).toEqual('Title 1');
      expect(computedRows[1]).toEqual(jasmine.objectContaining({ count: 1000, id: 1, title: 'Title 1' }));
    });
  });
});
