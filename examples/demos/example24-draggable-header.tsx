import React from 'react';
import DataGrid, { Column } from '../../src';
import Wrapper from './Wrapper';

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

  rowGetter = (i: number) => {
    return this.state.rows[i];
  };

  onHeaderDrop = (source: string, target: string) => {
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
        resizable: true
      }
    ],
    rows: this.createRows()
  };

  render() {
    return (
      <Wrapper title="Drag Columns to Reorder">
        <DataGrid
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          columns={this.state.columns as Column<any, any>[]}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={500}
          onHeaderDrop={this.onHeaderDrop}
        />
      </Wrapper>
    );
  }
}
