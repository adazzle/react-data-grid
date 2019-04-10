import React from 'react';
import { shallow } from 'enzyme';

import CellAction, { CellActionProps } from '../CellAction';

const setup = (overriderProps: Partial<CellActionProps> = {}) => {
  const props = {
    icon: 'glyphicon glyphicon-link',
    callback: jest.fn(),
    isFirst: true,
    ...overriderProps
  };
  const wrapper = shallow(<CellAction {...props} />);
  return {
    props,
    wrapper
  };
};

describe('Cell Action Tests', () => {
  describe('when a button action is passed', () => {
    it('will render a button action and hook up the callback function', () => {
      const { wrapper, props } = setup();
      const renderedActionButton = wrapper.find('.rdg-cell-action-button');
      const renderedActionMenu = wrapper.find('.rdg-cell-action-menu');

      expect(renderedActionButton.length).toBe(1);

      renderedActionButton.simulate('click');

      expect(props.callback).toHaveBeenCalled();
      expect(renderedActionMenu.length).toBe(0);
    });
  });

  describe('when a menu action is passed', () => {
    it('will render a toggle button which will hide/show the menu of actions', () => {
      const { wrapper, props } = setup({
        icon: 'glyphicon glyphicon-link',
        actions: [
          {
            text: 'Test Action 1',
            callback: jest.fn()
          },
          {
            text: 'Test Action 1',
            callback: jest.fn()
          }
        ]
      });
      const renderedActionButton = wrapper.find('.rdg-cell-action-button');
      let renderedActionMenu = wrapper.find('.rdg-cell-action-menu');

      expect(renderedActionButton.length).toBe(1);
      expect(wrapper.find('.rdg-cell-action-menu').length).toBe(0);

      renderedActionButton.simulate('click');

      renderedActionMenu = wrapper.find('.rdg-cell-action-menu');
      const renderedActionMenuProps = renderedActionMenu.props();

      expect(wrapper.find('.rdg-cell-action-menu').length).toBe(1);
      expect(React.Children.count(renderedActionMenuProps.children)).toBe(props.actions.length);

      expect(props.actions[0].callback).not.toHaveBeenCalled();
      renderedActionMenu.childAt(0).simulate('click');
      expect(props.actions[0].callback).toHaveBeenCalled();
    });
  });

  describe('when isFirst is passed', () => {
    describe('when isFirst is true', () => {
      it('will render a button action with cell-action-last class on it', () => {
        const { wrapper } = setup({ isFirst: true });
        expect(wrapper.hasClass('rdg-cell-action-last')).toBe(true);
      });
    });

    describe('when isFirst is false', () => {
      it('will render a button action without cell-action-last class on it', () => {
        const { wrapper } = setup({ isFirst: false });
        expect(wrapper.hasClass('rdg-cell-action-last')).toBe(false);
      });
    });
  });
});
