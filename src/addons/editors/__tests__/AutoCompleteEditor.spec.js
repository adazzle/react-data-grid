'use strict';

var React              = require('react');
var TestUtils          = require('react/lib/ReactTestUtils');
var rewire             = require('rewire');
var rewireModule       = require('../../../../test/rewireModule');
var StubComponent      = require('../../../../test/StubComponent');
var AutoCompleteEditor = rewire('../AutoCompleteEditor');

describe('AutoCompleteEditor', () => {
  var component;
  function fakeCb(keyEvent) { return true; };
  var fakeOptions = [{id: 1, title:'test-result1'},{id: 2, title:'test-result2'}];
  var fakeParams = ['param1', 'param2', 'param3'];
  var fakeColumn = { key: 'autocomplete' };
  var fakeLabelFn = function (item) { return item; };


  describe('Unit Tests', () => {
    var ReactAutocompleteStub = StubComponent('ReactAutocomplete');

    // Configure local variable replacements for the module.
    rewireModule(AutoCompleteEditor, {
      ReactAutocomplete: ReactAutocompleteStub
    });

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
          height={30}
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

  describe('Integration Tests', () => {

    var commitSpy = jasmine.createSpy();

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<AutoCompleteEditor
        onCommit={commitSpy}
        options={fakeOptions}
        label='title'
        valueParams={fakeParams}
        column={fakeColumn}
        resultIdentifier='id'
        height={30}
        onKeyDown={fakeCb}/>);
      });

      describe('Input Events', () => {
        it('clicking on an item should trigger commit', () => {
          debugger;
          var Autocomplete = TestUtils.findRenderedComponentWithType(component, AutoCompleteEditor);
          var textInputEle = Autocomplete.getInputNode();
          // Click on input
          TestUtils.Simulate.click(textInputEle);
          // Click on first result
          TestUtils.Simulate.click(textInputEle.nextSibling.children[0]);
          // Expect value to have been committed
          expect(commitSpy).toHaveBeenCalled();
          expect(commitSpy.callCount).toEqual(1);
        });

      });
  });

});
