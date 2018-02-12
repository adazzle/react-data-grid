import React from 'react';
import TestUtils from 'react-dom/test-utils';
import AutoCompleteFilter from '../AutoCompleteFilter';

function createRows() {
  let rows = [];
  const NUMBER_OF_ROWS = 2;
  for (let i = 1; i <= NUMBER_OF_ROWS; i++) {
    let title = `Title ${i} of ${NUMBER_OF_ROWS}`;
    rows.push({ id: i, title, count: i * 1000 });
  }
  return rows;
}

function fakeGetValidFilterValues() {
  let options = [];
  for (let i = 1; i <= 2; i++) {
    options.push({ label: 'Title ' + i, value: i });
  }
  return options;
}

describe('AutoCompleteFilter', () => {
  let component;
  let rows;

  describe('Basic tests', () => {
    const columnKey = 'title';

    let fakeColumn = { name: 'Titles', key: 'title', width: 100 };

    function fakeOnChange(obj) {
      obj.filterValues(rows[0], obj, columnKey);
      return true;
    }

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        <AutoCompleteFilter
        onChange={fakeOnChange}
        column={fakeColumn}
        getValidFilterValues={fakeGetValidFilterValues}
        />);
      rows = createRows();
    });

    it('should create a new AutoCompleteFilter instance', () => {
      expect(component).toBeDefined();
    });

    it('should handle change', () => {
      let value = [{ value: '1' }];
      component.handleChange(value);
      expect(component.state.filters).toEqual(value);
    });

    it('When options are valid', () => {
      let request = component.getOptions();
      let result = [
         { label: 'Title 1', value: 1 },
         { label: 'Title 2', value: 2 }
      ];
      expect(request).toEqual(result);
    });

    describe('When filtering a row', () => {
      const filterValues = (columnFilter) => {
        return component.filterValues(rows[0], columnFilter, columnKey);
      };

      it('should handle undefineds', () => {
        let request = component.filterValues(rows[0], null, null);
        expect(request).toBeFalsy();
      });

      it('should filter valid values', () => {
        let columnFilter = { filterTerm: [ {value: '1'} ] };
        let request = filterValues(columnFilter);
        expect(request).toBeTruthy();
      });

      it('should handle invalid values', () => {
        let columnFilter = { filterTerm: [ {value: '3'} ] };
        let request = filterValues(columnFilter);
        expect(request).toBeFalsy();
      });

      it('should handle empty values', () => {
        let columnFilter = { filterTerm: [ {value: ''} ] };
        let request = filterValues(columnFilter);
        expect(request).toBeFalsy();
      });

      it('should be a full match when filter match is the first word', () => {
        let columnFilter = { filterTerm: [ {value: 'Title 1'} ] };
        let request = filterValues(columnFilter);
        expect(request).toBeFalsy();
      });

      it('should transform Integers into string to compare', () => {
        let columnFilter = { filterTerm: [ {value: 1} ] };
        let request = filterValues(columnFilter);
        expect(request).toBeTruthy();
      });

      it('should transform Float into string to compare', () => {
        let columnFilter = { filterTerm: [ {value: 1.1} ] };
        let request = filterValues(columnFilter);
        expect(request).toBeFalsy();
      });

      it('should transform row values into string to compare data (returns true)', () => {
        rows = [{ id: 1, title: 0.15, count: 1 }];
        let columnFilter = { filterTerm: [ {value: '0.15'} ] };
        let request = filterValues(columnFilter);
        expect(request).toBeTruthy();
      });

      it('should transform row values into string to compare data (returns false)', () => {
        rows = [{ id: 1, title: 0.15, count: 1 }];
        let columnFilter = { filterTerm: [ {value: '0.10'} ] };
        let request = filterValues(columnFilter);
        expect(request).toBeFalsy();
      });

      it('should transform row and filter values into string to compare data', () => {
        rows = [{ id: 1, title: 0.15, count: 1 }];
        let columnFilter = { filterTerm: [ {value: 0.15} ] };
        let request = filterValues(columnFilter);
        expect(request).toBeTruthy();
      });

      it('should trim spaces of the filterTerm values', () => {
        let columnFilter = { filterTerm: [ {value: '   1   '} ] };
        let request = filterValues(columnFilter);
        expect(request).toBeTruthy();
      });

      it('should handle undefined row values', () => {
        rows = [{ id: 1, title: undefined, count: 1 }];
        let columnFilter = { filterTerm: [ {value: 1} ] };
        let request = filterValues(columnFilter);
        expect(request).toBeFalsy();
      });

      it('should handle undefined filter values', () => {
        let columnFilter = { filterTerm: [ {value: undefined} ] };
        let request = filterValues(columnFilter);
        expect(request).toBeFalsy();
      });
    });
  });
});
