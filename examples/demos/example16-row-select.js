import React from 'react';
import DataGrid, { SelectColumn } from 'react-data-grid';
import Wrapper from './Wrapper';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this._columns = [
      SelectColumn,
      {
        key: 'id',
        name: 'ID'
      },
      {
        key: 'title',
        name: 'Title'
      },
      {
        key: 'count',
        name: 'Count'
      }
    ];

    const rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        title: `Title ${i}`,
        count: i * 1000
      });
    }
    this.state = {
      rows,
      selectedRows: new Set()
    };
  }

  rowGetter = (i) => {
    return this.state.rows[i];
  };

  onSelectedRowsChange = (selectedRows) => {
    this.setState({ selectedRows });
  };

  render() {
    const rowText = this.state.selectedRows.size === 1 ? 'row' : 'rows';
    return (
      <Wrapper title="Row Selection">
        <span>{this.state.selectedRows.size} {rowText} selected</span>
        <DataGrid
          rowKey="id"
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={500}
          selectedRows={this.state.selectedRows}
          onSelectedRowsChange={this.onSelectedRowsChange}
        />
      </Wrapper>
    );
  }
}
