import React from 'react';
import ReactDataGrid from 'react-data-grid';
import faker from 'faker';
import update from 'immutability-helper';

import exampleWrapper from '../components/exampleWrapper';

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
        key: 'id',
        name: 'ID',
        width: 80
      },
      {
        key: 'title',
        name: 'Title',
        editable: true
      },
      {
        key: 'currency',
        name: 'Currency',
        editable: true
      },
      {
        key: 'color',
        name: 'Color',
        editable: true
      },
      {
        key: 'description',
        name: 'Description',
        editable: true
      },
      {
        key: 'count',
        name: 'Count',
        editable: true
      }
    ];

    this.state = { rows: this.createRows(1000) };
  }

  createRows = () => {
    const rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        title: `Title ${i}`,
        count: i * 1000,
        color: faker.commerce.color(),
        currency: faker.finance.currencyCode(),
        description: faker.lorem.words(5),
        isSelected: false
      });
    }

    return rows;
  };

  rowGetter = (i) => {
    return this.state.rows[i];
  };

  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    const rows = this.state.rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      const rowToUpdate = rows[i];
      const updatedRow = update(rowToUpdate, { $merge: updated });
      rows[i] = updatedRow;
    }

    this.setState({ rows });
  };

  render() {
    return (
      <ReactDataGrid
        enableCellSelect
        cellRangeSelection
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.length}
        minHeight={500}
        onGridRowsUpdated={this.handleGridRowsUpdated}
      />
    );
  }
}

const exampleDescription = (
  <p>
    This example shows that copying and pasting a range of cells works as you would expect.
    To implement this behavior, make your columns editable per the <a href="#/examples/editable">Editable Example</a>
    {' '} and add the <code>cellRangeSelection</code> property to the component.
  </p>
);

export default exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Range Copy and Paste',
  exampleDescription,
  examplePath: './scripts/example32-range-copy-paste.js'
  // TODO: Playground link
});
