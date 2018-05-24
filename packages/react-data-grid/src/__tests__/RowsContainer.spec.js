import { shallow } from 'enzyme';
import React from 'react';

import RowsContainer, { DEFAULT_CONTEXT_MENU_ID } from '../RowsContainer';

const FakeContextMenuTrigger = () => <div id="fakeContextMenuTrigger" />;
const FakeContextMenu = () => <div />;
const FakeRow = (id) => <div id={id} />;

const ReactDataGridPlugins = {
  Menu: {
    ContextMenuTrigger: FakeContextMenuTrigger
  }
};

describe('Rows Container', () => {
  const setup = (propsOverride = {}) => {
    const props = {
      rowIdx: 5,
      idx: 8,
      window: { ReactDataGridPlugins },
      rows: [
        <FakeRow key={1} id={1} />,
        <FakeRow key={2} id={2} />
      ],
      contextMenu: <FakeContextMenu />,
      ...propsOverride
    };

    return shallow(<RowsContainer {...props} />);
  };

  describe('with context menu', () => {
    it('should set the correct id for contextMenu', () => {
      const contextMenuId = 'fakeContextMenu';
      const wrapper = setup({ contextMenu: <FakeContextMenu id={contextMenuId} /> });
      expect(wrapper.find(FakeContextMenuTrigger).props().id).toBe(contextMenuId);
    });

    it('should set the default id for contextMenu', () => {
      const wrapper = setup();
      expect(wrapper.find(FakeContextMenuTrigger).props().id).toBe(DEFAULT_CONTEXT_MENU_ID);
    });

    it('should render grid rows', () => {
      const wrapper = setup();
      expect(wrapper.find(FakeRow).length).toBe(2);
    });

    it('should throw an exception for no context menu plugin if rdg addons are not included', () => {
      expect(
        () => setup({ window: {} })
      ).toThrow();
    });
  });

  describe('without context menu', () => {
    it('should render grid rows', () => {
      const wrapper = setup({ contextMenu: undefined });
      expect(wrapper.find(FakeRow).length).toBe(2);
    });

    it('should not render context menu', () => {
      const wrapper = setup({ contextMenu: undefined });
      expect(wrapper.find(FakeContextMenuTrigger).length).toBe(0);
    });
  });
});
