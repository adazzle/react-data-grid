import {Menu} from '../addons';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import RowsContainer from '../RowsContainer';


let ReactDataGridContextMenu = Menu.ContextMenu;

describe('Rows Container', () => {
  describe('without context menu', () => {
    let componentWithoutContextMenu = {};

    beforeEach(() => {
      componentWithoutContextMenu = ReactTestUtils.renderIntoDocument(<RowsContainer window={{ ReactDataGridPlugins: undefined }} />);
    });

    it('should create a new RowsContainer instance', () => {
      expect(componentWithoutContextMenu).toBeDefined();
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
