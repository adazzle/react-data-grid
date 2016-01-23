var ReactGrid             = require('../build/react-data-grid');
var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');
var Immutable = require('immutable');

var immutableDataExample = `
//helper to generate a random date
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
};

var _rows = [];
var _cols = [];
for(var j = 0; j < 50; j++){
    _cols.push({key: 'col' + j, name: 'col' + j, width: 150, editable:true});
};

for (var rowIdx = 1; rowIdx < 100; rowIdx++) {
  var row = {};
  _cols.forEach(function(c, colIdx){
    row[c.key] = '(' + colIdx + ',' + rowIdx + ')';
  });
  _rows.push(row);
}

var Example = React.createClass({

  getInitialState : function(){
    return {rows : new Immutable.fromJS(_rows), cols: new Immutable.List(_cols)}
  },

  rowGetter : function(rowIdx){
    return this.state.rows.get(rowIdx)
  },

  handleRowUpdated : function(e){
    //merge updated row with current row and rerender by setting state
    var rows = this.state.rows.update(e.rowIdx, function(row){
      return row.merge(e.updated);
    });
    this.setState({rows:rows});
  },

  render:function(){
    return(
      <ReactDataGrid
      enableCellSelect={true}
      columns={this.state.cols}
      rowGetter={this.rowGetter}
      rowsCount={this.state.rows.size}
      minHeight={500}
      onRowUpdated={this.handleRowUpdated} />
    )
  }

});

ReactDOM.render(<Example />, mountNode);
  `;

  module.exports = React.createClass({

    render:function(){
      return(
        <div>
        <h3>Immutable Data Example</h3>
        <p></p>
        <ReactPlayground codeText={immutableDataExample} />
        </div>
      )
    }

  });
