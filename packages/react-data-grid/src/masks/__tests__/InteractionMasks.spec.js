import React from 'react';
import { shallow, mount } from 'enzyme';

import InteractionMasks from '../InteractionMasks';
import SelectionMask from '../SelectionMask';
import SelectionRangeMask from '../SelectionRangeMask';
import CopyMask from '../CopyMask';
import DragMask from '../DragMask';
import DragHandle from '../DragHandle';
import EventBus from '../EventBus';
import EditorContainer from 'common/editors/EditorContainer';
import { sel, createColumns } from '../../__tests__/utils';
import * as keyCodes from '../../KeyCodes';
import { CellNavigationMode, EventTypes, UpdateActions } from 'common/constants';

const NUMBER_OF_COLUMNS = 10;
const ROWS_COUNT = 5;
const columns = createColumns(NUMBER_OF_COLUMNS);

const objectMatching = jasmine.objectContaining;

describe('<InteractionMasks/>', () => {
  const rowGetter = () => ({ col1: 1 });

  const setup = (overrideProps, initialState, render = shallow) => {
    const eventBus = new EventBus();
    const props = {
      rowVisibleStartIdx: 0,
      rowVisibleEndIdx: 10,
      colVisibleStartIdx: 0,
      colVisibleEndIdx: 10,
      columns,
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
      onCellRangeSelectionStarted: jasmine.createSpy(),
      onCellRangeSelectionUpdated: jasmine.createSpy(),
      onCellRangeSelectionCompleted: jasmine.createSpy(),
      onGridRowsUpdated: jasmine.createSpy(),
      isEditorEnabled: false,
      rowGetter,
      enableCellSelect: true,
      cellNavigationMode: CellNavigationMode.NONE,
      eventBus,
      getRowColumns: () => columns,
      getRowHeight: () => 50,
      getRowTop: () => 0,
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

  describe('Rendered masks', () => {
    describe('When a single cell is selected', () => {
      describe('within grid bounds', () => {
        it('should render a SelectionMask component', () => {
          const { wrapper } = setup({}, { selectedPosition: { idx: 0, rowIdx: 0 } });
          expect(wrapper.find(SelectionMask).length).toBe(1);
        });
      });

      describe('outside grid bounds', () => {
        it('should not render a SelectionMask component', () => {
          const { wrapper } = setup();
          expect(wrapper.find(SelectionMask).length).toBe(0);
        });
      });
    });

    describe('When a cell range is selected', () => {
      it('should render a SelectionRangeMask component', () => {
        const { wrapper } = setup({}, {
          selectedPosition: { idx: 0, rowIdx: 0 },
          selectedRange: {
            topLeft: { idx: 0, rowIdx: 0 },
            bottomRight: { idx: 1, rowIdx: 1 }
          }
        });
        expect(wrapper.find(SelectionRangeMask).length).toBe(1);
      });

      it('should render a SelectionMask component on the range\'s start cell', () => {
        const { wrapper } = setup({}, {
          selectedPosition: { idx: 0, rowIdx: 0 },
          selectedRange: {
            topLeft: { idx: 0, rowIdx: 0 },
            bottomRight: { idx: 1, rowIdx: 1 },
            startCell: { idx: 0, rowIdx: 0 }
          }
        });
        expect(wrapper.find(SelectionMask).length).toBe(1);
        expect(wrapper.find(SelectionMask).props().selectedPosition).toEqual({ idx: 0, rowIdx: 0 });
      });
    });
  });

  describe('Range selection functionality', () => {
    describe('with the cursor', () => {
      it('should update the single-cell selectedPosition on starting a selection', () => {
        const { props, wrapper } = setup();
        props.eventBus.dispatch(EventTypes.SELECT_START, { idx: 2, rowIdx: 2 });
        expect(wrapper.state('selectedPosition')).toEqual({ idx: 2, rowIdx: 2 });
      });

      it('should update the multi-cell selectedRange on starting a selection', () => {
        const { props, wrapper } = setup();
        props.eventBus.dispatch(EventTypes.SELECT_START, { idx: 2, rowIdx: 2 });
        const selectedRange = wrapper.state('selectedRange');
        expect(selectedRange.topLeft).toEqual({ idx: 2, rowIdx: 2 });
        expect(selectedRange.bottomRight).toEqual({ idx: 2, rowIdx: 2 });
        expect(selectedRange.startCell).toEqual({ idx: 2, rowIdx: 2 });
        expect(selectedRange.cursorCell).toEqual({ idx: 2, rowIdx: 2 });
      });

      describe('moving the cursor to a new cell, mid-select', () => {
        let props;
        let wrapper;

        beforeEach(() => {
          ({ props, wrapper } = setup());
          props.eventBus.dispatch(EventTypes.SELECT_START, { idx: 2, rowIdx: 2 });
        });

        it('should update topLeft (and cursor) when moving left', () => {
          props.eventBus.dispatch(EventTypes.SELECT_UPDATE, { idx: 1, rowIdx: 2 });
          const selectedRange = wrapper.state('selectedRange');
          expect(selectedRange.topLeft).toEqual({ idx: 1, rowIdx: 2 });
          expect(selectedRange.bottomRight).toEqual({ idx: 2, rowIdx: 2 });
          expect(selectedRange.startCell).toEqual({ idx: 2, rowIdx: 2 });
          expect(selectedRange.cursorCell).toEqual({ idx: 1, rowIdx: 2 });
        });

        it('should update topLeft (and cursor) when moving up', () => {
          props.eventBus.dispatch(EventTypes.SELECT_UPDATE, { idx: 2, rowIdx: 1 });
          const selectedRange = wrapper.state('selectedRange');
          expect(selectedRange.topLeft).toEqual({ idx: 2, rowIdx: 1 });
          expect(selectedRange.bottomRight).toEqual({ idx: 2, rowIdx: 2 });
          expect(selectedRange.startCell).toEqual({ idx: 2, rowIdx: 2 });
          expect(selectedRange.cursorCell).toEqual({ idx: 2, rowIdx: 1 });
        });

        it('should update bottomRight (and cursor) when moving right', () => {
          props.eventBus.dispatch(EventTypes.SELECT_UPDATE, { idx: 3, rowIdx: 2 });
          const selectedRange = wrapper.state('selectedRange');
          expect(selectedRange.topLeft).toEqual({ idx: 2, rowIdx: 2 });
          expect(selectedRange.bottomRight).toEqual({ idx: 3, rowIdx: 2 });
          expect(selectedRange.startCell).toEqual({ idx: 2, rowIdx: 2 });
          expect(selectedRange.cursorCell).toEqual({ idx: 3, rowIdx: 2 });
        });

        it('should update bottomRight (and cursor) when moving down', () => {
          props.eventBus.dispatch(EventTypes.SELECT_UPDATE, { idx: 2, rowIdx: 3 });
          const selectedRange = wrapper.state('selectedRange');
          expect(selectedRange.topLeft).toEqual({ idx: 2, rowIdx: 2 });
          expect(selectedRange.bottomRight).toEqual({ idx: 2, rowIdx: 3 });
          expect(selectedRange.startCell).toEqual({ idx: 2, rowIdx: 2 });
          expect(selectedRange.cursorCell).toEqual({ idx: 2, rowIdx: 3 });
        });
      });

      it('should not update state when moving the cursor but not mid-select', () => {
        const { props, wrapper } = setup();
        props.eventBus.dispatch(EventTypes.SELECT_UPDATE, { idx: 2, rowIdx: 2 });
        expect(wrapper.state('selectedRange').startCell).toBeUndefined();
      });

      it('should not update state when moving the cursor after a selection has ended', () => {
        const { props, wrapper } = setup();
        props.eventBus.dispatch(EventTypes.SELECT_START, { idx: 2, rowIdx: 2 });
        props.eventBus.dispatch(EventTypes.SELECT_END, { idx: 2, rowIdx: 2 });
        props.eventBus.dispatch(EventTypes.SELECT_UPDATE, { idx: 3, rowIdx: 3 });
        expect(wrapper.state('selectedRange').cursorCell).toEqual({ idx: 2, rowIdx: 2 });
      });

      it('should give focus to InteractionMasks once a selection has ended', () => {
        // We have to use mount, rather than shallow, so that InteractionMasks has a ref to it's node, used for focusing
        const { props, wrapper } = setup(undefined, undefined, mount);
        props.eventBus.dispatch(EventTypes.SELECT_START, { idx: 2, rowIdx: 2 });
        const { selectionMask } = wrapper.instance();
        spyOn(selectionMask, 'focus');
        props.eventBus.dispatch(EventTypes.SELECT_END);
        expect(selectionMask.focus).toHaveBeenCalled();
      });
    });
  });

  describe('Keyboard range selection functionality', () => {
    const selectRange = (wrapper, props, from, to) => {
      props.eventBus.dispatch(EventTypes.SELECT_START, from);
      props.eventBus.dispatch(EventTypes.SELECT_UPDATE, to);
      props.eventBus.dispatch(EventTypes.SELECT_END);
    };

    describe('when a range is already selected', () => {
      describe('when the cursor cell is not in outer bounds', () => {
        let props;
        let wrapper;

        beforeEach(() => {
          const setupResult = setup();
          props = setupResult.props;
          wrapper = setupResult.wrapper;
          selectRange(wrapper, props, { idx: 2, rowIdx: 2 }, { idx: 3, rowIdx: 3 });
        });

        it('should shrink the selection upwards on Shift+Up', () => {
          pressKey(wrapper, 'ArrowUp', { shiftKey: true });
          const selectedRange = wrapper.state('selectedRange');
          expect(selectedRange.topLeft).toEqual(objectMatching({ idx: 2, rowIdx: 2 }));
          expect(selectedRange.bottomRight).toEqual(objectMatching({ idx: 3, rowIdx: 2 }));
          expect(selectedRange.cursorCell).toEqual(objectMatching({ idx: 3, rowIdx: 2 }));
          expect(selectedRange.startCell).toEqual(objectMatching({ idx: 2, rowIdx: 2 }));
        });

        it('should shrink the selection leftwards on Shift+Left', () => {
          pressKey(wrapper, 'ArrowLeft', { shiftKey: true });
          const selectedRange = wrapper.state('selectedRange');
          expect(selectedRange.topLeft).toEqual(objectMatching({ idx: 2, rowIdx: 2 }));
          expect(selectedRange.bottomRight).toEqual(objectMatching({ idx: 2, rowIdx: 3 }));
          expect(selectedRange.cursorCell).toEqual(objectMatching({ idx: 2, rowIdx: 3 }));
          expect(selectedRange.startCell).toEqual(objectMatching({ idx: 2, rowIdx: 2 }));
        });

        it('should grow the selection downwards on Shift+Down', () => {
          pressKey(wrapper, 'ArrowDown', { shiftKey: true });
          const selectedRange = wrapper.state('selectedRange');
          expect(selectedRange.topLeft).toEqual(objectMatching({ idx: 2, rowIdx: 2 }));
          expect(selectedRange.bottomRight).toEqual(objectMatching({ idx: 3, rowIdx: 4 }));
          expect(selectedRange.cursorCell).toEqual(objectMatching({ idx: 3, rowIdx: 4 }));
          expect(selectedRange.startCell).toEqual(objectMatching({ idx: 2, rowIdx: 2 }));
        });

        it('should grow the selection rightwards on Shift+Right', () => {
          pressKey(wrapper, 'ArrowRight', { shiftKey: true });
          const selectedRange = wrapper.state('selectedRange');
          expect(selectedRange.topLeft).toEqual(objectMatching({ idx: 2, rowIdx: 2 }));
          expect(selectedRange.bottomRight).toEqual(objectMatching({ idx: 4, rowIdx: 3 }));
          expect(selectedRange.cursorCell).toEqual(objectMatching({ idx: 4, rowIdx: 3 }));
          expect(selectedRange.startCell).toEqual(objectMatching({ idx: 2, rowIdx: 2 }));
        });
      });

      describe('when the next cell is out of bounds', () => {
        it('should not grow the selection on Shift+Up', () => {
          const { props, wrapper } = setup();
          selectRange(wrapper, props, { idx: 1, rowIdx: 1 }, { idx: 0, rowIdx: 0 });
          pressKey(wrapper, 'ArrowUp', { shiftKey: true });
          const selectedRange = wrapper.state('selectedRange');
          expect(selectedRange.cursorCell).toEqual(jasmine.objectContaining({ idx: 0, rowIdx: 0 }));
        });

        it('should not grow the selection on Shift+Left', () => {
          const { props, wrapper } = setup();
          selectRange(wrapper, props, { idx: 1, rowIdx: 1 }, { idx: 0, rowIdx: 0 });
          pressKey(wrapper, 'ArrowLeft', { shiftKey: true });
          const selectedRange = wrapper.state('selectedRange');
          expect(selectedRange.cursorCell).toEqual({ idx: 0, rowIdx: 0 });
        });

        it('should not grow the selection on Shift+Right', () => {
          const { props, wrapper } = setup();
          selectRange(wrapper, props, { idx: 2, rowIdx: 2 }, { idx: NUMBER_OF_COLUMNS - 1, rowIdx: 3 });
          pressKey(wrapper, 'ArrowRight', { shiftKey: true });
          const selectedRange = wrapper.state('selectedRange');
          expect(selectedRange.cursorCell).toEqual({ idx: NUMBER_OF_COLUMNS - 1, rowIdx: 3 });
        });

        it('should not grow the selection on Shift+Down', () => {
          const { props, wrapper } = setup();
          selectRange(wrapper, props, { idx: 2, rowIdx: 2 }, { idx: 2, rowIdx: ROWS_COUNT - 1 });
          pressKey(wrapper, 'ArrowDown', { shiftKey: true });
          const selectedRange = wrapper.state('selectedRange');
          expect(selectedRange.cursorCell).toEqual({ idx: 2, rowIdx: ROWS_COUNT - 1 });
        });
      });
    });

    describe('when only a single cell is selected', () => {
      let props;
      let wrapper;

      beforeEach(() => {
        const currentCell = { idx: 2, rowIdx: 2 };
        const setupResult = setup({}, { selectedPosition: currentCell });
        props = setupResult.props;
        wrapper = setupResult.wrapper;
        props.eventBus.dispatch(EventTypes.SELECT_START, currentCell);
        props.eventBus.dispatch(EventTypes.SELECT_END);
      });

      it('should grow the selection range left on Shift+Left', () => {
        pressKey(wrapper, 'ArrowLeft', { shiftKey: true });
        const selectedRange = wrapper.state('selectedRange');
        expect(selectedRange.topLeft).toEqual(objectMatching({ idx: 1, rowIdx: 2 }));
        expect(selectedRange.bottomRight).toEqual(objectMatching({ idx: 2, rowIdx: 2 }));
        expect(selectedRange.cursorCell).toEqual(objectMatching({ idx: 1, rowIdx: 2 }));
        expect(selectedRange.startCell).toEqual(objectMatching({ idx: 2, rowIdx: 2 }));
      });

      it('should grow the selection range right on Shift+Right', () => {
        pressKey(wrapper, 'ArrowRight', { shiftKey: true });
        const selectedRange = wrapper.state('selectedRange');
        expect(selectedRange.topLeft).toEqual(objectMatching({ idx: 2, rowIdx: 2 }));
        expect(selectedRange.bottomRight).toEqual(objectMatching({ idx: 3, rowIdx: 2 }));
        expect(selectedRange.cursorCell).toEqual(objectMatching({ idx: 3, rowIdx: 2 }));
        expect(selectedRange.startCell).toEqual(objectMatching({ idx: 2, rowIdx: 2 }));
      });

      it('should grow the selection range up on Shift+Up', () => {
        pressKey(wrapper, 'ArrowUp', { shiftKey: true });
        const selectedRange = wrapper.state('selectedRange');
        expect(selectedRange.topLeft).toEqual(objectMatching({ idx: 2, rowIdx: 1 }));
        expect(selectedRange.bottomRight).toEqual(objectMatching({ idx: 2, rowIdx: 2 }));
        expect(selectedRange.cursorCell).toEqual(objectMatching({ idx: 2, rowIdx: 1 }));
        expect(selectedRange.startCell).toEqual(objectMatching({ idx: 2, rowIdx: 2 }));
      });

      it('should grow the selection range down on Shift+Down', () => {
        pressKey(wrapper, 'ArrowDown', { shiftKey: true });
        const selectedRange = wrapper.state('selectedRange');
        expect(selectedRange.topLeft).toEqual(objectMatching({ idx: 2, rowIdx: 2 }));
        expect(selectedRange.bottomRight).toEqual(objectMatching({ idx: 2, rowIdx: 3 }));
        expect(selectedRange.cursorCell).toEqual(objectMatching({ idx: 2, rowIdx: 3 }));
        expect(selectedRange.startCell).toEqual(objectMatching({ idx: 2, rowIdx: 2 }));
      });
    });

    describe('when no range has ever been selected', () => {
      let wrapper;

      beforeEach(() => {
        const currentCell = { idx: 0, rowIdx: 0 };
        const setupResult = setup({}, { selectedPosition: currentCell });
        wrapper = setupResult.wrapper;
      });

      it('should grow the selection range right on Shift+Right', () => {
        pressKey(wrapper, 'ArrowRight', { shiftKey: true });
        const selectedRange = wrapper.state('selectedRange');
        expect(selectedRange.topLeft).toEqual(objectMatching({ idx: 0, rowIdx: 0 }));
        expect(selectedRange.bottomRight).toEqual(objectMatching({ idx: 1, rowIdx: 0 }));
        expect(selectedRange.cursorCell).toEqual(objectMatching({ idx: 1, rowIdx: 0 }));
        expect(selectedRange.startCell).toEqual(objectMatching({ idx: 0, rowIdx: 0 }));
      });

      it('should grow the selection range down on Shift+Down', () => {
        pressKey(wrapper, 'ArrowDown', { shiftKey: true });
        const selectedRange = wrapper.state('selectedRange');
        expect(selectedRange.topLeft).toEqual(objectMatching({ idx: 0, rowIdx: 0 }));
        expect(selectedRange.bottomRight).toEqual(objectMatching({ idx: 0, rowIdx: 1 }));
        expect(selectedRange.cursorCell).toEqual(objectMatching({ idx: 0, rowIdx: 1 }));
        expect(selectedRange.startCell).toEqual(objectMatching({ idx: 0, rowIdx: 0 }));
      });
    });
  });

  describe('Range selection events', () => {
    it('should fire onCellRangeSelectionStarted on starting a selection', () => {
      const { props } = setup();
      props.eventBus.dispatch(EventTypes.SELECT_START, { idx: 2, rowIdx: 2 });
      expect(props.onCellRangeSelectionStarted).toHaveBeenCalledWith(jasmine.objectContaining({
        topLeft: { idx: 2, rowIdx: 2 },
        bottomRight: { idx: 2, rowIdx: 2 }
      }));
    });

    it('should fire onCellRangeSelectionUpdated on updating a selection', () => {
      const { props } = setup();
      props.eventBus.dispatch(EventTypes.SELECT_START, { idx: 2, rowIdx: 2 });
      props.eventBus.dispatch(EventTypes.SELECT_UPDATE, { idx: 3, rowIdx: 3 });
      expect(props.onCellRangeSelectionUpdated).toHaveBeenCalledWith(jasmine.objectContaining({
        topLeft: { idx: 2, rowIdx: 2 },
        bottomRight: { idx: 3, rowIdx: 3 }
      }));
    });

    it('should fire onCellRangeSelectionCompleted on completing a selection', () => {
      const { props } = setup();
      props.eventBus.dispatch(EventTypes.SELECT_START, { idx: 2, rowIdx: 2 });
      props.eventBus.dispatch(EventTypes.SELECT_UPDATE, { idx: 3, rowIdx: 3 });
      props.eventBus.dispatch(EventTypes.SELECT_END);
      expect(props.onCellRangeSelectionCompleted).toHaveBeenCalled();
    });

    it('should fire onCellRangeSelectionUpdated and onCRSCompleted on modifying a selection via they keyboard', () => {
      const currentCell = { idx: 0, rowIdx: 0 };
      const { wrapper, props } = setup({}, { selectedPosition: currentCell });
      pressKey(wrapper, 'ArrowRight', { shiftKey: true });
      expect(props.onCellRangeSelectionUpdated).toHaveBeenCalledWith(jasmine.objectContaining({
        topLeft: { idx: 0, rowIdx: 0 },
        bottomRight: { idx: 1, rowIdx: 0 }
      }));
      expect(props.onCellRangeSelectionCompleted).toHaveBeenCalled();
    });
  });

  describe('Keyboard navigation functionality', () => {
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
        expect(wrapper.state().selectedPosition).toEqual(objectMatching({ idx: 1, rowIdx: 0 }));
      });

      it('Press arrow right should move right', () => {
        const currentCell = { idx: 0, rowIdx: 0 };
        const { wrapper } = setup({}, { selectedPosition: currentCell });
        pressKey(wrapper, 'ArrowRight');
        expect(wrapper.state().selectedPosition).toEqual(objectMatching({ idx: 1, rowIdx: 0 }));
      });

      it('Press arrow down should move down', () => {
        const currentCell = { idx: 0, rowIdx: 0 };
        const { wrapper } = setup({}, { selectedPosition: currentCell });
        pressKey(wrapper, 'ArrowDown');
        expect(wrapper.state().selectedPosition).toEqual(objectMatching({ idx: 0, rowIdx: 1 }));
      });

      it('Press arrow left should move left', () => {
        const currentCell = { idx: 1, rowIdx: 0 };
        const { wrapper } = setup({}, { selectedPosition: currentCell });
        pressKey(wrapper, 'ArrowLeft');
        expect(wrapper.state().selectedPosition).toEqual(objectMatching({ idx: 0, rowIdx: 0 }));
      });

      it('Press tab should move right', () => {
        const currentCell = { idx: 0, rowIdx: 0 };
        const { wrapper } = setup({}, { selectedPosition: currentCell });
        pressKey(wrapper, 'Tab', { keyCode: keyCodes.Tab });
        expect(wrapper.state().selectedPosition).toEqual(objectMatching({ idx: 1, rowIdx: 0 }));
      });

      it('Press shiftKey + tab should move left', () => {
        const currentCell = { idx: 1, rowIdx: 0 };
        const { wrapper } = setup({}, { selectedPosition: currentCell });
        pressKey(wrapper, 'Tab', { keyCode: keyCodes.Tab, shiftKey: true });
        expect(wrapper.state().selectedPosition).toEqual(objectMatching({ idx: 0, rowIdx: 0 }));
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
              expect(props.onCellSelected).toHaveBeenCalledWith(objectMatching({ rowIdx: 2, idx: 3 }));
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
              const { wrapper, props } = setupCellSelectionTest({ rowIdx: ROWS_COUNT - 1, idx: 9 });
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
            .toEqual(objectMatching({ rowIdx: 3, idx: 4, changeRowOrColumn: false }));
        });
        it('goes to the beginning of the next row when the user presses Tab and they are at the end of a row', () => {
          const selectedPosition = { rowIdx: 2, idx: NUMBER_OF_COLUMNS - 1 };
          assertSelectedCellOnTab({ cellNavigationMode }, false, { selectedPosition })
            .toEqual({ rowIdx: 3, idx: 0, changeRowOrColumn: true });
        });
        it('goes to the previous cell when the user presses Shift+Tab and they are not at the beginning of a row', () => {
          const selectedPosition = { rowIdx: 2, idx: 2 };
          assertSelectedCellOnTab({ cellNavigationMode }, true, { selectedPosition })
            .toEqual({ rowIdx: 2, idx: 1, changeRowOrColumn: false });
        });
        it('goes to the end of the previous row when the user presses Shift+Tab and they are at the beginning of a row', () => {
          const selectedPosition = { rowIdx: 2, idx: 0 };
          assertSelectedCellOnTab({ cellNavigationMode }, true, { selectedPosition })
            .toEqual({ rowIdx: 1, idx: NUMBER_OF_COLUMNS - 1, changeRowOrColumn: true });
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
            .toEqual({ rowIdx: 3, idx: 4, changeRowOrColumn: false });
        });
        it('goes to the first cell of the next row when they press Tab and they are at the end of a row', () => {
          const selectedPosition = { rowIdx: 3, idx: NUMBER_OF_COLUMNS - 1 };
          assertSelectedCellOnTab({ cellNavigationMode }, false, { selectedPosition })
            .toEqual(objectMatching({ rowIdx: 4, idx: 0 }));
        });
        it('goes to the previous cell when the user presses Shift+Tab and they are not at the beginning of a row', () => {
          const selectedPosition = { rowIdx: 2, idx: 2 };
          assertSelectedCellOnTab({ cellNavigationMode }, true, { selectedPosition })
            .toEqual(objectMatching({ rowIdx: 2, idx: 1 }));
        });
        it('goes to the last cell of the previous row when they press Shift+Tab and they are at the beginning of a row', () => {
          const selectedPosition = { rowIdx: 3, idx: 0 };
          assertSelectedCellOnTab({ cellNavigationMode }, true, { selectedPosition })
            .toEqual(objectMatching({ rowIdx: 2, idx: NUMBER_OF_COLUMNS - 1 }));
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
            .toEqual(objectMatching({ rowIdx: ROWS_COUNT - 1, idx: 0 }));
        });
        it('goes to the last cell in the row when the user presses Shift+Tab and they are at the beginning of a row', () => {
          const selectedPosition = { rowIdx: 0, idx: 0 };
          assertSelectedCellOnTab({ cellNavigationMode }, true, { selectedPosition })
            .toEqual({ rowIdx: 0, idx: NUMBER_OF_COLUMNS - 1, changeRowOrColumn: true });
        });
        it('goes to the next cell when the user presses Tab and they are not at the end of a row', () => {
          const selectedPosition = { rowIdx: 3, idx: 3 };
          assertSelectedCellOnTab({ cellNavigationMode }, false, { selectedPosition })
            .toEqual({ rowIdx: 3, idx: 4, changeRowOrColumn: false });
        });
        it('goes to the previous cell when the user presses Shift+Tab and they are not at the beginning of a row', () => {
          const selectedPosition = { rowIdx: 2, idx: 2 };
          assertSelectedCellOnTab({ cellNavigationMode }, true, { selectedPosition })
            .toEqual(objectMatching({ rowIdx: 2, idx: 1 }));
        });
      });
    });
  });

  describe('Copy functionality', () => {
    const setupCopy = () => {
      const selectedPosition = { idx: 1, rowIdx: 2 };
      const rows = [
        { Column1: '1' },
        { Column1: '2' },
        { Column1: '3' }
      ];
      return setup({
        rowGetter: (rowIdx) => rowIdx < 3 ? rows[rowIdx] : rowGetter(rowIdx)
      }, { selectedPosition });
    };

    it('should not render a CopyMask component if there is no copied cell', () => {
      const { wrapper } = setupCopy();
      expect(wrapper.find(CopyMask).length).toBe(0);
    });

    it('should render a CopyMask component when a cell is copied', () => {
      const { wrapper } = setupCopy();
      pressKey(wrapper, 'c', { keyCode: keyCodes.c, ctrlKey: true });
      expect(wrapper.find(CopyMask).props().copiedPosition).toEqual({ idx: 1, rowIdx: 2, value: '3' });
    });

    it('should remove the CopyMask component on escape', () => {
      const { wrapper } = setupCopy();
      pressKey(wrapper, 'c', { keyCode: keyCodes.c, ctrlKey: true });
      pressKey(wrapper, 'Escape', { keyCode: keyCodes.Escape });
      expect(wrapper.find(CopyMask).length).toBe(0);
    });

    it('should update the selected cell with the copied value on paste', () => {
      const { wrapper, props } = setupCopy();
      // Copy selected cell
      pressKey(wrapper, 'c', { keyCode: keyCodes.c, ctrlKey: true });
      // Move up
      pressKey(wrapper, 'ArrowUp');
      // Paste copied cell
      pressKey(wrapper, 'v', { keyCode: keyCodes.v, ctrlKey: true });

      expect(props.onGridRowsUpdated).toHaveBeenCalledWith('Column1', 1, 1, { Column1: '3' }, UpdateActions.COPY_PASTE, 2);
    });
  });

  describe('Drag functionality', () => {
    const setupDrag = () => {
      const selectedPosition = { idx: 1, rowIdx: 2 };
      const rows = [
        { Column1: '1' },
        { Column1: '2' },
        { Column1: '3' }
      ];
      return setup({
        rowGetter: (rowIdx) => rowIdx < 3 ? rows[rowIdx] : rowGetter(rowIdx)
      }, { selectedPosition });
    };

    it('should not render the DragMask component if drag has not started', () => {
      const { wrapper } = setupDrag();

      expect(wrapper.find(DragMask).length).toBe(0);
    });

    it('should render the DragMask component on cell drag', () => {
      const { wrapper } = setupDrag();
      const setData = jasmine.createSpy();
      wrapper.find(DragHandle).simulate('dragstart', {
        target: { className: 'test' },
        dataTransfer: { setData }
      });

      expect(wrapper.find(DragMask).length).toBe(1);
      expect(setData).toHaveBeenCalled();
    });

    it('should update the dragged over cells on drag end', () => {
      const { wrapper, props } = setupDrag();
      const setData = jasmine.createSpy();
      wrapper.find(DragHandle).simulate('dragstart', {
        target: { className: 'test' },
        dataTransfer: { setData }
      });
      props.eventBus.dispatch(EventTypes.DRAG_ENTER, { overRowIdx: 6 });
      wrapper.find(DragHandle).simulate('dragEnd');

      expect(props.onGridRowsUpdated).toHaveBeenCalledWith('Column1', 2, 6, { Column1: '3' }, UpdateActions.CELL_DRAG);
    });
  });

  describe('ContextMenu functionality', () => {
    it('should render the context menu if it a valid element', () => {
      const FakeContextMenu = <div data-test="context-menu">Context Menu</div>;
      const { wrapper } = setup({ contextMenu: FakeContextMenu }, { selectedPosition: { idx: 1, rowIdx: 2 } });

      expect(wrapper.find(sel('context-menu')).props())
        .toEqual(jasmine.objectContaining({ idx: 1, rowIdx: 2 }));
    });
  });
});
