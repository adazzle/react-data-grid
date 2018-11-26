const React              = require('react');
const ReactDOM = require('react-dom');
const TestUtils          = require('react-dom/test-utils');
const AutoCompleteEditor = require('../AutoCompleteEditor');

describe('AutoCompleteEditor integration', () => {
  let component;
  function fakeCb() { return true; }
  const fakeOptions = [{ id: 1, title: 'test-result1' }, { id: 2, title: 'test-result2' }];
  const fakeParams = ['param1', 'param2', 'param3'];
  const fakeColumn = { key: 'autocomplete', name: 'name', width: 0 };
  const commitSpy = jasmine.createSpy();

  beforeEach(() => {
    component = ReactDOM.render(<AutoCompleteEditor
      onCommit={commitSpy}
      options={fakeOptions}
      label= "title"
      valueParams={fakeParams}
      value= "value"
      column={fakeColumn}
      resultIdentifier="id"
      height={30}
      onKeyDown={fakeCb}/>, document.body);
  });

  afterEach(() => {
    React.unmountComponentAtNode(document.body);
  });

  describe('Input Events', () => {
    xit('clicking on an item should trigger commit', () => {
      const Autocomplete = TestUtils.findRenderedComponentWithType(component, AutoCompleteEditor);
      const textInputEle = Autocomplete.getInputNode();
      // Click on input
      TestUtils.Simulate.click(textInputEle);
      // Click on first result
      TestUtils.Simulate.click(textInputEle.nextSibling.children[0]);
      // Expect value to have been committed
      expect(commitSpy).toHaveBeenCalled();
      expect(commitSpy.calls.count()).toEqual(1);
    });
  });
});
