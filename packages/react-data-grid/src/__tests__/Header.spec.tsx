import React from 'react';
import { shallow } from 'enzyme';

import Header, { HeaderProps } from '../Header';
import HeaderRow, { HeaderRowProps } from '../HeaderRow';
import helpers, { fakeCellMetaData, Row } from './GridPropHelpers';
import * as utils from '../utils';
import { HeaderRowType, DEFINE_SORT } from '../common/enums';

const SCROLL_BAR_SIZE = 17;

describe('Header Unit Tests', () => {
  function getProps(): HeaderProps<Row, 'id'> {
    return {
      rowKey: 'id',
      rowsCount: 1,
      rowGetter() { return {}; },
      allRowsSelected: false,
      columnMetrics: {
        columns: helpers.columns,
        totalColumnWidth: 2600,
        viewportWidth: 2600,
        lastFrozenColumnIndex: 0
      },
      cellMetaData: fakeCellMetaData,
      headerRows: [{
        height: 50,
        rowType: HeaderRowType.HEADER,
        onFilterChange() { }
      }, undefined],
      onColumnResize: jest.fn(),
      onSort: () => null,
      onHeaderDrop() { },
      draggableHeaderCell: () => null
    };
  }

  beforeEach(() => {
    jest.spyOn(utils, 'getScrollbarSize').mockReturnValue(SCROLL_BAR_SIZE);
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
    const wrapper = shallow(<Header<Row, 'id'> {...testProps} />);
    const col = helpers.columns[resizeColIdx];
    wrapper.find<HeaderRowProps<Row, 'id'>>(HeaderRow).props().onColumnResize(col, 200);
    expect(testProps.onColumnResize).toHaveBeenCalled();
    expect(testProps.onColumnResize).toHaveBeenCalledWith(col, 200);
  });

  describe('Rendering Header component', () => {
    function renderComponent(props: HeaderProps<Row, 'id'>) {
      return shallow(<Header {...props} />);
    }
    const testRequiredProps: HeaderProps<Row, 'id'> = {
      rowKey: 'id',
      rowsCount: 1,
      rowGetter() { return {}; },
      allRowsSelected: false,
      columnMetrics: {
        columns: helpers.columns,
        totalColumnWidth: 2600,
        viewportWidth: 2600,
        lastFrozenColumnIndex: 0
      },
      headerRows: [{
        height: 51,
        rowType: HeaderRowType.HEADER,
        onFilterChange() { }
      }, undefined],
      onSort: jest.fn(),
      onHeaderDrop() { },
      cellMetaData: fakeCellMetaData,
      draggableHeaderCell: () => null,
      onColumnResize() { }
    };
    const testAllProps: HeaderProps<Row, 'id'> = {
      rowKey: 'id',
      rowsCount: 1,
      rowGetter() { return {}; },
      allRowsSelected: false,
      columnMetrics: {
        columns: helpers.columns,
        totalColumnWidth: 2600,
        viewportWidth: 2600,
        lastFrozenColumnIndex: 0
      },
      headerRows: [{
        height: 50,
        rowType: HeaderRowType.HEADER,
        onFilterChange() { }
      }, undefined],
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
      expect(headerDiv.hasClass('rdg-header'));
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
