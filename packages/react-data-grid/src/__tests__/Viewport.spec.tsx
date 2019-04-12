import React from 'react';
import { shallow } from 'enzyme';

import Viewport from '../Viewport';
import Canvas from '../Canvas';
import helpers from '../helpers/test/GridPropHelpers';
import { SCROLL_DIRECTION, CellNavigationMode } from '../common/enums';
import EventBus from '../masks/EventBus';

const viewportProps = {
  rowOffsetHeight: 0,
  totalWidth: 400,
  columnMetrics: {
    columns: helpers.columns,
    minColumnWidth: 80,
    totalWidth: 2600,
    totalColumnWidth: 2600,
    width: 2600
  },
  rowGetter() { },
  rowsCount: 50,
  rowHeight: 35,
  onScroll() { },
  minHeight: 500,
  overScan: {
    colsStart: 5,
    colsEnd: 5,
    rowsStart: 5,
    rowsEnd: 5
  },
  cellMetaData: {
    selected: {},
    dragged: {},
    onCellClick() { },
    onCellDoubleClick() { },
    onCommit() { },
    onCommitCancel() { },
    copied: {},
    handleDragEnterRow() { },
    handleTerminateDrag() { },
    rowKey: 'row key',
    onCellMouseDown() {},
    onCellMouseEnter() {},
    onCellContextMenu() {},
    onDragEnter() {},
    onRowExpandToggle() {},
    onColumnEvent() {},
    onCellExpand() {}
  },
  rowKey: 'Id',
  enableCellSelect: true,
  enableCellAutoFocus: true,
  cellNavigationMode: CellNavigationMode.NONE,
  eventBus: new EventBus(),
  onGridRowsUpdated() {},
  onDragHandleDoubleClick() {},
  onCommit() {},
  editorPortalTarget: document.body
};

const viewportPropsNoColumns = { // when creating anew plan copying from an existing one the viewport got initialised with 0 columns rendered
  rowOffsetHeight: 0,
  totalWidth: 400,
  columnMetrics: {
    columns: helpers.columns,
    minColumnWidth: 80,
    totalColumnWidth: 0,
    totalWidth: 0,
    width: 2010
  },
  rowGetter() { },
  rowsCount: 50,
  rowHeight: 35,
  onScroll() { },
  minHeight: 500,
  overScan: {
    colsStart: 5,
    colsEnd: 5,
    rowsStart: 5,
    rowsEnd: 5
  },
  cellMetaData: {
    selected: {},
    dragged: {},
    onCellClick() { },
    onCellDoubleClick() { },
    onCommit() { },
    onCommitCancel() { },
    copied: {},
    handleDragEnterRow() { },
    handleTerminateDrag() { },
    rowKey: 'row key',
    onCellMouseDown() {},
    onCellMouseEnter() {},
    onCellContextMenu() {},
    onDragEnter() {},
    onRowExpandToggle() {},
    onColumnEvent() {},
    onCellExpand() {}
  },
  rowKey: 'Id',
  enableCellSelect: true,
  enableCellAutoFocus: true,
  cellNavigationMode: CellNavigationMode.NONE,
  eventBus: new EventBus(),
  onGridRowsUpdated() {},
  onDragHandleDoubleClick() {},
  onCommit() {},
  editorPortalTarget: document.body
};

describe('<Viewport />', () => {
  it('renders a Canvas component', () => {
    const wrapper = shallow(<Viewport {...viewportProps} />);
    const canvas = wrapper.find(Canvas);
    expect(canvas).toBeDefined();
  });

  it('should update scroll state onScroll', () => {
    const scrollLeft = 0;
    const scrollTop = 200;
    const wrapper = shallow(<Viewport {...viewportProps} />);
    const canvas = wrapper.find(Canvas);
    canvas.props().onScroll({ scrollTop, scrollLeft });
    expect(wrapper.state()).toEqual({
      colOverscanEndIdx: helpers.columns.length,
      colOverscanStartIdx: 0,
      colVisibleEndIdx: helpers.columns.length,
      colVisibleStartIdx: 0,
      rowOverscanEndIdx: 23,
      rowOverscanStartIdx: 6,
      height: viewportProps.minHeight,
      scrollLeft,
      scrollTop,
      rowVisibleEndIdx: 21,
      rowVisibleStartIdx: 6,
      isScrolling: true,
      lastFrozenColumnIndex: -1,
      scrollDirection: SCROLL_DIRECTION.DOWN
    });
  });

  it('should set the max number of columns when column rendered are zeroed', () => {
    const wrapper = shallow<Viewport>(<Viewport {...viewportPropsNoColumns} />);
    expect(wrapper.state().colVisibleEndIdx).toEqual(helpers.columns.length);
  });

  it('should update when given different number of columns', () => {
    const wrapper = shallow(<Viewport {...viewportProps} />);
    const extraColumn = {
      key: 'description',
      name: 'Description',
      width: 100,
      left: 0
    };
    const updatedColumns = helpers.columns.concat(extraColumn);
    const newProps = { ...viewportProps, columnMetrics: { ...viewportProps.columnMetrics, columns: updatedColumns } };
    wrapper.setProps(newProps);
    expect(wrapper.state()).toEqual({
      colOverscanEndIdx: updatedColumns.length,
      colOverscanStartIdx: 0,
      colVisibleEndIdx: updatedColumns.length,
      colVisibleStartIdx: 0,
      rowOverscanEndIdx: 28,
      rowOverscanStartIdx: 0,
      height: viewportProps.minHeight,
      scrollLeft: 0,
      scrollTop: 0,
      rowVisibleEndIdx: 14,
      rowVisibleStartIdx: 0,
      lastFrozenColumnIndex: 0,
      isScrolling: false
    });
  });

  it('should update when given height changed', () => {
    const wrapper = shallow(<Viewport {...viewportProps} />);
    const newHeight = 1000;
    const newProps = { ...viewportProps, minHeight: newHeight };
    wrapper.setProps(newProps);
    expect(wrapper.state()).toEqual({
      colOverscanEndIdx: helpers.columns.length,
      colOverscanStartIdx: 0,
      colVisibleEndIdx: helpers.columns.length,
      colVisibleStartIdx: 0,
      rowOverscanEndIdx: 29,
      rowOverscanStartIdx: 0,
      height: newHeight,
      scrollLeft: 0,
      scrollTop: 0,
      rowVisibleEndIdx: 29,
      rowVisibleStartIdx: 0,
      isScrolling: true,
      scrollDirection: SCROLL_DIRECTION.NONE,
      lastFrozenColumnIndex: -1
    });
  });
});
