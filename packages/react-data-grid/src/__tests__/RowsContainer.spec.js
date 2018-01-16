import { shallow } from 'enzyme';
import React from 'react';
import RowsContainer, { SimpleRowsContainer }from '../RowsContainer';

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
  describe('with context menu', () => {
    it('should create a new RowsContainer instance', () => {
      const wrapper = shallow(<RowsContainer {...props} />);
      expect(wrapper.find(FakeContextMenuTrigger)).toBeDefined();
    });

    it('should throw exception for no context menu plugin', () => {
      const newProp = Object.assign({}, props, { window: {}});
      try {
        const wrapper = shallow(<RowsContainer {...newProp} />);
      } catch(e) {
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
    });
  });
});
