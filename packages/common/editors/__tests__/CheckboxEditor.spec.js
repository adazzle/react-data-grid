const React          = require('react');
const ReactDOM = require('react-dom');
const TestUtils      = require('react-dom/test-utils');
const { mount } = require('enzyme');
const CheckboxEditor = require('../CheckboxEditor');

describe('CheckboxEditor', () => {
  let component;
  let componentWrapper;
  const testColumn = {
    key: 'columnKey',
    onCellChange: function() {}
  };

  describe('Basic tests', () => {

    beforeEach(() => {
      spyOn(testColumn, 'onCellChange');
      componentWrapper = mount(<CheckboxEditor
        value={true}
        rowIdx={1}
        column={testColumn}/>);
      component = componentWrapper.instance();
    });

    it('should have a readOnly flag set', () => {
      const Input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
      const checkboxNode = ReactDOM.findDOMNode(Input);
      expect(checkboxNode.readOnly).toBe(true);
    });


    it('should create a new CheckboxEditor instance', () => {
      expect(component).toBeDefined();
    });

    it('should be selected if value prop is true', () => {
      const Input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
      const checkboxNode = ReactDOM.findDOMNode(Input);
      expect(checkboxNode.checked).toBe(true);
    });

    it('should not be selected if value prop is false', () => {
      componentWrapper.setProps({ value: false });
      const Input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
      const checkboxNode = ReactDOM.findDOMNode(Input);
      expect(checkboxNode.checked).toBe(false);
    });
  });
});
