'use strict';

var React          = require('react');
var TestUtils      = require('react/lib/ReactTestUtils');
var RadioButtonEditor = require('../RadioButtonEditor');

describe('RadioButtonEditor', () => {
 var component;
 var testColumn = {
   key: 'columnKey',
   onCellChange : function(){}
 };

 describe('Basic tests', () => {
   beforeEach(() => {
     spyOn(testColumn, 'onCellChange');
     component = TestUtils.renderIntoDocument(<RadioButtonEditor
       value={true}
       rowIdx={1}
       column={testColumn}/>);
     });

     it('should create a new RadioButtonEditor instance', () => {
       expect(component).toBeDefined();
     });

     it('should be selected if value prop is true', () => {
       var Input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
       var radiobuttonNode = Input.getDOMNode();
       expect(radiobuttonNode.checked).toBe(true);
     });

     it('should not be selected if value prop is false', () => {
       component.setProps({value: false});
       var Input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
       var radiobuttonNode = Input.getDOMNode();
       expect(radiobuttonNode.checked).toBe(false);
     });

     it('should call onCellChange with correct rowIdx and columnKey when radio button is clicked', () => {
       var Input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
       TestUtils.Simulate.click(Input.getDOMNode());
       expect(testColumn.onCellChange).toHaveBeenCalled();
       var fakeEvent = {stopPropagation : function(){}};
       expect(testColumn.onCellChange.mostRecentCall.args[0]).toEqual(1, 'columnKey', fakeEvent);
     });
 });

});
