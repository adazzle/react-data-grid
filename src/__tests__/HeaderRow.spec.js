const React         = require('react');
const rewire        = require('rewire');
const TestUtils     = require('react/lib/ReactTestUtils');
const rewireModule  = require('../../test/rewireModule');
const StubComponent = require('../../test/StubComponent');
const helpers       = require('./GridPropHelpers');
const HeaderRow     = rewire('../HeaderRow');

describe('Header Row Unit Tests', () => {
  let headerRow;

  // Configure local letiable replacements for the module.
  let SortableHeaderCellStub = new StubComponent('SortableHeaderCell');
  let HeaderCellStub = new StubComponent('HeaderCell');
  let FilterableHeaderCellStub = new StubComponent('FilterableHeaderCell');
  let CustomHeaderStub = new StubComponent('CustomHeader');

  rewireModule(HeaderRow, {
    SortableHeaderCell: SortableHeaderCellStub,
    BaseHeaderCell: HeaderCellStub,
    FilterableHeaderCell: FilterableHeaderCellStub
  });

  let testProps = {
    columns: helpers.columns,
    onColumnResize: function() {},
    onSort: function() {},
    sortDirection: 'NONE',
    sortColumn: null,
    height: 35
  };

  beforeEach(() => {
    headerRow = TestUtils.renderIntoDocument(<HeaderRow {...testProps}/>);
  });

  it('should create a new instance of HeaderRow', () => {
    expect(headerRow).toBeDefined();
  });

  describe('When column is sortable and headerCellRenderer not provided', () => {
    let sortableColIdx = 1;
    beforeEach(() => {
      testProps.columns[sortableColIdx].sortable = true;
      headerRow = TestUtils.renderIntoDocument(<HeaderRow {...testProps} sortColumn={testProps.columns[sortableColIdx].key} />);
    });

    afterEach(() => {
      testProps.columns[sortableColIdx].sortable = false;
    });

    it('should provide column with a sortableHeaderRenderer', () => {
      let headerCells = TestUtils.scryRenderedComponentsWithType(headerRow, HeaderCellStub);
      expect(TestUtils.isElementOfType(headerCells[sortableColIdx].props.renderer, SortableHeaderCellStub)).toBe(true);
    });

    it('should pass sort direction as props to headerRenderer when column is sortColumn', () => {
      headerRow = TestUtils.renderIntoDocument(<HeaderRow {...testProps} sortColumn={testProps.columns[sortableColIdx].key} sortDirection={'ASC'} />);
      let headerCells = TestUtils.scryRenderedComponentsWithType(headerRow, HeaderCellStub);
      let sortableHeaderRenderer = headerCells[sortableColIdx].props.renderer;
      expect(sortableHeaderRenderer.props.sortDirection).toEqual('ASC');
    });

    it('should call onSort when headerRender triggers sort', () => {
      // arrange
      spyOn(testProps, 'onSort');
      headerRow = TestUtils.renderIntoDocument(<HeaderRow {...testProps} sortColumn={testProps.columns[sortableColIdx].key} sortDirection={'ASC'} />);
      let headerCells = TestUtils.scryRenderedComponentsWithType(headerRow, HeaderCellStub);
      let sortableHeaderRenderer = headerCells[sortableColIdx].props.renderer;
      // act
      sortableHeaderRenderer.props.onSort('title', 'DESC');
      // assert
      expect(testProps.onSort).toHaveBeenCalled();
      expect(testProps.onSort.mostRecentCall.args[0]).toEqual('title');
      expect(testProps.onSort.mostRecentCall.args[1]).toEqual('DESC');
    });
  });

  describe('When column is sortable and filterable', () => {
    let sortableAndFilterableColIdx = 1;

    describe('When row is filterable', () => {
      beforeEach(() => {
        testProps.columns[sortableAndFilterableColIdx].sortable = true;
        testProps.columns[sortableAndFilterableColIdx].filterable = true;
        headerRow = TestUtils.renderIntoDocument(<HeaderRow {...testProps} sortColumn={testProps.columns[sortableAndFilterableColIdx].key} filterable={true} onFilterChange={() => {}}/>);
      });

      it('should provide column with a filterableHeaderRenderer', () => {
        let headerCells = TestUtils.scryRenderedComponentsWithType(headerRow, HeaderCellStub);
        expect(TestUtils.isElementOfType(headerCells[sortableAndFilterableColIdx].props.renderer, FilterableHeaderCellStub)).toBe(true);
      });
    });

    describe('When row is not filterable', () => {
      beforeEach(() => {
        testProps.columns[sortableAndFilterableColIdx].sortable = true;
        testProps.columns[sortableAndFilterableColIdx].filterable = true;
        headerRow = TestUtils.renderIntoDocument(<HeaderRow {...testProps} sortColumn={testProps.columns[sortableAndFilterableColIdx].key}/>);
      });

      it('should provide column with a sortableHeaderRenderer', () => {
        let headerCells = TestUtils.scryRenderedComponentsWithType(headerRow, HeaderCellStub);
        expect(TestUtils.isElementOfType(headerCells[sortableAndFilterableColIdx].props.renderer, SortableHeaderCellStub)).toBe(true);
      });
    });

    afterEach(() => {
      testProps.columns[sortableAndFilterableColIdx].sortable = false;
      testProps.columns[sortableAndFilterableColIdx].filterable = false;
    });
  });

  describe('When column has a headerRenderer', () => {
    let customColumnIdx = 1;
    beforeEach(() => {
      testProps.columns[customColumnIdx].headerRenderer = <CustomHeaderStub />;
      headerRow = TestUtils.renderIntoDocument(<HeaderRow {...testProps} />);
    });

    it('should render custom column header', () => {
      let headerCells = TestUtils.scryRenderedComponentsWithType(headerRow, HeaderCellStub);
      expect(TestUtils.isElementOfType(headerCells[customColumnIdx].props.renderer, CustomHeaderStub)).toBe(true);
    });

    afterEach(() => {
      testProps.columns[customColumnIdx].headerRenderer = null;
    });
  });
});
