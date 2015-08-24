'use strict';
var React            = require('react');
var rewire           = require('rewire');
var EditorContainer  = rewire('../EditorContainer.js');
var TestUtils        = require('react/lib/ReactTestUtils');
var SimpleTextEditor = require('../SimpleTextEditor');

describe('Editor Container Tests', () => {
  var cellMetaData = {
    selected : {
      idx : 0,
      rowIdx :0
    },
    onCommit: function() {}
  };
  var component, container;
  var fakeColumn = {
    name : 'col1',
    key : 'col1',
    width : 100
  };
  var rowData={
    col1 : 'I',
    col2 : 'love',
    col3 : 'Testing'
  };

  describe("Basic render tests", () => {

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
      var Editor = TestUtils.findRenderedComponentWithType(component, SimpleTextEditor)
      expect(Editor).toBeDefined();
    });

    it('should select the text of the default input when the editor is rendered', () => {

      function isTextSelected(input) {
        if (typeof input.selectionStart == "number") {
          return input.selectionStart == 0 && input.selectionEnd == input.value.length;
        } else if (typeof document.selection != "undefined") {
          input.focus();
          return document.selection.createRange().text == input.value;
        }
      }

      var Editor = TestUtils.findRenderedComponentWithType(component, SimpleTextEditor)
      expect(isTextSelected(Editor.getInputNode())).toBeDefined();
    });

    it('should render the editor with the correct properties', () => {
      var Editor = TestUtils.findRenderedComponentWithType(component, SimpleTextEditor)
      expect(Editor.props.value).toEqual('Adwolf');
      expect(Editor.props.column).toEqual(fakeColumn);
    });


  });

  describe("Events", () => {

      beforeEach(() => {
        cellMetaData.onCommit = function(value){};
        spyOn(cellMetaData, 'onCommit');

        //render into an actual div, not a detached one
        //otherwise IE (11) gives an error when we try and setCaretAtEndOfInput
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
        //remove our container
        document.body.removeChild(container);
      })

      it('hitting enter should call commit of cellMetaData', () => {
        var Editor = TestUtils.findRenderedComponentWithType(component, SimpleTextEditor)
        TestUtils.Simulate.keyDown(Editor.getDOMNode(), {key: "Enter"});
        expect(cellMetaData.onCommit).toHaveBeenCalled();
      });

      // it('should commit editor changes on blur', () => {
      //   let textEdtr = TestUtils.findRenderedComponentWithType(component, SimpleTextEditor);
      //   TestUtils.Simulate.blur(component.getDOMNode());
      //   expect(cellMetaData.onCommit).toHaveBeenCalled();
      // });
      //
      // it('should only commit once', () => {
      //   var Editor = TestUtils.findRenderedComponentWithType(component, SimpleTextEditor)
      //   TestUtils.Simulate.keyDown(Editor.getDOMNode(), {key: "Enter"});
      //   expect(cellMetaData.onCommit.callCount).toEqual(1);
      // });
  });
});
