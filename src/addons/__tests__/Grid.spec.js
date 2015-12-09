'use strict';
var React         = require('react');
var rewire        = require('rewire');
var Grid          =  rewire('../grids/ReactDataGrid.js');
var TestUtils     = require('react/lib/ReactTestUtils');
var rewireModule  = require("../../../test/rewireModule");
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
  }
];

var _rows = [];
var _selectedRows = [];
var rowGetter = (i) => _rows[i];

for (var i = 0; i < 1000; i++) {
  _rows.push({
    id: i,
    title: `Title ${i}`,
    count: i * 1000
  });

  _selectedRows.push(false);
}

describe('Grid', function () {
  var BaseGridStub = StubComponent('BaseGrid');
  var CheckboxEditorStub = StubComponent('CheckboxEditor');

  // Configure local variable replacements for the module.
  rewireModule(Grid, {
    BaseGrid : BaseGridStub,
    CheckboxEditor : CheckboxEditorStub
  });

  var testProps = {
    enableCellSelect: true,
    columns:columns,
    rowGetter:rowGetter,
    rowsCount: _rows.length,
    width:300,
    onRowUpdated : function(update){},
    onCellCopyPaste : function(){},
    onCellsDragged : function(){},
    onGridSort : function(){}
  }

  beforeEach(function () {
    this.component = TestUtils.renderIntoDocument(<Grid {...testProps}/>);
  });

  it('should create a new instance of Grid', function () {
    expect(this.component).toBeDefined();
  });

  it('should render a BaseGrid stub', function () {
    var baseGrid = TestUtils.findRenderedComponentWithType(this.component, BaseGridStub);
    expect(baseGrid).toBeDefined();
  });

  it('should render a Toolbar if passed in as props to grid', function () {
    var Toolbar = StubComponent('Toolbar');
    this.component = TestUtils.renderIntoDocument(<Grid {...testProps} toolbar={<Toolbar/>} />);
    var toolbarInstance = TestUtils.findRenderedComponentWithType(this.component, Toolbar);
    expect(toolbarInstance).toBeDefined();
  });

  it('onToggleFilter trigger of Toolbar should set filter state of grid and render a filterable header row', function () {
    //arrange
    var Toolbar = StubComponent('Toolbar');
    this.component = TestUtils.renderIntoDocument(<Grid {...testProps} toolbar={<Toolbar/>} />);
    var toolbarInstance = TestUtils.findRenderedComponentWithType(this.component, Toolbar);
    //act
    toolbarInstance.props.onToggleFilter();
    //assert
    var baseGrid = TestUtils.findRenderedComponentWithType(this.component, BaseGridStub);
    expect(this.component.state.canFilter).toBe(true);
    expect(baseGrid.props.headerRows.length).toEqual(2);
    var filterableHeaderRow = baseGrid.props.headerRows[1];
    expect(filterableHeaderRow.ref).toEqual("filterRow");
  });

  it("should be initialized with correct state", function () {
    expect(this.component.state).toEqual({
      columnMetrics : { columns : [ { key : 'id', name : 'ID', width : 100, left : 0 }, { key : 'title', name : 'Title', width : 100, left : 100 }, { key : 'count', name : 'Count', width : 100, left : 200 } ], width : 300, totalWidth : 0, minColumnWidth : 80 },
      selectedRows : _selectedRows,
      selected : {rowIdx : 0,  idx : 0},
      copied : null,
      canFilter : false,
      expandedRows : [],
      columnFilters : {},
      sortDirection : null,
      sortColumn : null,
      dragged : null,
      scrollOffset: 0
    });
  });

  describe("When cell selection disabled", function () {

    it("grid should be initialized with selected state of {rowIdx : -1, idx : -1}", function () {
      this.component = TestUtils.renderIntoDocument(<Grid
        enableCellSelect={false}
        columns={columns}
        rowGetter={rowGetter}
        rowsCount={_rows.length}
        width={300}/>);
      expect(this.component.state.selected).toEqual({
        rowIdx : -1,
        idx : -1
      });
    });

  });

  describe("When row selection enabled", function () {
    beforeEach(function () {
      this.component = TestUtils.renderIntoDocument(<Grid {...testProps} enableRowSelect={true} />);
    });

    afterEach(function () {
      this.component.setState({selectedRows : []});
    });

    it("should render an additional Select Row column", function () {
      var baseGrid = TestUtils.findRenderedComponentWithType(this.component, BaseGridStub);
      var selectRowCol = baseGrid.props.columnMetrics.columns[0];
      expect(baseGrid.props.columnMetrics.columns.length).toEqual(columns.length + 1);
      expect(selectRowCol.key).toEqual('select-row');
      expect(TestUtils.isElementOfType(selectRowCol.formatter, CheckboxEditorStub)).toBe(true);
    });

    it("clicking header checkbox should toggle select all rows", function () {
      //arrange
      var baseGrid = TestUtils.findRenderedComponentWithType(this.component, BaseGridStub);
      var selectRowCol = baseGrid.props.columnMetrics.columns[0];
      var headerCheckbox = selectRowCol.headerRenderer;
      var checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.value = "value";
      checkbox.checked = true;
      var fakeEvent = {currentTarget : checkbox};
      //act
      headerCheckbox.props.onChange(fakeEvent);
      //assert
      var selectedRows = this.component.state.selectedRows;
      expect(selectedRows.length).toEqual(_rows.length);
      selectedRows.forEach(function(selected){
        expect(selected).toBe(true);
      });
      //trigger unselect
      checkbox.checked = false;
      headerCheckbox.props.onChange(fakeEvent);
      this.component.state.selectedRows.forEach(function(selected){
        expect(selected).toBe(false);
      });
    });

    it("should be able to select an individual row when selected = false", function () {
      this.component.setState({selectedRows : [false, false, false, false]});
      var baseGrid = TestUtils.findRenderedComponentWithType(this.component, BaseGridStub);
      var selectRowCol = baseGrid.props.columnMetrics.columns[0];
      var fakeEvent = {stopPropagation : function(){}};
      selectRowCol.onCellChange(3, 'select-row', fakeEvent);
      expect(this.component.state.selectedRows[3]).toBe(true);
    });

    it("should be able to select an individual row when selected = null", function () {
      this.component.setState({selectedRows : [null, null, null, null]});
      var baseGrid = TestUtils.findRenderedComponentWithType(this.component, BaseGridStub);
      var selectRowCol = baseGrid.props.columnMetrics.columns[0];
      var fakeEvent = {stopPropagation : function(){}};
      selectRowCol.onCellChange(2, 'select-row', fakeEvent);
      expect(this.component.state.selectedRows[2]).toBe(true);
    });

    it("should be able to unselect an individual row ", function () {
      this.component.setState({selectedRows : [null, true, true, true]});
      var baseGrid = TestUtils.findRenderedComponentWithType(this.component, BaseGridStub);
      var selectRowCol = baseGrid.props.columnMetrics.columns[0];
      var fakeEvent = {stopPropagation : function(){}};
      selectRowCol.onCellChange(3, 'select-row', fakeEvent);
      expect(this.component.state.selectedRows[3]).toBe(false);
    });
  });


  describe("User Interaction",function () {
    afterEach(function () {
      this.component.setState({ selected: { idx: 0, rowIdx: 0 } });
    });

    function SimulateGridKeyDown(component, key, ctrlKey){
      var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
      var fakeEvent = {key : key, keyCode :key, ctrlKey: ctrlKey, preventDefault : function(){}, stopPropagation : function(){}};
      baseGrid.props.onViewportKeydown(fakeEvent);
    }

    it("hitting TAB should decrement selected cell index by 1", function () {
      SimulateGridKeyDown(this.component, 'Tab');
      expect(this.component.state.selected).toEqual({
        idx : 1,
        rowIdx : 0
      });
    });

    describe("When selected cell is in top corner of grid", function () {
      beforeEach(function () {
        this.component.setState({selected  : {idx : 0, rowIdx : 0}});
      });

      it("on ArrowUp keyboard event should not change selected index", function () {
        SimulateGridKeyDown(this.component, 'ArrowUp');
        expect(this.component.state.selected).toEqual({
          idx : 0,
          rowIdx : 0
        });
      });

      it("on ArrowLeft keyboard event should not change selected index", function () {
        SimulateGridKeyDown(this.component, 'ArrowLeft');
        expect(this.component.state.selected).toEqual({
          idx : 0,
          rowIdx : 0
        });
      });

    });

    describe("When selected cell has adjacent cells on all sides", function () {
      beforeEach(function () {
        this.component.setState({selected  : {idx : 1, rowIdx : 1}});
      });

      it("on ArrowRight keyboard event should increment selected cell index by 1", function () {
        SimulateGridKeyDown(this.component, 'ArrowRight');
        expect(this.component.state.selected).toEqual({
          idx : 2,
          rowIdx : 1
        });
      });

      it("on ArrowDown keyboard event should increment selected row index by 1", function () {
        SimulateGridKeyDown(this.component, 'ArrowDown');
        expect(this.component.state.selected).toEqual({
          idx : 1,
          rowIdx : 2
        });
      });

      it("on ArrowLeft keyboard event should decrement selected row index by 1", function () {
        SimulateGridKeyDown(this.component, 'ArrowLeft');
        expect(this.component.state.selected).toEqual({
          idx : 0,
          rowIdx : 1
        });
      });

      it("on ArrowUp keyboard event should decrement selected row index by 1", function () {
        SimulateGridKeyDown(this.component, 'ArrowUp');
        expect(this.component.state.selected).toEqual({
          idx : 1,
          rowIdx : 0
        });
      });
    });

    describe("When column is editable", function () {
      beforeEach(function () {
        columns[1].editable = true;
        this.component = TestUtils.renderIntoDocument(<Grid {...testProps} />);
      });

      it("double click on grid should activate current selected cell", function () {
        this.component.setState({selected : {idx : 1, rowIdx : 1}});
        var baseGrid = TestUtils.findRenderedComponentWithType(this.component, BaseGridStub);
        baseGrid.props.onViewportDoubleClick();
        expect(this.component.state.selected).toEqual({
          idx : 1,
          rowIdx : 1,
          active : true
        })
      });

      it("copy a cell value should store the value in grid state", function () {
        //arrange
        var selectedCellIndex = 1, selectedRowIndex = 1;
        this.component.setState({selected  : {idx : selectedCellIndex, rowIdx : selectedRowIndex}});
        var keyCode_c = '99';
        var expectedCellValue = _rows[selectedRowIndex].title;
        //act
        SimulateGridKeyDown(this.component, keyCode_c, true);
        //assert
        expect(this.component.state.textToCopy).toEqual(expectedCellValue);
        expect(this.component.state.copied).toEqual({idx : selectedCellIndex, rowIdx : selectedRowIndex});
      });

      it("paste a cell value should call onCellCopyPaste of component with correct params", function () {
        //arrange
        spyOn(testProps, 'onCellCopyPaste');
        this.component = TestUtils.renderIntoDocument(<Grid {...testProps}/>);
        this.component.setState({
          textToCopy : 'banana',
          selected   : {idx : 1, rowIdx : 5},
          copied     : {idx : 1, rowIdx : 1}
        });
        var keyCode_v = '118';
        SimulateGridKeyDown(this.component, keyCode_v, true);
        expect(testProps.onCellCopyPaste).toHaveBeenCalled();
        expect(testProps.onCellCopyPaste.mostRecentCall.args[0]).toEqual({cellKey: "title", rowIdx: 5, value: "banana", fromRow: 1, toRow: 5})
      });

      it("cell commit cancel should set grid state inactive", function () {
        this.component.setState({selected : {idx : 1, rowIdx:1, active : true}})
        var baseGrid = TestUtils.findRenderedComponentWithType(this.component, BaseGridStub);
        var meta = baseGrid.props.cellMetaData;
        meta.onCommitCancel();
        expect(this.component.state.selected).toEqual({idx : 1, rowIdx : 1, active : false });
      });

      it("pressing escape should set grid state inactive", function () {
        this.component.setState({selected : {idx : 1, rowIdx:1, active : true}})
        SimulateGridKeyDown(this.component, 'Escape');
        expect(this.component.state.selected).toEqual({idx : 1, rowIdx : 1, active : false });
      });

      it("pressing enter should set grid state active", function () {
        this.component.setState({selected : {idx : 1, rowIdx:1, active : false}})
        SimulateGridKeyDown(this.component, 'Enter');
        expect(this.component.state.selected).toEqual({idx : 1, rowIdx : 1, active : true, initialKeyCode : 'Enter' });
      });

      it("pressing delete should set grid state active", function () {
        this.component.setState({selected : {idx : 1, rowIdx:1, active : false}})
        SimulateGridKeyDown(this.component, 'Delete');
        expect(this.component.state.selected).toEqual({idx : 1, rowIdx : 1, active : true, initialKeyCode : 'Delete' });
      });

      it("pressing backspace should set grid state active", function () {
        this.component.setState({selected : {idx : 1, rowIdx:1, active : false}})
        SimulateGridKeyDown(this.component, 'Backspace');
        expect(this.component.state.selected).toEqual({idx : 1, rowIdx : 1, active : true, initialKeyCode : 'Backspace' });
      });

      it("typing a char should set grid state active and store the typed value", function () {
        this.component.setState({selected : {idx : 1, rowIdx:1, active : false}})
        var baseGrid = TestUtils.findRenderedComponentWithType(this.component, BaseGridStub);
        var fakeEvent = {keyCode : 66, key :"Unidentified", preventDefault : function(){}, stopPropagation : function(){}};
        baseGrid.props.onViewportKeydown(fakeEvent);
        expect(this.component.state.selected).toEqual({idx : 1, rowIdx : 1, active : true, initialKeyCode : 66 });
      });

    });

    describe("When column is not editable", function () {
      beforeEach(function () {
        columns[1].editable = false;
        this.component = TestUtils.renderIntoDocument(<Grid {...testProps} />);
      });

      it("double click on grid should not activate current selected cell", function () {
        this.component.setState({selected : {idx : 1, rowIdx : 1}});
        columns[1].editable = false;
        var baseGrid = TestUtils.findRenderedComponentWithType(this.component, BaseGridStub);
        baseGrid.props.onViewportDoubleClick();
        expect(this.component.state.selected).toEqual({
          idx : 1,
          rowIdx : 1
        })
      });
    });

    describe("Drag events", function () {

      it("dragging in grid will store drag rowIdx, idx and value of cell in state", function () {
        this.component.setState({selected : {idx : 1, rowIdx : 2}});
        var baseGrid = TestUtils.findRenderedComponentWithType(this.component, BaseGridStub);
        baseGrid.props.onViewportDragStart();
        expect(this.component.state.dragged).toEqual({
          idx : 1,
          rowIdx : 2,
          value : _rows[2].title
        })
      });

      it("dragging over a row will store the current rowIdx in grid state", function () {
        //arrange
        this.component.setState({selected : {idx : 1, rowIdx : 2}, dragged : {idx : 1, rowIdx : 2, value : 'apple', overRowIdx : 6}});
        var baseGrid = TestUtils.findRenderedComponentWithType(this.component, BaseGridStub);
        var meta = baseGrid.props.cellMetaData;
        //act
        meta.handleDragEnterRow(4)
        //assert
        expect(this.component.state.dragged).toEqual({
          idx : 1,
          rowIdx : 2,
          value : 'apple',
          overRowIdx : 4
        })
      });

      it("finishing drag will trigger onCellsDragged event and call it with correct params", function () {
        spyOn(testProps, 'onCellsDragged');
        this.component = TestUtils.renderIntoDocument(<Grid {...testProps}  />);
        this.component.setState({selected : {idx : 1, rowIdx : 2}, dragged : {idx : 1, rowIdx : 2, value : 'apple', overRowIdx : 6}});
        var baseGrid = TestUtils.findRenderedComponentWithType(this.component, BaseGridStub);
        baseGrid.props.onViewportDragEnd();
        expect(testProps.onCellsDragged).toHaveBeenCalled();
        expect(testProps.onCellsDragged.argsForCall[0][0]).toEqual({cellKey: "title", fromRow: 2, toRow: 6, value: "apple"});
      });

      it("terminating drag will clear drag state", function () {
        this.component = TestUtils.renderIntoDocument(<Grid {...testProps}  />);
        this.component.setState({ dragged : {idx : 1, rowIdx : 2, value : 'apple', overRowIdx : 6}});
        var baseGrid = TestUtils.findRenderedComponentWithType(this.component, BaseGridStub);
        var meta = baseGrid.props.cellMetaData;
        meta.handleTerminateDrag()
        expect(this.component.state.dragged).toBe(null);
      });
    });

    it("Adding a new row will set the selected cell to be on the last row", function () {
      var newRow = {id: 1000, title: 'Title 1000', count: 1000};
      _rows.push(newRow);
      this.component.setProps({rowsCount:_rows.length});
      expect(this.component.state.selected).toEqual({
        idx : 1,
        rowIdx : 1000
      });
    });
  });

  describe("Cell Meta Data", function () {
    function getCellMetaData(component){
      var baseGrid = TestUtils.findRenderedComponentWithType(component, BaseGridStub);
      return baseGrid.props.cellMetaData;
    }

    it('creates a cellMetaData object and passes to baseGrid as props', function () {
      var meta = getCellMetaData(this.component)
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

    it("Changing Grid state should update cellMetaData", function () {
      var baseGrid = TestUtils.findRenderedComponentWithType(this.component, BaseGridStub);
      var newState = {selected  : {idx : 2, rowIdx : 2}, dragged : {idx : 2, rowIdx : 2}}
      this.component.setState(newState);
      var meta = baseGrid.props.cellMetaData;
      expect(meta).toEqual(jasmine.objectContaining(newState));
    });

    it("cell commit should trigger onRowUpdated with correct params", function () {
      spyOn(testProps, 'onRowUpdated');
      this.component = TestUtils.renderIntoDocument(<Grid {...testProps}/>);
      var meta = getCellMetaData(this.component);
      var fakeCellUpdate = {cellKey: "title", rowIdx: 0, updated: {title : 'some new title'}, key: "Enter"}
      meta.onCommit(fakeCellUpdate);
      expect(testProps.onRowUpdated.callCount).toEqual(1);
      expect(testProps.onRowUpdated.argsForCall[0][0]).toEqual({
        cellKey: "title", rowIdx: 0, updated: {title : 'some new title'}, key: "Enter"
      })
    });

    it("cell commit should deactivate selected cell", function () {
      this.component.setState({selected : {idx : 3, rowIdx : 3, active : true}});
      var meta = getCellMetaData(this.component);
      var fakeCellUpdate = {cellKey: "title", rowIdx: 0, updated: {title : 'some new title'}, key: "Enter"}
      meta.onCommit(fakeCellUpdate);
      expect(this.component.state.selected).toEqual({
          idx : 3,
          rowIdx : 3,
          active : false
        });
    });

    it("cell commit after TAB should select next cell", function () {
      this.component.setState({selected : {idx : 1, rowIdx : 1, active : true}});
      var meta = getCellMetaData(this.component);
      var fakeCellUpdate = {cellKey: "title", rowIdx: 1, updated: {title : 'some new title'}, key: "Tab"}
      meta.onCommit(fakeCellUpdate);
      expect(this.component.state.selected).toEqual({
        idx : 2,
        rowIdx : 1,
        active : false
      });
    });

    it("Cell click should set selected state of grid", function () {
      var meta = getCellMetaData(this.component);
      meta.onCellClick({idx : 2, rowIdx : 2 });
      expect(this.component.state.selected).toEqual({idx : 2, rowIdx : 2 });
    });
  });

  it("changes to non metric column data should keep original metric information", function () {
    var newColumns = columns.slice(0).map(column => Object.assign({}, column));
    newColumns[0].editable = true;
    var originalMetrics = Object.assign({}, this.component.state.columnMetrics);
    this.component.setProps({columns : newColumns});
    var columnMetrics = this.component.state.columnMetrics;
    columnMetrics.columns.forEach((m, i) => {
      expect(m.width).toEqual(originalMetrics.columns[i].width);
      expect(m.left).toEqual(originalMetrics.columns[i].left);
    })
  });
});
