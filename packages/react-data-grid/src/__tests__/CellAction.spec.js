import React from 'react';
import sinon from 'sinon';
import {shallow} from 'enzyme';
import CellAction from '../CellAction';

const setup = (overriderProps = {}) => {
  const props = Object.assign({
    action: {
      icon: 'glyphicon glyphicon-link',
      callback: sinon.spy()
    },
    isFirst: true
  }, overriderProps);
  const wrapper = shallow(<CellAction {...props} />);
  return {
    props,
    wrapper
  };
};

describe('Cell Action Tests', () => {
  describe('when a button action is passed', () => {
    it('will render a button action and hook up the callback function', () => {
      const {wrapper, props} = setup();
      const renderedActionButton = wrapper.find('.rdg-cell-action-button');
      const renderedActionButtonProps = renderedActionButton.props();
      const renderedActionMenu = wrapper.find('.rdg-cell-action-menu');

      expect(renderedActionButton.length).toBe(1);
      expect(renderedActionButtonProps.onClick).toEqual(jasmine.any(Function));

      renderedActionButton.simulate('click');

      expect(props.action.callback.called).toBeTruthy();

      expect(renderedActionMenu.length).toBe(0);
    });
  });

  describe('when a menu action is passed', () => {
    it('will render a toggle button which will hide/show the menu of actions', () => {
      const {wrapper, props} = setup({
        action: {
          icon: 'glyphicon glyphicon-link',
          actions: [
            {
              text: 'Test Action 1',
              callback: sinon.spy()
            },
            {
              text: 'Test Action 1',
              callback: sinon.spy()
            }
          ]
        }
      });
      let wrapperState = wrapper.state();
      const renderedActionButton = wrapper.find('.rdg-cell-action-button');
      const renderedActionButtonProps = renderedActionButton.props();
      let renderedActionMenu = wrapper.find('.rdg-cell-action-menu');

      expect(renderedActionButton.length).toBe(1);
      expect(renderedActionButtonProps.onClick).toEqual(jasmine.any(Function));
      expect(wrapperState.isMenuOpen).toBeFalsy();
      expect(renderedActionMenu.length).toBe(0);

      renderedActionButton.simulate('click');

      wrapperState = wrapper.state();
      renderedActionMenu = wrapper.find('.rdg-cell-action-menu');
      const renderedActionMenuProps = renderedActionMenu.props();

      expect(wrapperState.isMenuOpen).toBeTruthy();
      expect(renderedActionMenu.length).toBe(1);
      expect(renderedActionMenuProps.children.length).toBe(props.action.actions.length);

      expect(props.action.actions[0].callback.called).toBeFalsy();
      renderedActionMenu.childAt(0).simulate('click');
      expect(props.action.actions[0].callback.called).toBeTruthy();
    });
  });

  describe('when isFirst is passed', () => {
    describe('when isFirst is true', () => {
      it('will render a button action with cell-action-last class on it', () => {
        const {wrapper} = setup({isFirst: true});
        const wrapperProps = wrapper.props();

        expect(wrapper.length).toBe(1);
        expect(wrapperProps.className).toBe('rdg-cell-action rdg-cell-action-last');
      });
    });

    describe('when isFirst is false', () => {
      it('will render a button action without cell-action-last class on it', () => {
        const {wrapper} = setup({isFirst: false});
        const wrapperProps = wrapper.props();

        expect(wrapper.length).toBe(1);
        expect(wrapperProps.className).toBe('rdg-cell-action');
      });
    });
  });
});
