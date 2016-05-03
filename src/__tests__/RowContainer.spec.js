import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import RowContainer, {ContextMenuRowContainer, SimpleRowContainer} from '../RowContainer';
import ReactDataGridContextMenu from '../addons/menu/ContextMenu';

describe('Row Container', () => {
  describe('without context menu', () => {
    let componentWithoutContextMenu = {};

    beforeEach(() => {
      componentWithoutContextMenu = ReactTestUtils.renderIntoDocument(<RowContainer />);
    });

    it('should create a new RowContainer instance', () => {
      expect(componentWithoutContextMenu).toBeDefined();
    });

    it('should render one SimpleRowContainer component', () => {
      let simpleRowContainer = ReactTestUtils.findRenderedComponentWithType(componentWithoutContextMenu, SimpleRowContainer);
      expect(simpleRowContainer).toBeDefined();
    });

    it('should not render a ContextMenuRowContainer component', () => {
      let contextMenuRowContainers = ReactTestUtils.scryRenderedComponentsWithType(componentWithoutContextMenu, ContextMenuRowContainer);
      expect(contextMenuRowContainers.length).toEqual(0);
    });
  });

  describe('with context menu', () => {
    let componentWithContextMenu = {};
    let fakeRowIdx = 1;
    let fakeIdx = 5;

    beforeEach(() => {
      componentWithContextMenu = ReactTestUtils.renderIntoDocument(
        <RowContainer
          contextMenu={<ReactDataGridContextMenu />}
          rowIdx={fakeRowIdx}
          idx={fakeIdx} />
      );
    });

    it('should create a new RowContainer instance', () => {
      expect(componentWithContextMenu).toBeDefined();
    });

    it('should render one ContextMenuRowContainer component', () => {
      let contextMenuRowContainer = ReactTestUtils.findRenderedComponentWithType(componentWithContextMenu, ContextMenuRowContainer);
      expect(contextMenuRowContainer).toBeDefined();
    });

    it('should render one SimpleRowContainer component', () => {
      let simpleRowContainer = ReactTestUtils.findRenderedComponentWithType(componentWithContextMenu, SimpleRowContainer);
      expect(simpleRowContainer).toBeDefined();
    });

    it('should render the context menu', () => {
      let contextMenu = ReactTestUtils.findRenderedComponentWithType(componentWithContextMenu, ReactDataGridContextMenu);
      expect(contextMenu).toBeDefined();
    });

    it('should propagate the row idx and idx props to the context menu', () => {
      let contextMenu = ReactTestUtils.findRenderedComponentWithType(componentWithContextMenu, ReactDataGridContextMenu);
      expect(contextMenu.props.rowIdx).toEqual(fakeRowIdx);
      expect(contextMenu.props.idx).toEqual(fakeIdx);
    });
  });
});
