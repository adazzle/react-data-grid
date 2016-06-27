var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');

var EditableExample = `

//options for priorities autocomplete editor
var priorities = [{id:0, title : 'Critical'}, {id:1, title : 'High'}, {id:2, title : 'Medium'}, {id:3, title : 'Low'}]
var AutoCompleteEditor = ReactDataGridPlugins.Editors.AutoComplete;
var PrioritiesEditor = <AutoCompleteEditor options={priorities}/>

//options for IssueType dropdown editor
var issueTypes = ['Bug', 'Improvement', 'Epic', 'Story'];
var DropDownEditor = ReactDataGridPlugins.Editors.DropDownEditor;
var IssueTypesEditor = <DropDownEditor options={issueTypes}/>

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
  editor : PrioritiesEditor
},
{
  key : 'issueType',
  name : 'Issue Type',
  editor : IssueTypesEditor
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

  render:function(){
    return(
      <ReactDataGrid
      enableCellSelect={true}
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
          <h3>Built-In Cell Editor Example</h3>
          <p>This example uses the built in <strong>Autocomplete</strong> editor for the priorities column and the <strong>DropdownEditor</strong> for the IssueType column. <strong>You must include the <code>react-data-grid.ui-plugins.js</code> package to use the built in editors.</strong></p>
          <ReactPlayground codeText={EditableExample} />
        </div>
      )
    }

  });
