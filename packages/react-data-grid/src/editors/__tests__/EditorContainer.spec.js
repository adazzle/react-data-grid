
const React            = require('react');
const ReactDOM         = require('react-dom');
const rewire           = require('rewire');
const EditorContainer  = rewire('../EditorContainer.js');
const TestUtils        = require('react-dom/test-utils');
const SimpleTextEditor = require('../SimpleTextEditor');
const EditorBase       = require('../EditorBase');
import { shallow } from 'enzyme';

describe('Editor Container Tests', () => {
  let component;
  let container;

  let fakeColumn = {
    name: 'col1',
    key: 'col1',
    width: 100
  };

  let rowData = {
    col1: 'I',
    col2: 'love',
    col3: 'Testing'
  };

  describe('Basic render tests', () => {
    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<EditorContainer
        rowData={rowData}
        value={'Adwolf'}
        column={fakeColumn}
        height={50}/>);
    });
    it('should create a new EditorContainer instance', () => {
      expect(component).toBeDefined();
    });

    it('should render a simpleTextEditor if no column.editor property', () => {
      let editor = TestUtils.findRenderedComponentWithType(component, SimpleTextEditor);
      expect(editor).toBeDefined();
    });

    it('should select the text of the default input when the editor is rendered', () => {
      function isTextSelected(input) {
        if (typeof input.selectionStart === 'number') {
          return input.selectionStart === 0 && input.selectionEnd === input.value.length;
        } else if (typeof document.selection !== 'undefined') {
          input.focus();
          return document.selection.createRange().text === input.value;
        }
      }

      let editor = TestUtils.findRenderedComponentWithType(component, SimpleTextEditor);
      expect(isTextSelected(editor.getInputNode())).toBeDefined();
    });

    it('should render the editor with the correct properties', () => {
      let editor = TestUtils.findRenderedComponentWithType(component, SimpleTextEditor);
      expect(editor.props.value).toEqual('Adwolf');
      expect(editor.props.column).toEqual(fakeColumn);
    });

    it('should render the editor container div with correct properties', () => {
      const renderComponent = (props) => {
        const wrapper = shallow(<EditorContainer {...props} />);
        return wrapper;
      };
      const props = {
        rowData: rowData,
        value: 'Adwolf',
        column: fakeColumn,
        height: 50
      };
      let editorDiv = renderComponent(props).find('div').at(0);
      expect(editorDiv.props().className).toBeDefined();
      expect(editorDiv.props().onBlur).toBeDefined();
      expect(editorDiv.props().onKeyDown).toBeDefined();
      expect(editorDiv.props().children).toBeDefined();
    });
  });

  describe('Custom Editors', () => {
    class TestEditor extends EditorBase {
      render() {
        return <div><input type="text" id="testpassed" /> <div> <input type="text" id="input2"/><button id="test-button" /></div> </div>;
      }
    }

    let column;
    beforeEach(() => {
      column = {
        key: 'col1',
        name: 'col1',
        width: 100
      };
    });

    it('should render element custom editors', () => {
      column.editor = <TestEditor />;
      component = TestUtils.renderIntoDocument(<EditorContainer
        rowData={rowData}
        value={'SupernaviX'}
        column={column}
        height={50}/>);
      let editor = TestUtils.findRenderedComponentWithType(component, TestEditor);
      expect(editor).toBeDefined();
      expect(editor.props.value).toBeDefined();
      expect(editor.props.onCommit).toBeDefined();
      expect(editor.props.onCommitCancel).toBeDefined();
    });

    it('should render component custom editors', () => {
      column.editor = TestEditor;
      component = TestUtils.renderIntoDocument(<EditorContainer
        rowData={rowData}
        value={'SupernaviX'}
        column={column}
        height={50}/>);
      let editor = TestUtils.findRenderedComponentWithType(component, TestEditor);
      expect(editor).toBeDefined();
      expect(editor.props.value).toBeDefined();
      expect(editor.props.onCommit).toBeDefined();
    });

    it('should commit if any element outside the editor is clicked', () => {
      column.editor = <TestEditor />;
      component = TestUtils.renderIntoDocument(<EditorContainer
        rowData={rowData}
        value={'SupernaviX'}
        column={column}
        height={50}/>);
      spyOn(component, 'commit');
      TestUtils.Simulate.blur(ReactDOM.findDOMNode(component), {relatedTarget: document.body, currentTarget: ReactDOM.findDOMNode(component)});
      expect(component.commit).toHaveBeenCalled();
    });

    it('should not commit if any element inside the editor is clicked', () => {
      column.editor = <TestEditor />;
      component = TestUtils.renderIntoDocument(<EditorContainer
        rowData={rowData}
        value={'SupernaviX'}
        column={column}
        height={50}/>);
      let editor = TestUtils.findRenderedComponentWithType(component, TestEditor);
      spyOn(component, 'commit');
      TestUtils.Simulate.click(ReactDOM.findDOMNode(editor));
      expect(component.commit.calls.count()).toEqual(0);
    });

    it('should call onCommitCancel when editor cancels editing', () => {
      column.editor = <TestEditor />;
      const onCommit = jasmine.createSpy();
      const onCommitCancel = jasmine.createSpy();
      component = TestUtils.renderIntoDocument(<EditorContainer
        rowData={rowData}
        value={'SupernaviX'}
        column={column}
        onCommitCancel={onCommitCancel}
        onCommit={onCommit}
        height={50}/>
      );
      let editor = TestUtils.findRenderedComponentWithType(component, TestEditor);
      editor.props.onCommitCancel();
      expect(onCommitCancel).toHaveBeenCalled();
      expect(onCommitCancel.calls.count()).toEqual(1);
      expect(onCommit).not.toHaveBeenCalled();
    });

    it('should not commit changes on componentWillUnmount if editor cancels editing', () => {
      column.editor = <TestEditor />;
      const onCommit = jasmine.createSpy();
      const onCommitCancel = jasmine.createSpy();
      component = TestUtils.renderIntoDocument(<EditorContainer
        rowData={rowData}
        value={'SupernaviX'}
        column={column}
        onCommitCancel={onCommitCancel}
        onCommit={onCommit}
        height={50}/>);
      let editor = TestUtils.findRenderedComponentWithType(component, TestEditor);
      editor.props.onCommitCancel();
      component.componentWillUnmount();
      expect(onCommit).not.toHaveBeenCalled();
    });
  });

  describe('Events', () => {
    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
      component = ReactDOM.render(<EditorContainer
        rowData={rowData}
        value={'Adwolf'}
        onCommit={jasmine.createSpy()}
        onCommitCancel={jasmine.createSpy()}
        column={fakeColumn}
        height={50}/>, container);
    });

    afterEach(() => {
      // remove our container
      document.body.removeChild(container);
    });

    xit('hitting enter should call commit only once', () => {
      let editor = TestUtils.findRenderedComponentWithType(component, SimpleTextEditor);
      TestUtils.Simulate.keyDown(editor.getInputNode(), {key: 'Enter'});
      expect(onCommit).toHaveBeenCalled();
      expect(onCommit.calls.count()).toEqual(1);
    });

    it('hitting escape should call commitCancel only once', () => {
      let editor = TestUtils.findRenderedComponentWithType(component, SimpleTextEditor);
      TestUtils.Simulate.keyDown(editor.getInputNode(), {key: 'Escape'});
      expect(component.props.onCommitCancel).toHaveBeenCalled();
      expect(component.props.onCommitCancel.calls.count()).toEqual(1);
    });

    it('hitting escape should not call commit changes on componentWillUnmount', () => {
      let editor = TestUtils.findRenderedComponentWithType(component, SimpleTextEditor);
      TestUtils.Simulate.keyDown(editor.getInputNode(), {key: 'Escape'});
      ReactDOM.unmountComponentAtNode(container);
      expect(component.props.onCommit).not.toHaveBeenCalled();
    });
  });
});
