import React from 'react';
import { shallow } from 'enzyme';

import InteractionMasks from '../masks/InteractionMasks';

import Canvas from '../Canvas';
import RowsContainer from '../RowsContainer';

const noop = () => null;

const getRows = wrp => wrp.find(RowsContainer).props().children.props.children;

const testProps = {
  rowHeight: 25,
  height: 200,
  rowOverscanStartIdx: 1,
  rowOverscanEndIdx: 10,
  rowVisibleStartIdx: 0,
  rowVisibleEndIdx: 10,
  colVisibleStartIdx: 0,
  colVisibleEndIdx: 100,
  colOverscanStartIdx: 0,
  colOverscanEndIdx: 100,
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
      rowVisibleStartIdx: 0,
      rowVisibleEndIdx: 10,
      colVisibleStartIdx: 0,
      colVisibleEndIdx: 100
    }));
  });

  describe('Row Selection', () => {
    const COLUMNS = [{key: 'id', name: 'ID'}];

    describe('selectBy index', () => {
      it('renders row selected', () => {
        const rowGetter = () => { return { id: 1}; };

        const props = { rowOverscanStartIdx: 0, rowOverscanEndIdx: 1, COLUMNS, rowGetter, rowsCount: 1, rowSelection: { indexes: [0] } };
        wrapper = renderComponent(props);

        const rows = getRows(wrapper);
        expect(rows[0].props.isSelected).toBe(true);
      });
    });

    describe('selectBy keys', () => {
      it('renders row selected', () => {
        const rowGetter = () => { return {id: 1}; };

        const props = { rowOverscanStartIdx: 0, rowOverscanEndIdx: 1, COLUMNS, rowGetter, rowsCount: 1, rowSelection: { keys: { rowKey: 'id', values: [1] } } };
        wrapper = renderComponent(props);

        const rows = getRows(wrapper);
        expect(rows[0].props.isSelected).toBe(true);
      });
    });


    describe('selectBy `isSelectedKey`', () => {
      it('renders row selected', () => {
        const rowGetter = (i) => { return i === 0 ? {id: 1, isSelected: true} : null; };

        const props = { rowOverscanStartIdx: 0, rowOverscanEndIdx: 1, COLUMNS, rowGetter, rowsCount: 1, rowSelection: { isSelectedKey: 'isSelected'} };
        wrapper = renderComponent(props);

        const rows = getRows(wrapper);
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

    const COLUMNS = [{key: 'id', name: 'ID', left: 100}];

    it('can render a custom renderer if __metadata property exists', () => {
      const EmptyChildRow = () => {
        return (<div className="test-row-renderer"></div>);
      };
      const rowGetter = () => { return {id: 0, __metaData: {getRowRenderer: EmptyChildRow}}; };
      const props = { rowOverscanStartIdx: 0, rowOverscanEndIdx: 1, columns: COLUMNS, rowGetter, rowsCount: 1, getSubRowDetails: getFakeSubRowDetails(1)};
      wrapper = renderComponent(props);
      const rows = getRows(wrapper);
      expect(rows[0].props.className).toBe('test-row-renderer');
    });
  });
});
