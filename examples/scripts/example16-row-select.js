import React from 'react';
import ReactDataGrid, { SelectColumn } from 'react-data-grid';

import exampleWrapper from '../components/exampleWrapper';

class Example extends React.Component {
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
      <div>
        <span>{this.state.selectedRows.size} {rowText} selected</span>
        <ReactDataGrid
          rowKey="id"
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={500}
          selectedRows={this.state.selectedRows}
          onSelectedRowsChange={this.onSelectedRowsChange}
        />
      </div>
    );
  }
}

const exampleDescription = (
  <div />
);

export default exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Row Selection',
  exampleDescription,
  examplePath: './scripts/example16-row-select.js',
  examplePlaygroundLink: 'https://jsfiddle.net/f6mbnb8z/5/'
});
