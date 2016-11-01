import React from 'react';
import Viewport from '../Viewport';
import { shallow } from 'enzyme';

let viewportProps = {
  rowOffsetHeight: 0,
  totalWidth: 400,
  columnMetrics: { columns: [] },
  rowGetter: () => { },
  rowsCount: 50,
  rowHeight: 35,
  onScroll: () => {},
  minHeight: 500,
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
  },
  rowKey: 'Id'
};

describe('<Viewport />', () => {
  it('renders a Canvas component', () => {
    const wrapper = shallow(<Viewport {...viewportProps} />);
    let Canvas = wrapper.find('Canvas');
    expect(Canvas).toBeDefined();
  });
});
