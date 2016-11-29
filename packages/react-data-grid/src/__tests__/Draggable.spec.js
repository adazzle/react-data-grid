import React from 'react';
import { shallow } from 'enzyme';
let rewire    = require('rewire');
let Draggable = rewire('../Draggable');

const renderComponent = (props) => {
  const wrapper = shallow(<Draggable {...props} />);
  return wrapper;
};

const onDragStart = jasmine.createSpy();
const onDragEnd = jasmine.createSpy();
const onDrag = jasmine.createSpy();
const component = jasmine.createSpy();

const allProperties = {
  onDragStart,
  onDragEnd,
  onDrag,
  component,
  style: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    width: '6px',
    height: '100%'
  }
};

describe('Draggable Tests', () => {
  describe('Rendering draggable component', () => {
    it('passes classname property', () => {
      const wrapper = renderComponent({});
      const draggableDiv = wrapper.find('div');
      expect(draggableDiv.hasClass('react-grid-HeaderCell__draggable'));
    });
    it('passes onMouseDown property', () => {
      const wrapper = renderComponent({});
      const draggableDiv = wrapper.find('div');
      expect(draggableDiv.props().onMouseDown).toBeDefined();
    });
    it('passes onTouchStart property', () => {
      const wrapper = renderComponent({});
      const draggableDiv = wrapper.find('div');
      expect(draggableDiv.props().onTouchStart).toBeDefined();
    });
    it('passes onDragStart if available from props', () => {
      const wrapper = renderComponent(allProperties);
      const draggableDiv = wrapper.find('div');
      expect(draggableDiv.props().onDragStart).toBe(onDragStart);
    });
    it('passes onDragStart if not available from props, because it is set as a default', () => {
      const wrapper = renderComponent({});
      const draggableDiv = wrapper.find('div');
      expect(draggableDiv.props().onDragStart).toBeDefined();
    });
    it('passes onDragEnd if available from props', () => {
      const wrapper = renderComponent(allProperties);
      const draggableDiv = wrapper.find('div');
      expect(draggableDiv.props().onDragEnd).toBe(onDragEnd);
    });
    it('passes onDragEnd if not available from props, because it is set as a default', () => {
      const wrapper = renderComponent({});
      const draggableDiv = wrapper.find('div');
      expect(draggableDiv.props().onDragEnd).toBeDefined();
    });
    it('passes onDrag if available from props', () => {
      const wrapper = renderComponent(allProperties);
      const draggableDiv = wrapper.find('div');
      expect(draggableDiv.props().onDrag).toBe(onDrag);
    });
    it('passes onDrag if not available from props, because it is set as a default', () => {
      const wrapper = renderComponent({});
      const draggableDiv = wrapper.find('div');
      expect(draggableDiv.props().onDrag).toBeDefined();
    });
    it('passes style if available from props', () => {
      const wrapper = renderComponent(allProperties);
      const draggableDiv = wrapper.find('div');
      expect(draggableDiv.props().style).toBe(allProperties.style);
    });
    it('does not pass style if not available from props', () => {
      const wrapper = renderComponent({});
      const draggableDiv = wrapper.find('div');
      expect(draggableDiv.props().style).toBeUndefined();
    });
    it('does not pass unknown properties to the div', () => {
      const wrapper = renderComponent(allProperties);
      const draggableDiv = wrapper.find('div');
      expect(draggableDiv.props().component).toBeUndefined();
    });
  });
});
