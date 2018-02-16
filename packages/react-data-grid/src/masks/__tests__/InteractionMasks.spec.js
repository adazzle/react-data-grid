import React from 'react';
import InteractionMasks from '../InteractionMasks';
import { shallow } from 'enzyme';

import SelectionMask from '../SelectionMask';
import { createColumns } from '../../__tests__/utils/createColumns';

const NUMBER_OF_COLUMNS = 10;

fdescribe('<InteractionMasks/>', () => {
  const rowGetter = () => ({col1: 1});

  const setup = overrideProps => {
    const props = {
      ...{
        visibleStart: 0,
        visibleEnd: 10,
        columns: createColumns(NUMBER_OF_COLUMNS),
        selectedPosition: { idx: -1, rowIdx: -1 },
        rowHeight: 30,
        editCell: jasmine.createSpy(),
        selectCell: jasmine.createSpy(),
        onHitBottomBoundary: jasmine.createSpy(),
        onHitTopBoundary: jasmine.createSpy(),
        isEditorEnabled: false,
        rowGetter
      },
      ...overrideProps
    };
    const wrapper = shallow(<InteractionMasks {...props} />);
    return { wrapper, props };
  };

  const pressKey = (wrapper, key, eventData) => {
    wrapper.simulate('keydown', {...{ key, preventDefault: () => null }, ...eventData});
  };

  describe('When selected cell is within grid bounds', () => {
    it('should render a SelectionMask component', () => {
      const { wrapper } = setup({ selectedPosition: { idx: 0, rowIdx: 0 } });
      expect(wrapper.find(SelectionMask).length).toBe(1);
    });
  });

  describe('When selected cell is outside grid bounds', () => {
    it('should not render a SelectionMask component', () => {
      const { wrapper } = setup();
      expect(wrapper.find(SelectionMask).length).toBe(0);
    });
  });

  describe('Keyboard functionality', () => {
    it('Press enter should enable editing', () => {
      const { wrapper, props } = setup();
      pressKey(wrapper, 'Enter');
      expect(props.editCell).toHaveBeenCalled();
    });

    describe('When current selected cell is not in outer bounds', () => {
      it('Press arrow up should move up', () => {
        const currentCell = { idx: 0, rowIdx: 1 };
        const { wrapper, props } = setup({ selectedPosition: currentCell });
        pressKey(wrapper, 'ArrowUp');
        expect(props.selectCell).toHaveBeenCalledWith({ idx: 0, rowIdx: 0 });
      });

      it('Press arrow right should move right', () => {
        const currentCell = { idx: 0, rowIdx: 0 };
        const { wrapper, props } = setup({ selectedPosition: currentCell });
        pressKey(wrapper, 'ArrowRight');
        expect(props.selectCell).toHaveBeenCalledWith({ idx: 1, rowIdx: 0 });
      });

      it('Press arrow down should move down', () => {
        const currentCell = { idx: 0, rowIdx: 0 };
        const { wrapper, props } = setup({ selectedPosition: currentCell });
        pressKey(wrapper, 'ArrowDown');
        expect(props.selectCell).toHaveBeenCalledWith({ idx: 0, rowIdx: 1 });
      });

      it('Press arrow left should move left', () => {
        const currentCell = { idx: 1, rowIdx: 0 };
        const { wrapper, props } = setup({ selectedPosition: currentCell });
        pressKey(wrapper, 'ArrowLeft');
        expect(props.selectCell).toHaveBeenCalledWith({ idx: 0, rowIdx: 0 });
      });

      it('Press tab should move right', () => {
        const currentCell = { idx: 0, rowIdx: 0 };
        const { wrapper, props } = setup({ selectedPosition: currentCell });
        pressKey(wrapper, 'Tab');
        expect(props.selectCell).toHaveBeenCalledWith({ idx: 1, rowIdx: 0 });
      });

      it('Press ctrl + tab should move left', () => {
        const currentCell = { idx: 1, rowIdx: 0 };
        const { wrapper, props } = setup({ selectedPosition: currentCell });
        pressKey(wrapper, 'Tab', {ctrlKey: true, metaKey: true});
        expect(props.selectCell).toHaveBeenCalledWith({ idx: 0, rowIdx: 0 });
      });
    });

    describe('When next cell is out of bounds', () => {
      it('Press arrow left should not move left', () => {
        const currentCell = { idx: 0, rowIdx: 0 };
        const { wrapper, props } = setup({ selectedPosition: currentCell });
        pressKey(wrapper, 'ArrowLeft');
        expect(props.selectCell).not.toHaveBeenCalled();
      });

      fit('Press arrow right should not move right', () => {
        const currentCell = { idx: NUMBER_OF_COLUMNS - 1, rowIdx: 0 };
        const { wrapper, props } = setup({ selectedPosition: currentCell });
        pressKey(wrapper, 'ArrowRight');
        expect(props.selectCell).not.toHaveBeenCalled();
      });

      it('Press arrow up should not move up', () => {
        const currentCell = { idx: 0, rowIdx: 0 };
        const { wrapper, props } = setup({ selectedPosition: currentCell });
        pressKey(wrapper, 'ArrowUp');
        expect(props.selectCell).not.toHaveBeenCalled();
      });
    });
  });
});
