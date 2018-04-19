import React from 'react';
import { shallow } from 'enzyme';

import InteractionMasks from '../InteractionMasks';
import SelectionMask from '../SelectionMask';
import EditorContainer from '../../editors/EditorContainer';
import { createColumns } from '../../__tests__/utils/createColumns';
import * as keyCodes from '../../KeyCodes';
import { CellNavigationMode } from '../../constants';

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
        enableCellSelect: true,
        cellNavigationMode: CellNavigationMode.NONE
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

    fdescribe('Cell Selection/DeSelection handlers', () => {
      describe('when cell selection/deselection handlers are passed', () => {
        describe('cell in the middle of the grid is selected', () => {
          const cellToSelect = { rowIdx: 1, idx: 1 };
          it('deselection handler should have been called when moving to the next cell when press Tab', () => {
            const testgrid = shallowRenderGridWithSelectionHandlers();
            selectCellInGrid(cellToSelect, testgrid);
            testgrid.onPressTab({ shiftKey: false, preventDefault: () => {} });
            expect(testgrid.props.onCellDeSelected).toHaveBeenCalled();
            expect(testgrid.props.onCellDeSelected.calls.mostRecent().args[0]).toEqual({
              rowIdx: 1,
              idx: 1
            });
          });
          it('selection handler should have been called when moving to the next cell', () => {
            const testgrid = shallowRenderGridWithSelectionHandlers();
            selectCellInGrid(cellToSelect, testgrid);
            testgrid.onPressTab({ shiftKey: false, preventDefault: () => {} });
            expect(testgrid.props.onCellSelected).toHaveBeenCalled();
            expect(testgrid.props.onCellSelected.calls.mostRecent().args[0]).toEqual({
              rowIdx: 1,
              idx: 2
            });
          });
        });
        describe('user is able to exit the grid to the left', () => {
          const cellToSelect = { rowIdx: 0, idx: 0 };
          it('triggers the deselection handler on press Shift+Tab', () => {
            const testgrid = shallowRenderGridWithSelectionHandlers();
            selectCellInGrid(cellToSelect, testgrid);
            testgrid.onPressTab({ shiftKey: true, preventDefault: () => {} });
            expect(testgrid.props.onCellDeSelected).toHaveBeenCalled();
            expect(testgrid.props.onCellDeSelected.calls.mostRecent().args[0]).toEqual({
              rowIdx: 0,
              idx: 0
            });
          });
          it('does not trigger the selection handler on press Shift+Tab', () => {
            const testgrid = shallowRenderGridWithSelectionHandlers();
            selectCellInGrid(cellToSelect, testgrid);
            testgrid.onPressTab({ shiftKey: true, preventDefault: () => {} });
            expect(testgrid.props.onCellSelected).not.toHaveBeenCalled();
          });
        });
        describe('user is able to exit the grid to the right', () => {
          const cellToSelect = { rowIdx: 2, idx: 2 };
          it('triggers the deselection handler on press Tab', () => {
            const testgrid = shallowRenderGridWithSelectionHandlers();
            selectCellInGrid(cellToSelect, testgrid);
            testgrid.onPressTab({ shiftKey: false, preventDefault: () => {} });
            expect(testgrid.props.onCellDeSelected).toHaveBeenCalled();
            expect(testgrid.props.onCellDeSelected.calls.mostRecent().args[0]).toEqual({
              rowIdx: 2,
              idx: 2
            });
          });
          it('does not trigger the selection handler on press Tab', () => {
            const testgrid = shallowRenderGridWithSelectionHandlers();
            selectCellInGrid(cellToSelect, testgrid);
            testgrid.onPressTab({ shiftKey: false, preventDefault: () => {} });
            expect(testgrid.props.onCellSelected).not.toHaveBeenCalled();
          });
        });
        describe('user is able to enter the grid by pressing Tab', () => {
          const cellToSelect = { rowIdx: 1, idx: 1 };
          it('does not trigger the deselection handler on press Tab', () => {
            const testgrid = shallowRenderGridWithSelectionHandlers();
            selectTable(cellToSelect, testgrid);
            testgrid.onPressTab({ shiftKey: false, preventDefault: () => {} });
            expect(testgrid.props.onCellDeSelected).not.toHaveBeenCalled();
          });
          it('triggers the selection handler on press Tab', () => {
            const testgrid = shallowRenderGridWithSelectionHandlers();
            selectTable(cellToSelect, testgrid);
            testgrid.onPressTab({ shiftKey: false, preventDefault: () => {} });
            expect(testgrid.props.onCellSelected).toHaveBeenCalled();
            const selectedCell = testgrid.props.onCellSelected.calls.mostRecent().args[0];
            expect(selectedCell.rowIdx).toEqual(1);
            expect(selectedCell.idx).toEqual(1);
          });
        });
        describe('user is able to enter the grid by pressing Shift+Tab', () => {
          const cellToSelect = { rowIdx: 1, idx: 1 };
          it('does not trigger the deselection handler on press Shift+Tab', () => {
            const testgrid = shallowRenderGridWithSelectionHandlers();
            selectTable(cellToSelect, testgrid);
            testgrid.onPressTab({ shiftKey: true, preventDefault: () => {} });
            expect(testgrid.props.onCellDeSelected).not.toHaveBeenCalled();
          });
          it('triggers the selection handler on press Shift+Tab', () => {
            const testgrid = shallowRenderGridWithSelectionHandlers();
            selectTable(cellToSelect, testgrid);
            testgrid.onPressTab({ shiftKey: true, preventDefault: () => {} });
            expect(testgrid.props.onCellSelected).toHaveBeenCalled();
            const selectedCell = testgrid.props.onCellSelected.calls.mostRecent().args[0];
            expect(selectedCell.rowIdx).toEqual(1);
            expect(selectedCell.idx).toEqual(1);
          });
        });
      });
    });

    describe('using keyboard to navigate through the grid by pressing Tab or Shift+Tab', () => {
      // enzyme doesn't allow dom keyboard navigation, but we can assume that if
      // prevent default isn't called, it lets the dom do normal navigation

      const setupTabTest = (props, shiftKey) => {
        const { wrapper } = setup(props);
        const preventDefaultSpy = jasmine.createSpy();
        pressKey(wrapper, 'Tab', {keyCode: keyCodes.Tab, preventDefault: preventDefaultSpy, shiftKey});
        return {wrapper, preventDefaultSpy};
      };

      describe('when cellNavigationMode is changeRow', () => {
        const cellNavigationMode = CellNavigationMode.CHANGE_ROW;
        it('allows the user to exit the grid with Tab if there are no rows', () => {
          const preventDefaultSpy = setupTabTest({cellNavigationMode, rowsCount: 0});
          expect(preventDefaultSpy).not.toHaveBeenCalled();
        });
        it('allows the user to exit the grid with Shift+Tab if there are no rows', () => {
          const preventDefaultSpy = setupTabTest({cellNavigationMode, rowsCount: 0}, true);
          expect(preventDefaultSpy).not.toHaveBeenCalled();
        });
        it('allows the user to exit to the grid with Shift+Tab at the first cell of the grid', () => {
          const firstCellOfGrid = { rowIdx: 0, idx: 0 };
          const {wrapper, preventDefaultSpy} = setupTabTest({cellNavigationMode, selectedPosition: firstCellOfGrid }, true);
          expect(preventDefaultSpy).not.toHaveBeenCalled();
          expect(wrapper.state().selectedPosition).toEqual({idx: -1, rowIdx: 0});
        });
        it('allows the user to exit the grid when they press Tab at the last cell in the grid', () => {
          const lastCellOfGrid = { rowIdx: helpers.rowsCount() - 1, idx: helpers.columns.length - 1 };
          const {wrapper, preventDefaultSpy} = setupTabTest({cellNavigationMode, selectedPosition: lastCellOfGrid });
          expect(preventDefaultSpy).not.toHaveBeenCalled();
          expect(wrapper.state().selectedPosition).toEqual({idx: -1, rowIdx: lastCellOfGrid.rowIdx});
        });
        it('goes to the next cell when the user presses Tab and they are not at the end of a row', () => {
          const selectedPosition = { rowIdx: 3, idx: 3 };
          const {wrapper, preventDefaultSpy} = setupTabTest({cellNavigationMode, selectedPosition });
          expect(preventDefaultSpy).toHaveBeenCalled();
          expect(wrapper.state().selectedPosition).toEqual({ rowIdx: 3, idx: 4 });
        });
        it('goes to the beginning of the next row when the user presses Tab and they are at the end of a row', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          const grid = enzymeWrapper.instance();
          grid.setState({selected: { rowIdx: 0, idx: helpers.columns.length - 1 } });
          expect(grid.state.selected).toEqual({ rowIdx: 0, idx: helpers.columns.length - 1 });
          const preventDefault = jasmine.createSpy();
          // override focused on cell/table tests because we're using shallow rendering
          grid.isFocusedOnCell = () => true;
          grid.isFocusedOnTable = () => false;
          spyOn(ReactDOM, 'findDOMNode').and.returnValue({ querySelector: () => (false) });
          expect(grid.onPressTab({ shiftKey: false, preventDefault }));
          expect(preventDefault).toHaveBeenCalled();
          expect(grid.state.selected).toEqual({ rowIdx: 1, idx: 0 });
        });
        it('goes to the previous cell when the user presses Shift+Tab and they are not at the beginning of a row', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          const grid = enzymeWrapper.instance();
          grid.setState({selected: { rowIdx: 0, idx: 1 } });
          expect(grid.state.selected).toEqual({ rowIdx: 0, idx: 1 });
          const preventDefault = jasmine.createSpy();
          // override focused on cell/table tests because we're using shallow rendering
          grid.isFocusedOnCell = () => true;
          grid.isFocusedOnTable = () => false;
          spyOn(ReactDOM, 'findDOMNode').and.returnValue({ querySelector: () => (false) });
          expect(grid.onPressTab({ shiftKey: true, preventDefault }));
          expect(preventDefault).toHaveBeenCalled();
          expect(grid.state.selected).toEqual({ rowIdx: 0, idx: 0 });
        });
        it('goes to the end of the previous row when the user presses Shift+Tab and they are at the beginning of a row', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          const grid = enzymeWrapper.instance();
          grid.setState({selected: { rowIdx: 2, idx: 0 } });
          expect(grid.state.selected).toEqual({ rowIdx: 2, idx: 0 });
          const preventDefault = jasmine.createSpy();
          // override focused on cell/table tests because we're using shallow rendering
          grid.isFocusedOnCell = () => true;
          grid.isFocusedOnTable = () => false;
          spyOn(ReactDOM, 'findDOMNode').and.returnValue({ querySelector: () => (false) });
          expect(grid.onPressTab({ shiftKey: true, preventDefault }));
          expect(preventDefault).toHaveBeenCalled();
          expect(grid.state.selected).toEqual({ rowIdx: 1, idx: helpers.columns.length - 1 });
        });
        it('allows the user to exit the grid with Shift+Tab when focused on the div surrounding the table and they just exited left', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          const grid = enzymeWrapper.instance();
          grid.setState({selected: { rowIdx: 0, idx: 0, exitedLeft: true } });
          expect(grid.state.selected).toEqual({ rowIdx: 0, idx: 0, exitedLeft: true });
          const preventDefault = jasmine.createSpy();
          // override focused on cell/table tests because we're using shallow rendering
          grid.isFocusedOnCell = () => false;
          grid.isFocusedOnTable = () => true;
          expect(grid.onPressTab({ shiftKey: true, preventDefault }));
          expect(preventDefault).not.toHaveBeenCalled();
          expect(grid.state.selected).toEqual({ rowIdx: 0, idx: 0 });
        });
        it('allows the user to enter the grid with Tab when grid\'s selected cell has idx:-1', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          const grid = enzymeWrapper.instance();
          grid.setState({selected: { rowIdx: 1, idx: -1 }});
          expect(grid.state.selected).toEqual({ rowIdx: 1, idx: -1 });
          const preventDefault = jasmine.createSpy();
          // override focused on cell/table tests because we're using shallow rendering
          grid.isFocusedOnCell = () => false;
          grid.isFocusedOnTable = () => true;
          spyOn(ReactDOM, 'findDOMNode').and.returnValue({ querySelector: () => (false) });
          expect(grid.onPressTab({ shiftKey: false, preventDefault }));
          expect(preventDefault).toHaveBeenCalled();
          expect(grid.state.selected).toEqual({ rowIdx: 1, idx: 0 });
        });
        it('allows the user to enter the grid with Shift+Tab when grid\'s selected cell has idx:-1', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          const grid = enzymeWrapper.instance();
          grid.setState({selected: { rowIdx: 1, idx: -1 }});
          expect(grid.state.selected).toEqual({ rowIdx: 1, idx: -1 });
          const preventDefault = jasmine.createSpy();
          // override focused on cell/table tests because we're using shallow rendering
          grid.isFocusedOnCell = () => false;
          grid.isFocusedOnTable = () => true;
          spyOn(ReactDOM, 'findDOMNode').and.returnValue({ querySelector: () => (false) });
          expect(grid.onPressTab({ shiftKey: true, preventDefault }));
          expect(preventDefault).toHaveBeenCalled();
          expect(grid.state.selected).toEqual({ rowIdx: 1, idx: 2 });
        });
        it('allows the user to enter the grid with Tab to the previously selected cell', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          const grid = enzymeWrapper.instance();
          grid.setState({selected: { rowIdx: 1, idx: 1 }});
          expect(grid.state.selected).toEqual({ rowIdx: 1, idx: 1 });
          const preventDefault = jasmine.createSpy();
          // override focused on cell/table tests because we're using shallow rendering
          grid.isFocusedOnCell = () => false;
          grid.isFocusedOnTable = () => true;
          spyOn(ReactDOM, 'findDOMNode').and.returnValue({ querySelector: () => (false) });
          expect(grid.onPressTab({ shiftKey: false, preventDefault }));
          expect(preventDefault).toHaveBeenCalled();
          expect(grid.state.selected).toEqual({ rowIdx: 1, idx: 1, changeSomething: true });
        });
      });
      describe('when cellNavigationMode is none', () => {
        const cellNavigationMode = 'none';
        it('allows the user to exit the grid with Tab if there are no rows', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode, numRows: 0 });
          const grid = enzymeWrapper.instance();
          const preventDefault = jasmine.createSpy();
          grid.onPressTab({ shiftKey: false, preventDefault });
          expect(preventDefault).not.toHaveBeenCalled();
        });
        it('allows the user to exit the grid with Shift+Tab if there are no rows', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode, numRows: 0 });
          const grid = enzymeWrapper.instance();
          const preventDefault = jasmine.createSpy();
          grid.onPressTab({ shiftKey: true, preventDefault });
          expect(preventDefault).not.toHaveBeenCalled();
        });
        it('allows the user to exit the grid when they press Shift+Tab at the first cell of the grid', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          const grid = enzymeWrapper.instance();
          expect(grid.state.selected).toEqual({ idx: 0, rowIdx: 0 });
          const preventDefault = jasmine.createSpy();
          // override focused on cell/table tests because we're using shallow rendering
          grid.isFocusedOnCell = () => true;
          grid.isFocusedOnTable = () => false;
          expect(grid.onPressTab({ shiftKey: true, preventDefault }));
          expect(preventDefault).not.toHaveBeenCalled();
        });
        it('allows the user to exit the grid when they press Tab at the last cell in the grid', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          const grid = enzymeWrapper.instance();
          grid.setState({selected: { rowIdx: helpers.rowsCount() - 1, idx: helpers.columns.length - 1 } });
          expect(grid.state.selected).toEqual({ rowIdx: helpers.rowsCount() - 1, idx: helpers.columns.length - 1});
          const preventDefault = jasmine.createSpy();
          // override focused on cell/table tests because we're using shallow rendering
          grid.isFocusedOnCell = () => true;
          grid.isFocusedOnTable = () => false;
          expect(grid.onPressTab({ shiftKey: false, preventDefault }));
          expect(preventDefault).not.toHaveBeenCalled();
        });
        it('goes to the next cell when the user presses Tab and they are not at the end of a row', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          const grid = enzymeWrapper.instance();
          const preventDefault = jasmine.createSpy();
          // override focused on cell/table tests because we're using shallow rendering
          grid.isFocusedOnCell = () => true;
          grid.isFocusedOnTable = () => false;
          spyOn(ReactDOM, 'findDOMNode').and.returnValue({ querySelector: () => (false) });
          expect(grid.onPressTab({ shiftKey: false, preventDefault }));
          expect(preventDefault).toHaveBeenCalled();
          expect(grid.state.selected).toEqual({ rowIdx: 0, idx: 1 });
        });
        it('allows the user to exit the grid when they press Tab and they are at the end of a row', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          const grid = enzymeWrapper.instance();
          grid.setState({selected: { rowIdx: 0, idx: helpers.columns.length - 1 } });
          expect(grid.state.selected).toEqual({ rowIdx: 0, idx: helpers.columns.length - 1});
          const preventDefault = jasmine.createSpy();
          // override focused on cell/table tests because we're using shallow rendering
          grid.isFocusedOnCell = () => true;
          grid.isFocusedOnTable = () => false;
          expect(grid.onPressTab({ shiftKey: false, preventDefault }));
          expect(preventDefault).not.toHaveBeenCalled();
        });
        it('goes to the previous cell when the user presses Shift+Tab and they are not at the beginning of a row', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          const grid = enzymeWrapper.instance();
          grid.setState({selected: { rowIdx: 0, idx: 1 } });
          expect(grid.state.selected).toEqual({ rowIdx: 0, idx: 1 });
          const preventDefault = jasmine.createSpy();
          // override focused on cell/table tests because we're using shallow rendering
          grid.isFocusedOnCell = () => true;
          grid.isFocusedOnTable = () => false;
          spyOn(ReactDOM, 'findDOMNode').and.returnValue({ querySelector: () => (false) });
          expect(grid.onPressTab({ shiftKey: true, preventDefault }));
          expect(preventDefault).toHaveBeenCalled();
          expect(grid.state.selected).toEqual({ rowIdx: 0, idx: 0 });
        });
        it('allows the user to exit the grid when they press Shift+Tab and they are at the beginning of a row', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          const grid = enzymeWrapper.instance();
          grid.setState({selected: { rowIdx: 2, idx: 0 } });
          expect(grid.state.selected).toEqual({ rowIdx: 2, idx: 0 });
          const preventDefault = jasmine.createSpy();
          // override focused on cell/table tests because we're using shallow rendering
          grid.isFocusedOnCell = () => true;
          grid.isFocusedOnTable = () => false;
          expect(grid.onPressTab({ shiftKey: true, preventDefault }));
          expect(preventDefault).not.toHaveBeenCalled();
        });
        it('allows the user to exit the grid with Shift+Tab when focused on the div surrounding the table and they just exited left', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          const grid = enzymeWrapper.instance();
          grid.setState({selected: { rowIdx: 0, idx: 0, exitedLeft: true } });
          expect(grid.state.selected).toEqual({ rowIdx: 0, idx: 0, exitedLeft: true });
          const preventDefault = jasmine.createSpy();
          // override focused on cell/table tests because we're using shallow rendering
          grid.isFocusedOnCell = () => false;
          grid.isFocusedOnTable = () => true;
          expect(grid.onPressTab({ shiftKey: true, preventDefault }));
          expect(preventDefault).not.toHaveBeenCalled();
          expect(grid.state.selected).toEqual({ rowIdx: 0, idx: 0 });
        });
        it('allows the user to enter the grid with Tab when grid\'s selected cell has idx:-1', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          const grid = enzymeWrapper.instance();
          grid.setState({selected: { rowIdx: 1, idx: -1 }});
          expect(grid.state.selected).toEqual({ rowIdx: 1, idx: -1 });
          const preventDefault = jasmine.createSpy();
          // override focused on cell/table tests because we're using shallow rendering
          grid.isFocusedOnCell = () => false;
          grid.isFocusedOnTable = () => true;
          spyOn(ReactDOM, 'findDOMNode').and.returnValue({ querySelector: () => (false) });
          expect(grid.onPressTab({ shiftKey: false, preventDefault }));
          expect(preventDefault).toHaveBeenCalled();
          expect(grid.state.selected).toEqual({ rowIdx: 1, idx: 0 });
        });
        it('allows the user to enter the grid with Shift+Tab when grid\'s selected cell has idx:-1', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          const grid = enzymeWrapper.instance();
          grid.setState({selected: { rowIdx: 1, idx: -1 }});
          expect(grid.state.selected).toEqual({ rowIdx: 1, idx: -1 });
          const preventDefault = jasmine.createSpy();
          // override focused on cell/table tests because we're using shallow rendering
          grid.isFocusedOnCell = () => false;
          grid.isFocusedOnTable = () => true;
          spyOn(ReactDOM, 'findDOMNode').and.returnValue({ querySelector: () => (false) });
          expect(grid.onPressTab({ shiftKey: true, preventDefault }));
          expect(preventDefault).toHaveBeenCalled();
          expect(grid.state.selected).toEqual({ rowIdx: 1, idx: 2 });
        });
        it('allows the user to enter the grid with Tab to the previously selected cell', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          const grid = enzymeWrapper.instance();
          grid.setState({selected: { rowIdx: 1, idx: 1 }});
          expect(grid.state.selected).toEqual({ rowIdx: 1, idx: 1 });
          const preventDefault = jasmine.createSpy();
          // override focused on cell/table tests because we're using shallow rendering
          grid.isFocusedOnCell = () => false;
          grid.isFocusedOnTable = () => true;
          spyOn(ReactDOM, 'findDOMNode').and.returnValue({ querySelector: () => (false) });
          expect(grid.onPressTab({ shiftKey: false, preventDefault }));
          expect(preventDefault).toHaveBeenCalled();
          expect(grid.state.selected).toEqual({ rowIdx: 1, idx: 1, changeSomething: true });
        });
      });
      fdescribe('when cellNavigationMode is loopOverRow', () => {
        const cellNavigationMode = 'loopOverRow';
        it('allows the user to exit the grid with Tab if there are no rows', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode, numRows: 0 });
          const grid = enzymeWrapper.instance();
          const preventDefault = jasmine.createSpy();
          grid.onPressTab({ shiftKey: false, preventDefault });
          expect(preventDefault).not.toHaveBeenCalled();
        });
        it('allows the user to exit the grid with Shift+Tab if there are no rows', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode, numRows: 0 });
          const grid = enzymeWrapper.instance();
          const preventDefault = jasmine.createSpy();
          grid.onPressTab({ shiftKey: true, preventDefault });
          expect(preventDefault).not.toHaveBeenCalled();
        });
        it('goes to the first cell in the row when the user presses Tab and they are at the end of a row', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          const grid = enzymeWrapper.instance();
          grid.setState({selected: { rowIdx: helpers.rowsCount() - 1, idx: helpers.columns.length - 1 } });
          expect(grid.state.selected).toEqual({ rowIdx: helpers.rowsCount() - 1, idx: helpers.columns.length - 1 });
          const preventDefault = jasmine.createSpy();
          // override focused on cell/table tests because we're using shallow rendering
          grid.isFocusedOnCell = () => true;
          grid.isFocusedOnTable = () => false;
          spyOn(ReactDOM, 'findDOMNode').and.returnValue({ querySelector: () => (false) });
          expect(grid.onPressTab({ shiftKey: false, preventDefault }));
          expect(preventDefault).toHaveBeenCalled();
          expect(grid.state.selected).toEqual({ rowIdx: helpers.rowsCount() - 1, idx: 0 });
        });
        it('goes to the last cell in the row when the user presses Shift+Tab and they are at the beginning of a row', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          const grid = enzymeWrapper.instance();
          expect(grid.state.selected).toEqual({ rowIdx: 0, idx: 0 });
          const preventDefault = jasmine.createSpy();
          // override focused on cell/table tests because we're using shallow rendering
          grid.isFocusedOnCell = () => true;
          grid.isFocusedOnTable = () => false;
          spyOn(ReactDOM, 'findDOMNode').and.returnValue({ querySelector: () => (false) });
          expect(grid.onPressTab({ shiftKey: true, preventDefault }));
          expect(preventDefault).toHaveBeenCalled();
          expect(grid.state.selected).toEqual({ rowIdx: 0, idx: helpers.columns.length - 1 });
        });
        it('goes to the next cell when the user presses Tab and they are not at the end of a row', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          const grid = enzymeWrapper.instance();
          const preventDefault = jasmine.createSpy();
          // override focused on cell/table tests because we're using shallow rendering
          grid.isFocusedOnCell = () => true;
          grid.isFocusedOnTable = () => false;
          spyOn(ReactDOM, 'findDOMNode').and.returnValue({ querySelector: () => (false) });
          expect(grid.onPressTab({ shiftKey: false, preventDefault }));
          expect(preventDefault).toHaveBeenCalled();
          expect(grid.state.selected).toEqual({ rowIdx: 0, idx: 1 });
        });
        it('goes to the previous cell when the user presses Shift+Tab and they are not at the beginning of a row', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          const grid = enzymeWrapper.instance();
          grid.setState({selected: { rowIdx: 0, idx: 1 } });
          expect(grid.state.selected).toEqual({ rowIdx: 0, idx: 1 });
          const preventDefault = jasmine.createSpy();
          // override focused on cell/table tests because we're using shallow rendering
          grid.isFocusedOnCell = () => true;
          grid.isFocusedOnTable = () => false;
          spyOn(ReactDOM, 'findDOMNode').and.returnValue({ querySelector: () => (false) });
          expect(grid.onPressTab({ shiftKey: true, preventDefault }));
          expect(preventDefault).toHaveBeenCalled();
          expect(grid.state.selected).toEqual({ rowIdx: 0, idx: 0 });
        });
        it('allows the user to exit the grid with Shift+Tab when focused on the div surrounding the table and they just exited left', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          const grid = enzymeWrapper.instance();
          grid.setState({selected: { rowIdx: 0, idx: 0, exitedLeft: true } });
          expect(grid.state.selected).toEqual({ rowIdx: 0, idx: 0, exitedLeft: true });
          const preventDefault = jasmine.createSpy();
          // override focused on cell/table tests because we're using shallow rendering
          grid.isFocusedOnCell = () => false;
          grid.isFocusedOnTable = () => true;
          expect(grid.onPressTab({ shiftKey: true, preventDefault }));
          expect(preventDefault).not.toHaveBeenCalled();
          expect(grid.state.selected).toEqual({ rowIdx: 0, idx: 0 });
        });
        it('allows the user to enter the grid with Tab when grid\'s selected cell has idx:-1', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          const grid = enzymeWrapper.instance();
          grid.setState({selected: { rowIdx: 1, idx: -1 }});
          expect(grid.state.selected).toEqual({ rowIdx: 1, idx: -1 });
          const preventDefault = jasmine.createSpy();
          // override focused on cell/table tests because we're using shallow rendering
          grid.isFocusedOnCell = () => false;
          grid.isFocusedOnTable = () => true;
          spyOn(ReactDOM, 'findDOMNode').and.returnValue({ querySelector: () => (false) });
          expect(grid.onPressTab({ shiftKey: false, preventDefault }));
          expect(preventDefault).toHaveBeenCalled();
          expect(grid.state.selected).toEqual({ rowIdx: 1, idx: 0 });
        });
        it('allows the user to enter the grid with Shift+Tab when grid\'s selected cell has idx:-1', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          const grid = enzymeWrapper.instance();
          grid.setState({selected: { rowIdx: 1, idx: -1 }});
          expect(grid.state.selected).toEqual({ rowIdx: 1, idx: -1 });
          const preventDefault = jasmine.createSpy();
          // override focused on cell/table tests because we're using shallow rendering
          grid.isFocusedOnCell = () => false;
          grid.isFocusedOnTable = () => true;
          spyOn(ReactDOM, 'findDOMNode').and.returnValue({ querySelector: () => (false) });
          expect(grid.onPressTab({ shiftKey: true, preventDefault }));
          expect(preventDefault).toHaveBeenCalled();
          expect(grid.state.selected).toEqual({ rowIdx: 1, idx: 2 });
        });
        it('allows the user to enter the grid with Tab to the previously selected cell', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          const grid = enzymeWrapper.instance();
          grid.setState({selected: { rowIdx: 1, idx: 1 }});
          expect(grid.state.selected).toEqual({ rowIdx: 1, idx: 1 });
          const preventDefault = jasmine.createSpy();
          // override focused on cell/table tests because we're using shallow rendering
          grid.isFocusedOnCell = () => false;
          grid.isFocusedOnTable = () => true;
          spyOn(ReactDOM, 'findDOMNode').and.returnValue({ querySelector: () => (false) });
          expect(grid.onPressTab({ shiftKey: false, preventDefault }));
          expect(preventDefault).toHaveBeenCalled();
          expect(grid.state.selected).toEqual({ rowIdx: 1, idx: 1, changeSomething: true });
        });
      });
      describe('keyboard events', () => {
        const cellNavigationMode = 'none';
        it('registers keyDown events', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          enzymeWrapper.find('Grid').prop('onViewportKeydown')({ key: 'Enter', keyCode: 13, which: 13 });
          expect(enzymeWrapper.instance().isKeyDown(13)).toBeTruthy();
        });

        it('registers keyUp events', () => {
          const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
          const gridWrapper = enzymeWrapper.find('Grid');
          gridWrapper.prop('onViewportKeydown')({ key: 'Enter', keyCode: 13, which: 13 });
          gridWrapper.prop('onViewportKeyup')({ key: 'Enter', keyCode: 13, which: 13 });
          expect(enzymeWrapper.instance().isKeyDown(13)).toBeFalsy();
        });
      });
    });
  });
});
