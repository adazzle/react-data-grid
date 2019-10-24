import React from 'react';
import DataGrid, { valueCellContentRenderer } from 'react-data-grid';
import Wrapper from './Wrapper';

export default class extends React.Component {
  constructor(props, context) {
    super(props, context);
    const extraColumns = [...Array(500).keys()].map(i => ({ key: `col${i}`, name: `col${i}` }));
    this.createRows(extraColumns);

    const columns = [
      {
        key: 'id',
        name: 'ID',
        frozen: true
      },
      {
        key: 'task',
        name: 'Title',
        width: 200,
        frozen: true
      },
      {
        key: 'priority',
        name: 'Priority',
        width: 200,
        frozen: true
      },
      {
        key: 'issueType',
        name: 'Issue Type',
        width: 200,
        frozen: true
      },
      {
        key: 'complete',
        name: '% Complete',
        width: 200
      },
      {
        key: 'startDate',
        name: 'Start Date',
        width: 200
      },
      {
        key: 'completeDate',
        name: 'Expected Complete',
        width: 200
      },
      ...extraColumns
    ];

    this._columns = columns;
    this.state = null;
  }

  getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  };

  createRows = (extraColumns) => {
    const rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        task: `Task ${i}`,
        complete: Math.min(100, Math.round(Math.random() * 110)),
        priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
        issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
        startDate: this.getRandomDate(new Date(2015, 3, 1), new Date()),
        completeDate: this.getRandomDate(new Date(), new Date(2016, 0, 1))
      });

      for (const extraColumn of extraColumns) {
        rows[rows.length - 1][extraColumn.key] = `${extraColumn.key}`;
      }
    }

    this._rows = rows;
  };

  rowGetter = (i) => {
    return this._rows[i];
  };

  render() {
    return (
      <Wrapper title="Frozen Columns Example">
        <DataGrid
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this._rows.length}
          minHeight={600}
          defaultCellContentRenderer={valueCellContentRenderer}
        />
      </Wrapper>
    );
  }
}
