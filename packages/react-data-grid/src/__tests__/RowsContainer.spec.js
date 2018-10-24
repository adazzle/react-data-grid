import { shallow } from 'enzyme';
import React from 'react';
import RowsContainer, { getNewContextMenuProps, SimpleRowsContainer, DEFAULT_CONTEXT_MENU_ID } from '../RowsContainer';

const FakeContextMenuTrigger = () => <div id="fakeContextMenuTrigger" />;

const FakeContextMenu = () => <div />;

const ReactDataGridPlugins = {
  Menu: {
    ContextMenuTrigger: FakeContextMenuTrigger
  }
};

const contextMenuId = 'fakeContextMenu';
const props = {
  contextMenu: <FakeContextMenu id={contextMenuId} />,
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
      expect(newProps.id).toBe(contextMenuId);
    });

    it('should populate correct newProps for contextMenu with default menu id', () => {
      const newProps = getNewContextMenuProps(Object.assign({}, props, { contextMenu: <FakeContextMenu /> }));
      expect(newProps.id).toBe(DEFAULT_CONTEXT_MENU_ID);
    });
  });

  describe('with context menu', () => {
    it('should create a new RowsContainer instance', () => {
      const wrapper = shallow(<RowsContainer {...props} />);
      expect(wrapper.find(FakeContextMenuTrigger).length).toBe(1);
    });

    it('should throw exception for no context menu plugin when rendering', () => {
      const newProp = Object.assign({}, props, { window: {}});
      expect(() => { shallow(<RowsContainer {...newProp} />); }).toThrowError('You need to include ReactDataGrid UiPlugins in order to initialise context menu');
    });
  });

  describe('without context menu', () => {
    it('should create a SimpleRowsContainer', () => {
      const newProps = Object.assign({}, props, {
        contextMenu: undefined
      });
      const wrapper = shallow(<RowsContainer {...newProps}/>);
      expect(wrapper.find(SimpleRowsContainer).length).toBe(1);
      expect(wrapper.find(FakeContextMenuTrigger).length).toBe(0);
    });
  });
});
