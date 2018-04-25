import React from 'react';
import { shallow, mount } from 'enzyme';

import InteractionMasks from '../InteractionMasks';
import SelectionMask from '../SelectionMask';
import EditorContainer from '../../editors/EditorContainer';
import { createColumns } from '../../__tests__/utils/createColumns';
import * as keyCodes from '../../KeyCodes';
import { CellNavigationMode } from '../../constants';

const NUMBER_OF_COLUMNS = 10;
const ROWS_COUNT = 5;
describe('<InteractionMasks/>', () => {
  const rowGetter = () => ({ col1: 1 });

  const setup = (overrideProps, initialState, render = shallow) => {
    const eventBus = { subscribe: jasmine.createSpy() };
    const props = {
      visibleStart: 0,
      visibleEnd: 10,
      colVisibleStart: 0,
      colVisibleEnd: 10,
      columns: createColumns(NUMBER_OF_COLUMNS),
      rowHeight: 30,
      rowsCount: ROWS_COUNT,
      editCell: jasmine.createSpy(),
      selectCell: jasmine.createSpy(),
      onHitBottomBoundary: jasmine.createSpy(),
      onHitTopBoundary: jasmine.createSpy(),
      onHitRightBoundary: jasmine.createSpy(),
      onHitLeftBoundary: jasmine.createSpy(),
      onCellSelected: jasmine.createSpy(),
      onCellDeSelected: jasmine.createSpy(),
      isEditorEnabled: false,
      rowGetter,
      enableCellSelect: true,
      cellNavigationMode: CellNavigationMode.NONE,
      eventBus,
      onBeforeFocus: jasmine.createSpy().and.returnValue(() => null),
      ...overrideProps
    };
    const wrapper = render(<InteractionMasks {...props} />, { disableLifecycleMethods: false });
    wrapper.setState(initialState);
    props.onCellSelected.calls.reset();
    return { wrapper, props };
  };

  const pressKey = (wrapper, key, eventData) => {
    wrapper.simulate('keydown', { key, preventDefault: () => null, ...eventData });
  };

  const simulateTab = (wrapper, shiftKey = false, preventDefault = () => { }) => {
    pressKey(wrapper, 'Tab', { keyCode: keyCodes.Tab, shiftKey, preventDefault });
  };

  describe('When selected cell is within grid bounds', () => {
    it('should render a SelectionMask component', () => {
      const { wrapper } = setup({}, { selectedPosition: { idx: 0, rowIdx: 0 } });
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
      const { wrapper } = setup({}, { selectedPosition: { idx: 0, rowIdx: 0 } });
      pressKey(wrapper, 'Enter', { keyCode: keyCodes.Enter });
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
        const { wrapper } = setup({}, { selectedPosition: currentCell });
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
        pressKey(wrapper, 'Tab', { keyCode: keyCodes.Tab });
        expect(wrapper.state().selectedPosition).toEqual({ idx: 1, rowIdx: 0 });
      });

      it('Press shiftKey + tab should move left', () => {
        const currentCell = { idx: 1, rowIdx: 0 };
        const { wrapper } = setup({}, { selectedPosition: currentCell });
        pressKey(wrapper, 'Tab', { keyCode: keyCodes.Tab, shiftKey: true });
        expect(wrapper.state().selectedPosition).toEqual({ idx: 0, rowIdx: 0 });
      });
    });

    describe('When next cell is out of bounds', () => {
      it('Press arrow left should not move left', () => {
        const currentCell = { idx: 0, rowIdx: 0 };
        const { wrapper } = setup({}, { selectedPosition: currentCell });
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

    describe('Full render tests', () => {
      describe('Cell Selection/DeSelection handlers', () => {
        const setupCellSelectionTest = (initialCell = { rowIdx: 2, idx: 2 }) => {
          return {
            ...setup({}, { selectedPosition: initialCell }, mount),
            ...{ initialCell }
          };
        };

        describe('when cell selection/deselection handlers are passed', () => {
          describe('cell in the middle of the grid is selected', () => {
            it('deselection handler should have been called when moving to the next cell when press Tab', () => {
              const { wrapper, props, initialCell } = setupCellSelectionTest();
              simulateTab(wrapper);
              expect(props.onCellDeSelected).toHaveBeenCalledWith(initialCell);
            });
            it('selection handler should have been called when moving to the next cell', () => {
              const { wrapper, props } = setupCellSelectionTest();
              simulateTab(wrapper);
              expect(props.onCellSelected).toHaveBeenCalledWith({ rowIdx: 2, idx: 3 });
            });
          });
          describe('user is able to exit the grid to the left', () => {
            it('triggers the deselection handler on press Shift+Tab', () => {
              const { wrapper, props, initialCell } = setupCellSelectionTest({ rowIdx: 0, idx: 0 });
              simulateTab(wrapper, true);
              expect(props.onCellDeSelected).toHaveBeenCalledWith(initialCell);
            });
            it('does not trigger the selection handler on press Shift+Tab', () => {
              const { wrapper, props } = setupCellSelectionTest({ rowIdx: 0, idx: 0 });
              simulateTab(wrapper, true);
              expect(props.onCellSelected).not.toHaveBeenCalled();
            });
          });
          describe('user is able to exit the grid to the right', () => {
            it('triggers the deselection handler on press Tab', () => {
              const { wrapper, props, initialCell } = setupCellSelectionTest();
              simulateTab(wrapper);
              expect(props.onCellDeSelected).toHaveBeenCalledWith(initialCell);
            });

            it('does not trigger the selection handler on press Tab', () => {
              const { wrapper, props } = setupCellSelectionTest({ rowIdx: 2, idx: 9 });
              simulateTab(wrapper);
              expect(props.onCellSelected).not.toHaveBeenCalled();
            });
          });
        });
      });
    });


    describe('using keyboard to navigate through the grid by pressing Tab or Shift+Tab', () => {
      // enzyme doesn't allow dom keyboard navigation, but we can assume that if
      // prevent default isn't called, it lets the dom do normal navigation

      const assertGridWasExited = (wrapper) => {
        expect(wrapper.state().selectedPosition).toEqual({ idx: -1, rowIdx: -1 });
      };

      const tabCell = (props, shiftKey, state = {}) => {
        const { wrapper } = setup(props, state);
        const preventDefaultSpy = jasmine.createSpy();
        simulateTab(wrapper, shiftKey, preventDefaultSpy);
        return { wrapper, preventDefaultSpy };
      };

      const assertExitGridOnTab = (props, shiftKey, state = {}) => {
        const { wrapper, preventDefaultSpy } = tabCell(props, shiftKey, state);
        expect(preventDefaultSpy).not.toHaveBeenCalled();
        assertGridWasExited(wrapper);
      };

      const assertSelectedCellOnTab = (props, shiftKey, state = {}) => {
        const { wrapper, preventDefaultSpy } = tabCell(props, shiftKey, state);
        expect(preventDefaultSpy).toHaveBeenCalled();
        return expect(wrapper.state().selectedPosition);
      };

      describe('when cellNavigationMode is changeRow', () => {
        const cellNavigationMode = CellNavigationMode.CHANGE_ROW;
        it('allows the user to exit the grid with Tab if there are no rows', () => {
          assertExitGridOnTab({ cellNavigationMode, rowsCount: 0 });
        });
        it('allows the user to exit the grid with Shift+Tab if there are no rows', () => {
          assertExitGridOnTab({ cellNavigationMode, rowsCount: 0 }, true);
        });
        it('allows the user to exit to the grid with Shift+Tab at the first cell of the grid', () => {
          const selectedPosition = { rowIdx: 0, idx: 0 };
          assertExitGridOnTab({ cellNavigationMode }, true, { selectedPosition });
        });
        it('allows the user to exit the grid when they press Tab at the last cell in the grid', () => {
          const selectedPosition = { rowIdx: ROWS_COUNT - 1, idx: NUMBER_OF_COLUMNS - 1 };
          assertExitGridOnTab({ cellNavigationMode }, false, { selectedPosition });
        });
        it('goes to the next cell when the user presses Tab and they are not at the end of a row', () => {
          const selectedPosition = { rowIdx: 3, idx: 3 };
          assertSelectedCellOnTab({ cellNavigationMode }, false, { selectedPosition })
            .toEqual({ rowIdx: 3, idx: 4 });
        });
        it('goes to the beginning of the next row when the user presses Tab and they are at the end of a row', () => {
          const selectedPosition = { rowIdx: 2, idx: NUMBER_OF_COLUMNS - 1 };
          assertSelectedCellOnTab({ cellNavigationMode }, false, { selectedPosition })
            .toEqual({ rowIdx: 3, idx: 0 });
        });
        it('goes to the previous cell when the user presses Shift+Tab and they are not at the beginning of a row', () => {
          const selectedPosition = { rowIdx: 2, idx: 2 };
          assertSelectedCellOnTab({ cellNavigationMode }, true, { selectedPosition })
            .toEqual({ rowIdx: 2, idx: 1 });
        });
        it('goes to the end of the previous row when the user presses Shift+Tab and they are at the beginning of a row', () => {
          const selectedPosition = { rowIdx: 2, idx: 0 };
          assertSelectedCellOnTab({ cellNavigationMode }, true, { selectedPosition })
            .toEqual({ rowIdx: 1, idx: NUMBER_OF_COLUMNS - 1 });
        });
      });
      describe('when cellNavigationMode is none', () => {
        const cellNavigationMode = CellNavigationMode.NONE;
        it('allows the user to exit the grid with Tab if there are no rows', () => {
          assertExitGridOnTab({ cellNavigationMode, rowsCount: 0 });
        });
        it('allows the user to exit the grid with Shift+Tab if there are no rows', () => {
          assertExitGridOnTab({ cellNavigationMode, rowsCount: 0 }, true);
        });
        it('allows the user to exit the grid when they press Shift+Tab at the first cell of the grid', () => {
          const selectedPosition = { rowIdx: 0, idx: 0 };
          assertExitGridOnTab({ cellNavigationMode }, true, { selectedPosition });
        });
        it('allows the user to exit the grid when they press Tab at the last cell in the grid', () => {
          const selectedPosition = { rowIdx: ROWS_COUNT - 1, idx: NUMBER_OF_COLUMNS - 1 };
          assertExitGridOnTab({ cellNavigationMode }, false, { selectedPosition });
        });
        it('goes to the next cell when the user presses Tab and they are not at the end of a row', () => {
          const selectedPosition = { rowIdx: 3, idx: 3 };
          assertSelectedCellOnTab({ cellNavigationMode }, false, { selectedPosition })
            .toEqual({ rowIdx: 3, idx: 4 });
        });
        it('allows the user to exit the grid when they press Tab and they are at the end of a row', () => {
          const selectedPosition = { rowIdx: 3, idx: NUMBER_OF_COLUMNS - 1 };
          assertExitGridOnTab({ cellNavigationMode }, false, { selectedPosition });
        });
        it('goes to the previous cell when the user presses Shift+Tab and they are not at the beginning of a row', () => {
          const selectedPosition = { rowIdx: 2, idx: 2 };
          assertSelectedCellOnTab({ cellNavigationMode }, true, { selectedPosition })
            .toEqual({ rowIdx: 2, idx: 1 });
        });
        it('allows the user to exit the grid when they press Shift+Tab and they are at the beginning of a row', () => {
          const selectedPosition = { rowIdx: 3, idx: 0 };
          assertExitGridOnTab({ cellNavigationMode }, true, { selectedPosition });
        });
      });
      describe('when cellNavigationMode is loopOverRow', () => {
        const cellNavigationMode = 'loopOverRow';
        it('allows the user to exit the grid with Tab if there are no rows', () => {
          assertExitGridOnTab({ cellNavigationMode, rowsCount: 0 });
        });
        it('allows the user to exit the grid with Shift+Tab if there are no rows', () => {
          assertExitGridOnTab({ cellNavigationMode, rowsCount: 0 }, true);
        });
        it('goes to the first cell in the row when the user presses Tab and they are at the end of a row', () => {
          const selectedPosition = { rowIdx: ROWS_COUNT - 1, idx: NUMBER_OF_COLUMNS - 1 };
          assertSelectedCellOnTab({ cellNavigationMode }, false, { selectedPosition })
            .toEqual({ rowIdx: ROWS_COUNT - 1, idx: 0 });
        });
        it('goes to the last cell in the row when the user presses Shift+Tab and they are at the beginning of a row', () => {
          const selectedPosition = { rowIdx: 0, idx: 0 };
          assertSelectedCellOnTab({ cellNavigationMode }, true, { selectedPosition })
            .toEqual({ rowIdx: 0, idx: NUMBER_OF_COLUMNS - 1 });
        });
        it('goes to the next cell when the user presses Tab and they are not at the end of a row', () => {
          const selectedPosition = { rowIdx: 3, idx: 3 };
          assertSelectedCellOnTab({ cellNavigationMode }, false, { selectedPosition })
            .toEqual({ rowIdx: 3, idx: 4 });
        });
        it('goes to the previous cell when the user presses Shift+Tab and they are not at the beginning of a row', () => {
          const selectedPosition = { rowIdx: 2, idx: 2 };
          assertSelectedCellOnTab({ cellNavigationMode }, true, { selectedPosition })
            .toEqual({ rowIdx: 2, idx: 1 });
        });
      });
    });
  });
});
