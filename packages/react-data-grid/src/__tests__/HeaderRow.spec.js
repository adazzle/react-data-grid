const React         = require('react');
const TestUtils     = require('react-dom/test-utils');
const StubComponent = require('../../../../test/StubComponent');
const helpers       = require('../helpers/test/GridPropHelpers');
const HeaderRow     = require('../HeaderRow');
import { shallow } from 'enzyme';
import HeaderCell from '../HeaderCell';
import SortableHeaderCell from '../cells/headerCells/SortableHeaderCell';
import FilterableHeaderCell from '../cells/headerCells/FilterableHeaderCell';

describe('Header Row Unit Tests', () => {
  let headerRow;
  let CustomHeaderStub = new StubComponent('CustomHeader');

  let testProps = {
    columns: helpers.columns,
    onColumnResize: function() {},
    onSort: function() {},
    sortDirection: 'NONE',
    sortColumn: null,
    height: 35
  };

  beforeEach(() => {
    headerRow = shallow(<HeaderRow {...testProps}/>);
  });

  it('should create a new instance of HeaderRow', () => {
    expect(headerRow).toBeDefined();
  });

  describe('When column is sortable and headerCellRenderer not provided', () => {
    let sortableColIdx = 1;
    beforeEach(() => {
      testProps.columns[sortableColIdx].sortable = true;
      headerRow = shallow(<HeaderRow {...testProps} sortColumn={testProps.columns[sortableColIdx].key} />);
    });

    afterEach(() => {
      testProps.columns[sortableColIdx].sortable = false;
    });

    it('should provide column with a sortableHeaderRenderer', () => {
      const headerCells = headerRow.find(HeaderCell);
      expect(TestUtils.isElementOfType(headerCells.at(sortableColIdx).props().renderer, SortableHeaderCell)).toBe(true);
    });

    it('should pass sort direction as props to headerRenderer when column is sortColumn', () => {
      headerRow = shallow(<HeaderRow {...testProps} sortColumn={testProps.columns[sortableColIdx].key} sortDirection={'ASC'} />);
      const headerCells =  headerRow.find(HeaderCell);
      const sortableHeaderRenderer = headerCells.at(sortableColIdx).props().renderer;
      expect(sortableHeaderRenderer.props.sortDirection).toEqual('ASC');
    });

    it('should call onSort when headerRender triggers sort', () => {
      // arrange
      spyOn(testProps, 'onSort');
      headerRow = shallow(<HeaderRow {...testProps} sortColumn={testProps.columns[sortableColIdx].key} sortDirection={'ASC'} />);
      let headerCells = headerRow.find(HeaderCell);
      let sortableHeaderRenderer = headerCells.at(sortableColIdx).props().renderer;
      // act
      sortableHeaderRenderer.props.onSort('title', 'DESC');
      // assert
      expect(testProps.onSort).toHaveBeenCalled();
      expect(testProps.onSort.calls.mostRecent().args[0]).toEqual('title');
      expect(testProps.onSort.calls.mostRecent().args[1]).toEqual('DESC');
    });
  });

  describe('When column is sortable and filterable', () => {
    let sortableAndFilterableColIdx = 1;

    describe('When row is filterable', () => {
      beforeEach(() => {
        testProps.columns[sortableAndFilterableColIdx].sortable = true;
        testProps.columns[sortableAndFilterableColIdx].filterable = true;
        headerRow = shallow(<HeaderRow {...testProps} sortColumn={testProps.columns[sortableAndFilterableColIdx].key} filterable={true} onFilterChange={() => {}}/>);
      });

      it('should provide column with a filterableHeaderRenderer', () => {
        const headerCells = headerRow.find(HeaderCell);
        expect(TestUtils.isElementOfType(headerCells.at(sortableAndFilterableColIdx).props().renderer, FilterableHeaderCell)).toBe(true);
      });
    });

    describe('When row is not filterable', () => {
      beforeEach(() => {
        testProps.columns[sortableAndFilterableColIdx].sortable = true;
        testProps.columns[sortableAndFilterableColIdx].filterable = true;
        headerRow = shallow(<HeaderRow {...testProps} sortColumn={testProps.columns[sortableAndFilterableColIdx].key}/>);
      });

      it('should provide column with a sortableHeaderRenderer', () => {
        const headerCells = headerRow.find(HeaderCell);
        expect(TestUtils.isElementOfType(headerCells.at(sortableAndFilterableColIdx).props().renderer, SortableHeaderCell)).toBe(true);
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
      headerRow = shallow(<HeaderRow {...testProps} />);
    });

    it('should render custom column header', () => {
      const headerCells = headerRow.find(HeaderCell);
      expect(TestUtils.isElementOfType(headerCells.at(customColumnIdx).props().renderer, CustomHeaderStub)).toBe(true);
    });

    it('should render filter if header row if row and column is filterable', () => {
      testProps.columns[customColumnIdx].filterable = true;
      headerRow = shallow(<HeaderRow {...testProps} filterable={true} />);
      const headerCells = headerRow.find(HeaderCell);
      expect(TestUtils.isElementOfType(headerCells.at(customColumnIdx).props().renderer, FilterableHeaderCell)).toBe(true);
    });

    afterEach(() => {
      testProps.columns[customColumnIdx].headerRenderer = null;
    });
  });

  describe('Rendering HeaderRow component', () => {
    const renderComponent = (props) => {
      const wrapper = shallow(<HeaderRow {...props} />);
      return wrapper;
    };

    const onScroll = jasmine.createSpy();

    const requiredProps = {
      height: 35,
      columns: helpers.columns,
      onSort: jasmine.createSpy()
    };

    const allProperties = {
      width: 200,
      height: 35,
      columns: helpers.columns,
      onColumnResize: jasmine.createSpy(),
      onSort: jasmine.createSpy(),
      onColumnResizeEnd: jasmine.createSpy(),
      style: {overflow: 'scroll',
        width: 201,
        height: 36,
        position: 'relative'
      },
      sortColumn: 'sortColumnValue',
      sortDirection: 'NONE',
      cellRenderer: jasmine.createSpy(),
      headerCellRenderer: jasmine.createSpy(),
      filterable: true,
      onFilterChange: jasmine.createSpy(),
      resizing: {key: 'value'},
      onScroll,
      rowType: 'rowTypeValue',
      draggableHeaderCell: jasmine.createSpy()
    };

    it('passes classname property', () => {
      const wrapper = renderComponent(requiredProps);
      const headerRowDiv = wrapper.find('div').at(0);
      expect(headerRowDiv.hasClass('react-grid-HeaderRow'));
    });
    it('passes width if available from props', () => {
      const wrapper = renderComponent(allProperties);
      const headerRowDiv = wrapper.find('div').at(0);
      expect(headerRowDiv.props().width).toBe(200);
    });
    it('does not pass width if not available from props', () => {
      const wrapper = renderComponent(requiredProps);
      const headerRowDiv = wrapper.find('div').at(0);
      expect(headerRowDiv.props().width).toBeUndefined();
    });
    it('passes height property', () => {
      const wrapper = renderComponent(allProperties);
      const headerRowDiv = wrapper.find('div').at(0);
      expect(headerRowDiv.props().height).toBe(35);
    });
    it('passes style property, if available from props', () => {
      const wrapper = renderComponent(allProperties);
      const headerRowDiv = wrapper.find('div').at(0);
      expect(headerRowDiv.props().style).toBe(allProperties.style);
    });
    it('does not pass style if not available from props', () => {
      const wrapper = renderComponent(requiredProps);
      const headerRowDiv = wrapper.find('div').at(0);
      expect(headerRowDiv.props().style).toBeUndefined();
    });
    it('passes onScroll property, if available from props', () => {
      const wrapper = renderComponent(allProperties);
      const headerRowDiv = wrapper.find('div').at(0);
      expect(headerRowDiv.props().onScroll).toBe(onScroll);
    });
    it('does not pass onScroll if not available from props', () => {
      const wrapper = renderComponent(requiredProps);
      const headerRowDiv = wrapper.find('div').at(0);
      expect(headerRowDiv.props().onScoll).toBeUndefined();
    });
    it('does not pass unknown properties to the div', () => {
      const wrapper = renderComponent(allProperties);
      const headerRowDiv = wrapper.find('div').at(0);
      expect(headerRowDiv.props().columns).toBeUndefined();
      expect(headerRowDiv.props().onColumnResize).toBeUndefined();
      expect(headerRowDiv.props().onSort).toBeUndefined();
      expect(headerRowDiv.props().onColumnResizeEnd).toBeUndefined();
      expect(headerRowDiv.props().sortColumn).toBeUndefined();
      expect(headerRowDiv.props().sortDirection).toBeUndefined();
      expect(headerRowDiv.props().cellRenderer).toBeUndefined();
      expect(headerRowDiv.props().headerCellRenderer).toBeUndefined();
      expect(headerRowDiv.props().filterable).toBeUndefined();
      expect(headerRowDiv.props().onFilterChange).toBeUndefined();
      expect(headerRowDiv.props().resizing).toBeUndefined();
      expect(headerRowDiv.props().rowType).toBeUndefined();
      expect(headerRowDiv.props().draggableHeaderCell).toBeUndefined();
    });
  });
});
