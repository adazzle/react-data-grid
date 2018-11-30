const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');
const Immutable = require('immutable');

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._columns = this.createColumns();
    this._rows = this.createRows();

    this.state = { rows: new Immutable.fromJS(this._rows) };
  }

  getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  };

  createColumns = () => {
    let cols = [];
    for (let j = 0; j < 50; j++) {
      cols.push({ key: 'col' + j, name: 'col' + j, width: 150 });
    }

    return cols;
  };

  createRows = () => {
    let rows = [];
    for (let rowIdx = 1; rowIdx < 300; rowIdx++) {
      let row = {};
      this._columns.forEach((c, colIdx) => row[c.key] = '(' + colIdx + ',' + rowIdx + ')');
      rows.push(row);
    }

    return rows;
  };

  rowGetter = (rowIdx) => {
    return this.state.rows.get(rowIdx);
  };

  render() {
    return  (
      <ReactDataGrid
        enableCellSelect={true}
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.size}
        minHeight={1200} />);
  }
}

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Immutable Data Example',
  exampleDescription: 'Data Grid using immutable data',
  examplePath: './scripts/example11-immutable-data.js',
  examplePlaygroundLink: undefined
});

module.exports.Component = Example;
