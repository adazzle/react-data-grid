'use strict';

var React          = require('react');
var TestUtils      = require('react/lib/ReactTestUtils');
var CheckboxEditor = require('../CheckboxEditor');

describe('CheckboxEditor', () => {
 var component;
 var testColumn = {
   key: 'columnKey'
   onCellChange : function(){}
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
       var Input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
       var checkboxNode = Input.getDOMNode();
       expect(checkboxNode.checked).toBe(true);
     });

     it('should not be selected if value prop is false', () => {
       component.setProps({value: false});
       var Input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
       var checkboxNode = Input.getDOMNode();
       expect(checkboxNode.checked).toBe(false);
     });

     it('should call onCellChange with correct rowIdx and columnKey when checkbox is clicked', () => {
       var Input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
       TestUtils.Simulate.click(Input.getDOMNode());
       expect(testColumn.onCellChange).toHaveBeenCalled();
       var fakeEvent = {stopPropagation : function(){}};
       expect(testColumn.onCellChange.mostRecentCall.args[0]).toEqual(1, fakeEvent);
     });
 });



});
