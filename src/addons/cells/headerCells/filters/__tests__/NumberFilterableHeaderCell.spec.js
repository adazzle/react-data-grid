import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import NumericFilter from '../NumericFilter';
import {jQuery, $} from 'jquery';

window.jQuery = jQuery;
window.$ = $;

describe('NumericFilter', () => {
  let component;

  describe('Basic tests', () => {
    function fakeGetValidFilterValues() {
      return [1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10, 10];
    }
    let fakeColumn = { name: 'Selected', key: 'selected', width: 100 };
    function fakeOnChange() { return true; }

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        <NumericFilter
        onChange={fakeOnChange}
        column={fakeColumn}
        getValidFilterValues={fakeGetValidFilterValues}
        />);
    });

    it('should create a new NumericFilter instance', () => {
      expect(component).toBeDefined();
    });
  });

  describe('Functional tests', () => {
    it('When using numbers with , as separator', () => {
      let request = component.getNumericValues('1,3,4,10');
      let result = [1, 3, 4, 10];
      expect(request).toEqual(result);
    });

    it('When using range filter', () => {
      let request = component.getNumericValues('3-7');
      let result = [3, 4, 5, 6, 7];
      expect(request).toEqual(result);
    });

    it('When using greater then filter', () => {
      let request = component.getNumericValues('>7');
      let result = [7, 8, 9, 10];
      expect(request).toEqual(result);
    });

    it('When using less then filter', () => {
      let request = component.getNumericValues('<5');
      let result = [1, 2, 3, 4, 5];
      expect(request).toEqual(result);
    });

    it('When using mixed filters then filter', () => {
      let request = component.getNumericValues('1,2,3-5,>6,<9,10');
      let result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      expect(request).toEqual(result);
    });

    it('When passing empty value', () => {
      let request = component.getNumericValues('');
      let result = [];
      expect(request).toEqual(result);
    });
  });
});
