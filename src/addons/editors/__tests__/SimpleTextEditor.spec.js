'use strict';

var React            = require('react');
var TestUtils        = require('react-addons-test-utils');
var SimpleTextEditor = require('../SimpleTextEditor');

describe('SimpleTextEditor', () => {

  describe('Basic tests', () => {
    var component;

    var fakeColumn = { key: 'text' };
    function fakeBlurCb() { return true; }

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<SimpleTextEditor
        value={'This is a test'}
        onCommit={fakeBlurCb}
        column={fakeColumn}
        />);
      });

      it('should create a new SimpleTextEditor instance', () => {
        expect(component).toBeDefined();
      });

      it('should commit onBlur', () => {
        var Input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
        expect(Input.props.onBlur()).toBe(true);
      });

      it('should return the value when getValue is called', () => {
        expect(component.getValue().text).toBe('This is a test');
      });

  });
});
