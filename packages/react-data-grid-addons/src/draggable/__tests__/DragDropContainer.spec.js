import React from 'react';
import { shallow } from 'enzyme';
import DragDropContainer from '../DragDropContainer';
import jasmineEnzyme from 'jasmine-enzyme';
import RowDragLayer from '../RowDragLayer';
import DraggableHeaderCell from '../DraggableHeaderCell';

describe('<DragDropContainer />', () => {
  let wrapper;

  const childProps = {
    rowsCount: 2,
    rowGetter: index => index
  };

  const GridStub = () => <div/>;

  function render(props = {}) {
    const ComponentUnderTest = DragDropContainer.DecoratedComponent;
    wrapper = shallow(
      <ComponentUnderTest {...props} >
        <GridStub {...childProps} />
      </ComponentUnderTest>
    );
  }

  beforeEach(() => {
    jasmineEnzyme();
    render();
  });

  it('should render a RowDragLayer', () => {
    const rowDragLayer = wrapper.find(RowDragLayer);
    expect(rowDragLayer.length).toBe(1);
    expect(rowDragLayer.props().rows).toEqual([0, 1]);
  });

  it('should correctly render child grid component when passed in', () => {
    const gridStub = wrapper.find(GridStub);
    expect(gridStub.length).toBe(1);
    expect(gridStub.props().draggableHeaderCell).toBe(DraggableHeaderCell);
  });

  it('getDragPreviewRow should override rowGetter to provide rows to rowDragLayer', () => {
    const props = {
      getDragPreviewRow: index => index + 'a'
    };
    render(props);
    const rowDragLayer = wrapper.find(RowDragLayer);
    expect(rowDragLayer.length).toBe(1);
    expect(rowDragLayer.props().rows).toEqual( ['0a', '1a']);
  });
});
