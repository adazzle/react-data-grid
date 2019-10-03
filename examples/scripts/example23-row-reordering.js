import React from 'react';
import PropTypes from 'prop-types';
import ReactDataGrid, { Row, SelectColumn } from 'react-data-grid';
import { Draggable, Data } from 'react-data-grid-addons';

import exampleWrapper from '../components/exampleWrapper';

const { Container: DraggableContainer, RowActionsCell, DropTargetRowContainer } = Draggable;
const { Selectors } = Data;
const RowRenderer = DropTargetRowContainer(Row);

class Example extends React.Component {
  static propTypes = {
    rowKey: PropTypes.string.isRequired
  };

  static defaultProps = { rowKey: 'id' };

  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
        ...SelectColumn,
        formatter(props) {
          return (
            <RowActionsCell isRowSelected={props.isRowSelected}>
              {SelectColumn.formatter(props)}
            </RowActionsCell>
          );
        }
      },
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

    this.state = {
      rows: this.createRows(1000),
      selectedRows: new Set([1, 2])
    };
  }

  getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  };

  createRows = (numberOfRows) => {
    const rows = [];
    for (let i = 1; i < numberOfRows; i++) {
      rows.push({
        id: i,
        task: `Task ${i}`,
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

  isDraggedRowSelected = (rowDragSource) => {
    if (this.state.selectedRows && this.state.selectedRows.size > 0) {
      const key = this.props.rowKey;
      return this.state.selectedRows.has(rowDragSource.data[key]);
    }
    return false;
  };

  reorderRows = (e) => {
    // TODO: fix reordering logic
    const draggedRows = this.isDraggedRowSelected(e.rowSource) ? [...this.state.selectedRows] : [e.rowSource.data];
    const undraggedRows = this.state.rows.filter((r) => {
      return draggedRows.includes(r[this.props.rowKey]);
    });
    const args = [e.rowTarget.idx, 0].concat(draggedRows);
    Array.prototype.splice.apply(undraggedRows, args);
    this.setState({ rows: undraggedRows });
  };

  onSelectedRowsChange = (selectedRows) => {
    this.setState({ selectedRows });
  };

  render() {
    return (
      <DraggableContainer>
        <ReactDataGrid
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={500}
          rowRenderer={<RowRenderer onRowDrop={this.reorderRows} />}
          selectedRows={this.state.selectedRows}
          onSelectedRowsChange={this.onSelectedRowsChange}
        />
      </DraggableContainer>
    );
  }
}

export default exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Row Reordering',
  exampleDescription: 'This examples demonstrates how single or multiple rows can be dragged to a different positions using components from Draggable React Addons',
  examplePath: './scripts/example23-row-reordering.js'
});
