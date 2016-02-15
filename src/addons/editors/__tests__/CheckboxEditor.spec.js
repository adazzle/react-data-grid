const React          = require('react');
const ReactDOM = require('react-dom');
const TestUtils      = require('react/lib/ReactTestUtils');
const CheckboxEditor = require('../CheckboxEditor');

describe('CheckboxEditor', () => {
  let component;
  let testColumn = {
    key: 'columnKey',
    onCellChange: function() {}
  };

  describe('Basic tests', () => {
    beforeEach(() => {
      spyOn(testColumn, 'onCellChange');
      component = TestUtils.renderIntoDocument(<CheckboxEditor
        value={true}
        rowIdx={1}
        column={testColumn}/>);
    });

    it('should create a new CheckboxEditor instance', () => {
      expect(component).toBeDefined();
    });

    it('should be selected if value prop is true', () => {
      let Input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
      let checkboxNode = ReactDOM.findDOMNode(Input);
      expect(checkboxNode.checked).toBe(true);
    });

    it('should not be selected if value prop is false', () => {
      component.setProps({value: false});
      let Input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
      let checkboxNode = ReactDOM.findDOMNode(Input);
      expect(checkboxNode.checked).toBe(false);
    });

    it('should call onCellChange with correct rowIdx and columnKey when checkbox is clicked', () => {
      let Input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
      TestUtils.Simulate.click(ReactDOM.findDOMNode(Input));
      expect(testColumn.onCellChange).toHaveBeenCalled();
      let fakeEvent = {stopPropagation: function() {}};
      expect(testColumn.onCellChange.mostRecentCall.args[0]).toEqual(1, 'columnKey', fakeEvent);
    });
  });
});
