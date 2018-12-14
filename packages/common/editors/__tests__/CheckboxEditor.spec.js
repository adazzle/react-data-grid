const React          = require('react');
const ReactDOM = require('react-dom');
const TestUtils      = require('react-dom/test-utils');
const { mount } = require('enzyme');
const sinon = require('sinon');
const CheckboxEditor = require('../CheckboxEditor');

describe('CheckboxEditor', () => {
  let component;
  let componentWrapper;
  let consoleErrorStub;
  const testColumn = {
    key: 'columnKey',
    onCellChange: function() {}
  };

  describe('Basic tests', () => {
    afterEach(() => {
      consoleErrorStub.restore();
    });

    beforeEach(() => {
      spyOn(testColumn, 'onCellChange');
      consoleErrorStub = sinon.stub(console, 'error');
      componentWrapper = mount(<CheckboxEditor
        value={true}
        rowIdx={1}
        column={testColumn}/>);
      component = componentWrapper.instance();
    });

    it('should not send warning message to console.error', () => {
      expect(consoleErrorStub.callCount).toBe(0);
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
