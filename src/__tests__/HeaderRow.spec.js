'use strict';
var React         = require('react');
var rewire        = require('rewire');
var HeaderRow        = rewire('../HeaderRow');
var TestUtils     = require('react/lib/ReactTestUtils');
var rewireModule  = require("../../test/rewireModule");
var StubComponent = require("../../test/StubComponent");
var helpers       = require('./GridPropHelpers');

describe('Header Unit Tests', () => {
  var headerRow;

  // Configure local variable replacements for the module.
  var SortableHeaderCellStub = StubComponent('SortableHeaderCell');
  var HeaderCellStub= StubComponent('HeaderCell');

  rewireModule(HeaderRow, {
    SortableHeaderCell    : SortableHeaderCellStub,
    HeaderCell: HeaderCellStub
  });

  var testProps = {
    columns : helpers.columns,
    onColumnResize : function(){},
    onSort: function(){},
    sortDirection : 'NONE',
    sortColumn: null
  }

  beforeEach(() => {
    headerRow = TestUtils.renderIntoDocument(<HeaderRow {...testProps}/>);
  });

  it('should create a new instance of HeaderRow', () => {
    expect(headerRow).toBeDefined();
  });


  describe("When column is sortable", () => {

    var sortableColIdx =1;
    beforeEach(() => {
      debugger;
      testProps.columns[sortableColIdx].sortable = true;
      headerRow = TestUtils.renderIntoDocument(<HeaderRow {...testProps} sortColumn={testProps.columns[sortableColIdx].key} />);
    })

    afterEach(() => {
      testProps.columns[sortableColIdx].sortable = false;
    })

    it("should provide column with a sortableHeaderRenderer", () => {
      var headerCells = TestUtils.scryRenderedComponentsWithType(headerRow, HeaderCellStub);

      expect(TestUtils.isElementOfType(headerCells[sortableColIdx].props.renderer, SortableHeaderCellStub)).toBe(true);
    });

    it("should pass sort direction as props to headerRenderer when column is sortColumn", () => {
      headerRow = TestUtils.renderIntoDocument(<HeaderRow {...testProps} sortColumn={testProps.columns[sortableColIdx].key} sortDirection={'ASC'} />);
      var headerCells = TestUtils.scryRenderedComponentsWithType(headerRow, HeaderCellStub);
      var sortableHeaderRenderer = headerCells[sortableColIdx].props.renderer;
      expect(sortableHeaderRenderer.props.sortDirection).toEqual('ASC');
    });

    it("should call onSort when headerRender triggers sort", () => {
      //arrange
      spyOn(testProps, 'onSort');
      headerRow = TestUtils.renderIntoDocument(<HeaderRow {...testProps} sortColumn={testProps.columns[sortableColIdx].key} sortDirection={'ASC'} />);
      var headerCells = TestUtils.scryRenderedComponentsWithType(headerRow, HeaderCellStub);
      var sortableHeaderRenderer = headerCells[sortableColIdx].props.renderer;
      //act
      sortableHeaderRenderer.props.onSort('title', 'DESC');
      //assert
      expect(testProps.onSort).toHaveBeenCalled();
      expect(testProps.onSort.mostRecentCall.args[0]).toEqual('title');
      expect(testProps.onSort.mostRecentCall.args[1]).toEqual('DESC');
    });


  });



});
