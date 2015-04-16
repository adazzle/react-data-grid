'use strict';
var React        = require('react');
var rewire       = require('rewire');
var Grid         =  rewire('../grids/ReactDataGrid.js');
var TestUtils    = require('react/lib/ReactTestUtils');
var rewireModule = require("../../../test/rewireModule");
var StubComponent = require("../../../test/StubComponent");

var columns = [
{
  key   : 'id',
  name  : 'ID',
  width : 100
},
{
  key: 'title',
  name: 'Title',
  width : 100
},
{
  key: 'count',
  name: 'Count',
  width : 100
},
]


var _rows = [];
for (var i = 0; i < 1000; i++) {
  _rows.push({
    id: i,
    title: 'Title ' + i,
    count: i * 1000
  });
}

var rowGetter = function(i){
  return _rows[i];
}

describe('Grid', () => {
  var component;
  var BaseGridStub = StubComponent('BaseGrid');
  // Configure local variable replacements for the module.
  rewireModule(Grid, {
    BaseGrid : BaseGridStub
  });

  var testProps = {
    enableCellSelect: true,
    columns:columns,
    rowGetter:rowGetter,
    rowsCount: _rows.length,
    width:300,
    onRowUpdated : function(update){}
  }

  beforeEach(() => {
    var rowsCount = 1000;
    component = TestUtils.renderIntoDocument(<Grid {...testProps}/>);
  });

  it('should create a new instance of Grid', () => {
    expect(component).toBeDefined();
  });

  it('should render a BaseGrid stub', () => {
    var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
    expect(baseGrid).toBeDefined();
  });

  it("should be initialized with correct state", () => {
    expect(component.state).toEqual({
      selectedRows : [],
      selected : {rowIdx : 0,  idx : 0},
      copied : null,
      canFilter : false,
      expandedRows : [],
      columnFilters : {},
      sortDirection : null,
      sortColumn : null,
      dragged : null
    });
  });

  describe("When cell selection disabled", () => {

    it("grid should be initialized with selected state of {rowIdx : -1, idx : -1}", () => {
      component = TestUtils.renderIntoDocument(<Grid
        enableCellSelect={false}
        columns={columns}
        rowGetter={rowGetter}
        rowsCount={_rows.length}
        width={300}/>);
      expect(component.state.selected).toEqual({
        rowIdx : -1,
        idx : -1
      });
    });

  });

  describe("User Interaction",() => {

    describe("When selected cell is in top corner of grid", () => {

      beforeEach(() => {
        component.setState({selected  : {idx : 0, rowIdx : 0}});
      });

      it("on ArrowUp keyboard event should not change selected index", () => {
        var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
        var fakeEvent = {key : 'ArrowUp', preventDefault : function(){}, stopPropagation : function(){}};
        baseGrid.props.onViewportKeydown(fakeEvent);
        expect(component.state.selected).toEqual({
          idx : 0,
          rowIdx : 0
        });
      });

      it("on ArrowLeft keyboard event should not change selected index", () => {
        var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
        var fakeEvent = {key : 'ArrowLeft', preventDefault : function(){}, stopPropagation : function(){}};
        baseGrid.props.onViewportKeydown(fakeEvent);
        expect(component.state.selected).toEqual({
          idx : 0,
          rowIdx : 0
        });
      });

    });

    describe("When selected cell has adjacent cells on all sides", () => {

      beforeEach(() => {
        component.setState({selected  : {idx : 1, rowIdx : 1}});
      });

      it("on ArrowRight keyboard event should increment selected cell index by 1", () => {
        var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
        var fakeEvent = {key : 'ArrowRight', preventDefault : function(){}, stopPropagation : function(){}};
        baseGrid.props.onViewportKeydown(fakeEvent);
        expect(component.state.selected).toEqual({
          idx : 2,
          rowIdx : 1
        });
      });

      it("on ArrowDown keyboard event should increment selected row index by 1", () => {
        var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
        var fakeEvent = {key : 'ArrowDown', preventDefault : function(){}, stopPropagation : function(){}};
        baseGrid.props.onViewportKeydown(fakeEvent);
        expect(component.state.selected).toEqual({
          idx : 1,
          rowIdx : 2
        });
      });

      it("on ArrowLeft keyboard event should decrement selected row index by 1", () => {
        var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
        var fakeEvent = {key : 'ArrowLeft', preventDefault : function(){}, stopPropagation : function(){}};
        baseGrid.props.onViewportKeydown(fakeEvent);
        expect(component.state.selected).toEqual({
          idx : 0,
          rowIdx : 1
        });
      });

      it("on ArrowUp keyboard event should decrement selected row index by 1", () => {
        var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
        var fakeEvent = {key : 'ArrowUp', preventDefault : function(){}, stopPropagation : function(){}};
        baseGrid.props.onViewportKeydown(fakeEvent);
        expect(component.state.selected).toEqual({
          idx : 1,
          rowIdx : 0
        });
      });
    });



    it("if column is editable, double click on grid should ctivate current selected cell", () => {
      component.setState({selected : {idx : 1, rowIdx : 1}});
      columns[1].editable = true;
      var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
      baseGrid.props.onViewportDoubleClick();
      expect(component.state.selected).toEqual({
        idx : 1,
        rowIdx : 1,
        active : true
      })
    });

    it("if column is not editable, double click on grid should not activate current selected cell", () => {
      component.setState({selected : {idx : 1, rowIdx : 1}});
      columns[1].editable = false;
      var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
      baseGrid.props.onViewportDoubleClick();
      expect(component.state.selected).toEqual({
        idx : 1,
        rowIdx : 1
      })
    });

  })

  describe("Cell Meta Data", () => {

    it('creates a cellMetaData object and passes to baseGrid as props', () => {
      var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
      var meta = baseGrid.props.cellMetaData;
      expect(meta).toEqual(jasmine.objectContaining({
        selected : {rowIdx : 0, idx : 0},
        dragged  : null,
        copied   : null
      }));
      expect(typeof meta.onCellClick === 'function').toBe(true);
      expect(typeof meta.onCommit === 'function').toBe(true);
      expect(typeof meta.onCommitCancel === 'function').toBe(true);
      expect(typeof meta.handleDragEnterRow === 'function').toBe(true);
      expect(typeof meta.handleTerminateDrag === 'function').toBe(true);
    });

    it("Changing Grid state should update cellMetaData", () => {
      var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
      var newState = {selected  : {idx : 2, rowIdx : 2}, dragged : {idx : 2, rowIdx : 2}}
      component.setState(newState);
      var meta = baseGrid.props.cellMetaData;
      expect(meta).toEqual(jasmine.objectContaining(newState));
    });

    it("cell commit should trigger onRowUpdated with correct params", () => {
      spyOn(testProps, 'onRowUpdated');
      component = TestUtils.renderIntoDocument(<Grid {...testProps}/>);
      var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
      var meta = baseGrid.props.cellMetaData;
      var fakeCellUpdate = {cellKey: "title", rowIdx: 0, updated: {title : 'some new title'}, key: "Enter"}
      meta.onCommit(fakeCellUpdate);
      expect(testProps.onRowUpdated.callCount).toEqual(1);
      expect(testProps.onRowUpdated.argsForCall[0][0]).toEqual({
        cellKey: "title", rowIdx: 0, updated: {title : 'some new title'}, key: "Enter"
      })
    });

    it("cell commit should deactivate selected cell", () => {
      component.setState({selected : {idx : 3, rowIdx : 3, active : true}});
      var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
      var meta = baseGrid.props.cellMetaData;
      var fakeCellUpdate = {cellKey: "title", rowIdx: 0, updated: {title : 'some new title'}, key: "Enter"}
      meta.onCommit(fakeCellUpdate);
      expect(component.state.selected).toEqual({
          idx : 3,
          rowIdx : 3,
          active : false
        });
    });

  })






});
