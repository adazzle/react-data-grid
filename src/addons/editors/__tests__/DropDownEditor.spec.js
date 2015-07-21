'use strict';

var React          = require('react');
var TestUtils      = require('react/lib/ReactTestUtils');
var DropDownEditor = require('../DropDownEditor');

describe('DropDownEditor', () => {
  var component;

  describe('Basic tests', () => {

    var fakeOptions = ['option1', 'option2', 'option3'];
    var fakeColumn = { key: 'selected' };
    function fakeCommitCb(keyEvent) { return true; };

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<DropDownEditor
        name={'DropDownEditor'}
        options={fakeOptions}
        value={'Choose a thing'}
        onCommit={fakeCommitCb}
        column={fakeColumn}/>);
      });

      it('should create a new DropDownEditor instance', () => {
        expect(component).toBeDefined();
      });

      it('should return 100% as its width', () => {
        expect(component.getStyle().width).toBe('100%');
      });

      it('should pass width=100% to the select node as a prop', () => {
        var Select = TestUtils.findRenderedDOMComponentWithTag(component, 'select');
        expect(Select.props.style.width).toBe('100%');
      });

      it('should pass the value to the select node as a prop', () => {
        var Select = TestUtils.findRenderedDOMComponentWithTag(component, 'select');
        expect(Select.props.defaultValue).toBe('Choose a thing');
      });

      it('should render the options as ReactElements', () => {
        var firstOption = component.renderOptions()[0];
        expect(TestUtils.isElement(firstOption)).toBe(true);
      });

      it('should pass the option name as the key and value of each ReactElement', () => {
        var optionsArray = component.renderOptions();
        expect(optionsArray[0].type).toBe('option');
        expect(optionsArray[1].key).toBe('option2')
        expect(optionsArray[2].props.value).toBe('option3');
      });

      it('should return the selected option on getValue', () => {
        expect(component.getValue().selected).toBe('option1');
      });

  });
});
