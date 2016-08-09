import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
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
    let fakeColumn = { name: 'Titles', key: 'title', width: 100 };
    function fakeOnChange() { return true; }

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

    it('When options are valid', () => {
      let request = component.getOptions();
      let result = [
         { label: 'Title 1', value: 1 },
         { label: 'Title 2', value: 2 }
      ];
      expect(request).toEqual(result);
    });

    describe('When filtering a row', () => {
      const columnKey = 'title';

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
    });
  });
});
