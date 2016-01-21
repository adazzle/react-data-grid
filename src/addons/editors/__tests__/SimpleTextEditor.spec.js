const React            = require('react');
const TestUtils        = require('react/lib/ReactTestUtils');
const SimpleTextEditor = require('../SimpleTextEditor');

describe('SimpleTextEditor', () => {
  describe('Basic tests', () => {
    let component;

    let fakeColumn = { key: 'text' };
    function fakeBlurCb() { return true; }

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<SimpleTextEditor
        value={'This is a test'}
        onBlur={fakeBlurCb}
        column={fakeColumn}
        />);
    });

    it('should create a new SimpleTextEditor instance', () => {
      expect(component).toBeDefined();
    });

    it('should pass the onBlur fuction down to the input as a prop', () => {
      let Input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
      expect(Input.props.onBlur()).toBe(true);
    });

    it('should return the value when getValue is called', () => {
      expect(component.getValue().text).toBe('This is a test');
    });
  });
});
