const React        = require('react');
const ReactDOM = require('react-dom');
const TestUtils    = require('react-dom/test-utils');
const { Component: ExampleGrid } = require('../scripts/example14-all-features-immutable');
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
    this.cell.simulate('contextMenu');
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
    const { displayStart, colDisplayStart, displayEnd, colDisplayEnd } = this.grid.reactDataGrid.base.viewport.state;

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
    const input = ReactDOM.findDOMNode(this.getEditor().node);
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
    this.keyDown({keyCode: 67, ctrlKey: true}, this.cell);
    return this;
  }

  drag({from, to, col, beforeDragEnter = null, beforeDragEnd = null}) {
    this.selectCell({cellIdx: col - 1, rowIdx: from});
    let over = [];
    over.push(this.cell);
    let fromIterator = from;

    for (let i = fromIterator++; i < to; i++) {
      over.push(this.getCell({cellIdx: col, rowIdx: i}));
    }
    const toCell = this.getCell({cellIdx: col, rowIdx: to});
    over.push(toCell);

    // Act
    // do the drag
    // Important: we need dragStart / dragEnter / dragEnd
    this.cell.simulate('dragStart');
    if (beforeDragEnter) {beforeDragEnter();}

    over.forEach((cell) => {
      cell.simulate('dragEnter');
    });
    if (beforeDragEnd) {beforeDragEnd();}
    toCell.simulate('dragEnd');

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
    let editor = this.cell.find('input');
    expect(editor.nodes.length === 0).toBe(true);
    return this;
  }
  isEditable() {
    let editor = this.cell.find('input');
    expect(editor.nodes.length > 0).toBe(true);
    return this;
  }
  hasSelected({rowIdx, cellIdx}) {
    // and should move to the appropriate cell/row
    let cell = this.getCell({cellIdx, rowIdx});
    expect(cell.node.isSelected()).toBe(true);
    return this;
  }
  hasCopied({cellIdx, rowIdx}) {
    let baseGrid = this.grid.reactDataGrid;
    expect(baseGrid.state.copied.idx).toEqual(cellIdx); // increment by 1 due to checckbox col
    expect(baseGrid.state.copied.rowIdx).toEqual(rowIdx);
    expect(ReactDOM.findDOMNode(this.cell.node).className.indexOf('copied') > -1).toBe(true);
  }
  hasDragged({from, to, col, cellKey}) {
    // check onCellDrag called with correct data
    expect(this.handleCellDragSpy).toHaveBeenCalled();
    // Note - fake date is random, so need to test vs the assigned value as it WILL change (and bust the test)
    let expected = this.cell.props().value;
    // check our event returns the right data
    const args = this.handleCellDragSpy.calls.first().args[0];
    expect(args.cellKey).toEqual(cellKey);
    expect(args.fromRow).toEqual(from);
    expect(args.toRow).toEqual(to);
    expect(args.updated[args.cellKey]).toEqual(expected);
    for (let i = from, end = to; i <= end; i++) {
      const toCell = this.getCell({cellIdx: col - 1, rowIdx: i});
      // First the component
      expect(toCell.props().value).toEqual(expected);
      // and finally the rendered data
      // (use trim as we are reading from the dom so get some whitespace at the end)
      expect(toCell.find('.react-grid-Cell__value').node.textContent.trim()).toEqual(expected.trim());
    }
  }
}
