import React from 'react';
import DataGrid, { valueCellContentRenderer } from 'react-data-grid';
import Wrapper from './Wrapper';

export default class extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._columns = this.createColumns();

    this.state = { rows: this.createRows() };
  }

  getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  };

  createColumns = () => {
    const cols = [];
    for (let j = 0; j < 50; j++) {
      cols.push({ key: `col${j}`, name: `col${j}`, width: 150 });
    }

    return cols;
  };

  createRows = () => {
    const rows = [];
    for (let rowIdx = 1; rowIdx < 300; rowIdx++) {
      const row = {};
      this._columns.forEach((c, colIdx) => row[c.key] = `(${colIdx},${rowIdx})`);
      rows.push(row);
    }

    return rows;
  };

  rowGetter = (rowIdx) => {
    return this.state.rows[rowIdx];
  };

  render() {
    return (
      <Wrapper title="Immutable Data Example">
        <DataGrid
          enableCellSelect
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={1200}
          defaultCellContentRenderer={valueCellContentRenderer}
        />
      </Wrapper>
    );
  }
}
