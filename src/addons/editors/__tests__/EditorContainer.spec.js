
const React            = require('react');
const rewire           = require('rewire');
const EditorContainer  = rewire('../EditorContainer.js');
const TestUtils        = require('react/lib/ReactTestUtils');
const SimpleTextEditor = require('../SimpleTextEditor');
const EditorBase       = require('../EditorBase');

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
  });

  describe('Custom Editors', () => {
    class TestEditor extends EditorBase {
      render() {
        return <input type="text" id="testpassed" />;
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
  });

  describe('Events', () => {
    beforeEach(() => {
      cellMetaData.onCommit = function() {};
      spyOn(cellMetaData, 'onCommit');

      // render into an actual div, not a detached one
      // otherwise IE (11) gives an error when we try and setCaretAtEndOfInput
      container = document.createElement('div');
      document.body.appendChild(container);
      component = React.render(<EditorContainer
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

    it('hitting enter should call commit of cellMetaData only once', () => {
      let editor = TestUtils.findRenderedComponentWithType(component, SimpleTextEditor);
      TestUtils.Simulate.keyDown(editor.getInputNode(), {key: 'Enter'});
      expect(cellMetaData.onCommit).toHaveBeenCalled();
      expect(cellMetaData.onCommit.callCount).toEqual(1);
    });
  });
});
