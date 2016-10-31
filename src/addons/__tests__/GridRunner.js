const React        = require('react');
const ReactDOM = require('react-dom');
const TestUtils    = require('react/lib/ReactTestUtils');
const ExampleGrid = require('../../../examples/scripts/example14-all-features-immutable');
import { mount } from 'enzyme';

export default class GridRunner {
  /* =====
  SETUP
  ======== */
  constructor({renderIntoBody = false, GridUnderTest = ExampleGrid}) {
    this.renderIntoBody = renderIntoBody;
    this.example = GridUnderTest;
    this.gridWrapper = this._renderGrid(renderIntoBody);
    this.grid = this.gridWrapper.node;
  }

  _renderGrid(intoBody) {
    let Example = this.example;
    this.handleCellDragSpy = jasmine.createSpy('handleCellDrag');
    let options = intoBody ? { attachTo: document.body } : { };
    let gridWrapper = mount(<Example handleCellDrag={this.handleCellDragSpy} />, options);

    return gridWrapper;
  }

  dispose() {
    if (this.renderIntoBody) {
      ReactDOM.unmountComponentAtNode(document.body);
    }
    this.grid = null;
  }

  /* =====
  HELPERS
  ======== */
  // Helpers - these are just wrappers to run several steps
  // NOTE: these are 'final' functions, ie they call dispose at the end
  changeCell({select: {cell: selectCell, row: selectRow}, val, ev, expectToSelect: {row: expectRow, cell: expectCell}}) {
    this
      .clickIntoEditor({cellIdx: selectCell, rowIdx: selectRow})
      .setValue(val)
      .keyDown(ev)
      .hasCommitted(val)
      .hasSelected({cellIdx: expectCell, rowIdx: expectRow})
      .dispose();
  }

  /* =====
  ACTIONS
  ======== */
  rightClickCell({cellIdx, rowIdx}) {
    this.row = this.getRow(rowIdx);
    this.cell = this.getCell({ cellIdx, rowIdx });
    TestUtils.Simulate.contextMenu(this.cell);
    return this;
  }

  getContextMenu() {
    let menus = document.getElementsByClassName('react-context-menu');
    return menus.length > 0 ? menus[menus.length - 1] : undefined;
  }

  getContextMenuItem() {
    let menuItems = document.getElementsByClassName('react-context-menu-link');
    return menuItems.length > 0 ? menuItems[menuItems.length - 1] : undefined;
  }

  isContextMenuVisible() {
    return this.getContextMenu() !== undefined;
  }

  clickContextMenuLink() {
    TestUtils.Simulate.click(this.getContextMenuItem());
    return this;
  }

  selectCell(coords) {
    this.row = this.getRow(coords.rowIdx);
    this.cell = this.getCell(coords);
    this.cell.simulate('click');
    return this;
  }

  getDisplayInfo() {
    const { displayStart, colDisplayStart, displayEnd, colDisplayEnd } = this.grid.refs.reactDataGrid.refs.base.refs.viewport.state;

    return { displayStart, colDisplayStart, displayEnd, colDisplayEnd };
  }

  getRealPosition(originalCellIdx, originalRowIdx ) {
    const { displayStart, colDisplayStart } = this.getDisplayInfo();
    let relativeCellIdx = originalCellIdx - colDisplayStart;
    let relativeRowIdx = originalRowIdx - displayStart;

    return { relativeCellIdx, relativeRowIdx };
  }

  getRenderedRows() {
    // find rows by displayName
    return this.gridWrapper.find('Row');
  }

  getRenderedHeaderCells() {
    return ReactDOM.findDOMNode(this.grid).querySelectorAll('.react-grid-HeaderCell');
  }

  getRow(rowIdx) {
    const { relativeRowIdx } = this.getRealPosition(0, rowIdx);

    return this.getRenderedRows().at(relativeRowIdx);
  }

  getCell({cellIdx, rowIdx}) {
    const { relativeCellIdx } = this.getRealPosition(cellIdx, rowIdx);

    let row = this.getRow(rowIdx);
    return this.getCellsFromRow(row).at(relativeCellIdx);
  }

  getCellsFromRow(row) {
    return row.find('Cell'); // don't return locked checkbox select cell'
  }

  getCells(row) {
    let allCells = this.getCellsFromRow(row);
    let cells = [];

    for (let i = 0; i < allCells.length; i++) {
      cells[i] = allCells[i];
    }

    return cells;
  }

  clickIntoEditor({cellIdx, rowIdx}) {
    // activate it
    // have to do click then doubleClick as thast what the browser would actually emit
    this.selectCell({cellIdx, rowIdx});
    this.cell.simulate('doubleClick');
    return this;
  }
  getEditor() {
    return this.cell.find('input');
  }
  setValue(val) {
    this.getEditor().node.value = val;
    // remember to set the value via the dom node, not the component!
    return this;
  }
  // you MUST have set the grid to render into body to use this
  // chrome (et al) dont do cursor positions unless you are properly visibile
  setCursor(start, end = start) {
    const input = ReactDOM.findDOMNode(this.getEditor());
    input.setSelectionRange(start, end);
    expect(input.selectionStart).toEqual(start, `Couldnt set the cursor.
            You probably havent rendered the grid into the *actual* dom.
            You need to specify renderIntoBody:true in the constructor for GridRunner`);
    return this;
  }
  keyDown(ev, element = this.getEditor()) {
    element.simulate('keyDown', ev);
    return this;
  }

  copy() {
    this.keyDown({keyCode: 67, ctrlKey: true}, ReactDOM.findDOMNode(this.cell.node));
    return this;
  }

  drag({from, to, col, beforeDragEnter = null, beforeDragEnd = null}) {
    this.selectCell({cellIdx: col - 1, rowIdx: from});

    const rows = this.getRenderedRows();
    let over = [];
    over.push(this.row);
    let fromIterator = from;

    for (let i = fromIterator++; i < to; i++) {
      over.push(this.getCells(rows.get(i))[col]);
    }
    const toCell = this.getCells(rows.get(to))[col];
    over.push(toCell);

    // Act
    // do the drag
    // Important: we need dragStart / dragEnter / dragEnd
    TestUtils.Simulate.dragStart(ReactDOM.findDOMNode(this.row));
    if (beforeDragEnter) {beforeDragEnter();}

    over.forEach((r) => {
      TestUtils.Simulate.dragEnter(ReactDOM.findDOMNode(r));
    });
    if (beforeDragEnd) {beforeDragEnd();}
    TestUtils.Simulate.dragEnd(ReactDOM.findDOMNode(toCell));

    return this;
  }

  /* =====
  ASSERTS
  ======== */
  hasCommitted(val) {
    expect(this.cell.props().value).toEqual(val);
    return this;
  }
  isNotEditable() {
    expect(this.getEditor()).toBe(null);
    return this;
  }
  isEditable() {
    expect(this.getEditor()).not.toBe(null);
    return this;
  }
  hasSelected({rowIdx, cellIdx, expectedClass = '.selected'}) {
    // and should move to the appropriate cell/row
    const selectedRow = this.getRow(rowIdx);
    const selected = selectedRow.find(expectedClass);
    expect(selected.props().rowIdx).toEqual(rowIdx);
    expect(selected.props().idx).toEqual(cellIdx);
    return this;
  }
  hasCopied({cellIdx, rowIdx}) {
    let baseGrid = this.grid.refs.reactDataGrid;
    expect(baseGrid.state.copied.idx).toEqual(cellIdx); // increment by 1 due to checckbox col
    expect(baseGrid.state.copied.rowIdx).toEqual(rowIdx);
    expect(ReactDOM.findDOMNode(this.cell.node).className.indexOf(' copied ') > -1).toBe(true);
  }
  hasDragged({from, to, col, cellKey}) {
    // check onCellDrag called with correct data
    expect(this.handleCellDragSpy).toHaveBeenCalled();
    // Note - fake date is random, so need to test vs the assigned value as it WILL change (and bust the test)
    let expected = this.cell.props().value;
    // chek our event returns the right data
    expect(this.handleCellDragSpy.calls.first().args[0]).toEqual({cellKey: cellKey, fromRow: from, toRow: to, value: expected});
    // Test all rows to check that value has copied correctly
    const rows = TestUtils.scryRenderedDOMComponentsWithClass(this.grid, 'react-grid-Row');
    for (let i = from, end = to; i <= end; i++) {
      const toCell = this.getCells(rows[i])[col - 1];
      // First the component
      expect(toCell.props().value).toEqual(expected);
      // and finally the rendered data
      // (use trim as we are reading from the dom so get some whitespace at the end)
      expect(ReactDOM.findDOMNode(toCell.querySelector('.react-grid-Cell__value')).textContent.trim()).toEqual(expected.trim());
    }
  }
}
