import React from 'react';
import { shallow } from 'enzyme';

import DragHandle from '../DragHandle';

describe('DragHandle', () => {
  const setup = () => {
    const onDragStart = jasmine.createSpy();
    const onDragEnd = jasmine.createSpy();
    const onDoubleClick = jasmine.createSpy();
    const props = { onDragStart, onDragEnd, onDoubleClick };
    const wrapper = shallow(<DragHandle {...props} />);

    return {
      props,
      dragHandle: wrapper.find('.drag-handle')
    };
  };

  it('should render a draggable component', () => {
    const { dragHandle } = setup();

    expect(dragHandle.prop('draggable')).toBe('true');
  });

  it('should call the drag start handler on drag start', () => {
    const { dragHandle, props } = setup();
    dragHandle.simulate('dragstart');
    expect(props.onDragStart).toHaveBeenCalled();
  });

  it('should call the drag end handler on drag end', () => {
    const { dragHandle, props } = setup();
    dragHandle.simulate('dragend');
    expect(props.onDragEnd).toHaveBeenCalled();
  });

  it('should call the double click handler on double click', () => {
    const { dragHandle, props } = setup();
    dragHandle.simulate('doubleclick');
    expect(props.onDoubleClick).toHaveBeenCalled();
  });
});
