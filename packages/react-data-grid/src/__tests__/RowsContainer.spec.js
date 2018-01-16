import { shallow } from 'enzyme';
import React from 'react';
import RowsContainer, { getNewContextMenuProps, SimpleRowsContainer, DEFAULT_CONTEXT_MENU_ID } from '../RowsContainer';

const FakeContextMenuTrigger = () => <div id="fakeContextMenuTrigger" />;

const FakeContextMenu = () => <div id="fakeContextMenu" />;

const ReactDataGridPlugins = {
  Menu: {
    ContextMenuTrigger: FakeContextMenuTrigger
  }
};

const props = {
  contextMenu: <FakeContextMenu />,
  contextMenuId: 'fakeContextMenu',
  rowIdx: 5,
  idx: 8,
  window: { ReactDataGridPlugins },
  rows: [
    { id: 'row_1' },
    { id: 'row_2' }
  ]
};

describe('Rows Container', () => {
  describe('getNewContextMenuProps()', () => {
    it('should populate correct newProps for contextMenu with customized menu id', () => {
      const newProps = getNewContextMenuProps(props);
      expect(newProps.id).toBe(props.contextMenuId);
    });

    it('should populate correct newProps for contextMenu with default menu id', () => {
      const newProps = getNewContextMenuProps(Object.assign({}, props, { contextMenuId: undefined }));
      expect(newProps.id).toBe(DEFAULT_CONTEXT_MENU_ID);
    });
  });

  describe('with context menu', () => {
    it('should create a new RowsContainer instance', () => {
      const wrapper = shallow(<RowsContainer {...props} />);
      expect(wrapper.find(FakeContextMenuTrigger).length).toBe(1);
    });

    it('should throw exception for no context menu plugin', () => {
      const newProp = Object.assign({}, props, { window: {}});
      try {
        shallow(<RowsContainer {...newProp} />);
      } catch (e) {
        expect(e.message).toContain('You need to include ReactDataGrid UiPlugins in order to initialise context menu');
      }
    });
  });

  describe('without context menu', () => {
    it('should create a SimpleRowsContainer', () => {
      const newProps = Object.assign({}, props, {
        contextMenu: undefined,
        contextMenuId: undefined
      });
      const wrapper = shallow(<RowsContainer {...newProps}/>);
      expect(wrapper.find(SimpleRowsContainer).length).toBe(1);
      expect(wrapper.find(FakeContextMenuTrigger).length).toBe(0);
    });
  });
});
