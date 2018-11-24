import React from 'react';
import { shallow, mount } from 'enzyme';

import HeaderCell from '../HeaderCell';
import SortableHeaderCell from 'common/cells/headerCells/SortableHeaderCell';
import ResizeHandle from '../ResizeHandle';

describe('Header Cell Tests', () => {
  const testProps = {
    rowType: 'header',
    column: {
      width: 150,
      left: 300,
      name: 'bla',
      key: 'bla'
    },
    onResize: jasmine.createSpy(),
    onResizeEnd: jasmine.createSpy(),
    height: 50,
    name: 'bla'
  };

  function setup(overrideProps = {}) {
    const props = {...testProps, ...overrideProps};
    const wrapper = shallow(<HeaderCell  {...props}/>);
    return {wrapper, props};
  }

  it('should initialize the state correctly', () => {
    const {wrapper} = setup();
    expect(wrapper.state()).toEqual(
      {resizing: false}
    );
  });

  describe('When custom render is supplied', () => {
    it('will render', () => {
      const CustomRenderer = () => <div>Custom</div>;
      const {wrapper} = setup({renderer: <CustomRenderer/>});
      expect(wrapper.find(CustomRenderer).length).toBe(1);
    });

    it('will have height passed in props', () => {
      const CustomRenderer = () => <div>Custom</div>;
      const {wrapper} = setup({renderer: <CustomRenderer/>});
      expect(wrapper.find(CustomRenderer).props().height).toBe(testProps.height);
    });
  });

  describe('When column is resizable', () => {
    beforeEach(() => {
      testProps.column.resizable = true;
    });

    afterEach(() => {
      testProps.column.resizable = false;
    });

    it('should render a resize handle', () => {
      const {wrapper} = setup();
      const resizeHandle = wrapper.find(ResizeHandle);
      expect(resizeHandle.length).toBe(1);
    });

    it('start dragging handle should set resizing state to be true', () => {
      const {wrapper} = setup();
      const resizeHandle = wrapper.find(ResizeHandle);
      resizeHandle.props().onDragStart();
      expect(wrapper.state().resizing).toBe(true);
    });

    it('dragging handle should call onResize callback with width and column', () => {
      const dragLength = 200;
      const wrapper = mount(<HeaderCell  {...testProps}/>);
      const resizeHandle = wrapper.find(ResizeHandle);
      const fakeEvent = {pageX: dragLength};
      resizeHandle.props().onDrag(fakeEvent);
      expect(testProps.onResize).toHaveBeenCalled();
      expect(testProps.onResize.calls.mostRecent().args[0]).toEqual(testProps.column);
      expect(testProps.onResize.calls.mostRecent().args[1]).toEqual(dragLength);
    });

    it('finish dragging should reset resizing state', () => {
      const wrapper = mount(<HeaderCell  {...testProps}/>);
      wrapper.setState({resizing: true});
      const fakeEvent = {pageX: 250};
      const resizeHandle = wrapper.find(ResizeHandle);
      resizeHandle.props().onDragEnd(fakeEvent);
      expect(wrapper.state().resizing).toBe(false);
    });

    it('finish dragging should call onResizeEnd with correct params', () => {
      const wrapper = mount(<HeaderCell  {...testProps}/>);
      const resizeHandle = wrapper.find(ResizeHandle);
      const fakeEvent = {pageX: 250};
      resizeHandle.props().onDrag(fakeEvent);
      expect(testProps.onResizeEnd).toHaveBeenCalled();
      expect(testProps.onResizeEnd.calls.mostRecent().args[0]).toEqual(testProps.column);
      expect(testProps.onResizeEnd.calls.mostRecent().args[1]).toEqual(250);
    });
  });

  describe('getCell method', () => {
    it('pass the column as property to cell renderer if it is a function', () => {
      const rendererFunction = jasmine.createSpy();
      const {props} = setup({renderer: rendererFunction});
      expect(rendererFunction.calls.argsFor(0)[0]).toEqual({column: props.column});
    });
    it('should not pass the column as property to cell renderer if it is an HTML element', () => {
      const renderer = <div>Value</div>;
      const {wrapper} = setup({renderer});
      const cell = wrapper.instance().getCell();
      expect(cell.props.column).toBeUndefined();
    });
    it('should pass the column as property to cell renderer if it is a React class', () => {
      const renderer = <SortableHeaderCell columnKey="colKey" onSort={jasmine.createSpy()} />;
      const {wrapper, props} = setup({renderer});
      const cell = wrapper.instance().getCell();
      expect(cell.props.column).toBe(props.column);
    });
  });
});
