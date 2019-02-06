import React from 'react';
import filterRows from '../RowFilterer';
import { fromJS } from 'immutable';
import AutoCompleteFilter from '../../cells/headerCells/filters/AutoCompleteFilter';
import TestUtils from 'react-dom/test-utils';

const rows = [{ colOne: 'v1', colTwo: 'b1' },
              { colOne: 'v2', colTwo: 'b2' },
              { colOne: 'v3', colTwo: 'b3' }];
const filters = { colOne: { filterTerm: 'v1' } };

const fakeColumn = { name: 'Col One', key: 'colOne', width: 100 };

const fakeOnChange = () => { };
const fakeGetValidFilterValues = () => { return []; };

const acFilter = TestUtils.renderIntoDocument(<AutoCompleteFilter onChange={fakeOnChange} column={fakeColumn} getValidFilterValues={fakeGetValidFilterValues} />);

const acFilters = { colOne: { filterTerm: [{ value: 'v1' }, { value: 'v2' }], filterValues: acFilter.filterValues } };

const acFilters2Column = { colOne: { filterTerm: [{ value: 'v1' }, { value: 'v2' }], filterValues: acFilter.filterValues }, colTwo: { filterTerm: [{ value: 'b2' }], filterValues: acFilter.filterValues } };

describe('Row Filterer', () => {
  it('It can filter arrays of rows', () => {
    const filterResult = filterRows(filters, rows);
    expect(filterResult.length).toBe(1);
  });

  it('It can filter an immutable js list of rows', () => {
    const immutableList = fromJS(rows);
    const filterResult = filterRows(filters, immutableList);
    expect(filterResult.size).toBe(1);
  });
  it('It can filter a normal array of rows with AutoCompleteFilter', () => {
    const filterResult = filterRows(acFilters, rows);
    expect(filterResult.length).toBe(2);
  });
  it('It can filter a normal array of rows with 2 columns using AutoCompleteFilter', () => {
    const filterResult = filterRows(acFilters2Column, rows);
    expect(filterResult.length).toBe(1);
  });
});
