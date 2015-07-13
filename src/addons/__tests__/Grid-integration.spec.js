'use strict';
var React        = require('react');
var TestUtils    = require('react/lib/ReactTestUtils');
var ExampleGrid = require('../../../examples/scripts/example14-all-features-immutable');

class GridRunner {
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
  keyDown(ev) {
    TestUtils.Simulate.keyDown(this.getEditor(),ev);
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
  hasDragged({from,to,col,cellKey}) {
    //check onCellDrag called with correct data
    expect(this.handleCellDragSpy).toHaveBeenCalled();
    //Note - fake date is random, so need to test vs the assigned value as it WILL change (and bust the test)
    var expected= this.cell.props.value;
    //chek our event returns the right data
    expect(this.handleCellDragSpy.argsForCall[0][0]).toEqual({cellKey: cellKey, fromRow: from, toRow: to, value: expected});
    //and the component
    const rows = TestUtils.scryRenderedDOMComponentsWithClass(this.grid,'react-grid-Row');
    const toCell = TestUtils.scryRenderedDOMComponentsWithClass(rows[to],'react-grid-Cell')[col];

    expect(toCell.props.value).toEqual(expected);
    //and finally the rendered data
    //use trim as we are reading from the dom so get some whitespace at the end
    expect(TestUtils.findRenderedDOMComponentWithClass(toCell,'react-grid-Cell__value').getDOMNode().textContent.trim()).toEqual(expected.trim());
  }

}


describe('Grid Integration', () => {
  describe('Grid Setup', () => {
    it("Creates the grid", () => {
      expect(new GridRunner({}).grid).toBeDefined();
    });

    it("Renders the grid", () => {
      TestUtils.isDOMComponent(new GridRunner({}).grid);
    })

    it("Renders 22 rows by default", () => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(new GridRunner({}).grid, 'react-grid-Row').length).toEqual(22);
    })
  });
  describe('Grid Drag', () => {
    it("Shows drag selector", () => {
      new GridRunner({})
      .drag({from:0,to:4,col:3,
      beforeEnd: function() {
        //check we have the right classes
        expect(TestUtils.scryRenderedDOMComponentsWithClass(component,'is-dragged-over-down').length).toEqual(1);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(component,'was-dragged-over').length).toEqual(2);
      }})
    });
    it("Drags a column", () => {
      new GridRunner({})
      .drag({from:0,to:4,col:3})
      .hasDragged({from:0,to:4,col:3,cellKey:'title'})
    });
  });
  describe('Editors', () => {
    it("Readonly columns are NOT Editable", () => {
      new GridRunner({})
      .clickIntoEditor({cellIdx:0,rowIdx:3})
      .isNotEditable();
    });
    it("Enter commits an edit", () => {
      new GridRunner({})
        .changeCell({
          select: {row:3, cell:5},
          val:'Test',
          ev:{key:'Enter'},
          expectToSelect: {row:3,cell:5}
        })

    });
    it("Can tab out of an Editor", () => {
      new GridRunner({})
      .changeCell({
        select: {row:3, cell:5},
        val:'Test',
        ev:{key:'Tab'},
        expectToSelect: {row:3,cell:6}
      })
    });
    it("Can shift+tab out of an Editor", () => {
      new GridRunner({})
      .changeCell({
        select: {row:3, cell:5},
        val:'Test',
        ev:{key:'Tab',shiftKey:true},
        expectToSelect: {row:3,cell:4}
      })
    });
    it("Arrow Left doesnt commit your change if you are not at the start of the text", () => {
      new GridRunner({renderIntoBody: true})
        .clickIntoEditor({rowIdx:3, cellIdx:5})
        .setValue('Test')
        .setCursor(2)
        .keyDown({key:'ArrowLeft'})
        .isEditable()
        .dispose();
    });

    it("Arrow Left does commit your change if you are at the start of the text", () => {
      new GridRunner({})
      //by default we are at pos 0 with a blank value
      .changeCell({
        select: {row:3, cell:5},
        val:'',
        ev:{key:'ArrowLeft'},
        expectToSelect: {row:3,cell:4}
      })
    });
    it("Arrow Right commits your change when you are at the end of the text", () => {
      new GridRunner({renderIntoBody: true})
        .clickIntoEditor({rowIdx:3, cellIdx:5})
        .setValue('Test')
        .setCursor(4)
        .keyDown({key:'ArrowRight'})
        .hasCommitted('Test')
        .hasSelected({rowIdx:3,cellIdx:6})
        .dispose();
    });

    it("Arrow Right doesnt commit your change when you are at the end of the text", () => {
      new GridRunner({renderIntoBody: true})
        .clickIntoEditor({rowIdx:3, cellIdx:5})
        .setValue('Test')
        .setCursor(2)
        .keyDown({key:'ArrowRight'})
        .isEditable()
        .dispose();
    });
    it("Arrow Up commits your change", () => {
      new GridRunner({})
        .changeCell({
        select: {row:3, cell:5},
        val:'Test',
        ev:{key:'ArrowUp'},
        expectToSelect: {row:2,cell:5}
      })
    });
    it("Arrow Down commits your change", () => {
      new GridRunner({})
        .changeCell({
        select: {row:3, cell:5},
        val:'Test',
        ev:{key:'ArrowDown'},
        expectToSelect: {row:4,cell:5}
      })
    });
  });
});
