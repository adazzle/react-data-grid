const React          = require('react');
const TestUtils      = require('react-dom/test-utils');
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
        value={'option2'}
        onCommit={fakeCommitCb}
        column={fakeColumn}/>);
    });

    it('should create a new DropDownEditor instance', () => {
      expect(component).toBeDefined();
    });

    it('should return 100% as its width', () => {
      expect(component.getStyle().width).toBe('100%');
    });

    it('should pass width=100% to the select node as an inline style', () => {
      let Select = TestUtils.findRenderedDOMComponentWithTag(component, 'select');
      expect(Select.style.width).toBe('100%');
    });

    it('should pass the value to the select node as an inline value', () => {
      let Select = TestUtils.findRenderedDOMComponentWithTag(component, 'select');
      expect(Select.value).toBe('option2');
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
      expect(component.getValue().selected).toBe('option2');
    });
  });

  describe('Object parameters', () => {
    let fakeOptions = [
      { id: '1', value: 'option1', title: 'Option 1' },
      { id: '2', value: 'option2', text: 'Option Two' },
      { id: '3', value: 'option3', title: 'Option 3', text: 'Option Three' }
    ];
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

    it('should display value unless text is specified', () => {
      let option = component.renderOptions()[0];
      expect(option.key).toBe('1');
      expect(option.props.value).toBe('option1');
      expect(option.props.title).toBe('Option 1');
      expect(option.props.children).toBe('option1');
    });

    it('should display text', () => {
      let option = component.renderOptions()[1];
      expect(option.key).toBe('2');
      expect(option.props.value).toBe('option2');
      expect(option.props.title).not.toBeDefined();
      expect(option.props.children).toBe('Option Two');
    });

    it('should display title', () => {
      let option = component.renderOptions()[2];
      expect(option.key).toBe('3');
      expect(option.props.value).toBe('option3');
      expect(option.props.title).toBe('Option 3');
      expect(option.props.children).toBe('Option Three');
    });
  });
});
