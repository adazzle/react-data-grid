import React from 'react';
import DataGrid from 'react-data-grid';
import Wrapper from './Wrapper';

export default class extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.createRows();
    this._columns = [
      { key: 'id', name: 'ID' },
      { key: 'task', name: 'Title' },
      { key: 'priority', name: 'Priority' },
      { key: 'issueType', name: 'Issue Type' },
      { key: 'complete', name: '% Complete' }
    ];

    this.state = null;
  }

  createRows = () => {
    const rows = [];
    for (let i = 1; i < 1000000; i++) {
      rows.push({
        id: i,
        task: `Task ${i}`,
        complete: 'a',
        priority: 'b',
        issueType: 'c'
      });
    }

    this._rows = rows;
  };

  rowGetter = (i) => {
    return this._rows[i];
  };

  render() {
    return (
      <Wrapper title="One Million Rows Example">
        <DataGrid
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this._rows.length}
          minHeight={500}
        />
      </Wrapper>
    );
  }
}
