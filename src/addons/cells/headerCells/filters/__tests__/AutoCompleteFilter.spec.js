import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import AutoCompleteFilter from '../AutoCompleteFilter';

function createRows() {
  let rows = [];
  for (let i = 1; i <= 2; i++) {
    rows.push({ id: i, title: 'Title ' + i, count: i * 1000 });
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
      it('with undefined value', () => {
        let request = component.filterValues(rows[0], null, null);
        expect(request).toBe(false);
      });
      it('with valid value to filter', () => {
        let columnFilter = { filterTerm: [ {value: '1'} ] };
        let columnKey = 'title';
        let request = component.filterValues(rows[0], columnFilter, columnKey);
        expect(request).toEqual(true);
      });
      it('with invalid value to filter', () => {
        let columnFilter = { filterTerm: [ {value: '2'} ] };
        let columnKey = 'title';
        let request = component.filterValues(rows[0], columnFilter, columnKey);
        expect(request).toEqual(false);
      });
      it('with empty value to filter', () => {
        let columnFilter = { filterTerm: [ {value: ''} ] };
        let columnKey = 'title';
        let request = component.filterValues(rows[0], columnFilter, columnKey);
        expect(request).toEqual(false);
      });
    });
  });
});
