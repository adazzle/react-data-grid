import React from 'react';
import { shallow, mount } from 'enzyme';

import InteractionMasks, { InteractionMasksProps, InteractionMasksState, KeyCodes } from '../InteractionMasks';
import SelectionMask from '../SelectionMask';
import SelectionRangeMask from '../SelectionRangeMask';
import CopyMask from '../CopyMask';
import DragMask from '../DragMask';
import DragHandle from '../DragHandle';
import EventBus from '../../EventBus';
import EditorContainer from '../../common/editors/EditorContainer';
import { sel, createColumns } from '../../__tests__/utils';
import { CellNavigationMode, EventTypes, UpdateActions } from '../../common/enums';
import { Position } from '../../common/types';

const NUMBER_OF_COLUMNS = 10;
const ROWS_COUNT = 5;
const columns = createColumns(NUMBER_OF_COLUMNS);

interface Row {
  [key: string]: React.ReactNode;
}

describe('<InteractionMasks/>', () => {
  const rowGetter = () => ({ col1: 1 });

  function setup<K extends keyof InteractionMasksState>(overrideProps?: Partial<InteractionMasksProps<Row, 'id'>>, initialState?: Pick<InteractionMasksState, K>, isMount = false) {
    const onCellSelected = jest.fn();
    const props: InteractionMasksProps<Row, 'id'> = {
      height: 100,
      colVisibleStartIdx: 0,
      colVisibleEndIdx: 10,
      columns,
      rowHeight: 30,
      rowsCount: ROWS_COUNT,
      onHitBottomBoundary: jest.fn(),
      onHitTopBoundary: jest.fn(),
      onHitRightBoundary: jest.fn(),
      onHitLeftBoundary: jest.fn(),
      onCellSelected,
      onCellDeSelected: jest.fn(),
      onCellRangeSelectionStarted: jest.fn(),
      onCellRangeSelectionUpdated: jest.fn(),
      onCellRangeSelectionCompleted: jest.fn(),
      onGridRowsUpdated: jest.fn(),
      onDragHandleDoubleClick() { },
      onCommit() { },
      rowGetter,
      enableCellSelect: true,
      enableCellAutoFocus: false,
      cellNavigationMode: CellNavigationMode.NONE,
      eventBus: new EventBus(),
      getRowColumns: () => columns,
      editorPortalTarget: document.body,
      scrollLeft: 0,
      scrollTop: 0,
      ...overrideProps
    };

    if (isMount) {
      const wrapper = mount<InteractionMasks<Row, 'id'>>(<InteractionMasks {...props} />);
      initialState && wrapper.setState(initialState);
      onCellSelected.mockReset();
      return { wrapper, props };
    }

    const wrapper = shallow<InteractionMasks<Row, 'id'>>(<InteractionMasks {...props} />, { disableLifecycleMethods: false });
    initialState && wrapper.setState(initialState);
    onCellSelected.mockReset();
    return { wrapper, props };
  }

  const pressKey = (wrapper: ReturnType<typeof setup>['wrapper'], key: string, eventData?: Partial<React.KeyboardEvent>) => {
    wrapper.simulate('keydown', { key, preventDefault: () => null, ...eventData });
  };

  const simulateTab = (wrapper: ReturnType<typeof setup>['wrapper'], shiftKey = false, preventDefault = () => { }) => {
    pressKey(wrapper, 'Tab', { keyCode: KeyCodes.Tab, shiftKey, preventDefault });
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
            bottomRight: { idx: 1, rowIdx: 1 },
            startCell: { idx: 0, rowIdx: 0 },
            cursorCell: null,
            isDragging: false
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
            startCell: { idx: 0, rowIdx: 0 },
            cursorCell: null,
            isDragging: false
          }
        });
        expect(wrapper.find(SelectionMask).length).toBe(1);
        expect(wrapper.find(SelectionMask).props()).toEqual({ height: 30, left: 0, top: 0, width: 100, zIndex: 1 });
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
        function innerSetup() {
          const { props, wrapper } = setup();
          props.eventBus.dispatch(EventTypes.SELECT_START, { idx: 2, rowIdx: 2 });
          return { props, wrapper };
        }

        it('should update topLeft (and cursor) when moving left', () => {
          const { props, wrapper } = innerSetup();
          props.eventBus.dispatch(EventTypes.SELECT_UPDATE, { idx: 1, rowIdx: 2 });
          const selectedRange = wrapper.state('selectedRange');
          expect(selectedRange.topLeft).toEqual({ idx: 1, rowIdx: 2 });
          expect(selectedRange.bottomRight).toEqual({ idx: 2, rowIdx: 2 });
          expect(selectedRange.startCell).toEqual({ idx: 2, rowIdx: 2 });
          expect(selectedRange.cursorCell).toEqual({ idx: 1, rowIdx: 2 });
        });

        it('should update topLeft (and cursor) when moving up', () => {
          const { props, wrapper } = innerSetup();
          props.eventBus.dispatch(EventTypes.SELECT_UPDATE, { idx: 2, rowIdx: 1 });
          const selectedRange = wrapper.state('selectedRange');
          expect(selectedRange.topLeft).toEqual({ idx: 2, rowIdx: 1 });
          expect(selectedRange.bottomRight).toEqual({ idx: 2, rowIdx: 2 });
          expect(selectedRange.startCell).toEqual({ idx: 2, rowIdx: 2 });
          expect(selectedRange.cursorCell).toEqual({ idx: 2, rowIdx: 1 });
        });

        it('should update bottomRight (and cursor) when moving right', () => {
          const { props, wrapper } = innerSetup();
          props.eventBus.dispatch(EventTypes.SELECT_UPDATE, { idx: 3, rowIdx: 2 });
          const selectedRange = wrapper.state('selectedRange');
          expect(selectedRange.topLeft).toEqual({ idx: 2, rowIdx: 2 });
          expect(selectedRange.bottomRight).toEqual({ idx: 3, rowIdx: 2 });
          expect(selectedRange.startCell).toEqual({ idx: 2, rowIdx: 2 });
          expect(selectedRange.cursorCell).toEqual({ idx: 3, rowIdx: 2 });
        });

        it('should update bottomRight (and cursor) when moving down', () => {
          const { props, wrapper } = innerSetup();
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
        expect(wrapper.state('selectedRange').startCell).toBeNull();
      });

      it('should not update state when moving the cursor after a selection has ended', () => {
        const { props, wrapper } = setup();
        props.eventBus.dispatch(EventTypes.SELECT_START, { idx: 2, rowIdx: 2 });
        props.eventBus.dispatch(EventTypes.SELECT_END);
        props.eventBus.dispatch(EventTypes.SELECT_UPDATE, { idx: 3, rowIdx: 3 });
        expect(wrapper.state('selectedRange').cursorCell).toEqual({ idx: 2, rowIdx: 2 });
      });

      it('should give focus to InteractionMasks once a selection has ended', () => {
        // We have to use mount, rather than shallow, so that InteractionMasks has a ref to it's node, used for focusing
        const { wrapper, props } = setup(undefined, undefined, true);
        props.eventBus.dispatch(EventTypes.SELECT_START, { idx: 2, rowIdx: 2 });
        jest.spyOn(wrapper.instance(), 'focus').mockImplementation(() => { });
        props.eventBus.dispatch(EventTypes.SELECT_END);
        expect(wrapper.instance().focus).toHaveBeenCalled();
      });
    });
  });

  describe('Keyboard range selection functionality', () => {
    const selectRange = (eventBus: EventBus, from: Position, to: Position) => {
      eventBus.dispatch(EventTypes.SELECT_START, from);
      eventBus.dispatch(EventTypes.SELECT_UPDATE, to);
      eventBus.dispatch(EventTypes.SELECT_END);
    };

    describe('when a range is already selected', () => {
      describe('when the cursor cell is not in outer bounds', () => {
        function innerSetup() {
          const setupResult = setup();
          selectRange(setupResult.props.eventBus, { idx: 2, rowIdx: 2 }, { idx: 3, rowIdx: 3 });
          return setupResult;
        }

        it('should shrink the selection upwards on Shift+Up', () => {
          const { wrapper } = innerSetup();
          pressKey(wrapper, 'ArrowUp', { shiftKey: true });
          const selectedRange = wrapper.state('selectedRange');
          expect(selectedRange.topLeft).toMatchObject({ idx: 2, rowIdx: 2 });
          expect(selectedRange.bottomRight).toMatchObject({ idx: 3, rowIdx: 2 });
          expect(selectedRange.cursorCell).toMatchObject({ idx: 3, rowIdx: 2 });
          expect(selectedRange.startCell).toMatchObject({ idx: 2, rowIdx: 2 });
        });

        it('should shrink the selection leftwards on Shift+Left', () => {
          const { wrapper } = innerSetup();
          pressKey(wrapper, 'ArrowLeft', { shiftKey: true });
          const selectedRange = wrapper.state('selectedRange');
          expect(selectedRange.topLeft).toMatchObject({ idx: 2, rowIdx: 2 });
          expect(selectedRange.bottomRight).toMatchObject({ idx: 2, rowIdx: 3 });
          expect(selectedRange.cursorCell).toMatchObject({ idx: 2, rowIdx: 3 });
          expect(selectedRange.startCell).toMatchObject({ idx: 2, rowIdx: 2 });
        });

        it('should grow the selection downwards on Shift+Down', () => {
          const { wrapper } = innerSetup();
          pressKey(wrapper, 'ArrowDown', { shiftKey: true });
          const selectedRange = wrapper.state('selectedRange');
          expect(selectedRange.topLeft).toMatchObject({ idx: 2, rowIdx: 2 });
          expect(selectedRange.bottomRight).toMatchObject({ idx: 3, rowIdx: 4 });
          expect(selectedRange.cursorCell).toMatchObject({ idx: 3, rowIdx: 4 });
          expect(selectedRange.startCell).toMatchObject({ idx: 2, rowIdx: 2 });
        });

        it('should grow the selection rightwards on Shift+Right', () => {
          const { wrapper } = innerSetup();
          pressKey(wrapper, 'ArrowRight', { shiftKey: true });
          const selectedRange = wrapper.state('selectedRange');
          expect(selectedRange.topLeft).toMatchObject({ idx: 2, rowIdx: 2 });
          expect(selectedRange.bottomRight).toMatchObject({ idx: 4, rowIdx: 3 });
          expect(selectedRange.cursorCell).toMatchObject({ idx: 4, rowIdx: 3 });
          expect(selectedRange.startCell).toMatchObject({ idx: 2, rowIdx: 2 });
        });
      });

      describe('when the next cell is out of bounds', () => {
        it('should not grow the selection on Shift+Up', () => {
          const { props, wrapper } = setup();
          selectRange(props.eventBus, { idx: 1, rowIdx: 1 }, { idx: 0, rowIdx: 0 });
          pressKey(wrapper, 'ArrowUp', { shiftKey: true });
          const selectedRange = wrapper.state('selectedRange');
          expect(selectedRange.cursorCell).toMatchObject({ idx: 0, rowIdx: 0 });
        });

        it('should not grow the selection on Shift+Left', () => {
          const { props, wrapper } = setup();
          selectRange(props.eventBus, { idx: 1, rowIdx: 1 }, { idx: 0, rowIdx: 0 });
          pressKey(wrapper, 'ArrowLeft', { shiftKey: true });
          const selectedRange = wrapper.state('selectedRange');
          expect(selectedRange.cursorCell).toEqual({ idx: 0, rowIdx: 0 });
        });

        it('should not grow the selection on Shift+Right', () => {
          const { props, wrapper } = setup();
          selectRange(props.eventBus, { idx: 2, rowIdx: 2 }, { idx: NUMBER_OF_COLUMNS - 1, rowIdx: 3 });
          pressKey(wrapper, 'ArrowRight', { shiftKey: true });
          const selectedRange = wrapper.state('selectedRange');
          expect(selectedRange.cursorCell).toEqual({ idx: NUMBER_OF_COLUMNS - 1, rowIdx: 3 });
        });

        it('should not grow the selection on Shift+Down', () => {
          const { props, wrapper } = setup();
          selectRange(props.eventBus, { idx: 2, rowIdx: 2 }, { idx: 2, rowIdx: ROWS_COUNT - 1 });
          pressKey(wrapper, 'ArrowDown', { shiftKey: true });
          const selectedRange = wrapper.state('selectedRange');
          expect(selectedRange.cursorCell).toEqual({ idx: 2, rowIdx: ROWS_COUNT - 1 });
        });
      });
    });

    describe('when only a single cell is selected', () => {
      function innerSetup() {
        const currentCell = { idx: 2, rowIdx: 2 };
        const setupResult = setup({}, { selectedPosition: currentCell });
        setupResult.props.eventBus.dispatch(EventTypes.SELECT_START, currentCell);
        setupResult.props.eventBus.dispatch(EventTypes.SELECT_END);
        return setupResult;
      }

      it('should grow the selection range left on Shift+Left', () => {
        const { wrapper } = innerSetup();
        pressKey(wrapper, 'ArrowLeft', { shiftKey: true });
        const selectedRange = wrapper.state('selectedRange');
        expect(selectedRange.topLeft).toMatchObject({ idx: 1, rowIdx: 2 });
        expect(selectedRange.bottomRight).toMatchObject({ idx: 2, rowIdx: 2 });
        expect(selectedRange.cursorCell).toMatchObject({ idx: 1, rowIdx: 2 });
        expect(selectedRange.startCell).toMatchObject({ idx: 2, rowIdx: 2 });
      });

      it('should grow the selection range right on Shift+Right', () => {
        const { wrapper } = innerSetup();
        pressKey(wrapper, 'ArrowRight', { shiftKey: true });
        const selectedRange = wrapper.state('selectedRange');
        expect(selectedRange.topLeft).toMatchObject({ idx: 2, rowIdx: 2 });
        expect(selectedRange.bottomRight).toMatchObject({ idx: 3, rowIdx: 2 });
        expect(selectedRange.cursorCell).toMatchObject({ idx: 3, rowIdx: 2 });
        expect(selectedRange.startCell).toMatchObject({ idx: 2, rowIdx: 2 });
      });

      it('should grow the selection range up on Shift+Up', () => {
        const { wrapper } = innerSetup();
        pressKey(wrapper, 'ArrowUp', { shiftKey: true });
        const selectedRange = wrapper.state('selectedRange');
        expect(selectedRange.topLeft).toMatchObject({ idx: 2, rowIdx: 1 });
        expect(selectedRange.bottomRight).toMatchObject({ idx: 2, rowIdx: 2 });
        expect(selectedRange.cursorCell).toMatchObject({ idx: 2, rowIdx: 1 });
        expect(selectedRange.startCell).toMatchObject({ idx: 2, rowIdx: 2 });
      });

      it('should grow the selection range down on Shift+Down', () => {
        const { wrapper } = innerSetup();
        pressKey(wrapper, 'ArrowDown', { shiftKey: true });
        const selectedRange = wrapper.state('selectedRange');
        expect(selectedRange.topLeft).toMatchObject({ idx: 2, rowIdx: 2 });
        expect(selectedRange.bottomRight).toMatchObject({ idx: 2, rowIdx: 3 });
        expect(selectedRange.cursorCell).toMatchObject({ idx: 2, rowIdx: 3 });
        expect(selectedRange.startCell).toMatchObject({ idx: 2, rowIdx: 2 });
      });
    });

    describe('when no range has ever been selected', () => {
      function innerSetup() {
        const currentCell = { idx: 0, rowIdx: 0 };
        return setup({}, { selectedPosition: currentCell });
      }

      it('should grow the selection range right on Shift+Right', () => {
        const { wrapper } = innerSetup();
        pressKey(wrapper, 'ArrowRight', { shiftKey: true });
        const selectedRange = wrapper.state('selectedRange');
        expect(selectedRange.topLeft).toMatchObject({ idx: 0, rowIdx: 0 });
        expect(selectedRange.bottomRight).toMatchObject({ idx: 1, rowIdx: 0 });
        expect(selectedRange.cursorCell).toMatchObject({ idx: 1, rowIdx: 0 });
        expect(selectedRange.startCell).toMatchObject({ idx: 0, rowIdx: 0 });
      });

      it('should grow the selection range down on Shift+Down', () => {
        const { wrapper } = innerSetup();
        pressKey(wrapper, 'ArrowDown', { shiftKey: true });
        const selectedRange = wrapper.state('selectedRange');
        expect(selectedRange.topLeft).toMatchObject({ idx: 0, rowIdx: 0 });
        expect(selectedRange.bottomRight).toMatchObject({ idx: 0, rowIdx: 1 });
        expect(selectedRange.cursorCell).toMatchObject({ idx: 0, rowIdx: 1 });
        expect(selectedRange.startCell).toMatchObject({ idx: 0, rowIdx: 0 });
      });
    });
  });

  describe('Range selection events', () => {
    it('should fire onCellRangeSelectionStarted on starting a selection', () => {
      const { props } = setup();
      props.eventBus.dispatch(EventTypes.SELECT_START, { idx: 2, rowIdx: 2 });
      expect(props.onCellRangeSelectionStarted).toHaveBeenCalledWith(expect.objectContaining({
        topLeft: { idx: 2, rowIdx: 2 },
        bottomRight: { idx: 2, rowIdx: 2 }
      }));
    });

    it('should fire onCellRangeSelectionUpdated on updating a selection', () => {
      const { props } = setup();
      props.eventBus.dispatch(EventTypes.SELECT_START, { idx: 2, rowIdx: 2 });
      props.eventBus.dispatch(EventTypes.SELECT_UPDATE, { idx: 3, rowIdx: 3 });
      expect(props.onCellRangeSelectionUpdated).toHaveBeenCalledWith(expect.objectContaining({
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
      expect(props.onCellRangeSelectionUpdated).toHaveBeenCalledWith(expect.objectContaining({
        topLeft: { idx: 0, rowIdx: 0 },
        bottomRight: { idx: 1, rowIdx: 0 }
      }));
      expect(props.onCellRangeSelectionCompleted).toHaveBeenCalled();
    });
  });

  describe('Keyboard navigation functionality', () => {
    it('Press enter should enable editing', () => {
      const { wrapper } = setup({}, { selectedPosition: { idx: 0, rowIdx: 0 } });
      pressKey(wrapper, 'Enter', { keyCode: KeyCodes.Enter });
      expect(wrapper.find(EditorContainer).length).toBe(1);
    });

    describe('When current selected cell is not in outer bounds', () => {
      it('Press arrow up should move up', () => {
        const currentCell = { idx: 0, rowIdx: 0 };
        const { wrapper } = setup({}, { selectedPosition: currentCell });
        pressKey(wrapper, 'ArrowRight');
        expect(wrapper.state().selectedPosition).toMatchObject({ idx: 1, rowIdx: 0 });
      });

      it('Press arrow right should move right', () => {
        const currentCell = { idx: 0, rowIdx: 0 };
        const { wrapper } = setup({}, { selectedPosition: currentCell });
        pressKey(wrapper, 'ArrowRight');
        expect(wrapper.state().selectedPosition).toMatchObject({ idx: 1, rowIdx: 0 });
      });

      it('Press arrow down should move down', () => {
        const currentCell = { idx: 0, rowIdx: 0 };
        const { wrapper } = setup({}, { selectedPosition: currentCell });
        pressKey(wrapper, 'ArrowDown');
        expect(wrapper.state().selectedPosition).toMatchObject({ idx: 0, rowIdx: 1 });
      });

      it('Press arrow left should move left', () => {
        const currentCell = { idx: 1, rowIdx: 0 };
        const { wrapper } = setup({}, { selectedPosition: currentCell });
        pressKey(wrapper, 'ArrowLeft');
        expect(wrapper.state().selectedPosition).toMatchObject({ idx: 0, rowIdx: 0 });
      });

      it('Press tab should move right', () => {
        const currentCell = { idx: 0, rowIdx: 0 };
        const { wrapper } = setup({}, { selectedPosition: currentCell });
        pressKey(wrapper, 'Tab', { keyCode: KeyCodes.Tab });
        expect(wrapper.state().selectedPosition).toMatchObject({ idx: 1, rowIdx: 0 });
      });

      it('Press shiftKey + tab should move left', () => {
        const currentCell = { idx: 1, rowIdx: 0 };
        const { wrapper } = setup({}, { selectedPosition: currentCell });
        pressKey(wrapper, 'Tab', { keyCode: KeyCodes.Tab, shiftKey: true });
        expect(wrapper.state().selectedPosition).toMatchObject({ idx: 0, rowIdx: 0 });
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
        const setupCellSelectionTest = (initialCell: Position = { rowIdx: 2, idx: 2 }) => {
          return {
            ...setup({}, { selectedPosition: initialCell }, true),
            initialCell
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
              expect(props.onCellSelected).toHaveBeenCalledWith(expect.objectContaining({ rowIdx: 2, idx: 3 }));
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

      const assertGridWasExited = (wrapper: ReturnType<typeof setup>['wrapper']) => {
        expect(wrapper.state().selectedPosition).toEqual({ idx: -1, rowIdx: -1 });
      };

      const tabCell = <K extends keyof InteractionMasksState>(props: Partial<InteractionMasksProps<Row, 'id'>>, shiftKey?: boolean, state?: Pick<InteractionMasksState, K>) => {
        const { wrapper } = setup(props, state);
        const preventDefaultSpy = jest.fn();
        simulateTab(wrapper, shiftKey, preventDefaultSpy);
        return { wrapper, preventDefaultSpy };
      };

      const assertExitGridOnTab = <K extends keyof InteractionMasksState>(props: Partial<InteractionMasksProps<Row, 'id'>>, shiftKey?: boolean, state?: Pick<InteractionMasksState, K>) => {
        const { wrapper, preventDefaultSpy } = tabCell(props, shiftKey, state);
        expect(preventDefaultSpy).not.toHaveBeenCalled();
        assertGridWasExited(wrapper);
      };

      const assertSelectedCellOnTab = <K extends keyof InteractionMasksState>(props: Partial<InteractionMasksProps<Row, 'id'>>, shiftKey?: boolean, state?: Pick<InteractionMasksState, K>) => {
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
            .toMatchObject({ rowIdx: 3, idx: 4, changeRowOrColumn: false });
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
            .toMatchObject({ rowIdx: 4, idx: 0 });
        });
        it('goes to the previous cell when the user presses Shift+Tab and they are not at the beginning of a row', () => {
          const selectedPosition = { rowIdx: 2, idx: 2 };
          assertSelectedCellOnTab({ cellNavigationMode }, true, { selectedPosition })
            .toMatchObject({ rowIdx: 2, idx: 1 });
        });
        it('goes to the last cell of the previous row when they press Shift+Tab and they are at the beginning of a row', () => {
          const selectedPosition = { rowIdx: 3, idx: 0 };
          assertSelectedCellOnTab({ cellNavigationMode }, true, { selectedPosition })
            .toMatchObject({ rowIdx: 2, idx: NUMBER_OF_COLUMNS - 1 });
        });
      });

      describe('when cellNavigationMode is loopOverRow', () => {
        const cellNavigationMode = CellNavigationMode.LOOP_OVER_ROW;
        it('allows the user to exit the grid with Tab if there are no rows', () => {
          assertExitGridOnTab({ cellNavigationMode, rowsCount: 0 });
        });
        it('allows the user to exit the grid with Shift+Tab if there are no rows', () => {
          assertExitGridOnTab({ cellNavigationMode, rowsCount: 0 }, true);
        });
        it('goes to the first cell in the row when the user presses Tab and they are at the end of a row', () => {
          const selectedPosition = { rowIdx: ROWS_COUNT - 1, idx: NUMBER_OF_COLUMNS - 1 };
          assertSelectedCellOnTab({ cellNavigationMode }, false, { selectedPosition })
            .toMatchObject({ rowIdx: ROWS_COUNT - 1, idx: 0 });
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
            .toMatchObject({ rowIdx: 2, idx: 1 });
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
        rowGetter: (rowIdx) => rowIdx < 3 ? rows[rowIdx] : rowGetter()
      }, { selectedPosition });
    };

    it('should not render a CopyMask component if there is no copied cell', () => {
      const { wrapper } = setupCopy();
      expect(wrapper.find(CopyMask).length).toBe(0);
    });

    it('should render a CopyMask component when a cell is copied', () => {
      const { wrapper } = setupCopy();
      pressKey(wrapper, 'c', { keyCode: KeyCodes.c, ctrlKey: true });
      expect(wrapper.find(CopyMask).props()).toEqual({ height: 30, left: 100, top: 60, width: 100, zIndex: 1 });
    });

    it('should remove the CopyMask component on escape', () => {
      const { wrapper } = setupCopy();
      pressKey(wrapper, 'c', { keyCode: KeyCodes.c, ctrlKey: true });
      pressKey(wrapper, 'Escape', { keyCode: KeyCodes.Escape });
      expect(wrapper.find(CopyMask).length).toBe(0);
    });

    it('should update the selected cell with the copied value on paste', () => {
      const { wrapper, props } = setupCopy();
      // Copy selected cell
      pressKey(wrapper, 'c', { keyCode: KeyCodes.c, ctrlKey: true });
      // Move up
      pressKey(wrapper, 'ArrowUp');
      // Paste copied cell
      pressKey(wrapper, 'v', { keyCode: KeyCodes.v, ctrlKey: true });

      expect(props.onGridRowsUpdated).toHaveBeenCalledWith('Column1', 1, 1, { Column1: '3' }, UpdateActions.COPY_PASTE, 2);
    });
  });

  describe('Drag functionality', () => {
    const setupDrag = (rowIdx = 2) => {
      const selectedPosition = { idx: 1, rowIdx };
      const rows = [
        { Column1: '1' },
        { Column1: '2' },
        { Column1: '3' },
        { Column1: '4' },
        { Column1: '5' }
      ];
      return setup({
        rowGetter: (rowIdx) => rowIdx < 5 ? rows[rowIdx] : rowGetter()
      }, { selectedPosition });
    };

    it('should not render the DragMask component if drag has not started', () => {
      const { wrapper } = setupDrag();

      expect(wrapper.find(DragMask).length).toBe(0);
    });

    it('should render the DragMask component on cell drag', () => {
      const { wrapper } = setupDrag();
      const setData = jest.fn();
      wrapper.find(DragHandle).simulate('dragstart', {
        target: { className: 'test' },
        dataTransfer: { setData }
      });

      expect(wrapper.find(DragMask).length).toBe(1);
      expect(setData).toHaveBeenCalled();
    });

    it('should update the dragged over cells on downwards drag end', () => {
      const { wrapper, props } = setupDrag();
      const setData = jest.fn();
      wrapper.find(DragHandle).simulate('dragstart', {
        target: { className: 'test' },
        dataTransfer: { setData }
      });
      props.eventBus.dispatch(EventTypes.DRAG_ENTER, 6);
      wrapper.find(DragHandle).simulate('dragEnd');

      expect(props.onGridRowsUpdated).toHaveBeenCalledWith('Column1', 2, 6, { Column1: '3' }, UpdateActions.CELL_DRAG);
    });

    it('should update the dragged over cells on upwards drag end', () => {
      const { wrapper, props } = setupDrag(4);
      const setData = jest.fn();
      wrapper.find(DragHandle).simulate('dragstart', {
        target: { className: 'test' },
        dataTransfer: { setData }
      });
      props.eventBus.dispatch(EventTypes.DRAG_ENTER, 0);
      wrapper.find(DragHandle).simulate('dragEnd');

      expect(props.onGridRowsUpdated).toHaveBeenCalledWith('Column1', 4, 0, { Column1: '5' }, UpdateActions.CELL_DRAG);
    });
  });

  describe('ContextMenu functionality', () => {
    it('should render the context menu if it a valid element', () => {
      const FakeContextMenu = <div data-test="context-menu">Context Menu</div>;
      const { wrapper } = setup({ contextMenu: FakeContextMenu }, { selectedPosition: { idx: 1, rowIdx: 2 } });

      expect(wrapper.find(sel('context-menu')).props())
        .toMatchObject({ idx: 1, rowIdx: 2 });
    });
  });
});
