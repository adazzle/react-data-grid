import React from 'react';
import Header from '../Header';
import HeaderRow from '../HeaderRow';
import helpers, {fakeCellMetaData} from '../helpers/test/GridPropHelpers';
import * as GetScrollbarSize from '../getScrollbarSize';
import { shallow } from 'enzyme';
const SCROLL_BAR_SIZE = 17;

describe('Header Unit Tests', () => {
  beforeEach(() => {
    spyOn(GetScrollbarSize, 'default').and.returnValue(SCROLL_BAR_SIZE);
  });

  const testProps = {
    columnMetrics: {
      columns: helpers.columns,
      minColumnWidth: 80,
      totalWidth: true,
      width: 2600
    },
    cellMetaData: fakeCellMetaData,
    totalWidth: 1000,
    height: 50,
    headerRows: [{height: 50, ref: 'row'}],
    onColumnResize: jasmine.createSpy(),
    onSort: () => null
  };

  function shouldRenderDefaultHeaderRow() {
    const wrapper = shallow(<Header {...testProps}/>);
    expect(wrapper.find(HeaderRow).length).toBe(1);
  }

  function shouldSetResizeState() {
    const wrapper = shallow(<Header {...testProps}/>);
    const resizeColIdx = 2;
    const newWidth = 350;
    const headerRow = wrapper.find(HeaderRow);
    headerRow.props().onColumnResize(helpers.columns[resizeColIdx], newWidth);
    expect(wrapper.state().resizing.column.width).toEqual(newWidth);
    expect(wrapper.state().resizing.column.key).toEqual(helpers.columns[resizeColIdx].key);
  }

  function shouldTriggerOnColumnResize() {
    const resizeColIdx = 1;
    const wrapper = shallow(<Header {...testProps}/>);
    const headerRow = wrapper.find(HeaderRow);
    headerRow.props().onColumnResizeEnd(helpers.columns[resizeColIdx], 200);
    expect(testProps.onColumnResize).toHaveBeenCalled();
    expect(testProps.onColumnResize.calls.mostRecent().args[0]).toEqual(resizeColIdx);
    expect(testProps.onColumnResize.calls.mostRecent().args[1]).toEqual(200);
  }

  it('should render a default header row', () => {
    shouldRenderDefaultHeaderRow();
  });

  it('should initialize the state correctly', () => {
    const wrapper = shallow(<Header {...testProps}/>);
    expect(wrapper.state().resizing).toEqual(null);
  });

  it('should render a default header row', () => {
    const wrapper = shallow(<Header {...testProps}/>);
    expect(wrapper.find(HeaderRow).length).toBe(1);
  });

  it('header row drag start should set resize column state ', () => {
    shouldSetResizeState();
  });

  it('header row drag end should trigger onColumnResize callback', () => {
    shouldTriggerOnColumnResize();
  });

  describe('When columns are immutable',  () => {
    beforeEach(() => {
      testProps.columnMetrics.columns = new Immutable.List(helpers.columns);
    });

    it('should render a default header row', () => {
      shouldRenderDefaultHeaderRow();
    });

    it('header row drag start should set resize column state ', () => {
      shouldSetResizeState();
    });

    it('header row drag end should trigger onColumnResize callback', () => {
      shouldTriggerOnColumnResize();
    });
  });

  describe('Rendering Header component', () => {
    const renderComponent = (props) => {
      const wrapper = shallow(<Header {...props} />);
      return wrapper;
    };
    const testRequiredProps = {
      columnMetrics: {
        columns: helpers.columns,
        minColumnWidth: 81,
        totalWidth: true,
        width: 2601
      },
      height: 51,
      headerRows: [{height: 51, ref: 'row'}],
      onSort: jasmine.createSpy()
    };
    const testAllProps = {
      columnMetrics: {
        columns: helpers.columns,
        minColumnWidth: 80,
        totalWidth: true,
        width: 2600
      },
      totalWidth: 1000,
      height: 50,
      headerRows: [{height: 50, ref: 'row'}],
      sortColumn: 'sortColumnValue',
      sortDirection: 'DESC',
      onSort: jasmine.createSpy(),
      onColumnResize: jasmine.createSpy(),
      onScroll: jasmine.createSpy(),
      draggableHeaderCell: jasmine.createSpy(),
      getValidFilterValues: jasmine.createSpy(),
      cellMetaData: fakeCellMetaData
    };
    it('passes classname property', () => {
      const wrapper = renderComponent(testAllProps);
      const headerDiv = wrapper.find('div');
      expect(headerDiv.hasClass('react-grid-Header'));
    });
    it('passes style property', () => {
      const wrapper = renderComponent(testAllProps);
      const headerDiv = wrapper.find('div');
      expect(headerDiv.props().style).toBeDefined();
    });

    it('should account for scrollbar size in header', () => {
      const wrapper = renderComponent(testAllProps);
      const headerRow = wrapper.find('.react-grid-Header').props().children[0];
      expect(headerRow.props.style.width).toBe(testAllProps.totalWidth - SCROLL_BAR_SIZE);
    });
    it('passes height property', () => {
      const wrapper = renderComponent(testAllProps);
      const headerDiv = wrapper.find('div');
      expect(headerDiv.props().height).toBe(50);
    });
    it('passes onScroll property, if available from props', () => {
      const wrapper = renderComponent(testAllProps);
      const headerDiv = wrapper.find('div');
      expect(headerDiv.props().onScroll).toBe(testAllProps.onScroll);
    });
    it('does not pass onScroll properties if it is not available from props', () => {
      const wrapper = renderComponent(testRequiredProps);
      const headerDiv = wrapper.find('div');
      expect(headerDiv.props().onScroll).toBeUndefined();
    });
    it('does not pass unknown properties to the div', () => {
      const wrapper = renderComponent(testAllProps);
      const headerDiv = wrapper.find('div');
      expect(headerDiv.props().columnMetrics).toBeUndefined();
      expect(headerDiv.props().totalWidth).toBeUndefined();
      expect(headerDiv.props().headerRows).toBeUndefined();
      expect(headerDiv.props().sortColumn).toBeUndefined();
      expect(headerDiv.props().sortDirection).toBeUndefined();
      expect(headerDiv.props().onSort).toBeUndefined();
      expect(headerDiv.props().onColumnResize).toBeUndefined();
      expect(headerDiv.props().draggableHeaderCell).toBeUndefined();
      expect(headerDiv.props().getValidFilterValues).toBeUndefined();
    });

    it('execute onCellClick event on cellMetaData and rowIdx & idx = -1', () => {
      spyOn(testAllProps.cellMetaData, 'onCellClick');
      const wrapper = renderComponent(testAllProps);
      const headerDiv = wrapper.find('div');
      headerDiv.simulate('click');
      expect(testAllProps.cellMetaData.onCellClick).toHaveBeenCalled();
      expect(testAllProps.cellMetaData.onCellClick.calls.mostRecent().args[0]).toEqual({ rowIdx: -1, idx: -1 });
    });
  });
});
