import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import RowsContainer, {ContextMenuRowsContainer, SimpleRowsContainer} from '../RowsContainer';
import ReactDataGridContextMenu from '../addons/menu/ContextMenu';

describe('Rows Container', () => {
  describe('without context menu', () => {
    let componentWithoutContextMenu = {};

    beforeEach(() => {
      componentWithoutContextMenu = ReactTestUtils.renderIntoDocument(<RowsContainer />);
    });

    it('should create a new RowsContainer instance', () => {
      expect(componentWithoutContextMenu).toBeDefined();
    });

    it('should render one SimpleRowsContainer component', () => {
      let simpleRowsContainer = ReactTestUtils.findRenderedComponentWithType(componentWithoutContextMenu, SimpleRowsContainer);
      expect(simpleRowsContainer).toBeDefined();
    });

    it('should not render a ContextMenuRowsContainer component', () => {
      let contextMenuRowsContainers = ReactTestUtils.scryRenderedComponentsWithType(componentWithoutContextMenu, ContextMenuRowsContainer);
      expect(contextMenuRowsContainers.length).toEqual(0);
    });
  });

  describe('with context menu', () => {
    let componentWithContextMenu = {};
    let fakeRowIdx = 1;
    let fakeIdx = 5;

    beforeEach(() => {
      componentWithContextMenu = ReactTestUtils.renderIntoDocument(
        <RowsContainer
          contextMenu={<ReactDataGridContextMenu />}
          rowIdx={fakeRowIdx}
          idx={fakeIdx} />
      );
    });

    it('should create a new RowsContainer instance', () => {
      expect(componentWithContextMenu).toBeDefined();
    });

    it('should render one ContextMenuRowsContainer component', () => {
      let contextMenuRowsContainer = ReactTestUtils.findRenderedComponentWithType(componentWithContextMenu, ContextMenuRowsContainer);
      expect(contextMenuRowsContainer).toBeDefined();
    });

    it('should render one SimpleRowsContainer component', () => {
      let simpleRowsContainer = ReactTestUtils.findRenderedComponentWithType(componentWithContextMenu, SimpleRowsContainer);
      expect(simpleRowsContainer).toBeDefined();
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
