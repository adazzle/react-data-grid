var ReactGrid             = require('../build/react-data-grid');
var QuickStartDescription = require('../components/QuickStartDescription');
var ReactPlayground       = require('../assets/js/ReactPlayground');

var EditableExample = `
var Toolbar = ReactDataGridPlugins.Toolbar;
var Filters = ReactDataGridPlugins.Filters;
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

//Columns definition
var columns = [
  {
    key: 'id',
    name: 'ID',
    width: 120,
    filterable: true,
    filterRenderer: Filters.NumericFilter
  },
  {
    key: 'task',
    name: 'Title',
    filterable: true
  },
  {
    key: 'priority',
    name: 'Priority',
    filterable: true,
    filterRenderer: Filters.AutoCompleteFilter
  },
  {
    key: 'issueType',
    name: 'Issue Type',
    filterable: true,
    filterRenderer: Filters.AutoCompleteFilter
  },
  {
    key: 'complete',
    name: '% Complete',
    filterable: true,
    filterRenderer: Filters.NumericFilter
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
    var rows = createRows(1000);
    return {rows : rows, filters : {}};
  },

  rowGetter : function(index){
    return Selectors.getRows(this.state)[index];
  },

  rowsCount : function() {
    return Selectors.getRows(this.state).length;
  },

  handleFilterChange : function(filter){
    let newFilters = Object.assign({}, this.state.filters);
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
     delete newFilters[filter.column.key];
    }
    this.setState({filters: newFilters});
  },

  getValidFilterValues(columnId) {
    let values = this.state.rows.map(r => r[columnId]);
    return values.filter((item, i, a) => { return i == a.indexOf(item); });
  },

  handleOnClearFilters() {
    this.setState({ filters: {} });
  },

  render:function(){
    return(
      <ReactDataGrid
        columns={columns}
        rowGetter={this.rowGetter}
        enableCellSelect={true}
        rowsCount={this.rowsCount()}
        minHeight={500}
        toolbar={<Toolbar enableFilter={true}/>}
        onAddFilter={this.handleFilterChange}
        getValidFilterValues={this.getValidFilterValues}
        onClearFilters={this.handleOnClearFilters}
        />
    );
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
