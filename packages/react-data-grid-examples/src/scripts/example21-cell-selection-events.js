const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');

class Example extends React.Component {
  constructor(props) {
    super(props);
    this._columns = [
      { key: 'id', name: 'ID' },
      { key: 'title', name: 'Title', editable: true },
      { key: 'count', name: 'Count' }
    ];

    let rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        title: 'Title ' + i,
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

  onRowSelect = (rows) => {
    this.setState({ selectedRows: rows });
  };

  onCellSelected = ({ rowIdx, idx }) => {
    this.grid.openCellEditor(rowIdx, idx);
  };

  onCellDeSelected = ({ rowIdx, idx }) => {
    this.setState({alert: `The editor for cell ${idx}, ${rowIdx} should have just closed`});
  };

  render() {
    const rowText = this.state.selectedRows.length === 1 ? 'row' : 'rows';
    return  (
      <div>
        <span>{this.state.selectedRows.length} {rowText} selected</span>
        {this.state.alert && <div className="alert alert-info" role="alert">{this.state.alert}</div>}
        <ReactDataGrid
          ref={ node => this.grid = node }
          rowKey="id"
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this._rows.length}
          enableRowSelect="multi"
          minHeight={500}
          onRowSelect={this.onRowSelect}
          enableCellSelect={true}
          onCellSelected={this.onCellSelected}
          onCellDeSelected={this.onCellDeSelected} />
      </div>);
  }
}

const exampleDescription = (
  <div>
    <p>Define onCellSelected and onCellDeSelected callback handlers and pass them as props to enable events upon cell selection/deselection.</p>
    <p>if passed, onCellSelected will be triggered each time a cell is selected with the cell coordinates. Similarly, onCellDeSelected will be triggered when a cell is deselected.</p>
  </div>
);

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Cell selection/delesection events',
  exampleDescription,
  examplePath: './scripts/example21-cell-selection-events.js',
  examplePlaygroundLink: 'https://jsfiddle.net/f6mbnb8z/8/'
});
