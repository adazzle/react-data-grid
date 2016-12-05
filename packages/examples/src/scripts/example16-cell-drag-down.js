var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');

var EditableExample = `


//helper to generate a random date
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}

var issueTypes = ['Bug', 'Improvement', 'Epic', 'Story'];

//helper to create a fixed number of rows
function createRows(numberOfRows){
  var _rows = [];
  for (var i = 1; i < numberOfRows; i++) {
    _rows.push({
      id: i,
      task: 'Task ' + i,
      complete: Math.min(100, Math.round(Math.random() * 110)),
      priority : ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
      issueType : issueTypes[Math.floor((Math.random() * 3) + 1)],
      startDate: randomDate(new Date(2015, 3, 1), new Date()),
      completeDate: randomDate(new Date(), new Date(2016, 0, 1))
    });
  }
  return _rows;
}

//function to retrieve a row for a given index
var rowGetter = function(i){
  return _rows[i];
};

//Columns definition
var columns = [
{
  key: 'id',
  name: 'ID',
  width: 80
},
{
  key: 'task',
  name: 'Title',
  editable : true
},
{
  key : 'priority',
  name : 'Priority',
  editable : true
},
{
  key : 'issueType',
  name : 'Issue Type',
  editable : true
}
]


var Example = React.createClass({

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

  handleCellDrag : function(e){
    var rows = this.state.rows.slice(0);
    for (var i = e.fromRow; i <= e.toRow; i++){
      var rowToUpdate = rows[i];
      rowToUpdate[e.cellKey] = e.value;
    }
    this.setState({rows:rows});
  },

  handleDragHandleDoubleClick: function(e) {
    var rows = this.state.rows.map(function(r){
      return Object.assign({}, r);
    });
    var column = columns[e.idx];
    for (var i = e.rowIdx; i <= rows.length - 1; i++){
      var rowToUpdate = rows[i];
      rowToUpdate[column.key] = e.rowData[column.key];
    }
    this.setState({rows:rows});
  },

  render:function(){
    return(
      <ReactDataGrid
      enableCellSelect={true}
      columns={columns}
      rowGetter={this.rowGetter}
      rowsCount={this.state.rows.length}
      onDragHandleDoubleClick={this.handleDragHandleDoubleClick}
      onCellsDragged={this.handleCellDrag}
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
          <h3>Cell Drag Down Example</h3>
          <p>This example demonstrates how you can easily update multiple cells by dragging from the drag handle of an editable cell.</p>
          <p>Alternatively by double clicking on the drag handle, you can update all the cells underneath the active cell.</p>
          <ReactPlayground codeText={EditableExample} />
        </div>
      )
    }

  });
