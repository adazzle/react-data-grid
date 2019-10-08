import React from 'react';
import { ContextMenu } from 'react-contextmenu';
import { shallow } from 'enzyme';

import Grid from '../Grid';
import helpers, { fakeCellMetaData } from './GridPropHelpers';

describe('Empty Grid Tests', () => {
  class EmptyRowsView extends React.Component {
    render() {
      return <div>Nothing to show</div>;
    }
  }

  const testProps = {
    columnMetrics: {
      columns: helpers.columns
    },
    headerRows: [],
    rowsCount: 0,
    rowOffsetHeight: 50,
    rowGetter() {
      return [];
    },
    minHeight: 600,
    emptyRowsView: EmptyRowsView,
    onViewportKeydown() {},
    onViewportDragStart() {},
    onViewportDragEnd() {},
    onViewportDoubleClick() {},
    cellMetaData: fakeCellMetaData,
    rowKey: 'id',
    enableCellSelect: true,
    enableCellAutoFocus: true,
    cellNavigationMode: 'changeRow',
    eventBus: {},
    onGridRowsUpdated: () => null,
    onDragHandleDoubleClick: () => null,
    onCommit: () => null
  };

  it('should not have any viewport', () => {
    const wrapper = shallow(<Grid {...testProps} />);
    expect(wrapper.find(EmptyRowsView).exists());
  });
});

describe('Rendering Grid component', () => {
  const renderComponent = (props) => {
    return shallow(<Grid {...props} />);
  };

  const allProperties = () => {
    return {
      rowGetter: jest.fn(),
      columnMetrics: {
        columns: helpers.columns,
        width: 1200
      },
      minHeight: 500,
      totalWidth: 700,
      headerRows: [],
      rowHeight: 50,
      rowRenderer: jest.fn(),
      emptyRowsView: jest.fn(),
      selectedRows: jest.fn(),
      rowsCount: 14,
      sortColumn: 'sortColumn',
      sortDirection: 'ASC',
      tabIndex: -1,
      rowOffsetHeight: 100,
      onViewportKeydown: jest.fn(),
      onViewportKeyup: jest.fn(),
      onViewportDragStart: jest.fn(),
      onViewportDragEnd: jest.fn(),
      onViewportDoubleClick: jest.fn(),
      onColumnResize: jest.fn(),
      onSort: jest.fn(),
      cellMetaData: {
        selected: { idx: 2, rowIdx: 3 },
        dragged: null,
        onCellClick: jest.fn(),
        onCellContextMenu: jest.fn(),
        onCellDoubleClick: jest.fn(),
        onCommit: jest.fn(),
        onCommitCancel: jest.fn(),
        copied: null,
        handleDragEnterRow: jest.fn(),
        handleTerminateDrag: jest.fn()
      },
      rowKey: 'rowKeyValue',
      contextMenu: <ContextMenu />,
      getSubRowDetails: jest.fn(),
      draggableHeaderCell: jest.fn(),
      getValidFilterValues: jest.fn(),
      rowGroupRenderer: jest.fn(),
      overScan: { key: 'value' }
    };
  };
  it('passes classname property', () => {
    const wrapper = renderComponent(allProperties());
    const draggableDiv = wrapper.find('div').at(0);
    expect(draggableDiv.hasClass('rdg-root'));
  });
  it('does not pass unknown properties to the div', () => {
    const wrapper = renderComponent(allProperties());
    const draggableDiv = wrapper.find('div').at(0);
    expect(draggableDiv.props().rowGetter).toBeUndefined();
    expect(draggableDiv.props().columnMetrics).toBeUndefined();
    expect(draggableDiv.props().minHeight).toBeUndefined();
    expect(draggableDiv.props().totalWidth).toBeUndefined();
    expect(draggableDiv.props().headerRows).toBeUndefined();
    expect(draggableDiv.props().rowHeight).toBeUndefined();
    expect(draggableDiv.props().rowRenderer).toBeUndefined();
    expect(draggableDiv.props().emptyRowsView).toBeUndefined();
    expect(draggableDiv.props().selectedRows).toBeUndefined();
    expect(draggableDiv.props().rowSelection).toBeUndefined();
    expect(draggableDiv.props().rowsCount).toBeUndefined();
    expect(draggableDiv.props().sortColumn).toBeUndefined();
    expect(draggableDiv.props().sortDirection).toBeUndefined();
    expect(draggableDiv.props().rowOffsetHeight).toBeUndefined();
    expect(draggableDiv.props().onViewportKeydown).toBeUndefined();
    expect(draggableDiv.props().onViewportKeyup).toBeUndefined();
    expect(draggableDiv.props().onViewportDragStart).toBeUndefined();
    expect(draggableDiv.props().onViewportDragEnd).toBeUndefined();
    expect(draggableDiv.props().onViewportDoubleClick).toBeUndefined();
    expect(draggableDiv.props().onColumnResize).toBeUndefined();
    expect(draggableDiv.props().onSort).toBeUndefined();
    expect(draggableDiv.props().cellMetaData).toBeUndefined();
    expect(draggableDiv.props().rowKey).toBeUndefined();
    expect(draggableDiv.props().contextMenu).toBeUndefined();
    expect(draggableDiv.props().getSubRowDetails).toBeUndefined();
    expect(draggableDiv.props().draggableHeaderCell).toBeUndefined();
    expect(draggableDiv.props().getValidFilterValues).toBeUndefined();
    expect(draggableDiv.props().rowGroupRenderer).toBeUndefined();
    expect(draggableDiv.props().overScan).toBeUndefined();
    expect(draggableDiv.props().tabIndex).toBeUndefined();
  });
});
