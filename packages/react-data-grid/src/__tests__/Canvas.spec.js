import React from 'react';
import { shallow } from 'enzyme';

import InteractionMasks from '../masks/InteractionMasks';
import RowsContainer from '../RowsContainer';
import Canvas from '../Canvas';

const noop = () => null;

let testProps = {
  rowHeight: 25,
  height: 200,
  displayStart: 1,
  displayEnd: 10,
  visibleStart: 0,
  visibleEnd: 10,
  colVisibleStart: 0,
  colVisibleEnd: 100,
  colDisplayStart: 0,
  colDisplayEnd: 100,
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
    handleTerminateDrag: () => {},
    onAddSubRow: () => {}
  },
  rowGroupRenderer: null,
  isScrolling: false,
  length: 1000,
  enableCellSelect: true,
  onCheckCellIsEditable: noop,
  onCellCopyPaste: noop,
  onGridRowsUpdated: noop,
  cellNavigationMode: 'none',
  onDragHandleDoubleClick: noop,
  eventBus: {}
};

const renderComponent = (extraProps) => {
  return shallow(<Canvas {...testProps} {...extraProps} />);
};

describe('Canvas Tests', () => {
  let wrapper;
  let testElementNode;

  beforeEach(() => {
    wrapper = renderComponent();
    testElementNode = wrapper.instance();
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

  it('Should render the InteractionMasks component', () => {
    expect(wrapper.find(InteractionMasks).props()).toEqual(jasmine.objectContaining({
      rowHeight: 25,
      rowsCount: 1,
      visibleStart: 0,
      visibleEnd: 10,
      colVisibleStart: 0,
      colVisibleEnd: 100
    }));
  });

  describe('Row Selection', () =>{
    let COLUMNS = [{key: 'id', name: 'ID'}];

    describe('selectBy index', () => {
      it('renders row selected', () => {
        let rowGetter = () => { return { id: 1}; };

        let props = { displayStart: 0, displayEnd: 1, COLUMNS, rowGetter, rowsCount: 1, rowSelection: { indexes: [0] } };
        wrapper = renderComponent(props);

        const rows = wrapper.find(RowsContainer).props().rows;
        expect(rows[0].props.isSelected).toBe(true);
      });
    });

    describe('selectBy keys', () => {
      it('renders row selected', () => {
        let rowGetter = () => { return {id: 1}; };

        let props = { displayStart: 0, displayEnd: 1, COLUMNS, rowGetter, rowsCount: 1, rowSelection: { keys: { rowKey: 'id', values: [1] } } };
        wrapper = renderComponent(props);

        const rows = wrapper.find(RowsContainer).props().rows;
        expect(rows[0].props.isSelected).toBe(true);
      });
    });


    describe('selectBy `isSelectedKey`', () => {
      it('renders row selected', () => {
        let rowGetter = (i) => { return i === 0 ? {id: 1, isSelected: true} : null; };

        let props = { displayStart: 0, displayEnd: 1, COLUMNS, rowGetter, rowsCount: 1, rowSelection: { isSelectedKey: 'isSelected'} };
        wrapper = renderComponent(props);

        const rows = wrapper.find(RowsContainer).props().rows;
        expect(rows[0].props.isSelected).toBe(true);
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

    it('can render a custom renderer if __metadata property exists', () => {
      let EmptyChildRow = () => {
        return (<div className="test-row-renderer"></div>);
      };
      let rowGetter = () => { return {id: 0, __metaData: {getRowRenderer: EmptyChildRow}}; };
      let props = { displayStart: 0, displayEnd: 1, columns: COLUMNS, rowGetter, rowsCount: 1, getSubRowDetails: getFakeSubRowDetails(1)};
      wrapper = renderComponent(props);
      const rows = wrapper.find(RowsContainer).props().rows;
      expect(rows[0].props.className).toBe('test-row-renderer');
    });
  });
});
