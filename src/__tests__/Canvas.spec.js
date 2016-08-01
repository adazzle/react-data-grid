let React        = require('react');
let ReactDOM     = require('react-dom');
let rewire       = require('rewire');
let Canvas         = rewire('../Canvas');
let TestUtils    = require('react-addons-test-utils');

describe('Canvas Tests', () => {
  let testElement;

  let testProps = {
    rowHeight: 25,
    height: 200,
    displayStart: 1,
    displayEnd: 10,
    rowsCount: 1,
    columns: [],
    selectedRows: null,
    rowGetter: function() { return []; },
    cellMetaData: {
      selected: {},
      dragged: {},
      onCellClick: () => {},
      onCellDoubleClick: () => {},
      onCommit: () => {},
      onCommitCancel: () => {},
      copied: {},
      handleDragEnterRow: () => {},
      handleTerminateDrag: () => {}
    }
  };

  beforeEach(() => {
    testElement = TestUtils.renderIntoDocument(<Canvas {...testProps}/>);
  });

  it('should create a new instance of Canvas', () => {
    expect(testElement).toBeDefined();
  });

  it('Should not call setScroll on render', () => {
    testElement = TestUtils.renderIntoDocument(<Canvas {...testProps}/>);
    spyOn(testElement, 'setScrollLeft');
    expect(testElement.setScrollLeft).not.toHaveBeenCalled();
  });

  it('Should not call setScroll on update', () => {
    testElement = TestUtils.renderIntoDocument(<Canvas {...testProps}/>);
    // force an update
    spyOn(testElement, 'setScrollLeft');
    testElement.componentDidUpdate(testProps);
    expect(testElement.setScrollLeft).not.toHaveBeenCalled();
  });

  describe('Row Selection', () =>{
    describe('selectBy index', () => {
      it('renders row selected', () => {
        let columns = [{key: 'id', name: 'ID'}];
        let rowGetter = () => { return {'id': 1}; };

        let props = Object.assign({}, testProps, {displayStart: 0, displayEnd: 1, columns, rowGetter, rowsCount: 1, rowSelection: {indexes: [0]}});
        testElement = TestUtils.renderIntoDocument(<Canvas {...props}/>);
        let domNode = ReactDOM.findDOMNode(testElement);

        let selectedRows = domNode.querySelectorAll('.react-grid-Row .row-selected');
        expect(selectedRows.length).toBe(1);
      });
    });

    describe('selectBy keys', () => {
      it('renders row selected', () => {
        let columns = [{key: 'id', name: 'ID'}];
        let rowGetter = () => { return {'id': 1}; };

        let props = Object.assign({}, testProps, {displayStart: 0, displayEnd: 1, columns, rowGetter, rowsCount: 1, rowSelection: {keys: {rowKey: 'id', values: [1]}}});
        testElement = TestUtils.renderIntoDocument(<Canvas {...props}/>);
        let domNode = ReactDOM.findDOMNode(testElement);

        let selectedRows = domNode.querySelectorAll('.react-grid-Row .row-selected');
        expect(selectedRows.length).toBe(1);
      });
    });


    describe('selectBy `isSelectedKey`', () => {
      it('renders row selected', () => {
        let columns = [{key: 'id', name: 'ID'}];
        let rowGetter = (i) => { return i === 0 ? {'id': 1, 'isSelected': true} : null; };

        let props = Object.assign({}, testProps, {displayStart: 0, displayEnd: 1, columns, rowGetter, rowsCount: 1, rowSelection: {isSelectedKey: 'isSelected'}});
        testElement = TestUtils.renderIntoDocument(<Canvas {...props}/>);
        let domNode = ReactDOM.findDOMNode(testElement);

        let selectedRows = domNode.querySelectorAll('.react-grid-Row .row-selected');
        expect(selectedRows.length).toBe(1);
      });
    });
  });
});
