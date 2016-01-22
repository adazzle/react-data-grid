

const React          = require('react');
const TestUtils      = require('react/lib/ReactTestUtils');
const DropDownEditor = require('../DropDownEditor');

describe('DropDownEditor', () => {
  let component;

  describe('Basic tests', () => {
    let fakeOptions = ['option1', 'option2', 'option3'];
    let fakeColumn = { key: 'selected' };
    function fakeCommitCb() { return true; }

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
      let Select = TestUtils.findRenderedDOMComponentWithTag(component, 'select');
      expect(Select.props.style.width).toBe('100%');
    });

    it('should pass the value to the select node as a prop', () => {
      let Select = TestUtils.findRenderedDOMComponentWithTag(component, 'select');
      expect(Select.props.defaultValue).toBe('Choose a thing');
    });

    it('should render the options as ReactElements', () => {
      let firstOption = component.renderOptions()[0];
      expect(TestUtils.isElement(firstOption)).toBe(true);
    });

    it('should pass the option name as the key and value of each ReactElement', () => {
      let optionsArray = component.renderOptions();
      expect(optionsArray[0].type).toBe('option');
      expect(optionsArray[1].key).toBe('option2');
      expect(optionsArray[2].props.value).toBe('option3');
    });

    it('should return the selected option on getValue', () => {
      expect(component.getValue().selected).toBe('option1');
    });
  });
});
