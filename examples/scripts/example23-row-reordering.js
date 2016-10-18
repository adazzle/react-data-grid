
var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground = require('../assets/js/ReactPlayground');


var RowActionsExample = `
var RowActionsCell = ReactDataGridPlugins.Draggable.RowActionsCell;
var DraggableContainer = ReactDataGridPlugins.Draggable.Container;
var DropTargetRowContainer = ReactDataGridPlugins.Draggable.DropTargetRowContainer;
var Selectors = ReactDataGridPlugins.Data.Selectors;

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
    return {rows : createRows(1000), selectedIds: [1, 2]}
  },

  getDefaultProps: function() {
    return {rowKey: 'id'}
  },

  rowGetter : function(rowIdx){
    return this.state.rows[rowIdx];
  },

  isDraggedRowSelected: function(selectedRows, rowDragSource) {
    if (selectedRows && selectedRows.length > 0) {
      let key = this.props.rowKey;
      return selectedRows.filter(function(r) {
        return r[key] === rowDragSource.data[key];
      }).length > 0;
    }
    return false;
  },

  reorderRows: function(e) {
    let selectedRows = Selectors.getSelectedRowsByKey({rowKey: this.props.rowKey, selectedKeys: this.state.selectedIds, rows: this.state.rows});
    let draggedRows = this.isDraggedRowSelected(selectedRows, e.rowSource) ? selectedRows : [e.rowSource.data];
    let undraggedRows = this.state.rows.filter(function(r) {
      return draggedRows.indexOf(r) === -1;
    });
    var args = [e.rowTarget.idx, 0].concat(draggedRows);
    Array.prototype.splice.apply(undraggedRows, args);
    this.setState({rows: undraggedRows});
  },

  onRowsSelected: function(rows) {
    this.setState({selectedIds: this.state.selectedIds.concat(rows.map(r => r.row[this.props.rowKey]))});
  },

  onRowsDeselected: function(rows) {
    let rowIds = rows.map(r =>  r.row[this.props.rowKey]);
    this.setState({selectedIds: this.state.selectedIds.filter(i => rowIds.indexOf(i) === -1 )});
  },

  render: function() {
    return  (
    <DraggableContainer>
      <ReactDataGrid
        enableCellSelection={true}
        rowActionsCell={RowActionsCell}
        columns={columns}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.length}
        minHeight={500}
        rowRenderer={<RowRenderer onRowDrop={this.reorderRows}/>}
        rowSelection={{
          showCheckbox: true,
          enableShiftSelect: true,
          onRowsSelected: this.onRowsSelected,
          onRowsDeselected: this.onRowsDeselected,
          selectBy: {
            keys: {rowKey: this.props.rowKey, values: this.state.selectedIds}
          }
        }}/>
    </DraggableContainer>);
  }
});
ReactDOM.render(<Example />, mountNode);
`;

module.exports = React.createClass({

  render: function () {
    return (
      <div>
        <h3>Row Reordering</h3>
        <p>This examples demonstrates how single or multiple rows can be dragged to a different positions using components from Draggable React Addons</p> 
        <ReactPlayground codeText={RowActionsExample} />
      </div>
    )
  }

});
