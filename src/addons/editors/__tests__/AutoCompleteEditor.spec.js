'use strict';

var React              = require('react');
var TestUtils          = require('react/lib/ReactTestUtils');
var ReactAutocomplete  = require('ron-react-autocomplete');
var AutoCompleteEditor = require('../AutoCompleteEditor');

describe('AutoCompleteEditor', () => {
  var component;

  function fakeCommitCb(keyEvent) { return true; };
  var fakeOptions = [{id: 1, title:'test-result1'},{id: 1, title:'test-result2'}];
  var fakeParams = ['param1', 'param2', 'param3'];
  var fakeColumn = { key: 'autocomplete' };

  describe('Basic tests', () => {

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<AutoCompleteEditor
        onCommit={fakeCommitCb}
        options={fakeOptions}
        label='title'
        value='value'
        valueParams={fakeParams}
        column={fakeColumn}
        resultIdentifier='id'
        search='test'/>);
      });

      it('should create a new AutoCompleteEditor instance', () => {
        expect(component).toBeDefined();
      });

      it('should render a ReactAutocomplete component', () => {
        var Autocomplete = TestUtils.findRenderedComponentWithType(component, ReactAutocomplete);
        expect(Autocomplete).toBeDefined();
      });

      it('should pass the search text to ReachAutocomplete as a prop', () => {
        var Autocomplete = TestUtils.findRenderedComponentWithType(component, ReactAutocomplete);
        expect(Autocomplete.props.search).toBeDefined('test');
      });

      it('should pass the label to ReachAutocomplete as a prop', () => {
        var Autocomplete = TestUtils.findRenderedComponentWithType(component, ReactAutocomplete);
        expect(Autocomplete.props.label).toBeDefined('autocomplete');
      });

      it('should pass the resultIdentifier to ReachAutocomplete as a prop', () => {
        var Autocomplete = TestUtils.findRenderedComponentWithType(component, ReactAutocomplete);
        expect(Autocomplete.props.resultIdentifier).toBeDefined('id');
      });

      it('should pass the options to ReachAutocomplete as a prop', () => {
        var Autocomplete = TestUtils.findRenderedComponentWithType(component, ReactAutocomplete);
        expect(Autocomplete.props.options).toBeDefined(fakeOptions);
      });

      it('should pass the value to ReachAutocomplete as a prop', () => {
        var Autocomplete = TestUtils.findRenderedComponentWithType(component, ReactAutocomplete);
        expect(Autocomplete.props.value.title).toBeDefined('value');
      });

      it('should construct values from the parameters', () => {
        var constructedValues = component.constuctValueFromParams({'param1' : 'value1','param2' : 'value2'}, fakeParams);
        expect(constructedValues).toBe('value1|value2|');
      });

      it('should return the value for getLabel', () => {
        var value = component.getLabel({'title': 'autocomplete'});
        expect(value).toBe('autocomplete');
      });

      it('should return whether or not it is focused', () => {
        var Autocomplete = TestUtils.findRenderedComponentWithType(component, ReactAutocomplete);
        Autocomplete.state.focusedValue = fakeOptions[1];
        expect(component.isFocusedOnSuggestion()).toBe(true);
      });

      it('should return whether or not it has results', () => {
        var Autocomplete = TestUtils.findRenderedComponentWithType(component, ReactAutocomplete);
        Autocomplete.state.results = [fakeOptions[1]];
        expect(component.hasResults()).toBe(true);
      })

      it('should return the selected value on getValue', () => {
        expect(component.getValue().autocomplete).toBe('value');
      });

  });
});
