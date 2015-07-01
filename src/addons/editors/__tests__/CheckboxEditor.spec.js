'use strict';

var React          = require('react');
var TestUtils      = require('react/lib/ReactTestUtils');
var CheckboxEditor = require('../CheckboxEditor');

describe('CheckboxEditor', () => {
 var component;
 var testColumn = {
   onRowSelect : function(){}
 };

 describe('Basic tests', () => {
   beforeEach(() => {
     spyOn(testColumn, 'onRowSelect');
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
       expect(Input.props.checked).toBe(true);
     });

     it('should call onRowSelect with correct RowIdx when checkbox is clicked', () => {
       var Input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
       TestUtils.Simulate.click(Input.getDOMNode());
       expect(testColumn.onRowSelect).toHaveBeenCalled();
       var fakeEvent = {stopPropagation : function(){}};
       expect(testColumn.onRowSelect.mostRecentCall.args[0]).toEqual(1, fakeEvent);
     });
 });

 describe('Unchecked tests', () => {
   beforeEach(() => {
     component = TestUtils.renderIntoDocument(<CheckboxEditor
       value={false}
       rowIdx={1}
       column={testColumn}/>);
     });

   it('should not be selected if value prop is false', () => {
     var Input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
     expect(Input.props.checked).toBe(false);
   });
 });

});
