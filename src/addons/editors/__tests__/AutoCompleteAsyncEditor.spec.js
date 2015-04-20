'use strict';

var React                   = require('react');
var TestUtils               = require('react/lib/ReactTestUtils');
var rewire                  = require('rewire');
var rewireModule            = require('../../../../test/rewireModule');
var StubComponent           = require('../../../../test/StubComponent');
var AutoCompleteAsyncEditor = rewire('../AutoCompleteAsyncEditor');

describe('AutoCompleteEditorAsync', () => {
  var component;
  var AutoCompleteEditorStub = StubComponent('AutoCompleteEditor');

  // Configure local variable replacements for the module.
  rewireModule(AutoCompleteAsyncEditor, {
    AutoCompleteEditor: AutoCompleteEditorStub
  });

  function fakeCb(val) { return val; };
  var fakeFormatter = { format: fakeCb };
  var fakeColumn = {
    key: 'autocomplete',
    formatter: function() {
      return fakeFormatter;
    }
  };
  var fakeMetaData = { arg1: 'test' };
  var fakeArgs = ['arg1'];
  var fakeParams = ['param1', 'param2', 'param3'];

  describe('Basic tests', () => {

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<AutoCompleteAsyncEditor
        cacheResults={true}
        column={fakeColumn}
        rowMetaData={fakeMetaData}
        height={30}
        label='title'
        onCommit={fakeCb}
        onKeyDown={fakeCb}
        resultIdentifier='id'
        searchSourceArgs={fakeArgs}
        searchUrl={fakeCb}
        value='test'
        valueParams={fakeParams}/>);
      });

      it('should create a new AutoCompleteEditorAsync instance', () => {
        expect(component).toBeDefined();
      });

      it('should render an AutoCompleteEditor component', () => {
        var Autocomplete = TestUtils.findRenderedComponentWithType(component, AutoCompleteEditorStub);
        expect(Autocomplete).toBeDefined();
      });

      it('should render an AutoCompleteEditor component', () => {
        var Autocomplete = TestUtils.findRenderedComponentWithType(component, AutoCompleteEditorStub);
        expect(Autocomplete).toBeDefined();
      });

      it('should spread its own props to the AutoCompleteEditor', () => {
        var Autocomplete = TestUtils.findRenderedComponentWithType(component, AutoCompleteEditorStub);
        expect(Autocomplete.props.height).toBe(30);
      });

      it('should pass an empty array of options to the AutoCompleteEditor', () => {
        var Autocomplete = TestUtils.findRenderedComponentWithType(component, AutoCompleteEditorStub);
        expect(Autocomplete.props.options.length).toBe(0);
      });

      it('should pass the searchRemote function to the AutoCompleteEditor', () => {
        var Autocomplete = TestUtils.findRenderedComponentWithType(component, AutoCompleteEditorStub);
        expect(Autocomplete.props.search).toBe(component._searchRemote);
      });

      it('should pass the value to the AutoCompleteEditor', () => {
        var Autocomplete = TestUtils.findRenderedComponentWithType(component, AutoCompleteEditorStub);
        expect(Autocomplete.props.value).toBe('test');
      });

      it('should get search parameters from rowMetaData', () => {
        expect(component.getSearchParams()[0]).toBe('test');
      });

      it('should be able to getValue from the AutoCompleteEditor', () => {
        var Autocomplete = TestUtils.findRenderedComponentWithType(component, AutoCompleteEditorStub);
        Autocomplete.getValue = function() { return 'test' };
        expect(component.getValue()).toBe('test');
      });

      it('should be able to check if the AutoCompleteEditor hasResults', () => {
        var Autocomplete = TestUtils.findRenderedComponentWithType(component, AutoCompleteEditorStub);
        Autocomplete.hasResults = function() { return 'test' };
        expect(component.hasResults()).toBe('test');
      });

      it('should filter results by the searchTerm', () => {
        var result = component._filterData([{ title: 'test' }], 'test')[0];
        expect(result.title).toBe('test');
      });

    });
});
