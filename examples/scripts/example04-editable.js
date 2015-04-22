var ReactGrid   = require('../build/react-data-grid');

function createRows(noOfRows){
  var _rows = [];
  for (var i =1; i < noOfRows; i++) {
    _rows.push({
      id: i,
      title: 'Title ' + i,
      count: i * 1000
    });
  }
  return _rows;
}

var columns = [
{
  key: 'id',
  name: 'ID'
},
{
  key: 'title',
  name: 'Title',
  editable : true
},
{
  key: 'count',
  name: 'Count',
  editable : true
}
]

module.exports = React.createClass({

  getInitialState : function(){
    return {rows : createRows(1000)}
  },

  rowGetter : function(rowIdx){
    return this.state.rows[rowIdx]
  },

  handleRowUpdated : function(e){
    //merge updated row with current row and rerender by setting state
    var rows = this.state.rows;
    Object.assign(rows[e.rowIdx], e.updated);
    this.setState({rows:rows});
  },

  render:function(){
    return(
      <div>
        <h3>Editable Example</h3>
        <ReactGrid
          enableCellSelect={true}
          columns={columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={500}
          onRowUpdated={this.handleRowUpdated} />
      </div>
    )
  }

});
