import React from 'react';
import { shallow } from 'enzyme';

import Header, { HeaderProps } from '../Header';
import HeaderRow from '../HeaderRow';
import helpers, { fakeCellMetaData, Row } from '../helpers/test/GridPropHelpers';
import * as GetScrollbarSize from '../getScrollbarSize';
import { HeaderRowType, DEFINE_SORT } from '../common/enums';

const SCROLL_BAR_SIZE = 17;

describe('Header Unit Tests', () => {
  function getProps(): HeaderProps<Row> {
    return {
      columnMetrics: {
        columns: helpers.columns,
        minColumnWidth: 80,
        totalColumnWidth: 2600,
        totalWidth: 2600,
        width: 2600
      },
      cellMetaData: fakeCellMetaData,
      totalWidth: 1000,
      rowHeight: 50,
      headerRows: [{
        height: 50,
        rowType: HeaderRowType.HEADER,
        onFilterChange() { }
      }],
      onColumnResize: jest.fn(),
      onSort: () => null,
      onHeaderDrop() { },
      draggableHeaderCell: () => null
    };
  }

  beforeEach(() => {
    jest.spyOn(GetScrollbarSize, 'default').mockReturnValue(SCROLL_BAR_SIZE);
  });

  it('should render a default header row', () => {
    const wrapper = shallow(<Header {...getProps()} />);
    expect(wrapper.find(HeaderRow).length).toBe(1);
  });

  it('should render a default header row', () => {
    const wrapper = shallow(<Header {...getProps()} />);
    expect(wrapper.find(HeaderRow).length).toBe(1);
  });

  it('header row drag end should trigger onColumnResize callback', () => {
    const resizeColIdx = 1;
    const testProps = getProps();
    const wrapper = shallow(<Header<Row> {...testProps} />);
    const headerRow = wrapper.find(HeaderRow);
    headerRow.props().onColumnResizeEnd(helpers.columns[resizeColIdx] as never, 200);
    expect(testProps.onColumnResize).toHaveBeenCalled();
    expect(testProps.onColumnResize).toHaveBeenCalledWith(resizeColIdx, 200);
  });

  describe('Rendering Header component', () => {
    function renderComponent(props: HeaderProps<Row>) {
      return shallow(<Header {...props} />);
    }
    const testRequiredProps: HeaderProps<Row> = {
      columnMetrics: {
        columns: helpers.columns,
        minColumnWidth: 81,
        totalColumnWidth: 2600,
        totalWidth: 2600,
        width: 2601
      },
      rowHeight: 51,
      totalWidth: 2600,
      headerRows: [{
        height: 51,
        rowType: HeaderRowType.HEADER,
        onFilterChange() { }
      }],
      onSort: jest.fn(),
      onHeaderDrop() { },
      cellMetaData: fakeCellMetaData,
      draggableHeaderCell: () => null,
      onColumnResize() { }
    };
    const testAllProps: HeaderProps<Row> = {
      columnMetrics: {
        columns: helpers.columns,
        minColumnWidth: 80,
        totalColumnWidth: 2600,
        totalWidth: 2600,
        width: 2600
      },
      totalWidth: 1000,
      rowHeight: 50,
      headerRows: [{
        height: 50,
        rowType: HeaderRowType.HEADER,
        onFilterChange() { }
      }],
      sortColumn: 'count',
      sortDirection: DEFINE_SORT.DESC,
      onSort: jest.fn(),
      onColumnResize: jest.fn(),
      draggableHeaderCell: jest.fn(),
      getValidFilterValues: jest.fn(),
      cellMetaData: fakeCellMetaData,
      onHeaderDrop() { }
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
      const headerRow = wrapper.find('.react-grid-Header').childAt(0);
      expect(headerRow.props().style.width).toBe(testAllProps.totalWidth as number - SCROLL_BAR_SIZE);
    });
    it('does not pass onScroll properties if it is not available from props', () => {
      const wrapper = renderComponent(testRequiredProps);
      const headerDiv = wrapper.find('div');
      expect(headerDiv.props().onScroll).toBeUndefined();
    });

    it('execute onCellClick event on cellMetaData and rowIdx & idx = -1', () => {
      jest.spyOn(testAllProps.cellMetaData, 'onCellClick').mockImplementation(() => { });
      const wrapper = renderComponent(testAllProps);
      const headerDiv = wrapper.find('div');
      headerDiv.simulate('click');
      expect(testAllProps.cellMetaData.onCellClick).toHaveBeenCalledWith({ rowIdx: -1, idx: -1 });
    });
  });
});
