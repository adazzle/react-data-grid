import React from 'react';
import DataGrid from 'react-data-grid';
import Wrapper from './Wrapper';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this._columns = [
      { key: 'id', name: 'ID' },
      { key: 'title', name: 'Title', editable: true },
      { key: 'count', name: 'Count' }
    ];

    const rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        title: `Title ${i}`,
        count: i * 1000,
        active: i % 2
      });
    }

    this._rows = rows;

    this.state = { selectedRows: [] };
  }

  rowGetter = (index) => {
    return this._rows[index];
  };

  onSelectedCellChange = ({ rowIdx, idx }) => {
    this.grid.openCellEditor(rowIdx, idx);
  };

  render() {
    const rowText = this.state.selectedRows.length === 1 ? 'row' : 'rows';
    return (
      <Wrapper title="Cell selection/delesection events">
        <span>{this.state.selectedRows.length} {rowText} selected</span>
        <DataGrid
          ref={node => this.grid = node}
          rowKey="id"
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this._rows.length}
          minHeight={500}
          enableCellSelect
          onSelectedCellChange={this.onSelectedCellChange}
        />
      </Wrapper>
    );
  }
}
