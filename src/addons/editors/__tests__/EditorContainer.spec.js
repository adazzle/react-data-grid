'use strict';
var React            = require('react');
var rewire           = require('rewire');
var EditorContainer  = rewire('../EditorContainer.js');
var TestUtils        = require('react/lib/ReactTestUtils');
var SimpleTextEditor = require('../SimpleTextEditor');

describe('Editor Container Tests', () => {
  var component;
  beforeEach(() => {

    var fakeColumn = {
      name : 'col1',
      key : 'col1',
      width : 100
    };
    var cellMetaData = {
      selected : {
        idx : 0,
        rowIdx :0
      }
    }
    var rowData={
      col1 : 'I',
      col2 : 'love',
      col3 : 'Testing'
    }

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



});
