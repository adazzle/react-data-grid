'use strict';

var React              = require('react');
var TestUtils          = require('react/lib/ReactTestUtils');
var rewire             = require('rewire');
var rewireModule       = require('../../../../test/rewireModule');
var StubComponent      = require('../../../../test/StubComponent');
var AutoCompleteEditor = require('../AutoCompleteEditor');

describe('AutoCompleteEditor integration', () => {
  var component;
  function fakeCb(keyEvent) { return true; };
  var fakeOptions = [{id: 1, title:'test-result1'},{id: 2, title:'test-result2'}];
  var fakeParams = ['param1', 'param2', 'param3'];
  var fakeColumn = { key: 'autocomplete' };
  var fakeLabelFn = function (item) { return item; };

  var commitSpy = jasmine.createSpy();

    beforeEach(() => {
      component = React.render(<AutoCompleteEditor
        onCommit={commitSpy}
        options={fakeOptions}
        label='title'
        valueParams={fakeParams}
        column={fakeColumn}
        resultIdentifier='id'
        height={30}
        onKeyDown={fakeCb}/>, document.body);
      });

      afterEach(() => {
        React.unmountComponentAtNode(document.body);
      });

      describe('Input Events', () => {
        it('clicking on an item should trigger commit', () => {
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
