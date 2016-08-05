var ReactGrid             = require('../build/react-data-grid');
var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');

var FilterableExample = `
var Toolbar = ReactDataGridPlugins.Toolbar;
var Selectors = ReactDataGridPlugins.Data.Selectors;
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
  width: 80,
  filterable: true
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
  filterable: true
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
]


var Example = React.createClass({

  getInitialState : function(){
    var rows = createRows(1000);
    return {rows : rows, filters : {}};
  },

  getRows : function() {
    return Selectors.getRows(this.state);
  },

  getSize : function() {
    return this.getRows().length;
  },

  rowGetter : function(rowIdx){
    var rows = this.getRows();
    return rows[rowIdx];
  },

  handleFilterChange : function(filter){
    var newFilters = Object.assign({}, this.state.filters);
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
     delete newFilters[filter.column.key];
    }
    this.setState({filters: newFilters});
  },

  onClearFilters: function(){
    //all filters removed
    this.setState({filters: {} });
  },

  render:function(){
    return(
      <ReactDataGrid
        columns={columns}
        rowGetter={this.rowGetter}
        enableCellSelect={true}
        rowsCount={this.getSize()}
        minHeight={500}
        toolbar={<Toolbar enableFilter={true}/>}
        onAddFilter={this.handleFilterChange}
        onClearFilters={this.onClearFilters}
        />
    )
  }
});

ReactDOM.render(<Example />, mountNode);
`;

module.exports = React.createClass({

  render:function(){
    return(
      <div>
      <h3>Filterable Columns Example</h3>
      <p>While ReactDataGrid doesn't not provide the ability to filter directly, it does provide hooks that allow you to provide your own filter function. This is done via the <code>onAddFilter</code> prop. To enable filtering for a given column, set <code>column.filterable = true</code> for that column. Now when the header cell has a new filter value entered for that column, <code>onAddFilter</code> will be triggered passing the filter key and value.</p>
      <ReactPlayground codeText={FilterableExample} />
      </div>
    )
  }

});
