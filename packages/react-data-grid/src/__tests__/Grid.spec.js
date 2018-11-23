import React from 'react';
import Grid from '../Grid';
import helpers, {fakeCellMetaData} from '../helpers/test/GridPropHelpers';
import { shallow } from 'enzyme';
import { ContextMenu } from 'react-contextmenu';

describe('Empty Grid Tests', () => {
  class EmptyRowsView extends React.Component {
    render() {
      return (<div>Nothing to show</div>);
    }
  }

  const testProps = {
    columnMetrics: {
      columns: helpers.columns
    },
    headerRows: [],
    rowsCount: 0,
    rowOffsetHeight: 50,
    rowGetter: function() {
      return [];
    },
    minHeight: 600,
    emptyRowsView: EmptyRowsView,
    onViewportKeydown: () => {},
    onViewportDragStart: () => {},
    onViewportDragEnd: () => {},
    onViewportDoubleClick: () => {},
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
    const wrapper = shallow(<Grid {...testProps}/>);
    expect(wrapper.find(EmptyRowsView).exists());
  });
});

describe('Rendering Grid component', () => {
  const renderComponent = (props) => {
    const wrapper = shallow(<Grid {...props} />);
    return wrapper;
  };

  const allProperties = () => {
    return {
      rowGetter: jasmine.createSpy(),
      columns: helpers.columns,
      columnMetrics: {
        columns: helpers.columns,
        width: 1200
      },
      minHeight: 500,
      totalWidth: 700,
      headerRows: [],
      rowHeight: 50,
      rowRenderer: jasmine.createSpy(),
      emptyRowsView: jasmine.createSpy(),
      expandedRows: jasmine.createSpy(),
      selectedRows: jasmine.createSpy(),
      rowSelection: {isSelectedKey: 'selectedKey'},
      rowsCount: 14,
      onRows: jasmine.createSpy(),
      sortColumn: 'sortColumn',
      sortDirection: 'ASC',
      tabIndex: -1,
      rowOffsetHeight: 100,
      onViewportKeydown: jasmine.createSpy(),
      onViewportKeyup: jasmine.createSpy(),
      onViewportDragStart: jasmine.createSpy(),
      onViewportDragEnd: jasmine.createSpy(),
      onViewportDoubleClick: jasmine.createSpy(),
      onColumnResize: jasmine.createSpy(),
      onSort: jasmine.createSpy(),
      cellMetaData: {
        selected: {idx: 2, rowIdx: 3},
        dragged: null,
        onCellClick: jasmine.createSpy(),
        onCellContextMenu: jasmine.createSpy(),
        onCellDoubleClick: jasmine.createSpy(),
        onCommit: jasmine.createSpy(),
        onCommitCancel: jasmine.createSpy(),
        copied: null,
        handleDragEnterRow: jasmine.createSpy(),
        handleTerminateDrag: jasmine.createSpy(),
        onColumnEvent: jasmine.createSpy()
      },
      rowKey: 'rowKeyValue',
      rowScrollTimeout: 300,
      contextMenu: <ContextMenu />,
      getSubRowDetails: jasmine.createSpy(),
      draggableHeaderCell: jasmine.createSpy(),
      getValidFilterValues: jasmine.createSpy(),
      rowGroupRenderer: jasmine.createSpy(),
      overScan: {key: 'value'}
    };
  };
  it('passes classname property', () => {
    const wrapper = renderComponent(allProperties());
    const draggableDiv = wrapper.find('div').at(0);
    expect(draggableDiv.hasClass('react-grid-Grid'));
  });
  it('passes style property', () => {
    const wrapper = renderComponent(allProperties());
    const draggableDiv = wrapper.find('div').at(0);
    expect(draggableDiv.props().style).toBeDefined();
  });
  it('does not pass unknown properties to the div', () => {
    const wrapper = renderComponent(allProperties());
    const draggableDiv = wrapper.find('div').at(0);
    expect(draggableDiv.props().rowGetter).toBeUndefined();
    expect(draggableDiv.props().columns).toBeUndefined();
    expect(draggableDiv.props().columnMetrics).toBeUndefined();
    expect(draggableDiv.props().minHeight).toBeUndefined();
    expect(draggableDiv.props().totalWidth).toBeUndefined();
    expect(draggableDiv.props().headerRows).toBeUndefined();
    expect(draggableDiv.props().rowHeight).toBeUndefined();
    expect(draggableDiv.props().rowRenderer).toBeUndefined();
    expect(draggableDiv.props().emptyRowsView).toBeUndefined();
    expect(draggableDiv.props().expandedRows).toBeUndefined();
    expect(draggableDiv.props().selectedRows).toBeUndefined();
    expect(draggableDiv.props().rowSelection).toBeUndefined();
    expect(draggableDiv.props().rowsCount).toBeUndefined();
    expect(draggableDiv.props().onRows).toBeUndefined();
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
    expect(draggableDiv.props().rowScrollTimeout).toBeUndefined();
    expect(draggableDiv.props().contextMenu).toBeUndefined();
    expect(draggableDiv.props().getSubRowDetails).toBeUndefined();
    expect(draggableDiv.props().draggableHeaderCell).toBeUndefined();
    expect(draggableDiv.props().getValidFilterValues).toBeUndefined();
    expect(draggableDiv.props().rowGroupRenderer).toBeUndefined();
    expect(draggableDiv.props().overScan).toBeUndefined();
    expect(draggableDiv.props().tabIndex).toBeUndefined();
  });
});
