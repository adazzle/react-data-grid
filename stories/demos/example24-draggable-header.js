import React from 'react';
import DataGrid from 'react-data-grid';
import { DraggableHeader } from 'react-data-grid-addons';
import Wrapper from './Wrapper';

const { DraggableContainer } = DraggableHeader;

export default class extends React.Component {
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
      <Wrapper title="Drag Columns to Reorder">
        <DraggableContainer
          onHeaderDrop={this.onHeaderDrop}
        >
          <DataGrid
            columns={this.state.columns}
            rowGetter={this.rowGetter}
            rowsCount={this.state.rows.length}
            minHeight={500}
          />
        </DraggableContainer>
      </Wrapper>
    );
  }
}
