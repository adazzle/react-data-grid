'use strict';

var React          = require('react');
var TestUtils      = require('react/lib/ReactTestUtils');
var CheckboxEditor = require('../CheckboxEditor');

describe('CheckboxEditor', () => {
  var component;

  describe('Basic tests', () => {

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<CheckboxEditor
        value={true}
        rowIdx={1}/>);
      });

      it('should create a new CheckboxEditor instance', () => {
        expect(component).toBeDefined();
      });

      it('should be selected or not based on props', () => {
        var Input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
        expect(Input.props.checked).toBe(true);
      });
  });
});
