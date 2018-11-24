import React from 'react';
import TestUtils from 'react-dom/test-utils';
import NumericFilter from '../NumericFilter';

describe('NumericFilter', () => {
  let component;

  describe('Basic tests', () => {
    const fakeColumn = { name: 'Selected', key: 'selected', width: 100 };
    function fakeOnChange() { return true; }

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        <NumericFilter
        onChange={fakeOnChange}
        column={fakeColumn}
        />);
    });

    it('should create a new NumericFilter instance', () => {
      expect(component).toBeDefined();
    });
  });

  describe('Functional tests', () => {
    it('When using numbers with , as separator', () => {
      const request = component.getRules('1,3,4,10');
      const result = [{ type: 1, value: 1 },
      { type: 1, value: 3 },
      { type: 1, value: 4 },
      { type: 1, value: 10 }];
      expect(request).toEqual(result);
    });

    it('When using range filter', () => {
      const request = component.getRules('3-7');
      const result = [{ type: 2, begin: 3, end: 7 }];
      expect(request).toEqual(result);
    });

    it('When using greater then filter', () => {
      const request = component.getRules('>7');
      const result = [{ type: 3, value: 7 }];
      expect(request).toEqual(result);
    });

    it('When using less then filter', () => {
      const request = component.getRules('<5');
      const result = [{ type: 4, value: 5 }];
      expect(request).toEqual(result);
    });

    it('When using mixed filters', () => {
      const request = component.getRules('61,72,33-53,<6,>900,10');
      const result = [{ type: 1, value: 61 },
      { type: 1, value: 72 },
      { type: 2, begin: 33, end: 53 },
      { type: 4, value: 6 },
      { type: 3, value: 900 },
      { type: 1, value: 10 }];
      expect(request).toEqual(result);
    });

    it('When passing empty value', () => {
      const request = component.getRules('');
      const result = [];
      expect(request).toEqual(result);
    });
  });
});
