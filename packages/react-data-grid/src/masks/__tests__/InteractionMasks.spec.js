import React from 'react';
import InteractionMasks from '../InteractionMasks';
import { shallow } from 'enzyme';

import SelectionMask from '../SelectionMask';
import EditorContainer from '../../editors/EditorContainer';
import { createColumns } from '../../__tests__/utils/createColumns';
import * as keyCodes from '../../KeyCodes';

const NUMBER_OF_COLUMNS = 10;

describe('<InteractionMasks/>', () => {
  const rowGetter = () => ({col1: 1});

  const setup = (overrideProps, initialState) => {
    const props = {
      ...{
        visibleStart: 0,
        visibleEnd: 10,
        columns: createColumns(NUMBER_OF_COLUMNS),
        rowHeight: 30,
        rowsCount: 10,
        editCell: jasmine.createSpy(),
        selectCell: jasmine.createSpy(),
        onHitBottomBoundary: jasmine.createSpy(),
        onHitTopBoundary: jasmine.createSpy(),
        isEditorEnabled: false,
        rowGetter,
        enableCellSelect: true
      },
      ...overrideProps
    };
    const wrapper = shallow(<InteractionMasks {...props} />);
    wrapper.setState(initialState);
    return { wrapper, props };
  };

  const pressKey = (wrapper, key, eventData) => {
    wrapper.simulate('keydown', {...{ key, preventDefault: () => null }, ...eventData});
  };

  describe('When selected cell is within grid bounds', () => {
    it('should render a SelectionMask component', () => {
      const { wrapper } = setup({}, {selectedPosition: { idx: 0, rowIdx: 0 }});
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
      const { wrapper } = setup({}, {selectedPosition: { idx: 0, rowIdx: 0 }});
      pressKey(wrapper, 'Enter', {keyCode: keyCodes.Enter});
      expect(wrapper.find(EditorContainer).length).toBe(1);
    });

    describe('When current selected cell is not in outer bounds', () => {
      it('Press arrow up should move up', () => {
        const currentCell = { idx: 0, rowIdx: 0 };
        const { wrapper } = setup({}, { selectedPosition: currentCell });
        pressKey(wrapper, 'ArrowRight');
        expect(wrapper.state().selectedPosition).toEqual({ idx: 1, rowIdx: 0 });
      });

      it('Press arrow right should move right', () => {
        const currentCell = { idx: 0, rowIdx: 0 };
        const { wrapper } = setup({}, { selectedPosition: currentCell });
        pressKey(wrapper, 'ArrowRight');
        expect(wrapper.state().selectedPosition).toEqual({ idx: 1, rowIdx: 0 });
      });

      it('Press arrow down should move down', () => {
        const currentCell = { idx: 0, rowIdx: 0 };
        const { wrapper} = setup({}, { selectedPosition: currentCell });
        pressKey(wrapper, 'ArrowDown');
        expect(wrapper.state().selectedPosition).toEqual({ idx: 0, rowIdx: 1 });
      });

      it('Press arrow left should move left', () => {
        const currentCell = { idx: 1, rowIdx: 0 };
        const { wrapper } = setup({}, { selectedPosition: currentCell });
        pressKey(wrapper, 'ArrowLeft');
        expect(wrapper.state().selectedPosition).toEqual({ idx: 0, rowIdx: 0 });
      });

      it('Press tab should move right', () => {
        const currentCell = { idx: 0, rowIdx: 0 };
        const { wrapper } = setup({}, { selectedPosition: currentCell });
        pressKey(wrapper, 'Tab', {keyCode: keyCodes.Tab});
        expect(wrapper.state().selectedPosition).toEqual({ idx: 1, rowIdx: 0 });
      });

      it('Press shiftKey + tab should move left', () => {
        const currentCell = { idx: 1, rowIdx: 0 };
        const { wrapper} = setup({}, { selectedPosition: currentCell });
        pressKey(wrapper, 'Tab', {keyCode: keyCodes.Tab, shiftKey: true});
        expect(wrapper.state().selectedPosition).toEqual({ idx: 0, rowIdx: 0 });
      });
    });

    describe('When next cell is out of bounds', () => {
      it('Press arrow left should not move left', () => {
        const currentCell = { idx: 0, rowIdx: 0 };
        const { wrapper} = setup({}, { selectedPosition: currentCell });
        pressKey(wrapper, 'ArrowLeft');
        expect(wrapper.state().selectedPosition).toEqual(currentCell);
      });

      it('Press arrow right should not move right', () => {
        const currentCell = { idx: NUMBER_OF_COLUMNS - 1, rowIdx: 0 };
        const { wrapper } = setup({}, { selectedPosition: currentCell });
        pressKey(wrapper, 'ArrowRight');
        expect(wrapper.state().selectedPosition).toEqual(currentCell);
      });

      it('Press arrow up should not move up', () => {
        const currentCell = { idx: 0, rowIdx: 0 };
        const { wrapper } = setup({}, { selectedPosition: currentCell });
        pressKey(wrapper, 'ArrowUp');
        expect(wrapper.state().selectedPosition).toEqual(currentCell);
      });
    });
  });
});
