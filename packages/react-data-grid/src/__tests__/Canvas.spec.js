import React from 'react';
import Canvas from '../Canvas';
import { mount } from 'enzyme';
import EmptyChildRow from '../EmptyChildRow';

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

const renderComponent = (extraProps) => {
  const wrapper = mount(<Canvas {...testProps} {...extraProps} />);

  return wrapper;
};

describe('Canvas Tests', () => {
  let testElement;
  let testElementNode;

  beforeEach(() => {
    testElement = renderComponent();
    testElementNode = testElement.node;
  });

  it('should create a new instance of Canvas', () => {
    expect(testElement).toBeDefined();
  });

  it('Should not call setScroll on render', () => {
    spyOn(testElementNode, 'setScrollLeft');
    expect(testElementNode.setScrollLeft).not.toHaveBeenCalled();
  });

  it('Should not call setScroll on update', () => {
    spyOn(testElementNode, 'setScrollLeft');
    testElementNode.componentDidUpdate(testProps);
    expect(testElementNode.setScrollLeft).not.toHaveBeenCalled();
  });

  describe('Row Selection', () =>{
    let COLUMNS = [{key: 'id', name: 'ID'}];

    describe('selectBy index', () => {
      it('renders row selected', () => {
        let rowGetter = () => { return { id: 1}; };

        let props = { displayStart: 0, displayEnd: 1, COLUMNS, rowGetter, rowsCount: 1, rowSelection: { indexes: [0] } };
        testElement = renderComponent(props);

        let selectedRows = testElement.find('.row-selected .react-grid-Row');
        expect(selectedRows.length).toBe(1);
      });
    });

    describe('selectBy keys', () => {
      it('renders row selected', () => {
        let rowGetter = () => { return {id: 1}; };

        let props = { displayStart: 0, displayEnd: 1, COLUMNS, rowGetter, rowsCount: 1, rowSelection: { keys: { rowKey: 'id', values: [1] } } };
        testElement = renderComponent(props);

        let selectedRows = testElement.find('.row-selected .react-grid-Row');
        expect(selectedRows.length).toBe(1);
      });
    });


    describe('selectBy `isSelectedKey`', () => {
      it('renders row selected', () => {
        let rowGetter = (i) => { return i === 0 ? {id: 1, isSelected: true} : null; };

        let props = { displayStart: 0, displayEnd: 1, COLUMNS, rowGetter, rowsCount: 1, rowSelection: { isSelectedKey: 'isSelected'} };
        testElement = renderComponent(props);

        let selectedRows = testElement.find('.row-selected .react-grid-Row');
        expect(selectedRows.length).toBe(1);
      });
    });
  });

  describe('Tree View', () => {
    function getFakeSubRowDetails(index) {
      return function() {
        return {
          children: [
            {id: 'row1-0'},
            {id: 'row1-1'}
          ],
          treeDepth: 1,
          siblingIndex: index,
          numberSiblings: 2
        };
      };
    }

    let COLUMNS = [{key: 'id', name: 'ID', left: 100}];

    it('should not render empty child row if not last sibling row', () => {
      let rowGetter = () => { return {id: 0}; };
      let props = { displayStart: 0, displayEnd: 1, columns: COLUMNS, rowGetter, rowsCount: 1, getSubRowDetails: getFakeSubRowDetails(0) };
      testElement = renderComponent(props);
      let rows = testElement.instance().getRows(props.displayStart, props.displayEnd);
      let child = testElement.find(EmptyChildRow);
      expect(child.length).toBe(0);
      expect(rows.length).toBe(1);
    });

    it('should render an empty child row after last sibling row', () => {
      let rowGetter = () => { return {id: 0}; };
      let props = { displayStart: 0, displayEnd: 1, columns: COLUMNS, rowGetter, rowsCount: 1, getSubRowDetails: getFakeSubRowDetails(1) };
      testElement = renderComponent(props);
      let rowData = testElement.instance().getRows(props.displayStart, props.displayEnd);
      let child = testElement.find(EmptyChildRow);
      expect(child.length).toBe(1);
      expect(rowData.length).toBe(2);
      expect(rowData[1].row.__metaData.isEmptySubRow).toBeTruthy();
    });
  });
});
