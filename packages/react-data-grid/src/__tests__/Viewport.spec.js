import React from 'react';
import Viewport from '../Viewport';
import { shallow} from 'enzyme';
import helpers from '../helpers/test/GridPropHelpers';

let viewportProps = {
  rowOffsetHeight: 0,
  totalWidth: 400,
  columnMetrics: {
    columns: helpers.columns,
    minColumnWidth: 80,
    totalWidth: 2600,
    width: 2600
  },
  rowGetter: () => { },
  rowsCount: 50,
  rowHeight: 35,
  onScroll: () => { },
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
    onCellClick: () => { },
    onCellDoubleClick: () => { },
    onCommit: () => { },
    onCommitCancel: () => { },
    copied: {},
    handleDragEnterRow: () => { },
    handleTerminateDrag: () => { }
  },
  rowKey: 'Id'
};

let viewportPropsNoColumns = {  // when creating anew plan copying from an existing one the viewport got initialised with 0 columns rendered
  rowOffsetHeight: 0,
  totalWidth: 400,
  columnMetrics: {
    columns: helpers.columns,
    minColumnWidth: 80,
    totalWidth: 0,
    width: 2010
  },
  rowGetter: () => { },
  rowsCount: 50,
  rowHeight: 35,
  onScroll: () => { },
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
    onCellClick: () => { },
    onCellDoubleClick: () => { },
    onCommit: () => { },
    onCommitCancel: () => { },
    copied: {},
    handleDragEnterRow: () => { },
    handleTerminateDrag: () => { }
  },
  rowKey: 'Id'
};

describe('<Viewport />', () => {
  it('renders a Canvas component', () => {
    const wrapper = shallow(<Viewport {...viewportProps} />);
    let Canvas = wrapper.find('Canvas');
    expect(Canvas).toBeDefined();
  });

  it('should updated scroll state onScroll', () => {
    let scrollLeft = 0;
    let scrollTop = 200;
    const wrapper = shallow(<Viewport {...viewportProps} />);
    let Canvas = wrapper.find('Canvas');
    Canvas.props().onScroll({ scrollTop, scrollLeft});
    expect(wrapper.state()).toEqual({
      colDisplayEnd: 3,
      colDisplayStart: 0,
      colVisibleEnd: 3,
      colVisibleStart: 0,
      displayEnd: 25,
      displayStart: 0,
      height: viewportProps.minHeight,
      scrollLeft: scrollLeft,
      scrollTop: scrollTop,
      visibleEnd: 20,
      visibleStart: 5,
      isScrolling: true
    });
  });

  it('should set the max number of columns when column rendered are zeroed', () => {
    const wrapper = shallow(<Viewport {...viewportPropsNoColumns} />);
    expect(wrapper.state().colVisibleEnd).toEqual(helpers.columns.length);
  });

  it('should update when given different number of columns', () => {
    const wrapper = shallow(<Viewport {...viewportProps} />);
    let extraColumn = {
      key: 'description',
      name: 'Description',
      width: 100
    };
    let updatedColumns = helpers.columns.concat(extraColumn);
    let newProps = Object.assign({}, viewportProps, {columnMetrics: Object.assign({}, viewportProps.columnMetrics, {columns: updatedColumns})});
    wrapper.setProps(newProps);
    expect(wrapper.state()).toEqual({
      colDisplayEnd: updatedColumns.length,
      colDisplayStart: 0,
      colVisibleEnd: updatedColumns.length,
      colVisibleStart: 0,
      displayEnd: 50,
      displayStart: 0,
      height: viewportProps.minHeight,
      scrollLeft: 0,
      scrollTop: 0,
      visibleEnd: 50,
      visibleStart: 0
    });
  });
});
