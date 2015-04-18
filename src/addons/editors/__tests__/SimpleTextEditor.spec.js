'use strict';

var React            = require('react');
var TestUtils        = require('react/lib/ReactTestUtils');
var SimpleTextEditor = require('../SimpleTextEditor');

describe('SimpleTextEditor', () => {
  var component;

  describe('Basic tests', () => {

    var fakeColumn = { key: 'text' };
    function fakeBlurCb() { return true; };

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<SimpleTextEditor
        value={'This is a test'}
        onBlur={fakeBlurCb}
        column={fakeColumn}/>);
      });

      it('should create a new SimpleTextEditor instance', () => {
        expect(component).toBeDefined();
      });

      it('should pass the value down to the input as a prop', () => {
        var Input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
        expect(Input.props.value).toBe('This is a test');
      });

      it('should pass the onBlur fuction down to the input as a prop', () => {
        var Input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
        expect(Input.props.onBlur()).toBe(true);
      });

      it('should return the value when getValue is called', () => {
        expect(component.getValue().text).toBe('This is a test');
      });

  });
});
