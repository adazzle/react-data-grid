import React, { Component } from 'react';
import { mount } from 'enzyme';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';

import dropTargetRowContainer from '../DropTargetRowContainer';
import { DragTestSource } from './TestDragSources';
import { _helpers } from 'react-data-grid';
const { test: { GridPropHelpers } } = _helpers;

class fakeRow extends Component {
  render() {
    return <span>fake row</span>;
  }
}

/**
 * Wraps a component into a DragDropContext that uses the TestBackend.
 */
function wrapInTestContext(DecoratedComponent) {
  return DragDropContext(TestBackend)(class extends React.Component {
    render() {
      return <DecoratedComponent {...this.props} />;
    }
  });
}

describe('<DropTargetRowContainer />', () => {
  let ComponentUnderTest;
  let wrapper;
  let backend;
  let registry;
  let manager;
  const props = {
    onRowDrop: jest.fn(),
    idx: 1,
    row: { id: 5, country: 'England' },
    columns: GridPropHelpers.columns,
    cellMetaData: GridPropHelpers.cellMetaData
  };

  beforeEach(() => {
    ComponentUnderTest = wrapInTestContext(dropTargetRowContainer(fakeRow));
    wrapper = mount(<ComponentUnderTest {...props} />);
    manager = wrapper.instance().getManager();
    backend = manager.getBackend();
    registry = manager.getRegistry();
  });

  it('renders the injected row', () => {
    expect(wrapper.find(fakeRow).length).toEqual(1);
  });

  it('should call onRowDrop with correct parameters when source is dropped', () => {
    const rowTargetKey = Object.keys(registry.handlers).filter(k => registry.handlers[k].monitor && registry.handlers[k].monitor.targetId)[0];
    const rowTargetId = registry.handlers[rowTargetKey].monitor.targetId;
    const draggedRowItem = { idx: 3, data: { id: 11, country: 'Ireland', county: 'Wicklow' } };
    const sourceId = registry.addSource('Row', new DragTestSource(draggedRowItem));
    backend.simulateBeginDrag([sourceId]);
    backend.simulateHover([rowTargetId]);
    backend.simulateDrop();
    expect(props.onRowDrop).toHaveBeenCalled();
    expect(props.onRowDrop.mock.calls.length).toEqual(1);
    const rowSource = props.onRowDrop.mock.calls[0][0].rowSource;
    const rowTarget = props.onRowDrop.mock.calls[0][0].rowTarget;
    expect(rowSource).toEqual(draggedRowItem);
    expect(rowTarget.idx).toEqual(1);
    expect(rowTarget.data).toEqual(props.row);
  });
});
