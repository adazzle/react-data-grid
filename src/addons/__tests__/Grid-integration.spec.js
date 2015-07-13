'use strict';
var React        = require('react');
var TestUtils    = require('react/lib/ReactTestUtils');
var ExampleGrid = require('../../../examples/scripts/example-full.js');
describe('Grid Integration', () => {
  var component;
  var handleCellDragSpy =  jasmine.createSpy("handleCellDrag");
  var renderGrid = function() {
    component = TestUtils.renderIntoDocument(<ExampleGrid handleCellDrag={handleCellDragSpy}/>);
  }
  describe('Grid Setup', () => {
    beforeEach(() => {
      renderGrid();
    });
    it("Creates the grid", () => {
      expect(component).toBeDefined();
    });

    it("Renders the grid", () => {
      TestUtils.isDOMComponent(component);
    })

    it("Renders 22 rows by default", () => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(component, 'react-grid-Row').length).toEqual(22);
    })
  });
  describe('Grid Drag', () => {
    beforeEach(() => {
      renderGrid();
    });
    var simulateDrag = function(args) {
      var rows = TestUtils.scryRenderedDOMComponentsWithClass(component,'react-grid-Row');
      var from = TestUtils.scryRenderedDOMComponentsWithClass(rows[args.from],'react-grid-Cell')[args.col];
      var to = TestUtils.scryRenderedDOMComponentsWithClass(rows[args.to],'react-grid-Cell')[args.col];
      var over = [];
      over.push(from)
      for(var i=args.from++;i<args.to;i++) {
        over.push(TestUtils.scryRenderedDOMComponentsWithClass(rows[i],'react-grid-Cell')[args.col])
      }
      over.push(to);
      //Act
      //do the drag
      //Important: we need dragStart / dragEnter / dragEnd
      TestUtils.Simulate.click(from.getDOMNode());
      TestUtils.Simulate.dragStart(from.getDOMNode());
      if(args.beforeEnter) {args.beforeEnter();}

      over.forEach((row) => {
        TestUtils.Simulate.dragEnter(row.getDOMNode())
      });
      if(args.beforeEnd) {args.beforeEnd();}
      TestUtils.Simulate.dragEnd(to.getDOMNode());

      return {from, to};
    }
    it("Drags a column", () => {
      //Arrange
      //get the cell to drag from / to
      var res = simulateDrag({from:0,to:4,col:3})
      //Assert
      //check onCellDrag called with correct data
      expect(handleCellDragSpy).toHaveBeenCalled();
      //Note - fake date is random, so need to test vs the assigned value as it WILL change (and bust the test)
      var expected= res.from.props.value;
      //chek our event returns the right data
      expect(handleCellDragSpy.argsForCall[0][0]).toEqual({cellKey: "title", fromRow: 0, toRow: 4, value: expected});
      //and the component
      expect(res.to.props.value).toEqual(expected);
      //and finally the rendered data
      //use trim as we are reading from the dom so get some whitespace at the end
      expect(TestUtils.findRenderedDOMComponentWithClass(res.to,'react-grid-Cell__value').getDOMNode().textContent.trim()).toEqual(expected.trim());
    });

    it("Shows drag selector", () => {
      //Arrange
      //get the cell to drag from / to
      var from = simulateDrag({
        from:2,to:5,col:3,
        beforeEnd: function() {
          //check we have the right classes
          expect(TestUtils.scryRenderedDOMComponentsWithClass(component,'is-dragged-over-down').length).toEqual(1);
          expect(TestUtils.scryRenderedDOMComponentsWithClass(component,'was-dragged-over').length).toEqual(2);
        }
      });
    });
  });
  describe('Editors', () => {
    beforeEach(() => {
      renderGrid();
    });

    it("Readonly is NOT Editable", () => {
      var cell = TestUtils.scryRenderedDOMComponentsWithClass(component,'react-grid-Cell')[1];
      TestUtils.Simulate.doubleClick(cell);
      //get the editor
      var editor = TestUtils.scryRenderedDOMComponentsWithTag(cell,'input');
      expect(editor.length).toBe(0);
    });
    var changeCell = function(args) {
      var row = TestUtils.scryRenderedDOMComponentsWithClass(component,'react-grid-Row')[args.row];
      var cell = TestUtils.scryRenderedDOMComponentsWithClass(row,'react-grid-Cell__value')[args.cell];
      //activate it
      TestUtils.Simulate.click(cell);// have to do click then doubleClick as thast what the browser would actually emit
      TestUtils.Simulate.doubleClick(cell);
      //get the editor
      var editor = TestUtils.scryRenderedDOMComponentsWithTag(cell,'input')[0];
      editor.getDOMNode().value = args.val; //remember to set the value via the dom node, not the component!
      TestUtils.Simulate.keyDown(editor,args.ev);
      //Assert

      if(!!args.expect.valChanged) expect(TestUtils.scryRenderedDOMComponentsWithClass(row,'react-grid-Cell')[args.cell].props.value).toEqual(args.val);
      //and should move to the appropriate cell/row
      row = TestUtils.scryRenderedDOMComponentsWithClass(component,'react-grid-Row')[args.expect.row];
      var selected = TestUtils.scryRenderedDOMComponentsWithClass(row,args.expect.className || 'selected');
      expect(selected.length).toEqual(1);
      expect(selected[0].props.rowIdx).toEqual(args.expect.row);
      expect(selected[0].props.idx).toEqual(args.expect.cell + 1);
      //note - idx is 1 based, not 0 based. We make that more sensible by adding 1, so your test cell idx matches up
    }
    it("Enter commits an edit", () => {
      changeCell({
        row:3,
        cell:5,
        val:'Test',
        ev:{key:'Enter'},
        expect:{row:3,cell:5}
      })
    });
    it("Can tab out of an Editor", () => {
      changeCell({
        row:3,
        cell:5,
        val:'Test',
        ev:{key:'Tab'},
        expect:{row:3,cell:6}
      })
    });
    it("Can shift+tab out of an Editor", () => {
      changeCell({
        row:3,
        cell:5,
        val:'Test',
        ev:{key:'Tab',shiftKey:true},
        expect:{row:3,cell:4}
      })
    });
    xit("Arrow Left doesnt commit your change if you are not at the start of the text", () => {
      changeCell({
        row:3,
        cell:5,
        val:'Test',
        ev:{key:'ArrowLeft'},
        expect:{row:3,cell:5,valChanged:false, className: 'editing'}
      })
    });

    it("Arrow Left does commit your change if you are at the start of the text", () => {
      changeCell({
        row:3,
        cell:5,
        val:'',
        ev:{key:'ArrowLeft'},
        expect:{row:3,cell:4}
      })
    });
    it("Arrow Right commits your change when you are at the end of the text", () => {
      changeCell({
        row:3,
        cell:5,
        val:'Test',
        ev:{key:'ArrowRight'},
        expect:{row:3,cell:6}
      })
    });

    it("Arrow Right doesnt commit your change when you are at the end of the text", () => {
      changeCell({
        row:3,
        cell:5,
        val:'Test',
        //TODO need to move left then right?
        ev:{key:'ArrowRight'},
        expect:{row:3,cell:6}
      })
    });
    it("Arrow Up commits your change", () => {
      changeCell({
        row:3,
        cell:5,
        val:'Test',
        ev:{key:'ArrowUp'},
        expect:{row:2,cell:5}
      })
    });
    it("Arrow Down commits your change", () => {
      changeCell({
        row:3,
        cell:5,
        val:'Test',
        ev:{key:'ArrowDown'},
        expect:{row:4,cell:5}
      })
    });
  });
});
