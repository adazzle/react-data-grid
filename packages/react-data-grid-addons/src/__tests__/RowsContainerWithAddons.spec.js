import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { RowsContainer } from 'react-data-grid';
import { Menu } from '../../';
const { ContextMenu } = Menu;

describe('RowsContainer with addons', () => {
  describe('with context menu', () => {
    let componentWithContextMenu;
    const fakeRowIdx = 1;
    const fakeIdx = 5;

    beforeEach(() => {
      componentWithContextMenu = ReactTestUtils.renderIntoDocument(
        <RowsContainer
          contextMenu={<ContextMenu />}
          rowIdx={fakeRowIdx}
          idx={fakeIdx} />
      );
    });

    it('should create a new RowsContainer instance', () => {
      expect(componentWithContextMenu).toBeDefined();
    });

    it('should render the context menu', () => {
      let contextMenu = ReactTestUtils.findRenderedComponentWithType(componentWithContextMenu, ContextMenu);
      expect(contextMenu).toBeDefined();
    });

    it('should propagate the row idx and idx props to the context menu', () => {
      let contextMenu = ReactTestUtils.findRenderedComponentWithType(componentWithContextMenu, ContextMenu);
      expect(contextMenu.props.rowIdx).toEqual(fakeRowIdx);
      expect(contextMenu.props.idx).toEqual(fakeIdx);
    });
  });
});
