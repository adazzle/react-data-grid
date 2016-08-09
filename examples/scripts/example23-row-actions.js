
var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');


var RowActionsExample = `
var RowActionsCell = ReactDataGridPlugins.Draggable.RowActionsCell;
var DraggableContainer = ReactDataGridPlugins.Draggable.Container;
var DropTargetRowContainer = ReactDataGridPlugins.Draggable.DropTargetRowContainer;

var priorities = [{id:0, title : 'Critical'}, {id:1, title : 'High'}, {id:2, title : 'Medium'}, {id:3, title : 'Low'}]
var issueTypes = ['Bug', 'Improvement', 'Epic', 'Story'];
//helper to generate a random date
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}

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


//Columns definition
var columns = [
{
  key: 'id',
  name: 'ID',
  width: 80
},
{
  key: 'task',
  name: 'Title'
},
{
  key : 'priority',
  name : 'Priority'
},
{
  key : 'issueType',
  name : 'Issue Type'
}
]


let RowRenderer = DropTargetRowContainer(ReactDataGrid.Row);

var Example = React.createClass({

  getInitialState : function(){
    return {rows : createRows(1000)}
  },

  rowGetter : function(rowIdx){
    return this.state.rows[rowIdx];
  },

  reorderRow: function(e) {
    let rows = this.state.rows.slice(0);
    var fromRow = rows[e.rowSource.idx];
    rows[e.rowSource.idx] = rows[e.rowTarget.idx];
    rows[e.rowTarget.idx] = fromRow;
    this.setState({rows: rows});
  },

  render: function() {
    return  (
    <DraggableContainer>
      <ReactDataGrid
        rowActionsCell={RowActionsCell}
        columns={columns}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.length}
        minHeight={500}
        rowRenderer={<RowRenderer onRowDrop={this.reorderRow}/>}/>
    </DraggableContainer>);
  }
});
ReactDOM.render(<Example />, mountNode);
`;

module.exports = React.createClass({

  render:function(){
    return(
      <div>
        <h3>A Simple Example</h3>
        <ReactPlayground codeText={RowActionsExample} />
      </div>
    )
  }

});
