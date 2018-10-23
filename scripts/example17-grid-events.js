const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');

class Example extends React.Component {
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

    this.state = { rows: this.createRows(1000) };
  }

  createRows = () => {
    let rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        title: 'Title ' + i,
        count: i * 1000,
        isSelected: false
      });
    }

    return rows;
  };

  rowGetter = (i) => {
    return this.state.rows[i];
  };

  onRowClick = (rowIdx, row) => {
    let rows = this.state.rows.slice();
    rows[rowIdx] = Object.assign({}, row, {isSelected: !row.isSelected});
    this.setState({ rows });
  };

  onKeyDown = (e) => {
    if (e.ctrlKey && e.keyCode === 65) {
      e.preventDefault();

      let rows = [];
      this.state.rows.forEach((r) =>{
        rows.push(Object.assign({}, r, {isSelected: true}));
      });

      this.setState({ rows });
    }
  };

  render() {
    return  (
      <ReactDataGrid
        rowKey="id"
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.length}
        minHeight={500}
        rowSelection={{
          showCheckbox: false,
          selectBy: {
            isSelectedKey: 'isSelected'
          }
        }}
        onRowClick={this.onRowClick}
        onGridKeyDown={this.onKeyDown} />);
  }
}

const exampleDescription = (
  <div>
    <h4>onRowClick</h4>
    <p>Called when a row cell is clicked.  Arguments are <code>rowIndex</code> and <code>row</code>.</p>
    <h4>onGridKeyUp/onGridKeyDown</h4>
    <p>Called when a key is pressed or released on the Grid viewport. Argument is a React <a href="https://facebook.github.io/react/docs/events.html">SyntheticEvent</a>.</p>
  </div>
);

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Grid Events',
  exampleDescription,
  examplePath: './scripts/example17-grid-events.js',
  examplePlaygroundLink: 'https://jsfiddle.net/f6mbnb8z/6/'
});
