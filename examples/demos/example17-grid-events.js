import React from 'react';
import DataGrid from 'react-data-grid';
import Wrapper from './Wrapper';

export default class extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
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

    this.state = {
      rows: this.createRows(),
      selectedRows: new Set()
    };
  }

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

  onRowClick = (rowIdx, row) => {
    const newSelectedRows = new Set(this.state.selectedRows);
    if (newSelectedRows.has(row.id)) {
      newSelectedRows.delete(row.id);
    } else {
      newSelectedRows.add(row.id);
    }
    this.onSelectedRowsChange(newSelectedRows);
  };

  onKeyDown = (e) => {
    if (e.ctrlKey && e.keyCode === 65) {
      e.preventDefault();
      const newSelectedRows = new Set(this.state.selectedRows);
      this.state.rows.forEach(row => newSelectedRows.add(row.id));
      this.onSelectedRowsChange(newSelectedRows);
    }
  };

  onSelectedRowsChange = (selectedRows) => {
    this.setState({ selectedRows });
  };

  render() {
    return (
      <Wrapper title="Grid Events">
        <DataGrid
          rowKey="id"
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={500}
          onRowClick={this.onRowClick}
          onGridKeyDown={this.onKeyDown}
          selectedRows={this.state.selectedRows}
          onSelectedRowsChange={this.onSelectedRowsChange}
        />
      </Wrapper>
    );
  }
}
