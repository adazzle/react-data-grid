const React        = require('react');
const ReactDOM = require('react-dom');
const TestUtils    = require('react/lib/ReactTestUtils');
const ExampleGrid = require('../../../examples/scripts/example14-all-features-immutable');

export default class GridRunner {
  /* =====
  SETUP
  ======== */
  constructor({renderIntoBody = false}) {
    this.grid = this._renderGrid(renderIntoBody);
    this.renderIntoBody = renderIntoBody;
  }

  _renderGrid(intoBody) {
    this.handleCellDragSpy = jasmine.createSpy('handleCellDrag');
    return intoBody ?
      ReactDOM.render(<ExampleGrid handleCellDrag={this.handleCellDragSpy}/>, document.body)
      : TestUtils.renderIntoDocument(<ExampleGrid handleCellDrag={this.handleCellDragSpy}/>);
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
    this.row = TestUtils.scryRenderedDOMComponentsWithClass(this.grid, 'react-grid-Row')[rowIdx];
    this.cell = this.getCells(this.row)[cellIdx];
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

  selectCell({cellIdx, rowIdx}) {
    this.row = TestUtils.scryRenderedDOMComponentsWithClass(this.grid, 'react-grid-Row')[rowIdx];
    this.cell = this.getCells(this.row)[cellIdx];
    TestUtils.Simulate.click(this.cell);
    return this;
  }

  getCells(row) {
    let allCells = row.querySelectorAll('.react-grid-Cell');
    let cells = [];

    for (let i = 0; i < allCells.length; i++) {
      cells[i] = allCells[i];
    }

    if (this.grid.refs.reactDataGrid.props.enableRowSelect) {
      // the rowSelectCell exists on the end of the array returned from testUtils
      let rowSelectCell = cells.pop();
      // remove from end of array and put at beginning
      cells.unshift(rowSelectCell);
    }
    return cells;
  }

  clickIntoEditor({cellIdx, rowIdx}) {
    // activate it
    // have to do click then doubleClick as thast what the browser would actually emit
    this.selectCell({cellIdx, rowIdx});
    TestUtils.Simulate.doubleClick(this.cell);
    return this;
  }
  getEditor() {
    return this.cell.querySelector('input');
  }
  setValue(val) {
    ReactDOM.findDOMNode(this.getEditor()).value = val;
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
    TestUtils.Simulate.keyDown(element, ev);
    return this;
  }

  copy() {
    this.keyDown({keyCode: 67, ctrlKey: true}, ReactDOM.findDOMNode(this.cell));
    return this;
  }

  drag({from, to, col, beforeDragEnter = null, beforeDragEnd = null}) {
    this.selectCell({cellIdx: col, rowIdx: from});

    const rows = TestUtils.scryRenderedDOMComponentsWithClass(this.grid, 'react-grid-Row');
    let over = [];
    over.push(this.row);
    let fromIterator = from;

    for (let i = fromIterator++; i < to; i++) {
      over.push(this.getCells(rows[i])[col]);
    }
    const toCell = this.getCells(rows[to])[col];
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
  // @jpdriver - commented out for now because this was a pain to write an integration test for
  // we should rewrite the drag events not to attach to the window
  //
  // resize({idx, toWidth}) {
  //   let column = TestUtils.scryRenderedDOMComponentsWithClass(this.grid, 'react-grid-HeaderCell')[idx];
  //   const resizeHeaderCellHandles = TestUtils.scryRenderedDOMComponentsWithClass(this.grid, 'react-grid-HeaderCell__draggable');
  //   let draggable= resizeHeaderCellHandles[idx];
  //   let mouseDownEvent = {
  //     dataTransfer: {
  //       setData:jasmine.createSpy()
  //     }
  //   };
  //   let goToWidth = column.props.style.left + column.props.style.width + toWidth;
  //
  //   TestUtils.Simulate.mouseDown(draggable, mouseDownEvent);
  //   this.triggerMouseEvent('mousemove', goToWidth);
  //   this.triggerMouseEvent('mouseup', goToWidth);
  //   return this;
  // }
  // hasBeenResized({idx, toWidth}) {
  //   const hCell = TestUtils.scryRenderedDOMComponentsWithClass(this.grid, 'react-grid-HeaderCell')[0];
  //   let expectedWidth = toWidth.toString() + 'px';
  //   expect(ReactDOM.findDOMNode(hCell)).style.width).toBe(expectedWidth);
  //   return this;
  // }
  // triggerMouseEvent (eventName, pageX) {
  //   let $el = $(window);
  //   let offset = $el.offset();
  //   let event = jQuery.Event(eventName, {
  //     which: 1,
  //     pageX: pageX,
  //     pageY: offset.top
  //   });
  //   $el.trigger(event);
  // }

  /* =====
  ASSERTS
  ======== */
  hasCommitted(val) {
    expect(this.cell.props.value).toEqual(val);
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
    const selectedRow = TestUtils.scryRenderedDOMComponentsWithClass(this.grid, 'react-grid-Row')[rowIdx];
    const selected = selectedRow.querySelector(expectedClass);
    expect(selected.props.rowIdx).toEqual(rowIdx);
    expect(selected.props.idx).toEqual(cellIdx);
    return this;
  }
  hasCopied({cellIdx, rowIdx}) {
    let baseGrid = this.grid.refs.reactDataGrid;
    expect(baseGrid.state.copied.idx).toEqual(cellIdx); // increment by 1 due to checckbox col
    expect(baseGrid.state.copied.rowIdx).toEqual(rowIdx);
    expect(ReactDOM.findDOMNode(this.cell).className.indexOf(' copied ') > -1).toBe(true);
  }
  hasDragged({from, to, col, cellKey}) {
    // check onCellDrag called with correct data
    expect(this.handleCellDragSpy).toHaveBeenCalled();
    // Note - fake date is random, so need to test vs the assigned value as it WILL change (and bust the test)
    let expected = this.cell.props.value;
    // chek our event returns the right data
    expect(this.handleCellDragSpy.argsForCall[0][0]).toEqual({cellKey: cellKey, fromRow: from, toRow: to, value: expected});
    // Test all rows to check that value has copied correctly
    const rows = TestUtils.scryRenderedDOMComponentsWithClass(this.grid, 'react-grid-Row');
    for (let i = from, end = to; i <= end; i++) {
      const toCell = this.getCells(rows[i])[col];
      // First the component
      expect(toCell.props.value).toEqual(expected);
      // and finally the rendered data
      // (use trim as we are reading from the dom so get some whitespace at the end)
      expect(ReactDOM.findDOMNode(toCell.querySelector('.react-grid-Cell__value')).textContent.trim()).toEqual(expected.trim());
    }
  }
}
