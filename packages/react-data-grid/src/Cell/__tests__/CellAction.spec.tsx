import React from 'react';
import { mount } from 'enzyme';

import CellAction, { CellActionProps } from '../CellAction';

const setup = (overriderProps: Partial<CellActionProps> = {}) => {
  const props: CellActionProps = {
    icon: <span className="glyphicon glyphicon-link" />,
    callback: jest.fn(),
    isFirst: true,
    ...overriderProps
  };
  const wrapper = mount(<CellAction {...props} />);
  return {
    props,
    wrapper
  };
};

describe('Cell Action Tests', () => {
  describe('when a button action is passed', () => {
    it('will render a button action and hook up the callback function', () => {
      const { wrapper, props } = setup();
      wrapper.find('.rdg-cell-action-button').simulate('click');

      expect(props.callback).toHaveBeenCalled();
      wrapper.unmount();
    });
  });

  describe('when a menu action is passed', () => {
    it('will render a toggle button which will hide/show the menu of actions', () => {
      const menuClass = '.rdg-cell-action-menu';
      const actions = [
        {
          text: 'Test Action 1',
          callback: jest.fn()
        },
        {
          text: 'Test Action 1',
          callback: jest.fn()
        }
      ];
      const { wrapper } = setup({ actions });

      expect(wrapper.find(menuClass).length).toBe(0);

      wrapper.find('.rdg-cell-action-button').simulate('click');

      const renderedActionMenu = wrapper.find(menuClass);
      expect(wrapper.find(menuClass).length).toBe(1);

      const renderedActionMenuProps = renderedActionMenu.props();

      expect(React.Children.count(renderedActionMenuProps.children)).toBe(2);

      expect(actions[0].callback).not.toHaveBeenCalled();
      renderedActionMenu.childAt(0).simulate('click');
      expect(actions[0].callback).toHaveBeenCalled();
      wrapper.unmount();
    });
  });

  describe('when isFirst is passed', () => {
    describe('when isFirst is true', () => {
      xit('will render a button action with cell-action-last class on it', () => {
        const { wrapper } = setup({ isFirst: true });
        expect(wrapper.hasClass('rdg-cell-action-last')).toBe(true);
        wrapper.unmount();
      });
    });

    describe('when isFirst is false', () => {
      it('will not render a button action without cell-action-last class on it', () => {
        const { wrapper } = setup({ isFirst: false });
        expect(wrapper.hasClass('rdg-cell-action-last')).toBe(false);
        wrapper.unmount();
      });
    });
  });
});
