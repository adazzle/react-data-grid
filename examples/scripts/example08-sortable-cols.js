var ReactGrid             = require('../build/react-data-grid');
var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');

var EditableExample = `
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
      issueType : ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
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
  sortable : true
},
{
  key: 'priority',
  name: 'Priority',
  sortable : true
},
{
  key: 'issueType',
  name: 'Issue Type',
  sortable : true
},
{
  key: 'complete',
  name: '% Complete',
  sortable : true
},
{
  key: 'startDate',
  name: 'Start Date',
  sortable : true
},
{
  key: 'completeDate',
  name: 'Expected Complete',
  sortable : true
}
]


var Example = React.createClass({

  getInitialState : function(){
    var originalRows = createRows(1000);
    var rows = originalRows.slice(0);
    //store the original rows array, and make a copy that can be used for modifying eg.filtering, sorting
    return {originalRows : originalRows, rows : rows};
  },

  rowGetter : function(rowIdx){
    return this.state.rows[rowIdx];
  },

  handleGridSort : function(sortColumn, sortDirection){

    var comparer = function(a, b) {
      if(sortDirection === 'ASC'){
        return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
      }else if(sortDirection === 'DESC'){
        return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
      }
    }
    var rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);
    this.setState({rows : rows});
  },

  render:function(){
    return(
      <ReactDataGrid
        onGridSort={this.handleGridSort}
        columns={columns}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.length}
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
      <h3>Sortable Columns Example</h3>
      <p>While ReactDataGrid doesnt not provide the ability to sort directly, it does provide hooks that allow you to provide your own sort function. This is done via the <code>onGridSort</code> prop. To enable sorting for a given column, set <code>column.sortable = true</code> for that column. Now when the header cell is clicked for that column, <code>onGridSort</code> will be triggered passing the column name and the sort direction.</p>
      <ReactPlayground codeText={EditableExample} />
      </div>
    )
  }

});
