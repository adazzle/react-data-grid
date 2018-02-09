import React from 'react';
import ReactDOM from 'react-dom';
import ReactDataGrid from '../ReactDataGrid';
import { shallow } from 'enzyme';
import * as helpers from '../helpers/test/GridPropHelpers';
import { UpdateActions } from '../AppConstants';

const ROW_KEY = 'id';

function shallowRenderGrid({
  enableCellAutoFocus = undefined,
  cellNavigationMode = undefined,
  numRows = helpers.rowsCount(),
  onCellSelected,
  onCellDeSelected,
  onGridRowsUpdated
}) {
  const enzymeWrapper = shallow(<ReactDataGrid
    rowKey={ROW_KEY}
    columns={helpers.columns}
    rowGetter={helpers.rowGetter}
    rowsCount={numRows}
    enableCellSelect
    enableCellAutoFocus={enableCellAutoFocus}
    cellNavigationMode={cellNavigationMode}
    onCellSelected={onCellSelected}
    onCellDeSelected={onCellDeSelected}
    onGridRowsUpdated={onGridRowsUpdated}
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
  const props = {
    cellNavigationMode: 'none',
    onCellSelected: jasmine.createSpy(),
    onCellDeSelected: jasmine.createSpy(),
    onGridRowsUpdated: jasmine.createSpy()
  };
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

describe('onGridRowsUpdated', () => {
  const CELL_KEY = 'column1';

  const getRow = (rowKey) => { return { ROW_KEY: rowKey }; };
  const testOnGridRowsUpdated = (rowKeys, expectedUpdatedRowIds, action =  UpdateActions.CELL_UPDATE) => {
    const updatedRows = rowKeys.map(rowKey => getRow(rowKey));
    const updatedRowData = { CELL_KEY: 'update' };
    const fromRow =  updatedRows[0];
    const toRow =  updatedRows[updatedRows.length - 1];

    const grid = shallowRenderGridWithSelectionHandlers();
    grid.onGridRowsUpdated(CELL_KEY, fromRow, toRows, updatedRowData, action, fromRow);
    expect(grid.props.onGridRowsUpdated).toHaveBeenCalledWith({
      cellKey: CELL_KEY,
      fromRow,
      toRow,
      fromRowId: fromRow[ROW_KEY],
      toRowId: toRow[ROW_KEY],
      rowIds: expectedUpdatedRowIds,
      updated: updatedRowData,
      action,
      fromRowData: fromRow
    });
  };

  it('should update target row if one row is updated', () => {
    testOnGridRowsUpdated([1], [1]);
  });

  it('should not update "from row" if multiple rows are updated', () => {
    testOnGridRowsUpdated([1, 2, 3], [2, 3], UpdateActions.CELL_DRAG);
  });
});
