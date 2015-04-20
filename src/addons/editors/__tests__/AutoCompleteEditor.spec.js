'use strict';

var React              = require('react');
var TestUtils          = require('react/lib/ReactTestUtils');
var rewire             = require('rewire');
var rewireModule       = require('../../../../test/rewireModule');
var StubComponent      = require('../../../../test/StubComponent');
var AutoCompleteEditor = rewire('../AutoCompleteEditor');

describe('AutoCompleteEditor', () => {
  var component;
  var ReactAutocompleteStub = StubComponent('ReactAutocomplete');

  // Configure local variable replacements for the module.
  rewireModule(AutoCompleteEditor, {
    ReactAutocomplete: ReactAutocompleteStub
  });

  function fakeCb(keyEvent) { return true; };
  var fakeOptions = [{id: 1, title:'test-result1'},{id: 1, title:'test-result2'}];
  var fakeParams = ['param1', 'param2', 'param3'];
  var fakeColumn = { key: 'autocomplete' };
  var fakeLabelFn = function (item) { return item; };

  describe('Basic tests', () => {

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<AutoCompleteEditor
        onCommit={fakeCb}
        options={fakeOptions}
        label='title'
        value='value'
        valueParams={fakeParams}
        column={fakeColumn}
        resultIdentifier='id'
        search='test'
        height='30px'
        onKeyDown={fakeCb}/>);
      });

      it('should create a new AutoCompleteEditor instance', () => {
        expect(component).toBeDefined();
      });

      it('should render a ReactAutocomplete component', () => {
        var Autocomplete = TestUtils.findRenderedComponentWithType(component, ReactAutocompleteStub);
        expect(Autocomplete).toBeDefined();
      });

      it('should pass the search text to ReachAutocomplete as a prop', () => {
        var Autocomplete = TestUtils.findRenderedComponentWithType(component, ReactAutocompleteStub);
        expect(Autocomplete.props.search).toBeDefined('test');
      });

      it('should pass the label to ReachAutocomplete as a prop', () => {
        var Autocomplete = TestUtils.findRenderedComponentWithType(component, ReactAutocompleteStub);
        expect(Autocomplete.props.label).toBeDefined('autocomplete');
      });

      it('should pass the resultIdentifier to ReachAutocomplete as a prop', () => {
        var Autocomplete = TestUtils.findRenderedComponentWithType(component, ReactAutocompleteStub);
        expect(Autocomplete.props.resultIdentifier).toBeDefined('id');
      });

      it('should pass the options to ReachAutocomplete as a prop', () => {
        var Autocomplete = TestUtils.findRenderedComponentWithType(component, ReactAutocompleteStub);
        expect(Autocomplete.props.options).toBeDefined(fakeOptions);
      });

      it('should pass the value to ReachAutocomplete as a prop', () => {
        var Autocomplete = TestUtils.findRenderedComponentWithType(component, ReactAutocompleteStub);
        expect(Autocomplete.props.value.title).toBeDefined('value');
      });

      it('should construct values from the parameters', () => {
        var constructedValues = component.constuctValueFromParams({'param1' : 'value1','param2' : 'value2'}, fakeParams);
        expect(constructedValues).toBe('value1|value2|');
      });

      it('should return the value for getLabel if item is a string', () => {
        var value = component.getLabel({'title': 'autocomplete'});
        expect(value).toBe('autocomplete');
      });

      it('should return whether or not it is focused', () => {
        var Autocomplete = TestUtils.findRenderedComponentWithType(component, ReactAutocompleteStub);
        Autocomplete.state = Autocomplete.state || {};
        Autocomplete.state.focusedValue = fakeOptions[1];
        expect(component.isFocusedOnSuggestion()).toBe(true);
      });

      it('should return whether or not it has results', () => {
        var Autocomplete = TestUtils.findRenderedComponentWithType(component, ReactAutocompleteStub);
        Autocomplete.state = Autocomplete.state || {};
        Autocomplete.state.results = [fakeOptions[1]];
        expect(component.hasResults()).toBe(true);
      });

      it('should return the selected value on getValue', () => {
        var Autocomplete = TestUtils.findRenderedComponentWithType(component, ReactAutocompleteStub);
        Autocomplete.state = Autocomplete.state || {};
        Autocomplete.state.results = [fakeOptions[1]];
        Autocomplete.state.focusedValue = {'param1' : 'value1'};
        expect(component.getValue().autocomplete).toBe('value1||');
      });

      it('should return the search term if no results on getValue', () => {
        var Autocomplete = TestUtils.findRenderedComponentWithType(component, ReactAutocompleteStub);
        Autocomplete.state = Autocomplete.state || {};
        Autocomplete.state.results = [];
        Autocomplete.state.searchTerm = 'test';
        expect(component.getValue().autocomplete).toBe('test');
      });

  });

  describe('With different props', () => {

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<AutoCompleteEditor
        onCommit={fakeCb}
        options={fakeOptions}
        label={fakeLabelFn}
        value='value'
        valueParams={fakeParams}
        column={fakeColumn}
        resultIdentifier='id'
        search='test'
        height='30px'
        onKeyDown={fakeCb}/>);
      });

      it('should return the value for getLabel if item is a function', () => {
        var value = component.getLabel('autocomplete');
        expect(value).toBe('autocomplete');
      });

  });
});
