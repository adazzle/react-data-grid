var React       = require('react');
var ReactDataGrid = require('../build/react-data-grid');
var Immutable = window.Immutable = require('immutable');


//helper to generate a random date
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}

var _rows = [];
var _cols = [];
for (var j = 0; j < 50; j++) {
  _cols.push({ key: 'col' + j, name: 'col' + j, width: 150, editable: true });
}

for (var rowIdx = 1; rowIdx < 300; rowIdx++) {
  var row = {};
  _cols.forEach(function(c, colIdx) {
    row[c.key] = '(' + colIdx + ',' + rowIdx + ')';
  });
  _rows.push(row);
}

var Example = React.createClass({

  getInitialState: function() {
    return { rows: new Immutable.fromJS(_rows), cols: new Immutable.List(_cols) };
  },

  rowGetter: function(rowIdx) {
    return this.state.rows.get(rowIdx);
  },

  handleRowUpdated: function(e) {
    //merge updated row with current row and rerender by setting state
    var rows = this.state.rows.update(e.rowIdx, function(row) {
      return row.merge(e.updated);
    });
    this.setState({ rows: rows });
  },

  render: function() {
    return (
      <ReactDataGrid
        ref="reactDataGrid"
        enableCellSelect={true}
        columns={this.state.cols}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.size}
        minHeight={1200}
        onRowUpdated={this.handleRowUpdated} />
    );
  }

});




module.exports = React.createClass({

  render: function() {
    return (
      <div>
        <h3>Immutable Data Example</h3>
        <p></p>
        <Example/>
      </div>
    );
  }

});
