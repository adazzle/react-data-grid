
const React            = require('react');
const ReactDOM         = require('react-dom');
const rewire           = require('rewire');
const EditorContainer  = rewire('../EditorContainer.js');
const TestUtils        = require('react-addons-test-utils');
const SimpleTextEditor = require('../SimpleTextEditor');
const EditorBase       = require('../EditorBase');
import { shallow } from 'enzyme';

describe('Editor Container Tests', () => {
  let cellMetaData = {
    selected: {
      idx: 0,
      rowIdx: 0
    },
    onCommit: function() {}
  };

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
        cellMetaData={cellMetaData}
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
        cellMetaData: cellMetaData,
        column: fakeColumn,
        height: 50
      };
      let editorDiv = renderComponent(props).find('div').at(0);
      expect(Object.keys(editorDiv.props()).length).toBe(5);
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
        cellMetaData={cellMetaData}
        column={column}
        height={50}/>);
      let editor = TestUtils.findRenderedComponentWithType(component, TestEditor);
      expect(editor).toBeDefined();
      expect(editor.props.value).toBeDefined();
      expect(editor.props.onCommit).toBeDefined();
    });

    it('should render component custom editors', () => {
      column.editor = TestEditor;
      component = TestUtils.renderIntoDocument(<EditorContainer
        rowData={rowData}
        value={'SupernaviX'}
        cellMetaData={cellMetaData}
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
        cellMetaData={cellMetaData}
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
        cellMetaData={cellMetaData}
        column={column}
        height={50}/>);
      let editor = TestUtils.findRenderedComponentWithType(component, TestEditor);
      spyOn(component, 'commit');
      TestUtils.Simulate.click(ReactDOM.findDOMNode(editor));
      expect(component.commit.calls.count()).toEqual(0);
    });
  });

  describe('Events', () => {
    beforeEach(() => {
      cellMetaData.onCommit = function() {};
      spyOn(cellMetaData, 'onCommit');

      // render into an actual div, not a detached one
      // otherwise IE (11) gives an error when we try and setCaretAtEndOfInput
      container = document.createElement('div');
      document.body.appendChild(container);
      component = ReactDOM.render(<EditorContainer
        rowData={rowData}
        value={'Adwolf'}
        cellMetaData={cellMetaData}
        column={fakeColumn}
        height={50}/>, container);
    });

    afterEach(() => {
      // remove our container
      document.body.removeChild(container);
    });

    xit('hitting enter should call commit of cellMetaData only once', () => {
      let editor = TestUtils.findRenderedComponentWithType(component, SimpleTextEditor);
      TestUtils.Simulate.keyDown(editor.getInputNode(), {key: 'Enter'});
      expect(cellMetaData.onCommit).toHaveBeenCalled();
      expect(cellMetaData.onCommit.calls.count()).toEqual(1);
    });
  });
});
