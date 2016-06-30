var ReactGrid             = require('../build/react-data-grid');
var QuickStartDescription = require('../components/QuickStartDescription');
var ReactPlayground       = require('../assets/js/ReactPlayground');

var EditableExample = `
var Toolbar = ReactDataGridPlugins.Toolbar;
var NumberFilterableHeaderCell = ReactDataGridPlugins.CustomFilters.NumberFilterableHeaderCell;

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

//Columns definition
var columns = [
  {
    key: 'id',
    name: 'ID',
    width: 120,
    filterable: true,
    filterRenderer: NumberFilterableHeaderCell
  },
  {
    key: 'task',
    name: 'Title',
    filterable: true
  },
  {
    key: 'priority',
    name: 'Priority',
    filterable: true
  },
  {
    key: 'issueType',
    name: 'Issue Type',
    filterable: true
  },
  {
    key: 'complete',
    name: '% Complete',
    filterable: true,
    filterRenderer: NumberFilterableHeaderCell
  },
  {
    key: 'startDate',
    name: 'Start Date',
    filterable: true
  },
  {
    key: 'completeDate',
    name: 'Expected Complete',
    filterable: true
  }
];


var Example = React.createClass({

  getInitialState : function() {
    var originalRows = createRows(1000);
    var rows = originalRows.slice(0);
    //store the original rows array, and make a copy that can be used for modifying eg.filtering, sorting
    return {originalRows : originalRows	, rows : rows, filters : {}};
  },

  rowGetter : function(rowIdx){
    return this.state.rows[rowIdx];
  },

  filterRows : function(originalRows, filters) {
    var rows = originalRows.filter(function(r){
      var include = true;
      for (var columnKey in filters) {
        if(filters.hasOwnProperty(columnKey) && typeof filters[columnKey] === 'string') {
          var rowValue = r[columnKey].toString().toLowerCase();
          if(rowValue.indexOf(filters[columnKey].toLowerCase()) === -1) {
            include = false;
          }
        } else if(filters.hasOwnProperty(columnKey) && filters[columnKey] !== undefined && filters[columnKey].length > 0) {
          var rowValue = r[columnKey];
          if(filters[columnKey].indexOf(rowValue) === -1) {
            include = false;
          }
        }
      }
      return include;
    });
    return rows;
  },

  handleFilterChange(filter) {
    this.setState(function(currentState) {
      if (filter.filterTerm) {
        currentState.filters[filter.column.key] = filter.filterTerm;
      } else {
        delete currentState.filters[filter.column.key];
      }
      currentState.rows = this.filterRows(currentState.originalRows, currentState.filters);
      return currentState;
    });
  },

  render:function(){
    return(
      <ReactDataGrid
        columns={columns}
        rowGetter={this.rowGetter}
        enableCellSelect={true}
        rowsCount={this.state.rows.length}
        minHeight={500}
        toolbar={<Toolbar enableFilter={true}/>}
        onAddFilter={this.handleFilterChange}/>
    )
  }

});

ReactDOM.render(<Example />, mountNode);
`;

module.exports = React.createClass({

  render:function(){
    return(
      <div>
      <h3>Custom Filters Example</h3>
      <p>Using the same approach as regular Filters setting <code>column.filterable = true</code>, Custom Filters can be implemented and applied as below. Add the attribute <code>code.filterRenderer = NumberFilterableHeaderCell</code> to the column object will
      allow having a Numeric Filter.</p>
      <ReactPlayground codeText={EditableExample} />
      </div>
    )
  }

});
