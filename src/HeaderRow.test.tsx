/* eslint-disable jest/no-hooks */
import React from 'react';
import { mount } from 'enzyme';

import helpers, { Row } from './test/GridPropHelpers';
import HeaderRow, { HeaderRowProps } from './HeaderRow';
import HeaderCell from './HeaderCell';

describe('HeaderRow', () => {
  const defaultProps: HeaderRowProps<Row, 'id', unknown> = {
    rowKey: 'id',
    rows: [],
    columns: helpers.columns,
    onColumnResize() { },
    onSort: jest.fn(),
    sortDirection: 'NONE',
    allRowsSelected: false
  };

  const setup = (testProps?: Partial<HeaderRowProps<Row, 'id', unknown>>) => {
    const props: HeaderRowProps<Row, 'id', unknown> = { ...defaultProps, ...testProps };
    const wrapper = mount(<HeaderRow {...props} />);
    const headerCells = wrapper.find(HeaderCell);
    return { wrapper, headerCells, props };
  };

  describe('When column is sortable and headerCellRenderer not provided', () => {
    const sortableColIdx = 1;

    beforeEach(() => {
      defaultProps.columns[sortableColIdx].sortable = true;
      defaultProps.columns[sortableColIdx + 1].sortable = true;
    });

    afterEach(() => {
      defaultProps.columns[sortableColIdx].sortable = false;
      defaultProps.columns[sortableColIdx + 1].sortable = false;
    });

    it('should call onSort when headerRender triggers sort', () => {
      const { wrapper, props } = setup({ sortColumn: defaultProps.columns[sortableColIdx].key, sortDirection: 'ASC' });
      wrapper.find('.rdg-header-sort-cell').at(0).simulate('click');
      expect(props.onSort).toHaveBeenNthCalledWith(1, 'title', 'DESC');

      wrapper.find('.rdg-header-sort-cell').at(1).simulate('click');
      expect(props.onSort).toHaveBeenNthCalledWith(2, 'count', 'ASC');
    });
  });

  describe('When column has a headerRenderer', () => {
    const customColumnIdx = 1;
    beforeEach(() => {
      defaultProps.columns[customColumnIdx].headerRenderer = () => <div>Custom</div>;
    });

    it('should render custom column header', () => {
      const { wrapper } = setup();
      expect(wrapper.find('.rdg-cell').at(customColumnIdx).text()).toContain('Custom');
    });

    afterEach(() => {
      defaultProps.columns[customColumnIdx].headerRenderer = undefined;
    });
  });

  describe('Rendering HeaderRow component', () => {
    const renderComponent = (props: HeaderRowProps<Row, 'id', unknown>) => {
      return mount(<HeaderRow {...props} />);
    };

    const requiredProps: HeaderRowProps<Row, 'id', unknown> = {
      rowKey: 'id',
      rows: [],
      columns: helpers.columns,
      onSort: jest.fn(),
      allRowsSelected: false,
      onColumnResize: jest.fn()
    };

    it('passes classname property', () => {
      const wrapper = renderComponent(requiredProps);
      const headerRowDiv = wrapper.find('div').at(0);
      expect(headerRowDiv.hasClass('rdg-header-row')).toBe(true);
    });
    it('does not pass width if not available from props', () => {
      const wrapper = renderComponent(requiredProps);
      const headerRowDiv = wrapper.find('div').at(0);
      expect(headerRowDiv.props().width).toBeUndefined();
    });
  });
});
