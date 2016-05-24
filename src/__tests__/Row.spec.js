import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Row from '../Row';

describe('Row', () => {
  let fakeProps = {
    height: 35,
    columns: [],
    row: [],
    idx: 0
  };

  it('should import Row', () => {
    expect(Row).toBeDefined();
  });

  it('should create an instance of Row', () => {
    let component = TestUtils.renderIntoDocument(<Row {...fakeProps} />);
    expect(component).toBeDefined();
  });

  describe('with extra classes', () => {
    let fakeExtraClasses = ['row-extra-class', 'row-extra-extra-class'];

    it('should have extra classes', () => {
      let newProps = Object.assign({}, fakeProps, {extraClasses: fakeExtraClasses.join(' ')});
      let component = TestUtils.renderIntoDocument(<Row {...newProps} />);

      let row = TestUtils.findRenderedDOMComponentWithClass(component, 'react-grid-Row');
      fakeExtraClasses.forEach((c) => {
        let containsExtraClass = row.className.indexOf(c) > -1;
        expect(containsExtraClass).toBe(true);
      });
    });
  });
});
