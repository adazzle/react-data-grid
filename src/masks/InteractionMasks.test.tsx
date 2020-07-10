/* eslint-disable jest/no-commented-out-tests */
/* eslint-disable sonarjs/no-identical-functions */
import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import InteractionMasks, { InteractionMasksProps } from './InteractionMasks';
// import SelectionRangeMask from '../SelectionRangeMask';
import DragMask from './DragMask';
import EventBus from '../EventBus';
import EditorContainer from '../editors/EditorContainer';
import { createColumns } from '../test/utils';
import { CellNavigationMode, UpdateActions } from '../common/enums';
import { Position } from '../common/types';

const NUMBER_OF_COLUMNS = 10;
const ROWS_COUNT = 5;
const columns = createColumns(NUMBER_OF_COLUMNS);

// Enzyme sets the className on the ForwardRef component also so we need to filter div
const selectionMaskSelector = 'div.rdg-selected';
const copyMaskSelector = 'div.rdg-cell-copied';

interface Row {
  [key: string]: React.ReactNode;
}

describe('InteractionMasks', () => {
  function setup(overrideProps?: Partial<InteractionMasksProps<Row, unknown>>, initialPosition?: Position) {
    const onSelectedCellChange = jest.fn();
    const props: InteractionMasksProps<Row, unknown> = {
      columns,
      rows: Array(ROWS_COUNT).fill({ col1: 1 }),
      rowHeight: 30,
      totalHeaderHeight: 30,
      scrollToCell: jest.fn(),
      onSelectedCellChange,
      onRowsUpdate: jest.fn(),
      enableCellCopyPaste: true,
      enableCellDragAndDrop: true,
      cellNavigationMode: CellNavigationMode.NONE,
      eventBus: new EventBus(),
      editorPortalTarget: document.body,
      gridRef: React.createRef(),
      scrollLeft: 0,
      scrollTop: 0,
      ...overrideProps
    };

    const wrapper = mount(<InteractionMasks {...props} />);
    if (initialPosition) {
      act(() => {
        props.eventBus.dispatch('SELECT_CELL', initialPosition);
      });
      wrapper.update();
      onSelectedCellChange.mockReset();
    }
    return { wrapper, props };
  }

  const pressKey = (wrapper: ReturnType<typeof setup>['wrapper'], key: string, eventData?: Partial<React.KeyboardEvent>) => {
    act(() => {
      wrapper.simulate('keydown', { key, preventDefault: () => null, ...eventData });
    });
  };

  const simulateTab = (wrapper: ReturnType<typeof setup>['wrapper'], shiftKey = false, preventDefault = () => { }) => {
    act(() => {
      pressKey(wrapper, 'Tab', { shiftKey, preventDefault });
    });
  };

  describe('Rendered masks', () => {
    describe('When a single cell is selected', () => {
      describe('within grid bounds', () => {
        it('should render a SelectionMask component', () => {
          const { wrapper } = setup({}, { idx: 0, rowIdx: 0 });
          expect(wrapper.find(selectionMaskSelector)).toHaveLength(1);
        });
      });

      describe('outside grid bounds', () => {
        it('should not render a SelectionMask component', () => {
          const { wrapper } = setup();
          expect(wrapper.find(selectionMaskSelector)).toHaveLength(0);
        });
      });
    });

    // describe('When a cell range is selected', () => {
    //   it('should render a SelectionRangeMask component', () => {
    //     const { wrapper } = setup({}, {
    //       selectedPosition: { idx: 0, rowIdx: 0 },
    //       selectedRange: {
    //         topLeft: { idx: 0, rowIdx: 0 },
    //         bottomRight: { idx: 1, rowIdx: 1 },
    //         startCell: { idx: 0, rowIdx: 0 },
    //         cursorCell: null,
    //         isDragging: false
    //       }
    //     });
    //     expect(wrapper.find(SelectionRangeMask).length).toBe(1);
    //   });

    //   it('should render a SelectionMask component on the range\'s start cell', () => {
    //     const { wrapper } = setup({}, {
    //       selectedPosition: { idx: 0, rowIdx: 0 },
    //       selectedRange: {
    //         topLeft: { idx: 0, rowIdx: 0 },
    //         bottomRight: { idx: 1, rowIdx: 1 },
    //         startCell: { idx: 0, rowIdx: 0 },
    //         cursorCell: null,
    //         isDragging: false
    //       }
    //     });
    //     expect(wrapper.find(SelectionMask).length).toBe(1);
    //     expect(wrapper.find(SelectionMask).props()).toEqual({ height: 30, left: 0, top: 0, width: 100, zIndex: 1 });
    //   });
    // });
  });

  // describe('Range selection functionality', () => {
  //   describe('with the cursor', () => {
  //     it('should update the single-cell selectedPosition on starting a selection', () => {
  //       const { props, wrapper } = setup();
  //       props.eventBus.dispatch(EventTypes.SELECT_START, { idx: 2, rowIdx: 2 });
  //       expect(wrapper.state('selectedPosition')).toEqual({ idx: 2, rowIdx: 2 });
  //     });

  //     it('should update the multi-cell selectedRange on starting a selection', () => {
  //       const { props, wrapper } = setup();
  //       props.eventBus.dispatch(EventTypes.SELECT_START, { idx: 2, rowIdx: 2 });
  //       const selectedRange = wrapper.state('selectedRange');
  //       expect(selectedRange.topLeft).toEqual({ idx: 2, rowIdx: 2 });
  //       expect(selectedRange.bottomRight).toEqual({ idx: 2, rowIdx: 2 });
  //       expect(selectedRange.startCell).toEqual({ idx: 2, rowIdx: 2 });
  //       expect(selectedRange.cursorCell).toEqual({ idx: 2, rowIdx: 2 });
  //     });

  //     describe('moving the cursor to a new cell, mid-select', () => {
  //       function innerSetup() {
  //         const { props, wrapper } = setup();
  //         props.eventBus.dispatch(EventTypes.SELECT_START, { idx: 2, rowIdx: 2 });
  //         return { props, wrapper };
  //       }

  //       it('should update topLeft (and cursor) when moving left', () => {
  //         const { props, wrapper } = innerSetup();
  //         props.eventBus.dispatch(EventTypes.SELECT_UPDATE, { idx: 1, rowIdx: 2 });
  //         const selectedRange = wrapper.state('selectedRange');
  //         expect(selectedRange.topLeft).toEqual({ idx: 1, rowIdx: 2 });
  //         expect(selectedRange.bottomRight).toEqual({ idx: 2, rowIdx: 2 });
  //         expect(selectedRange.startCell).toEqual({ idx: 2, rowIdx: 2 });
  //         expect(selectedRange.cursorCell).toEqual({ idx: 1, rowIdx: 2 });
  //       });

  //       it('should update topLeft (and cursor) when moving up', () => {
  //         const { props, wrapper } = innerSetup();
  //         props.eventBus.dispatch(EventTypes.SELECT_UPDATE, { idx: 2, rowIdx: 1 });
  //         const selectedRange = wrapper.state('selectedRange');
  //         expect(selectedRange.topLeft).toEqual({ idx: 2, rowIdx: 1 });
  //         expect(selectedRange.bottomRight).toEqual({ idx: 2, rowIdx: 2 });
  //         expect(selectedRange.startCell).toEqual({ idx: 2, rowIdx: 2 });
  //         expect(selectedRange.cursorCell).toEqual({ idx: 2, rowIdx: 1 });
  //       });

  //       it('should update bottomRight (and cursor) when moving right', () => {
  //         const { props, wrapper } = innerSetup();
  //         props.eventBus.dispatch(EventTypes.SELECT_UPDATE, { idx: 3, rowIdx: 2 });
  //         const selectedRange = wrapper.state('selectedRange');
  //         expect(selectedRange.topLeft).toEqual({ idx: 2, rowIdx: 2 });
  //         expect(selectedRange.bottomRight).toEqual({ idx: 3, rowIdx: 2 });
  //         expect(selectedRange.startCell).toEqual({ idx: 2, rowIdx: 2 });
  //         expect(selectedRange.cursorCell).toEqual({ idx: 3, rowIdx: 2 });
  //       });

  //       it('should update bottomRight (and cursor) when moving down', () => {
  //         const { props, wrapper } = innerSetup();
  //         props.eventBus.dispatch(EventTypes.SELECT_UPDATE, { idx: 2, rowIdx: 3 });
  //         const selectedRange = wrapper.state('selectedRange');
  //         expect(selectedRange.topLeft).toEqual({ idx: 2, rowIdx: 2 });
  //         expect(selectedRange.bottomRight).toEqual({ idx: 2, rowIdx: 3 });
  //         expect(selectedRange.startCell).toEqual({ idx: 2, rowIdx: 2 });
  //         expect(selectedRange.cursorCell).toEqual({ idx: 2, rowIdx: 3 });
  //       });
  //     });

  //     it('should not update state when moving the cursor but not mid-select', () => {
  //       const { props, wrapper } = setup();
  //       props.eventBus.dispatch(EventTypes.SELECT_UPDATE, { idx: 2, rowIdx: 2 });
  //       expect(wrapper.state('selectedRange').startCell).toBeNull();
  //     });

  //     it('should not update state when moving the cursor after a selection has ended', () => {
  //       const { props, wrapper } = setup();
  //       props.eventBus.dispatch(EventTypes.SELECT_START, { idx: 2, rowIdx: 2 });
  //       props.eventBus.dispatch(EventTypes.SELECT_END);
  //       props.eventBus.dispatch(EventTypes.SELECT_UPDATE, { idx: 3, rowIdx: 3 });
  //       expect(wrapper.state('selectedRange').cursorCell).toEqual({ idx: 2, rowIdx: 2 });
  //     });

  //     it('should give focus to InteractionMasks once a selection has ended', () => {
  //       // We have to use mount, rather than shallow, so that InteractionMasks has a ref to it's node, used for focusing
  //       const { wrapper, props } = setup(undefined, undefined, true);
  //       props.eventBus.dispatch(EventTypes.SELECT_START, { idx: 2, rowIdx: 2 });
  //       jest.spyOn(wrapper.instance(), 'focus').mockImplementation(() => { });
  //       props.eventBus.dispatch(EventTypes.SELECT_END);
  //       expect(wrapper.instance().focus).toHaveBeenCalled();
  //     });
  //   });
  // });

  // describe('Keyboard range selection functionality', () => {
  //   const selectRange = (eventBus: EventBus, from: Position, to: Position) => {
  //     eventBus.dispatch(EventTypes.SELECT_START, from);
  //     eventBus.dispatch(EventTypes.SELECT_UPDATE, to);
  //     eventBus.dispatch(EventTypes.SELECT_END);
  //   };

  //   describe('when a range is already selected', () => {
  //     describe('when the cursor cell is not in outer bounds', () => {
  //       function innerSetup() {
  //         const setupResult = setup();
  //         selectRange(setupResult.props.eventBus, { idx: 2, rowIdx: 2 }, { idx: 3, rowIdx: 3 });
  //         return setupResult;
  //       }

  //       it('should shrink the selection upwards on Shift+Up', () => {
  //         const { wrapper } = innerSetup();
  //         pressKey(wrapper, 'ArrowUp', { shiftKey: true });
  //         const selectedRange = wrapper.state('selectedRange');
  //         expect(selectedRange.topLeft).toMatchObject({ idx: 2, rowIdx: 2 });
  //         expect(selectedRange.bottomRight).toMatchObject({ idx: 3, rowIdx: 2 });
  //         expect(selectedRange.cursorCell).toMatchObject({ idx: 3, rowIdx: 2 });
  //         expect(selectedRange.startCell).toMatchObject({ idx: 2, rowIdx: 2 });
  //       });

  //       it('should shrink the selection leftwards on Shift+Left', () => {
  //         const { wrapper } = innerSetup();
  //         pressKey(wrapper, 'ArrowLeft', { shiftKey: true });
  //         const selectedRange = wrapper.state('selectedRange');
  //         expect(selectedRange.topLeft).toMatchObject({ idx: 2, rowIdx: 2 });
  //         expect(selectedRange.bottomRight).toMatchObject({ idx: 2, rowIdx: 3 });
  //         expect(selectedRange.cursorCell).toMatchObject({ idx: 2, rowIdx: 3 });
  //         expect(selectedRange.startCell).toMatchObject({ idx: 2, rowIdx: 2 });
  //       });

  //       it('should grow the selection downwards on Shift+Down', () => {
  //         const { wrapper } = innerSetup();
  //         pressKey(wrapper, 'ArrowDown', { shiftKey: true });
  //         const selectedRange = wrapper.state('selectedRange');
  //         expect(selectedRange.topLeft).toMatchObject({ idx: 2, rowIdx: 2 });
  //         expect(selectedRange.bottomRight).toMatchObject({ idx: 3, rowIdx: 4 });
  //         expect(selectedRange.cursorCell).toMatchObject({ idx: 3, rowIdx: 4 });
  //         expect(selectedRange.startCell).toMatchObject({ idx: 2, rowIdx: 2 });
  //       });

  //       it('should grow the selection rightwards on Shift+Right', () => {
  //         const { wrapper } = innerSetup();
  //         pressKey(wrapper, 'ArrowRight', { shiftKey: true });
  //         const selectedRange = wrapper.state('selectedRange');
  //         expect(selectedRange.topLeft).toMatchObject({ idx: 2, rowIdx: 2 });
  //         expect(selectedRange.bottomRight).toMatchObject({ idx: 4, rowIdx: 3 });
  //         expect(selectedRange.cursorCell).toMatchObject({ idx: 4, rowIdx: 3 });
  //         expect(selectedRange.startCell).toMatchObject({ idx: 2, rowIdx: 2 });
  //       });
  //     });

  //     describe('when the next cell is out of bounds', () => {
  //       it('should not grow the selection on Shift+Up', () => {
  //         const { props, wrapper } = setup();
  //         selectRange(props.eventBus, { idx: 1, rowIdx: 1 }, { idx: 0, rowIdx: 0 });
  //         pressKey(wrapper, 'ArrowUp', { shiftKey: true });
  //         const selectedRange = wrapper.state('selectedRange');
  //         expect(selectedRange.cursorCell).toMatchObject({ idx: 0, rowIdx: 0 });
  //       });

  //       it('should not grow the selection on Shift+Left', () => {
  //         const { props, wrapper } = setup();
  //         selectRange(props.eventBus, { idx: 1, rowIdx: 1 }, { idx: 0, rowIdx: 0 });
  //         pressKey(wrapper, 'ArrowLeft', { shiftKey: true });
  //         const selectedRange = wrapper.state('selectedRange');
  //         expect(selectedRange.cursorCell).toEqual({ idx: 0, rowIdx: 0 });
  //       });

  //       it('should not grow the selection on Shift+Right', () => {
  //         const { props, wrapper } = setup();
  //         selectRange(props.eventBus, { idx: 2, rowIdx: 2 }, { idx: NUMBER_OF_COLUMNS - 1, rowIdx: 3 });
  //         pressKey(wrapper, 'ArrowRight', { shiftKey: true });
  //         const selectedRange = wrapper.state('selectedRange');
  //         expect(selectedRange.cursorCell).toEqual({ idx: NUMBER_OF_COLUMNS - 1, rowIdx: 3 });
  //       });

  //       it('should not grow the selection on Shift+Down', () => {
  //         const { props, wrapper } = setup();
  //         selectRange(props.eventBus, { idx: 2, rowIdx: 2 }, { idx: 2, rowIdx: ROWS_COUNT - 1 });
  //         pressKey(wrapper, 'ArrowDown', { shiftKey: true });
  //         const selectedRange = wrapper.state('selectedRange');
  //         expect(selectedRange.cursorCell).toEqual({ idx: 2, rowIdx: ROWS_COUNT - 1 });
  //       });
  //     });
  //   });

  //   describe('when only a single cell is selected', () => {
  //     function innerSetup() {
  //       const currentCell = { idx: 2, rowIdx: 2 };
  //       const setupResult = setup({}, { selectedPosition: currentCell });
  //       setupResult.props.eventBus.dispatch(EventTypes.SELECT_START, currentCell);
  //       setupResult.props.eventBus.dispatch(EventTypes.SELECT_END);
  //       return setupResult;
  //     }

  //     it('should grow the selection range left on Shift+Left', () => {
  //       const { wrapper } = innerSetup();
  //       pressKey(wrapper, 'ArrowLeft', { shiftKey: true });
  //       const selectedRange = wrapper.state('selectedRange');
  //       expect(selectedRange.topLeft).toMatchObject({ idx: 1, rowIdx: 2 });
  //       expect(selectedRange.bottomRight).toMatchObject({ idx: 2, rowIdx: 2 });
  //       expect(selectedRange.cursorCell).toMatchObject({ idx: 1, rowIdx: 2 });
  //       expect(selectedRange.startCell).toMatchObject({ idx: 2, rowIdx: 2 });
  //     });

  //     it('should grow the selection range right on Shift+Right', () => {
  //       const { wrapper } = innerSetup();
  //       pressKey(wrapper, 'ArrowRight', { shiftKey: true });
  //       const selectedRange = wrapper.state('selectedRange');
  //       expect(selectedRange.topLeft).toMatchObject({ idx: 2, rowIdx: 2 });
  //       expect(selectedRange.bottomRight).toMatchObject({ idx: 3, rowIdx: 2 });
  //       expect(selectedRange.cursorCell).toMatchObject({ idx: 3, rowIdx: 2 });
  //       expect(selectedRange.startCell).toMatchObject({ idx: 2, rowIdx: 2 });
  //     });

  //     it('should grow the selection range up on Shift+Up', () => {
  //       const { wrapper } = innerSetup();
  //       pressKey(wrapper, 'ArrowUp', { shiftKey: true });
  //       const selectedRange = wrapper.state('selectedRange');
  //       expect(selectedRange.topLeft).toMatchObject({ idx: 2, rowIdx: 1 });
  //       expect(selectedRange.bottomRight).toMatchObject({ idx: 2, rowIdx: 2 });
  //       expect(selectedRange.cursorCell).toMatchObject({ idx: 2, rowIdx: 1 });
  //       expect(selectedRange.startCell).toMatchObject({ idx: 2, rowIdx: 2 });
  //     });

  //     it('should grow the selection range down on Shift+Down', () => {
  //       const { wrapper } = innerSetup();
  //       pressKey(wrapper, 'ArrowDown', { shiftKey: true });
  //       const selectedRange = wrapper.state('selectedRange');
  //       expect(selectedRange.topLeft).toMatchObject({ idx: 2, rowIdx: 2 });
  //       expect(selectedRange.bottomRight).toMatchObject({ idx: 2, rowIdx: 3 });
  //       expect(selectedRange.cursorCell).toMatchObject({ idx: 2, rowIdx: 3 });
  //       expect(selectedRange.startCell).toMatchObject({ idx: 2, rowIdx: 2 });
  //     });
  //   });

  //   describe('when no range has ever been selected', () => {
  //     function innerSetup() {
  //       const currentCell = { idx: 0, rowIdx: 0 };
  //       return setup({}, { selectedPosition: currentCell });
  //     }

  //     it('should grow the selection range right on Shift+Right', () => {
  //       const { wrapper } = innerSetup();
  //       pressKey(wrapper, 'ArrowRight', { shiftKey: true });
  //       const selectedRange = wrapper.state('selectedRange');
  //       expect(selectedRange.topLeft).toMatchObject({ idx: 0, rowIdx: 0 });
  //       expect(selectedRange.bottomRight).toMatchObject({ idx: 1, rowIdx: 0 });
  //       expect(selectedRange.cursorCell).toMatchObject({ idx: 1, rowIdx: 0 });
  //       expect(selectedRange.startCell).toMatchObject({ idx: 0, rowIdx: 0 });
  //     });

  //     it('should grow the selection range down on Shift+Down', () => {
  //       const { wrapper } = innerSetup();
  //       pressKey(wrapper, 'ArrowDown', { shiftKey: true });
  //       const selectedRange = wrapper.state('selectedRange');
  //       expect(selectedRange.topLeft).toMatchObject({ idx: 0, rowIdx: 0 });
  //       expect(selectedRange.bottomRight).toMatchObject({ idx: 0, rowIdx: 1 });
  //       expect(selectedRange.cursorCell).toMatchObject({ idx: 0, rowIdx: 1 });
  //       expect(selectedRange.startCell).toMatchObject({ idx: 0, rowIdx: 0 });
  //     });
  //   });
  // });

  // describe('Range selection events', () => {
  //   it('should fire onSelectedCellRangeChange on starting a selection', () => {
  //     const { props } = setup();
  //     props.eventBus.dispatch(EventTypes.SELECT_START, { idx: 2, rowIdx: 2 });
  //     expect(props.onSelectedCellRangeChange).toHaveBeenCalledWith(expect.objectContaining({
  //       topLeft: { idx: 2, rowIdx: 2 },
  //       bottomRight: { idx: 2, rowIdx: 2 },
  //       isDragging: true
  //     }));
  //   });

  //   it('should fire onSelectedCellRangeChange on updating a selection', () => {
  //     const { props } = setup();
  //     props.eventBus.dispatch(EventTypes.SELECT_START, { idx: 2, rowIdx: 2 });
  //     props.eventBus.dispatch(EventTypes.SELECT_UPDATE, { idx: 3, rowIdx: 3 });
  //     expect(props.onSelectedCellRangeChange).toHaveBeenCalledWith(expect.objectContaining({
  //       topLeft: { idx: 2, rowIdx: 2 },
  //       bottomRight: { idx: 3, rowIdx: 3 },
  //       isDragging: true
  //     }));
  //   });

  //   it('should fire onSelectedCellRangeChange on completing a selection', () => {
  //     const { props } = setup();
  //     props.eventBus.dispatch(EventTypes.SELECT_START, { idx: 2, rowIdx: 2 });
  //     props.eventBus.dispatch(EventTypes.SELECT_UPDATE, { idx: 3, rowIdx: 3 });
  //     props.eventBus.dispatch(EventTypes.SELECT_END);
  //     expect(props.onSelectedCellRangeChange).toHaveBeenCalledWith(expect.objectContaining({
  //       topLeft: { idx: 2, rowIdx: 2 },
  //       bottomRight: { idx: 3, rowIdx: 3 },
  //       isDragging: false
  //     }));
  //   });

  //   it('should fire onSelectedCellRangeChange and onCRSCompleted on modifying a selection via they keyboard', () => {
  //     const currentCell = { idx: 0, rowIdx: 0 };
  //     const { wrapper, props } = setup({}, { selectedPosition: currentCell });
  //     pressKey(wrapper, 'ArrowRight', { shiftKey: true });
  //     expect(props.onSelectedCellRangeChange).toHaveBeenCalledWith(expect.objectContaining({
  //       topLeft: { idx: 0, rowIdx: 0 },
  //       bottomRight: { idx: 1, rowIdx: 0 }
  //     }));
  //   });
  // });

  describe('Keyboard navigation functionality', () => {
    it('Press enter should enable editing', () => {
      const { wrapper } = setup({}, { idx: 0, rowIdx: 0 });
      pressKey(wrapper, 'Enter');
      wrapper.update();
      expect(wrapper.find(EditorContainer)).toHaveLength(1);
    });

    describe('When current selected cell is not in outer bounds', () => {
      it('Press arrow up should move up', () => {
        const { wrapper, props } = setup({}, { idx: 0, rowIdx: 1 });
        pressKey(wrapper, 'ArrowUp');
        expect(props.onSelectedCellChange).toHaveBeenCalledWith({ idx: 0, rowIdx: 0 });
      });

      it('Press arrow right should move right', () => {
        const { wrapper, props } = setup({}, { idx: 0, rowIdx: 0 });
        pressKey(wrapper, 'ArrowRight');
        expect(props.onSelectedCellChange).toHaveBeenCalledWith({ idx: 1, rowIdx: 0 });
      });

      it('Press arrow down should move down', () => {
        const { wrapper, props } = setup({}, { idx: 0, rowIdx: 0 });
        pressKey(wrapper, 'ArrowDown');
        expect(props.onSelectedCellChange).toHaveBeenCalledWith({ idx: 0, rowIdx: 1 });
      });

      it('Press arrow left should move left', () => {
        const { wrapper, props } = setup({}, { idx: 1, rowIdx: 0 });
        pressKey(wrapper, 'ArrowLeft');
        expect(props.onSelectedCellChange).toHaveBeenCalledWith({ idx: 0, rowIdx: 0 });
      });

      it('Press tab should move right', () => {
        const { wrapper, props } = setup({}, { idx: 0, rowIdx: 0 });
        pressKey(wrapper, 'Tab');
        expect(props.onSelectedCellChange).toHaveBeenCalledWith({ idx: 1, rowIdx: 0 });
      });

      it('Press shiftKey + tab should move left', () => {
        const { wrapper, props } = setup({}, { idx: 1, rowIdx: 0 });
        pressKey(wrapper, 'Tab', { shiftKey: true });
        expect(props.onSelectedCellChange).toHaveBeenCalledWith({ idx: 0, rowIdx: 0 });
      });
    });

    describe('When next cell is out of bounds', () => {
      it('Press arrow left should not move left', () => {
        const { wrapper, props } = setup({}, { idx: 0, rowIdx: 0 });
        pressKey(wrapper, 'ArrowLeft');
        expect(props.onSelectedCellChange).toHaveBeenCalledTimes(0);
      });

      it('Press arrow right should not move right', () => {
        const { wrapper, props } = setup({}, { idx: NUMBER_OF_COLUMNS - 1, rowIdx: 0 });
        pressKey(wrapper, 'ArrowRight');
        expect(props.onSelectedCellChange).toHaveBeenCalledTimes(0);
      });

      it('Press arrow up should not move up', () => {
        const { wrapper, props } = setup({}, { idx: 0, rowIdx: 0 });
        pressKey(wrapper, 'ArrowUp');
        expect(props.onSelectedCellChange).toHaveBeenCalledTimes(0);
      });
    });

    describe('using keyboard to navigate through the grid by pressing Tab or Shift+Tab', () => {
      // enzyme doesn't allow dom keyboard navigation, but we can assume that if
      // prevent default isn't called, it lets the dom do normal navigation

      const assertGridWasExited = (wrapper: ReturnType<typeof setup>['wrapper']) => {
        expect(wrapper.find(selectionMaskSelector)).toHaveLength(0);
      };

      const tabCell = (props: Partial<InteractionMasksProps<Row, unknown>>, shiftKey?: boolean, state?: { selectedPosition: Position }) => {
        const { wrapper, props: { onSelectedCellChange } } = setup(props, state?.selectedPosition);
        const preventDefaultSpy = jest.fn();
        simulateTab(wrapper, shiftKey, preventDefaultSpy);
        wrapper.update();
        return { wrapper, preventDefaultSpy, onSelectedCellChange };
      };

      const assertExitGridOnTab = (props: Partial<InteractionMasksProps<Row, unknown>>, shiftKey?: boolean, state?: { selectedPosition: Position }) => {
        const { wrapper, preventDefaultSpy } = tabCell(props, shiftKey, state);
        expect(preventDefaultSpy).not.toHaveBeenCalled();
        assertGridWasExited(wrapper);
      };

      const assertSelectedCellOnTab = (props: Partial<InteractionMasksProps<Row, unknown>>, shiftKey?: boolean, state?: { selectedPosition: Position }) => {
        const { preventDefaultSpy, onSelectedCellChange } = tabCell(props, shiftKey, state);
        expect(preventDefaultSpy).toHaveBeenCalled();
        return expect(onSelectedCellChange);
      };

      describe('when cellNavigationMode is changeRow', () => {
        const cellNavigationMode = CellNavigationMode.CHANGE_ROW;
        // it('allows the user to exit the grid with Tab if there are no rows', () => {
        //   assertExitGridOnTab({ cellNavigationMode, rows: [] });
        // });
        // it('allows the user to exit the grid with Shift+Tab if there are no rows', () => {
        //   assertExitGridOnTab({ cellNavigationMode, rows: [] }, true);
        // });
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
            .toHaveBeenCalledWith({ rowIdx: 3, idx: 4 });
        });
        it('goes to the beginning of the next row when the user presses Tab and they are at the end of a row', () => {
          const selectedPosition = { rowIdx: 2, idx: NUMBER_OF_COLUMNS - 1 };
          assertSelectedCellOnTab({ cellNavigationMode }, false, { selectedPosition })
            .toHaveBeenCalledWith({ rowIdx: 3, idx: 0 });
        });
        it('goes to the previous cell when the user presses Shift+Tab and they are not at the beginning of a row', () => {
          const selectedPosition = { rowIdx: 2, idx: 2 };
          assertSelectedCellOnTab({ cellNavigationMode }, true, { selectedPosition })
            .toHaveBeenCalledWith({ rowIdx: 2, idx: 1 });
        });
        it('goes to the end of the previous row when the user presses Shift+Tab and they are at the beginning of a row', () => {
          const selectedPosition = { rowIdx: 2, idx: 0 };
          assertSelectedCellOnTab({ cellNavigationMode }, true, { selectedPosition })
            .toHaveBeenCalledWith({ rowIdx: 1, idx: NUMBER_OF_COLUMNS - 1 });
        });
      });

      describe('when cellNavigationMode is none', () => {
        const cellNavigationMode = CellNavigationMode.NONE;
        // it('allows the user to exit the grid with Tab if there are no rows', () => {
        //   assertExitGridOnTab({ cellNavigationMode, rows: [] });
        // });
        // it('allows the user to exit the grid with Shift+Tab if there are no rows', () => {
        //   assertExitGridOnTab({ cellNavigationMode, rows: [] }, true);
        // });
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
            .toHaveBeenCalledWith({ rowIdx: 3, idx: 4 });
        });
        it('goes to the first cell of the next row when they press Tab and they are at the end of a row', () => {
          const selectedPosition = { rowIdx: 3, idx: NUMBER_OF_COLUMNS - 1 };
          assertSelectedCellOnTab({ cellNavigationMode }, false, { selectedPosition })
            .toHaveBeenCalledWith({ rowIdx: 4, idx: 0 });
        });
        it('goes to the previous cell when the user presses Shift+Tab and they are not at the beginning of a row', () => {
          const selectedPosition = { rowIdx: 2, idx: 2 };
          assertSelectedCellOnTab({ cellNavigationMode }, true, { selectedPosition })
            .toHaveBeenCalledWith({ rowIdx: 2, idx: 1 });
        });
        it('goes to the last cell of the previous row when they press Shift+Tab and they are at the beginning of a row', () => {
          const selectedPosition = { rowIdx: 3, idx: 0 };
          assertSelectedCellOnTab({ cellNavigationMode }, true, { selectedPosition })
            .toHaveBeenCalledWith({ rowIdx: 2, idx: NUMBER_OF_COLUMNS - 1 });
        });
      });

      describe('when cellNavigationMode is loopOverRow', () => {
        const cellNavigationMode = CellNavigationMode.LOOP_OVER_ROW;
        // it('allows the user to exit the grid with Tab if there are no rows', () => {
        //   assertExitGridOnTab({ cellNavigationMode, rows: [] });
        // });
        // it('allows the user to exit the grid with Shift+Tab if there are no rows', () => {
        //   assertExitGridOnTab({ cellNavigationMode, rows: [] }, true);
        // });
        it('goes to the first cell in the row when the user presses Tab and they are at the end of a row', () => {
          const selectedPosition = { rowIdx: ROWS_COUNT - 1, idx: NUMBER_OF_COLUMNS - 1 };
          assertSelectedCellOnTab({ cellNavigationMode }, false, { selectedPosition })
            .toHaveBeenCalledWith({ rowIdx: ROWS_COUNT - 1, idx: 0 });
        });
        it('goes to the last cell in the row when the user presses Shift+Tab and they are at the beginning of a row', () => {
          const selectedPosition = { rowIdx: 0, idx: 0 };
          assertSelectedCellOnTab({ cellNavigationMode }, true, { selectedPosition })
            .toHaveBeenCalledWith({ rowIdx: 0, idx: NUMBER_OF_COLUMNS - 1 });
        });
        it('goes to the next cell when the user presses Tab and they are not at the end of a row', () => {
          const selectedPosition = { rowIdx: 3, idx: 3 };
          assertSelectedCellOnTab({ cellNavigationMode }, false, { selectedPosition })
            .toHaveBeenCalledWith({ rowIdx: 3, idx: 4 });
        });
        it('goes to the previous cell when the user presses Shift+Tab and they are not at the beginning of a row', () => {
          const selectedPosition = { rowIdx: 2, idx: 2 };
          assertSelectedCellOnTab({ cellNavigationMode }, true, { selectedPosition })
            .toHaveBeenCalledWith({ rowIdx: 2, idx: 1 });
        });
      });
    });
  });

  describe('Copy functionality', () => {
    const setupCopy = () => {
      const rows = [
        { Column1: '1' },
        { Column1: '2' },
        { Column1: '3' }
      ];
      const { wrapper, props } = setup({ rows });
      act(() => {
        props.eventBus.dispatch('SELECT_CELL', { idx: 1, rowIdx: 2 });
      });
      return { wrapper, props };
    };

    it('should not render a CopyMask component if there is no copied cell', () => {
      const { wrapper } = setupCopy();
      expect(wrapper.find(copyMaskSelector)).toHaveLength(0);
    });

    it('should render a CopyMask component when a cell is copied', () => {
      const { wrapper } = setupCopy();
      pressKey(wrapper, 'c', { ctrlKey: true });
      wrapper.update();
      expect(wrapper.find(copyMaskSelector)).toHaveLength(1);
      expect(wrapper.find(copyMaskSelector).props().style).toStrictEqual({
        height: 30,
        width: 100,
        transform: 'translate(100px, 60px)',
        zIndex: 1
      });
    });

    it('should remove the CopyMask component on escape', () => {
      const { wrapper } = setupCopy();
      pressKey(wrapper, 'c', { ctrlKey: true });
      pressKey(wrapper, 'Escape');
      wrapper.update();
      expect(wrapper.find(copyMaskSelector)).toHaveLength(0);
    });

    it('should update the selected cell with the copied value on paste', () => {
      const { wrapper, props } = setupCopy();
      act(() => {
        props.eventBus.dispatch('SELECT_CELL', { idx: 1, rowIdx: 2 });
      });
      // Copy selected cell
      pressKey(wrapper, 'c', { ctrlKey: true });
      // Move up
      pressKey(wrapper, 'ArrowUp');
      // Paste copied cell
      pressKey(wrapper, 'v', { ctrlKey: true });

      expect(props.onRowsUpdate).toHaveBeenCalledWith({
        cellKey: 'Column1',
        fromRow: 2,
        toRow: 1,
        updated: { Column1: '3' },
        action: UpdateActions.COPY_PASTE,
        fromCellKey: 'Column1'
      });
    });
  });

  describe('Drag functionality', () => {
    const setupDrag = (rowIdx = 2) => {
      const rows = [
        { Column1: '1' },
        { Column1: '2' },
        { Column1: '3' },
        { Column1: '4' },
        { Column1: '5' }
      ];
      const { wrapper, props } = setup({ rows }, { idx: 1, rowIdx });
      return { wrapper, props };
    };

    it('should not render the DragMask component if drag has not started', () => {
      const { wrapper } = setupDrag();

      expect(wrapper.find(DragMask)).toHaveLength(0);
    });

    it('should render the DragMask component on cell drag', () => {
      const { wrapper } = setupDrag();
      const setData = jest.fn();
      wrapper.find('.drag-handle').simulate('dragstart', {
        target: { className: 'test' },
        dataTransfer: { setData }
      });

      expect(wrapper.find(DragMask)).toHaveLength(1);
      expect(setData).toHaveBeenCalled();
    });

    it('should update the dragged over cells on downwards drag end', () => {
      const { wrapper, props } = setupDrag();
      const setData = jest.fn();
      wrapper.find('.drag-handle').simulate('dragstart', {
        target: { className: 'test' },
        dataTransfer: { setData }
      });
      act(() => {
        props.eventBus.dispatch('DRAG_ENTER', 6);
      });
      wrapper.find('.drag-handle').simulate('dragEnd');

      expect(props.onRowsUpdate).toHaveBeenCalledWith({
        cellKey: 'Column1',
        fromRow: 2,
        toRow: 6,
        updated: { Column1: '3' },
        action: UpdateActions.CELL_DRAG
      });
    });

    it('should update the dragged over cells on upwards drag end', () => {
      const { wrapper, props } = setupDrag(4);
      const setData = jest.fn();
      wrapper.find('.drag-handle').simulate('dragstart', {
        target: { className: 'test' },
        dataTransfer: { setData }
      });
      act(() => {
        props.eventBus.dispatch('DRAG_ENTER', 0);
      });
      wrapper.find('.drag-handle').simulate('dragEnd');

      expect(props.onRowsUpdate).toHaveBeenCalledWith({
        cellKey: 'Column1',
        fromRow: 4,
        toRow: 0,
        updated: { Column1: '5' },
        action: UpdateActions.CELL_DRAG
      });
    });
  });
});
