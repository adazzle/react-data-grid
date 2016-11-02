import React from 'react';
import Viewport from '../Viewport';
import { shallow} from 'enzyme';
import helpers from './GridPropHelpers';

let viewportProps = {
  rowOffsetHeight: 0,
  totalWidth: 400,
  columnMetrics: {
    columns: helpers.columns,
    minColumnWidth: 80,
    totalWidth: true,
    width: 2600
  },
  rowGetter: () => { },
  rowsCount: 50,
  rowHeight: 35,
  onScroll: () => { },
  minHeight: 500,
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
      colDisplayEnd: 1,
      colDisplayStart: 0,
      colVisibleEnd: 1,
      colVisibleStart: 0,
      displayEnd: 33,
      displayStart: 0,
      height: viewportProps.minHeight,
      scrollLeft: scrollLeft,
      scrollTop: scrollTop,
      visibleEnd: 20,
      visibleStart: 3,
      isScrolling: true
    });
  });
});
