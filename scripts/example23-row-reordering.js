const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');
const {
   Draggable: { Container: DraggableContainer, RowActionsCell, DropTargetRowContainer },
   Data: { Selectors }
} = require('react-data-grid-addons');

import PropTypes from 'prop-types';

const RowRenderer = DropTargetRowContainer(ReactDataGrid.Row);

class Example extends React.Component {
  static propTypes = {
    rowKey: PropTypes.string.isRequired
  };

  static defaultProps = { rowKey: 'id' };

  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
        key: 'id',
        name: 'ID'
      },
      {
        key: 'task',
        name: 'Title'
      },
      {
        key: 'priority',
        name: 'Priority'
      },
      {
        key: 'issueType',
        name: 'Issue Type'
      }
    ];

    this.state = { rows: this.createRows(1000), selectedIds: [1, 2] };
  }

  getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  };

  createRows = (numberOfRows) => {
    let rows = [];
    for (let i = 1; i < numberOfRows; i++) {
      rows.push({
        id: i,
        task: 'Task ' + i,
        complete: Math.min(100, Math.round(Math.random() * 110)),
        priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
        issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
        startDate: this.getRandomDate(new Date(2015, 3, 1), new Date()),
        completeDate: this.getRandomDate(new Date(), new Date(2016, 0, 1))
      });
    }
    return rows;
  };

  rowGetter = (i) => {
    return this.state.rows[i];
  };

  isDraggedRowSelected = (selectedRows, rowDragSource) => {
    if (selectedRows && selectedRows.length > 0) {
      let key = this.props.rowKey;
      return selectedRows.filter(r => r[key] === rowDragSource.data[key]).length > 0;
    }
    return false;
  };

  reorderRows = (e) => {
    let selectedRows = Selectors.getSelectedRowsByKey({rowKey: this.props.rowKey, selectedKeys: this.state.selectedIds, rows: this.state.rows});
    let draggedRows = this.isDraggedRowSelected(selectedRows, e.rowSource) ? selectedRows : [e.rowSource.data];
    let undraggedRows = this.state.rows.filter(function(r) {
      return draggedRows.indexOf(r) === -1;
    });
    let args = [e.rowTarget.idx, 0].concat(draggedRows);
    Array.prototype.splice.apply(undraggedRows, args);
    this.setState({rows: undraggedRows});
  };

  onRowsSelected = (rows) => {
    this.setState({selectedIds: this.state.selectedIds.concat(rows.map(r => r.row[this.props.rowKey]))});
  };

  onRowsDeselected = (rows) => {
    let rowIds = rows.map(r =>  r.row[this.props.rowKey]);
    this.setState({selectedIds: this.state.selectedIds.filter(i => rowIds.indexOf(i) === -1 )});
  };

  render() {
    return  (
      <DraggableContainer>
        <ReactDataGrid
          enableCellSelection={true}
          rowActionsCell={RowActionsCell}
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={500}
          rowRenderer={<RowRenderer onRowDrop={this.reorderRows}/>}
          rowSelection={{
            showCheckbox: true,
            enableShiftSelect: true,
            onRowsSelected: this.onRowsSelected,
            onRowsDeselected: this.onRowsDeselected,
            selectBy: {
              keys: {rowKey: this.props.rowKey, values: this.state.selectedIds}
            }
          }}/>
      </DraggableContainer>);
  }
}

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Row Reordering',
  exampleDescription: 'This examples demonstrates how single or multiple rows can be dragged to a different positions using components from Draggable React Addons',
  examplePath: './scripts/example23-row-reordering.js'
});
