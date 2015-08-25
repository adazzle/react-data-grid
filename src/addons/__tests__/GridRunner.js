var React        = require('react');
var TestUtils    = require('react/lib/ReactTestUtils');
var ExampleGrid = require('../../../examples/scripts/example14-all-features-immutable');
var ReactDataGrid = require('../grids/ReactDataGrid');

export default class GridRunner {
  /* =====
  SETUP
  ======== */
  constructor({renderIntoBody=false}) {
    this.grid = this._renderGrid(renderIntoBody);
    this.renderIntoBody=renderIntoBody;
  }

  _renderGrid(intoBody) {
    this.handleCellDragSpy =  jasmine.createSpy("handleCellDrag");
    return intoBody ?
      React.render(<ExampleGrid handleCellDrag={this.handleCellDragSpy}/>, document.body)
      : TestUtils.renderIntoDocument(<ExampleGrid handleCellDrag={this.handleCellDragSpy}/>);
  }

  dispose() {
    if(this.renderIntoBody) {
      React.unmountComponentAtNode(document.body);
    }
    this.grid = null;
  }

  /* =====
  HELPERS
  ======== */
  //Helpers - these are just wrappers to run several steps
  //NOTE: these are 'final' functions, ie they call dispose at the end
  changeCell({select:{cell:selectCell,row:selectRow},val,ev,expectToSelect:{row:expectRow,cell:expectCell}}) {
    this
      .clickIntoEditor({cellIdx:selectCell,rowIdx:selectRow})
      .setValue(val)
      .keyDown(ev)
      .hasCommitted(val)
      .hasSelected({cellIdx:expectCell,rowIdx:expectRow})
      .dispose();
  }

  /* =====
  ACTIONS
  ======== */
  selectCell({cellIdx,rowIdx}) {
    this.row = TestUtils.scryRenderedDOMComponentsWithClass(this.grid,'react-grid-Row')[rowIdx];
    this.cell = TestUtils.scryRenderedDOMComponentsWithClass(this.row,'react-grid-Cell')[cellIdx];
    TestUtils.Simulate.click(this.cell);
    return this;
  }

  clickIntoEditor({cellIdx,rowIdx}) {
    //activate it
    // have to do click then doubleClick as thast what the browser would actually emit
    this.selectCell({cellIdx,rowIdx})
    TestUtils.Simulate.doubleClick(this.cell);
    return this;
  }
  getEditor() {
    return TestUtils.scryRenderedDOMComponentsWithTag(this.cell,'input')[0];
  }
  setValue(val) {
    this.getEditor().getDOMNode().value = val;
    //remember to set the value via the dom node, not the component!
    return this;
  }
  //you MUST have set the grid to render into body to use this
  //chrome (et al) dont do cursor positions unless you are properly visibile
  setCursor(start,end=start) {
    const input = this.getEditor().getDOMNode();
    input.setSelectionRange(start,end);
    expect(input.selectionStart).toEqual(start,`Couldnt set the cursor.
            You probably havent rendered the grid into the *actual* dom.
            You need to specify renderIntoBody:true in the constructor for GridRunner`)
    return this;
  }
  keyDown(ev, element=this.getEditor()) {
    TestUtils.Simulate.keyDown(element,ev);
    return this;
  }

  copy() {
    this.keyDown({keyCode: 67, ctrlKey: true}, this.cell.getDOMNode());
    return this;
  }

  drag({from, to, col,beforeDragEnter=null,beforeDragEnd=null}) {
    this.selectCell({cellIdx:col,rowIdx:from})

    const rows = TestUtils.scryRenderedDOMComponentsWithClass(this.grid,'react-grid-Row');
    let over = [];
    over.push(this.row);
    for(let i=from++;i<to;i++) {
      over.push(TestUtils.scryRenderedDOMComponentsWithClass(rows[i],'react-grid-Cell')[col])
    }
    const toCell = TestUtils.scryRenderedDOMComponentsWithClass(rows[to],'react-grid-Cell')[col];
    over.push(toCell);

    //Act
    //do the drag
    //Important: we need dragStart / dragEnter / dragEnd
    TestUtils.Simulate.dragStart(this.row.getDOMNode());
    if(beforeDragEnter) {beforeDragEnter();}

    over.forEach((r) => {
      TestUtils.Simulate.dragEnter(r.getDOMNode())
    });
    if(beforeDragEnd) {beforeDragEnd();}
    TestUtils.Simulate.dragEnd(toCell.getDOMNode());

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
  //   expect(hCell.getDOMNode().style.width).toBe(expectedWidth);
  //   return this;
  // }
  // triggerMouseEvent (eventName, pageX) {
  //   var $el = $(window);
  //   var offset = $el.offset();
  //   var event = jQuery.Event(eventName, {
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
    expect(this.getEditor()).toBe(undefined);
    return this;
  }
  isEditable() {
    expect(this.getEditor()).not.toBe(undefined);
    return this;
  }
  hasSelected({rowIdx,cellIdx,expectedClass='selected'}) {
    //and should move to the appropriate cell/row
    const selectedRow = TestUtils.scryRenderedDOMComponentsWithClass(this.grid,'react-grid-Row')[rowIdx];
    const selected = TestUtils.scryRenderedDOMComponentsWithClass(selectedRow,expectedClass);
    expect(selected.length).toEqual(1);
    expect(selected[0].props.rowIdx).toEqual(rowIdx);
    expect(selected[0].props.idx).toEqual(cellIdx + 1);
    //note - idx is 1 based, not 0 based.
    //We make that more sensible by adding 1, so your test cell idx matches up
    return this;
  }
  hasCopied({cellIdx, rowIdx, value}) {
    var baseGrid = TestUtils.findRenderedComponentWithType(this.grid, ReactDataGrid);
    expect(baseGrid.state.copied.idx).toEqual(cellIdx + 1); // increment by 1 due to checckbox col
    expect(baseGrid.state.copied.rowIdx).toEqual(rowIdx);
    expect(this.cell.getDOMNode().className.indexOf(' copied ') > -1).toBe(true);
  }
  hasDragged({from,to,col,cellKey}) {
    //check onCellDrag called with correct data
    expect(this.handleCellDragSpy).toHaveBeenCalled();
    //Note - fake date is random, so need to test vs the assigned value as it WILL change (and bust the test)
    var expected= this.cell.props.value;
    //chek our event returns the right data
    expect(this.handleCellDragSpy.argsForCall[0][0]).toEqual({cellKey: cellKey, fromRow: from, toRow: to, value: expected});
    // Test all rows to check that value has copied correctly
    const rows = TestUtils.scryRenderedDOMComponentsWithClass(this.grid,'react-grid-Row');
    for (let i = from, end = to; i <= end; i++) {
      const toCell = TestUtils.scryRenderedDOMComponentsWithClass(rows[i],'react-grid-Cell')[col];
      // First the component
      expect(toCell.props.value).toEqual(expected);
      // and finally the rendered data
      // (use trim as we are reading from the dom so get some whitespace at the end)
      expect(TestUtils.findRenderedDOMComponentWithClass(toCell,'react-grid-Cell__value').getDOMNode().textContent.trim()).toEqual(expected.trim());
    }
  }

}
