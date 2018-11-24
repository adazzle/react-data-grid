import React from 'react';
import helpers from '../helpers/test/GridPropHelpers';
import HeaderRow from '../HeaderRow';
import HeaderCell from '../HeaderCell';
import SortableHeaderCell from 'common/cells/headerCells/SortableHeaderCell';
import FilterableHeaderCell from 'common/cells/headerCells/FilterableHeaderCell';
import { shallow} from 'enzyme';

describe('Header Row Unit Tests', () => {
  const defaultProps = {
    rowType: 'header',
    columns: helpers.columns,
    onColumnResize: function() {},
    onColumnResizeEnd: () => {},
    onSort: jasmine.createSpy(),
    sortDirection: 'NONE',
    sortColumn: null,
    height: 35,
    onFilterChange: () => {}
  };

  const setup = (testProps) => {
    const props = {...defaultProps, ...testProps};
    const wrapper = shallow(<HeaderRow {...props}/>);
    const headerCells = wrapper.find(HeaderCell);
    return {wrapper, headerCells, props};
  };

  describe('When column is sortable and headerCellRenderer not provided', () => {
    const sortableColIdx = 1;

    beforeEach(() => {
      defaultProps.columns[sortableColIdx].sortable = true;
    });

    afterEach(() => {
      defaultProps.columns[sortableColIdx].sortable = false;
    });

    it('should provide column with a sortableHeaderRenderer', () => {
      const {headerCells} = setup({sortColumn: defaultProps.columns[sortableColIdx].key});
      const renderer = headerCells.at(sortableColIdx).props().renderer;
      expect(renderer.type).toBe((SortableHeaderCell));
    });

    it('should pass sort direction as props to headerRenderer when column is sortColumn', () => {
      const {headerCells} = setup({sortColumn: defaultProps.columns[sortableColIdx].key, sortDirection: 'ASC'});
      const renderer = headerCells.at(sortableColIdx).props().renderer;
      expect(renderer.props.sortDirection).toEqual('ASC');
    });

    it('should call onSort when headerRender triggers sort', () => {
      const {headerCells, props} = setup({sortColumn: defaultProps.columns[sortableColIdx].key, sortDirection: 'ASC'});
      const renderer = headerCells.at(sortableColIdx).props().renderer;
      renderer.props.onSort('title', 'DESC');
      expect(props.onSort).toHaveBeenCalled();
      expect(props.onSort.calls.mostRecent().args[0]).toEqual('title');
      expect(props.onSort.calls.mostRecent().args[1]).toEqual('DESC');
    });
  });

  describe('When column is sortable and filterable', () => {
    const sortableAndFilterableColIdx = 1;

    describe('When row is filterable', () => {
      beforeEach(() => {
        defaultProps.columns[sortableAndFilterableColIdx].sortable = true;
        defaultProps.columns[sortableAndFilterableColIdx].filterable = true;
      });

      it('should provide column with a filterableHeaderRenderer', () => {
        const {headerCells} = setup({sortColumn: defaultProps.columns[sortableAndFilterableColIdx].key, filterable: true});
        const renderer = headerCells.at(sortableAndFilterableColIdx).props().renderer;
        expect(renderer.type).toBe(FilterableHeaderCell);
      });
    });

    describe('When row is not filterable', () => {
      beforeEach(() => {
        defaultProps.columns[sortableAndFilterableColIdx].sortable = true;
        defaultProps.columns[sortableAndFilterableColIdx].filterable = true;
      });

      it('should provide column with a sortableHeaderRenderer', () => {
        const {headerCells} = setup({sortColumn: defaultProps.columns[sortableAndFilterableColIdx].key});
        const renderer = headerCells.at(sortableAndFilterableColIdx).props().renderer;
        expect(renderer.type).toBe(SortableHeaderCell);
      });
    });

    afterEach(() => {
      defaultProps.columns[sortableAndFilterableColIdx].sortable = false;
      defaultProps.columns[sortableAndFilterableColIdx].filterable = false;
    });
  });

  describe('When column has a headerRenderer', () => {
    const CustomHeader = () => <div>Custom</div>;
    const customColumnIdx = 1;
    beforeEach(() => {
      defaultProps.columns[customColumnIdx].headerRenderer = <CustomHeader />;
    });

    it('should render custom column header', () => {
      const {headerCells} = setup();
      const renderer = headerCells.at(customColumnIdx).props().renderer;
      expect(renderer.type).toBe(CustomHeader);
    });

    it('should render filter if header row if row and column is filterable', () => {
      defaultProps.columns[customColumnIdx].filterable = true;
      const {headerCells} = setup({filterable: true});
      const renderer = headerCells.at(customColumnIdx).props().renderer;
      expect(renderer.type).toBe(FilterableHeaderCell);
    });

    afterEach(() => {
      defaultProps.columns[customColumnIdx].headerRenderer = null;
      defaultProps.columns[customColumnIdx].filterable = false;
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
      onSort: jasmine.createSpy(),
      rowType: 'rowTypeValue',
      onColumnResize: jasmine.createSpy(),
      onColumnResizeEnd: jasmine.createSpy()
    };

    const allProperties = {
      height: 35,
      columns: helpers.columns,
      onSort: jasmine.createSpy(),
      rowType: 'rowTypeValue',
      onColumnResize: jasmine.createSpy(),
      onColumnResizeEnd: jasmine.createSpy(),
      width: 200,
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
      draggableHeaderCell: () => <div/>
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
