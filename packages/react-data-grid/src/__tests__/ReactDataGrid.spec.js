import React from 'react';
import ReactDOM from 'react-dom';
import ReactDataGrid from '../ReactDataGrid';
import { shallow } from 'enzyme';
import * as helpers from '../helpers/test/GridPropHelpers';

function shallowRenderGrid({
  enableCellAutoFocus = undefined,
  cellNavigationMode = undefined,
  numRows = helpers.rowsCount(),
  onCellSelected, onCellDeSelected
}) {
  const enzymeWrapper = shallow(<ReactDataGrid
    columns={helpers.columns}
    rowGetter={helpers.rowGetter}
    rowsCount={numRows}
    enableCellSelect
    enableCellAutoFocus={enableCellAutoFocus}
    cellNavigationMode={cellNavigationMode}
    onCellSelected={onCellSelected}
    onCellDeSelected={onCellDeSelected}
  />);
  return {
    enzymeWrapper
  };
}

describe('configure enableCellAutoFocus property', () => {
  it('passes enableCellAutoFocus property in the Grid cellMetaData', () => {
    const enableCellAutoFocus = true;
    const { enzymeWrapper } = shallowRenderGrid({ enableCellAutoFocus });
    expect(enzymeWrapper.find('Grid').props().cellMetaData.enableCellAutoFocus).toEqual(enableCellAutoFocus);
  });
  it('sets enableCellAutoFocus to true by default', () => {
    const { enzymeWrapper } = shallowRenderGrid({});
    expect(enzymeWrapper.find('Grid').props().cellMetaData.enableCellAutoFocus).toBe(true);
  });
  it('sets enableCellAutoFocus to false if it is configured', () => {
    const { enzymeWrapper } = shallowRenderGrid({ enableCellAutoFocus: false });
    expect(enzymeWrapper.find('Grid').props().cellMetaData.enableCellAutoFocus).toBe(false);
  });
});

function shallowRenderGridWithSelectionHandlers() {
  const props = { cellNavigationMode: 'none', onCellSelected: jasmine.createSpy(), onCellDeSelected: jasmine.createSpy() };
  const { enzymeWrapper } = shallowRenderGrid(props);
  return enzymeWrapper.instance();
}
function selectCellInGrid(selected, grid) {
  grid.setState({ selected });
  // override focused on cell/table tests because we're using shallow rendering
  grid.isFocusedOnCell = () => true;
  grid.isFocusedOnTable = () => false;
  spyOn(ReactDOM, 'findDOMNode').and.returnValue({ querySelector: () => (false) });
}
function selectTable(selected, grid) {
  grid.setState({ selected });
  // override focused on cell/table tests because we're using shallow rendering
  grid.isFocusedOnCell = () => false;
  grid.isFocusedOnTable = () => true;
}
describe('Cell Selection/DeSelection handlers', () => {
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
  describe('when cellNavigationMode is changeRow', () => {
    const cellNavigationMode = 'changeRow';
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
    it('allows the user to exit to the grid with Shift+Tab at the first cell of the grid', () => {
      const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
      const grid = enzymeWrapper.instance();
      // override focused on cell test because we're using shallow rendering
      grid.isFocusedOnCell = () => true;
      grid.setState({ selected: { rowIdx: 0, idx: 0 } });
      expect(grid.state.selected).toEqual({ idx: 0, rowIdx: 0 });
      const preventDefault = jasmine.createSpy();
      grid.onPressTab({ shiftKey: true, preventDefault });
      expect(preventDefault).not.toHaveBeenCalled();
    });
    it('allows the user to exit the grid when they press Tab at the last cell in the grid', () => {
      const { enzymeWrapper } = shallowRenderGrid({ cellNavigationMode });
      const grid = enzymeWrapper.instance();
      // override focused on cell test because we're using shallow rendering
      grid.isFocusedOnCell = () => true;
      grid.setState({selected: { rowIdx: helpers.rowsCount() - 1, idx: helpers.columns.length - 1 } });
      expect(grid.state.selected).toEqual({ rowIdx: helpers.rowsCount() - 1, idx: helpers.columns.length - 1});
      const preventDefault = jasmine.createSpy();
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
  describe('when cellNavigationMode is loopOverRow', () => {
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

//
//   var testProps = {
//     enableCellSelect: true,
//     columns:columns,
//     rowGetter:rowGetter,
//     rowsCount: _rows.length,
//     width:300,
//     onRowUpdated : function(update){},
//     onCellCopyPaste : function(){},
//     onCellsDragged : function(){},
//     onGridSort : function(){}
//   }
//
//   beforeEach(() => {
//     var rowsCount = 1000;
//     component = TestUtils.renderIntoDocument(<Grid {...testProps}/>);
//   });
//
//   it('should create a new instance of Grid', () => {
//     expect(component).toBeDefined();
//   });
//
//   it('should render a BaseGrid stub', () => {
//     var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
//     expect(baseGrid).toBeDefined();
//   });
//
//
//   it('should render a Toolbar if passed in as props to grid', () => {
//     var Toolbar = StubComponent('Toolbar');
//     component = TestUtils.renderIntoDocument(<Grid {...testProps} toolbar={<Toolbar/>} />);
//     var toolbarInstance = TestUtils.findRenderedComponentWithType(component, Toolbar);
//     expect(toolbarInstance).toBeDefined();
//   });
//
//   it('onToggleFilter trigger of Toolbar should set filter state of grid and render a filterable header row', () => {
//     //arrange
//     var Toolbar = StubComponent('Toolbar');
//     component = TestUtils.renderIntoDocument(<Grid {...testProps} toolbar={<Toolbar/>} />);
//     var toolbarInstance = TestUtils.findRenderedComponentWithType(component, Toolbar);
//     //act
//     toolbarInstance.props.onToggleFilter();
//     //assert
//     var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
//     expect(component.state.canFilter).toBe(true);
//     expect(baseGrid.props.headerRows.length).toEqual(2);
//     var filterableHeaderRow = baseGrid.props.headerRows[1];
//     expect(filterableHeaderRow.ref).toEqual("filterRow");
//   });
//
//
//   it("should be initialized with correct state", () => {
//     expect(component.state).toEqual({
//       selectedRows : [],
//       selected : {rowIdx : 0,  idx : 0},
//       copied : null,
//       canFilter : false,
//       expandedRows : [],
//       columnFilters : {},
//       sortDirection : null,
//       sortColumn : null,
//       dragged : null
//     });
//   });
//
//   describe("When cell selection disabled", () => {
//
//     it("grid should be initialized with selected state of {rowIdx : -1, idx : -1}", () => {
//       component = TestUtils.renderIntoDocument(<Grid
//         enableCellSelect={false}
//         columns={columns}
//         rowGetter={rowGetter}
//         rowsCount={_rows.length}
//         width={300}/>);
//       expect(component.state.selected).toEqual({
//         rowIdx : -1,
//         idx : -1
//       });
//     });
//
//   });
//
//   describe("When row selection enabled", () => {
//
//     beforeEach(() => {
//       component = TestUtils.renderIntoDocument(<Grid {...testProps} enableRowSelect={true} />);
//     });
//
//     afterEach(() => {
//       component.setState({selectedRows : []});
//     });
//
//     it("should render an additional Select Row column", () => {
//
//       var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
//       var selectRowCol = baseGrid.props.columns[0];
//       expect(baseGrid.props.columns.length).toEqual(columns.length + 1);
//       expect(selectRowCol.key).toEqual('select-row');
//       expect(TestUtils.isElementOfType(selectRowCol.formatter, CheckboxEditorStub)).toBe(true);
//     });
//
//     it("clicking header checkbox should toggle select all rows", () => {
//       //arrange
//       var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
//       var selectRowCol = baseGrid.props.columns[0];
//       var headerCheckbox = selectRowCol.headerRenderer;
//       var checkbox = document.createElement('input');
//       checkbox.type = "checkbox";
//       checkbox.value = "value";
//       checkbox.checked = true;
//       var fakeEvent = {currentTarget : checkbox};
//       //act
//       headerCheckbox.props.onChange(fakeEvent);
//       //assert
//       var selectedRows = component.state.selectedRows;
//       expect(selectedRows.length).toEqual(_rows.length);
//       selectedRows.forEach(function(selected){
//         expect(selected).toBe(true);
//       });
//       //trigger unselect
//       checkbox.checked = false;
//       headerCheckbox.props.onChange(fakeEvent);
//       component.state.selectedRows.forEach(function(selected){
//         expect(selected).toBe(false);
//       });
//     });
//
//     it("should be able to select an individual row when selected = false", () => {
//       component.setState({selectedRows : [false, false, false, false]});
//       var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
//       var selectRowCol = baseGrid.props.columns[0];
//       selectRowCol.onRowSelect(3);
//       expect(component.state.selectedRows[3]).toBe(true);
//     });
//
//     it("should be able to select an individual row when selected = null", () => {
//       component.setState({selectedRows : [null, null, null, null]});
//       var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
//       var selectRowCol = baseGrid.props.columns[0];
//       selectRowCol.onRowSelect(2);
//       expect(component.state.selectedRows[2]).toBe(true);
//     });
//
//     it("should be able to unselect an individual row ", () => {
//       component.setState({selectedRows : [null, true, true, true]});
//       var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
//       var selectRowCol = baseGrid.props.columns[0];
//
//       selectRowCol.onRowSelect(3);
//       expect(component.state.selectedRows[3]).toBe(false);
//     });
//   });
//
//
//   describe("User Interaction",() => {
//
//     afterEach(() => {
//       component.setState({selected  : {idx : 0, rowIdx : 0}});
//     });
//
//     function SimulateGridKeyDown(component, key, ctrlKey){
//       var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
//       var fakeEvent = {key : key, keyCode :key, ctrlKey: ctrlKey, preventDefault : function(){}, stopPropagation : function(){}};
//       baseGrid.props.onViewportKeydown(fakeEvent);
//     }
//
//     it("hitting TAB should decrement selected cell index by 1", () => {
//       SimulateGridKeyDown(component, 'Tab');
//       expect(component.state.selected).toEqual({
//         idx : 1,
//         rowIdx : 0
//       });
//     });
//
//     describe("When selected cell is in top corner of grid", () => {
//
//       beforeEach(() => {
//         component.setState({selected  : {idx : 0, rowIdx : 0}});
//       });
//
//       it("on ArrowUp keyboard event should not change selected index", () => {
//         SimulateGridKeyDown(component, 'ArrowUp');
//         expect(component.state.selected).toEqual({
//           idx : 0,
//           rowIdx : 0
//         });
//       });
//
//       it("on ArrowLeft keyboard event should not change selected index", () => {
//         SimulateGridKeyDown(component, 'ArrowLeft');
//         expect(component.state.selected).toEqual({
//           idx : 0,
//           rowIdx : 0
//         });
//       });
//
//     });
//
//     describe("When selected cell has adjacent cells on all sides", () => {
//
//
//       beforeEach(() => {
//         component.setState({selected  : {idx : 1, rowIdx : 1}});
//       });
//
//       it("on ArrowRight keyboard event should increment selected cell index by 1", () => {
//         SimulateGridKeyDown(component, 'ArrowRight');
//         expect(component.state.selected).toEqual({
//           idx : 2,
//           rowIdx : 1
//         });
//       });
//
//       it("on ArrowDown keyboard event should increment selected row index by 1", () => {
//         SimulateGridKeyDown(component, 'ArrowDown');
//         expect(component.state.selected).toEqual({
//           idx : 1,
//           rowIdx : 2
//         });
//       });
//
//       it("on ArrowLeft keyboard event should decrement selected row index by 1", () => {
//         SimulateGridKeyDown(component, 'ArrowLeft');
//         expect(component.state.selected).toEqual({
//           idx : 0,
//           rowIdx : 1
//         });
//       });
//
//       it("on ArrowUp keyboard event should decrement selected row index by 1", () => {
//         SimulateGridKeyDown(component, 'ArrowUp');
//         expect(component.state.selected).toEqual({
//           idx : 1,
//           rowIdx : 0
//         });
//       });
//     });
//
//     describe("When column is editable", () => {
//
//       beforeEach(() => {
//         columns[1].editable = true;
//       });
//
//
//

//
//       it("copy a cell value should store the value in grid state", () => {
//         //arrange
//         var selectedCellIndex = 1, selectedRowIndex = 1;
//         component.setState({selected  : {idx : selectedCellIndex, rowIdx : selectedRowIndex}});
//         var keyCode_c = '99';
//         var expectedCellValue = _rows[selectedRowIndex].title;
//         //act
//         SimulateGridKeyDown(component, keyCode_c, true);
//         //assert
//         expect(component.state.textToCopy).toEqual(expectedCellValue);
//         expect(component.state.copied).toEqual({idx : selectedCellIndex, rowIdx : selectedRowIndex});
//       });
//
//       it("paste a cell value should call onCellCopyPaste of component with correct params", () => {
//         //arrange
//         spyOn(testProps, 'onCellCopyPaste');
//         component = TestUtils.renderIntoDocument(<Grid {...testProps}/>);
//         component.setState({
//           textToCopy : 'banana',
//           selected   : {idx : 1, rowIdx : 5},
//           copied     : {idx : 1, rowIdx : 1}
//         });
//         var keyCode_v = '118';
//         SimulateGridKeyDown(component, keyCode_v, true);
//         expect(testProps.onCellCopyPaste).toHaveBeenCalled();
//         expect(testProps.onCellCopyPaste.calls.mostRecent().args[0]).toEqual({cellKey: "title", rowIdx: 5, value: "banana", fromRow: 1, toRow: 5})
//       });
//
//       it("cell commit cancel should set grid state inactive", () =>{
//         component.setState({selected : {idx : 1, rowIdx:1, active : true}})
//         var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
//         var meta = baseGrid.props.cellMetaData;
//         meta.onCommitCancel();
//         expect(component.state.selected).toEqual({idx : 1, rowIdx : 1, active : false });
//       });
//
//       it("pressing escape should set grid state inactive", () =>{
//         component.setState({selected : {idx : 1, rowIdx:1, active : true}})
//         SimulateGridKeyDown(component, 'Escape');
//         expect(component.state.selected).toEqual({idx : 1, rowIdx : 1, active : false });
//       });
//
//       it("pressing enter should set grid state active", () =>{
//         component.setState({selected : {idx : 1, rowIdx:1, active : false}})
//         SimulateGridKeyDown(component, 'Enter');
//         expect(component.state.selected).toEqual({idx : 1, rowIdx : 1, active : true, initialKeyCode : 'Enter' });
//       });
//
//       it("pressing delete should set grid state active", () =>{
//         component.setState({selected : {idx : 1, rowIdx:1, active : false}})
//         SimulateGridKeyDown(component, 'Delete');
//         expect(component.state.selected).toEqual({idx : 1, rowIdx : 1, active : true, initialKeyCode : 'Delete' });
//       });
//
//       it("pressing backspace should set grid state active", () =>{
//         component.setState({selected : {idx : 1, rowIdx:1, active : false}})
//         SimulateGridKeyDown(component, 'Backspace');
//         expect(component.state.selected).toEqual({idx : 1, rowIdx : 1, active : true, initialKeyCode : 'Backspace' });
//       });
//
//       it("typing a char should set grid state active and store the typed value", () =>{
//         component.setState({selected : {idx : 1, rowIdx:1, active : false}})
//         var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
//         var fakeEvent = {keyCode : 66, key :"Unidentified", preventDefault : function(){}, stopPropagation : function(){}};
//         baseGrid.props.onViewportKeydown(fakeEvent);
//         expect(component.state.selected).toEqual({idx : 1, rowIdx : 1, active : true, initialKeyCode : 66 });
//       });
//
//     });
//
//     describe("When column is not editable", () => {
//       beforeEach(() => {
//         columns[1].editable = false;
//       });
//
//       it("double click on grid should not activate current selected cell", () => {
//         component.setState({selected : {idx : 1, rowIdx : 1}});
//         columns[1].editable = false;
//         var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
//         baseGrid.props.onViewportDoubleClick();
//         expect(component.state.selected).toEqual({
//           idx : 1,
//           rowIdx : 1
//         })
//       });
//     });
//

//
//   describe("Cell Meta Data", () => {
//
//     function getCellMetaData(component){
//
//       var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
//
//       return baseGrid.props.cellMetaData;
//     }
//
//     it('creates a cellMetaData object and passes to baseGrid as props', () => {
//       var meta = getCellMetaData(component)
//       expect(meta).toEqual(jasmine.objectContaining({
//         selected : {rowIdx : 0, idx : 0},
//         dragged  : null,
//         copied   : null
//       }));
//       expect(typeof meta.onCellClick === 'function').toBe(true);
//       expect(typeof meta.onCommit === 'function').toBe(true);
//       expect(typeof meta.onCommitCancel === 'function').toBe(true);
//       expect(typeof meta.handleDragEnterRow === 'function').toBe(true);
//       expect(typeof meta.handleTerminateDrag === 'function').toBe(true);
//     });
//
//     it("Changing Grid state should update cellMetaData", () => {
//       var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
//       var newState = {selected  : {idx : 2, rowIdx : 2}, dragged : {idx : 2, rowIdx : 2}}
//       component.setState(newState);
//       var meta = baseGrid.props.cellMetaData;
//       expect(meta).toEqual(jasmine.objectContaining(newState));
//     });
//
//     it("cell commit should trigger onRowUpdated with correct params", () => {
//       spyOn(testProps, 'onRowUpdated');
//       component = TestUtils.renderIntoDocument(<Grid {...testProps}/>);
//       var meta = getCellMetaData(component);
//       var fakeCellUpdate = {cellKey: "title", rowIdx: 0, updated: {title : 'some new title'}, key: "Enter"}
//       meta.onCommit(fakeCellUpdate);
//       expect(testProps.onRowUpdated.calls.count()).toEqual(1);
//       expect(testProps.onRowUpdated.argsForCall[0][0]).toEqual({
//         cellKey: "title", rowIdx: 0, updated: {title : 'some new title'}, key: "Enter"
//       })
//     });
//
//     it("cell commit should deactivate selected cell", () => {
//       component.setState({selected : {idx : 3, rowIdx : 3, active : true}});
//       var meta = getCellMetaData(component);
//       var fakeCellUpdate = {cellKey: "title", rowIdx: 0, updated: {title : 'some new title'}, key: "Enter"}
//       meta.onCommit(fakeCellUpdate);
//       expect(component.state.selected).toEqual({
//           idx : 3,
//           rowIdx : 3,
//           active : false
//         });
//     });
//
//     it("cell commit after TAB should select next cell", () => {
//       component.setState({selected : {idx : 1, rowIdx : 1, active : true}});
//       var meta = getCellMetaData(component);
//       var fakeCellUpdate = {cellKey: "title", rowIdx: 1, updated: {title : 'some new title'}, keyCode: "Tab"}
//       meta.onCommit(fakeCellUpdate);
//       expect(component.state.selected).toEqual({
//         idx : 2,
//         rowIdx : 1,
//         active : false
//       });
//     });
//
//
//     it("Cell click should set selected state of grid", () =>{
//       var meta = getCellMetaData(component);
//       meta.onCellClick({idx : 2, rowIdx : 2 });
//       expect(component.state.selected).toEqual({idx : 2, rowIdx : 2 });
//     });
//
//
//   })
//
//
//   describe("When column is sortable", () => {
//
//     var sortableColIdx =1;
//     beforeEach(() => {
//       columns[sortableColIdx].sortable = true;
//       component = TestUtils.renderIntoDocument(<Grid {...testProps}/>);
//     })
//
//     afterEach(() => {
//       columns[sortableColIdx].sortable = false;
//     })
//
//     it("should provide column with a sortableHeaderRenderer", () => {
//       var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
//       var sortableColumn = baseGrid.props.columns[sortableColIdx];
//       expect(TestUtils.isElementOfType(sortableColumn.headerRenderer, SortableHeaderCellStub)).toBe(true);
//     });
//
//     it("should pass sort direction as props to headerRenderer when column is sortColumn", () => {
//       component.setState({sortDirection : 'ASC', sortColumn : columns[1].key});
//       var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
//       var sortableHeaderRenderer = baseGrid.props.columns[sortableColIdx].headerRenderer;
//       expect(sortableHeaderRenderer.props.sortDirection).toEqual('ASC');
//     });
//
//     it("should call onGridSort when headerRender click", () => {
//       //arrange
//       spyOn(testProps, 'onGridSort');
//       component = TestUtils.renderIntoDocument(<Grid {...testProps}/>);
//       component.setState({sortDirection : 'ASC', sortColumn : columns[1].key});
//       var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
//       var sortableHeaderRenderer = baseGrid.props.columns[sortableColIdx].headerRenderer;
//       //act
//       sortableHeaderRenderer.props.onSort('title', 'DESC');
//       //assert
//       expect(testProps.onGridSort).toHaveBeenCalled();
//       expect(testProps.onGridSort.calls.mostRecent().args[0]).toEqual('title');
//       expect(testProps.onGridSort.calls.mostRecent().args[1]).toEqual('DESC');
//     });
//
//
//   });
//
//
//
//
// });
