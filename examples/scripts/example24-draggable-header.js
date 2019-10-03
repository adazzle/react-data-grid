import React from 'react';
import ReactDataGrid from 'react-data-grid';
import { DraggableHeader } from 'react-data-grid-addons';

import exampleWrapper from '../components/exampleWrapper';

const { DraggableContainer } = DraggableHeader;

class Example extends React.Component {
  createRows = () => {
    const rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        title: `Title ${i}`,
        count: i * 1000
      });
    }

    return rows;
  };

  rowGetter = (i) => {
    return this.state.rows[i];
  };

  onHeaderDrop = (source, target) => {
    const columns = [...this.state.columns];
    const columnSourceIndex = columns.findIndex(i => i.key === source);
    const columnTargetIndex = columns.findIndex(i => i.key === target);
    const temp = { ...columns[columnSourceIndex] };
    columns[columnSourceIndex] = { ...columns[columnTargetIndex] };
    columns[columnTargetIndex] = temp;
    this.setState({ columns });
  };

  state = {
    columns: [
      {
        key: 'id',
        name: 'ID',
        width: 50,
        draggable: true
      },
      {
        key: 'title',
        name: 'Title',
        draggable: true,
        resizable: true
      },
      {
        key: 'count',
        name: 'Count',
        draggable: true,
        resizable: true
      }
    ],
    rows: this.createRows()
  };

  render() {
    return (
      <DraggableContainer
        onHeaderDrop={this.onHeaderDrop}
      >
        <ReactDataGrid
          columns={this.state.columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={500}
        />
      </DraggableContainer>
    );
  }
}

export default exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Drag Columns to Reorder',
  exampleDescription: 'Drag Columns to Reorder',
  examplePath: './scripts/example24-draggable-header.js'
  // examplePlaygroundLink: ''
});
