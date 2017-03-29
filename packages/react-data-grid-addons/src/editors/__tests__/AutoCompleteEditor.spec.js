let React              = require('react');
let TestUtils          = require('react-addons-test-utils');
let rewire             = require('rewire');
let rewireModule       = require('../../../../../test/rewireModule');
let StubComponent      = require('../../../../../test/StubComponent');
let AutoCompleteEditor = rewire('../AutoCompleteEditor');

describe('AutoCompleteEditor', () => {
  let component;
  function fakeCb() { return true; }
  let fakeSelectedOption = {id: 1, title: 'test-result1'};
  let fakeOptions = [fakeSelectedOption, {id: 2, title: 'test-result2'}];
  let fakeParams = ['param1', 'param2', 'param3'];
  let fakeColumn = { key: 'autocomplete', name: 'name', width: 0 };
  let fakeLabelFn = function(item) { return item; };

  describe('Unit Tests', () => {
    let ReactSelectStub = new StubComponent('Select.Async');
    // Configure local letiable replacements for the module.
    rewireModule(AutoCompleteEditor, {
      'Select.Async': ReactSelectStub
    });

    describe('Basic tests', () => {
      beforeEach(() => {
        component = TestUtils.renderIntoDocument(<AutoCompleteEditor
          onCommit={fakeCb}
          options={fakeOptions}
          label="title"
          value={fakeSelectedOption.title}
          valueParams={fakeParams}
          column={fakeColumn}
          resultIdentifier="id"
          height={30}
          onKeyDown={fakeCb}/>);
      });

      it('should create a new AutoCompleteEditor instance', () => {
        expect(component).toBeDefined();
      });

      it('should render a ReactSelect component', () => {
        let reactSelect = TestUtils.findRenderedComponentWithType(component, ReactSelectStub);
        expect(reactSelect).toBeDefined();
      });

      it('should pass the label to ReactSelect as a prop', () => {
        let reactSelect = TestUtils.findRenderedComponentWithType(component, ReactSelectStub);
        expect(reactSelect.props.labelKey).toBeDefined('title');
      });

      it('should pass the resultIdentifier to ReactSelect as a prop', () => {
        let reactSelect = TestUtils.findRenderedComponentWithType(component, ReactSelectStub);
        expect(reactSelect.props.valueKey).toBeDefined('id');
      });

      it('should pass the options to ReactSelect via a callback', () => {
        let callback = (err, results) => {
          expect(results.options).toBeDefined(fakeOptions);
        };
        let reactSelect = TestUtils.findRenderedComponentWithType(component, ReactSelectStub);
        reactSelect.props.loadOptions('', callback);
      });

      it('should pass the value to ReactSelect as a prop', () => {
        let reactSelect = TestUtils.findRenderedComponentWithType(component, ReactSelectStub);
        expect(reactSelect.props.value).toBeDefined(fakeSelectedOption.id);
      });

      it('should construct values from the parameters', () => {
        let constructedValues = component.constuctValueFromParams({param1: 'value1', param2: 'value2'}, fakeParams);
        expect(constructedValues).toBe('value1|value2|');
      });

      it('should return the value for getLabel if item is a string', () => {
        let value = component.getLabel({title: 'autocomplete'});
        expect(value).toBe('autocomplete');
      });
    });

    describe('With different props', () => {
      beforeEach(() => {
        component = TestUtils.renderIntoDocument(<AutoCompleteEditor
          onCommit={fakeCb}
          options={fakeOptions}
          label={fakeLabelFn}
          value="value"
          valueParams={fakeParams}
          column={fakeColumn}
          resultIdentifier="id"
          height={30}
          onKeyDown={fakeCb}/>);
      });

      it('should return the value for getLabel if item is a function', () => {
        let value = component.getLabel('autocomplete');
        expect(value).toBe('autocomplete');
      });
    });

    describe('With editorDisplayValue prop', () => {
      const editorDisplayValue = (col, val) => {
        const options = fakeOptions.filter(o => o.title === val);
        return options[0].title;
      };

      beforeEach(() => {
        component = TestUtils.renderIntoDocument(<AutoCompleteEditor
          options={fakeOptions}
          value={fakeSelectedOption.title}
          editorDisplayValue={editorDisplayValue}
          column={fakeColumn}/>);
      });

      it('should use the label returned by editorDisplayValue prop to look up the ReactSelect value', () => {
        let reactSelect = TestUtils.findRenderedComponentWithType(component, ReactSelectStub);
        expect(reactSelect.props.value).toEqual(fakeSelectedOption.id);
      });
    });
  });
});
