import React from 'react';
import { shallow } from 'enzyme';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContextProvider } from 'react-dnd';

import DraggableContainer from '../DraggableContainer';
import ReactDataGrid from 'react-data-grid';

describe('<DraggableContainer />', () => {
  it('should render grid directly if a react-dnd context is already set in the react context', () => {
    const wrapper = shallow(<DragDropContextProvider backend={TestBackend}>
      <DraggableContainer>
        <ReactDataGrid />
      </DraggableContainer>
    </DragDropContextProvider>);
    const container = wrapper.find(DraggableContainer);
    expect(container.length).toEqual(1);
    const grid = container.find(ReactDataGrid);
    expect(grid.length).toEqual(1);
  });
  it('should wrap grid in a DragDropContextProvider to assign a react-dnd context to the react context if none is already set', () => {
    const wrapper = shallow(<DraggableContainer><ReactDataGrid /></DraggableContainer>);
    const context = wrapper.find(DragDropContextProvider);
    expect(context.length).toEqual(1);
  });
});
