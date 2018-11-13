const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
import _ from 'underscore'
const React = require('react');
const Axios = require('axios');
const { Toolbar, Filters: { NumericFilter, AutoCompleteFilter, MultiSelectFilter, SingleSelectFilter, TypeAheadFilter }, Data: { Selectors } } = require('react-data-grid-addons');
class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
        key: 'id',
        name: 'ID',
        width: 120
      },
      {
        key: 'task',
        name: 'Title'
      },
      {
        key: 'priority',
        name: 'Priority'
      },
      {
        key: 'issueType',
        name: 'Issue Type',
        
      },
      {
        key: 'developer',
        name: 'Developer',
        
      },
      {
        key: 'typeAheadTest',
        name: 'TypeAhead Test',
        sortable: true,
        width: 250
      },
      {
        key: 'complete',
        name: '% Complete'
      },
      {
        key: 'startDate',
        name: 'Start Date'
      },
      {
        key: 'completeDate',
        name: 'Expected Complete'
      }
    ];

    this.state = { rows: this.createRows(1000), filters: {}, filterValues: [], columns: this._columns };
  }

  getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  };

  createRows = (numberOfRows) => {
    let rows = [];
    for (let i = 1; i < numberOfRows; i++) {
      rows.push({
        id: i,
        task: 'Task ' + i,
        complete: Math.min(100, Math.round(Math.random() * 110)),
        priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
        issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
        developer: ['James', 'Tim', 'Daniel', 'Alan'][Math.floor((Math.random() * 3) + 1)],
        typeAheadTest: ['mralexgray/-REPONAME', 'mralexgray/...', 'mralexgray/2200087-Serial-Protocol', 'mralexgray/ace'][Math.floor(Math.random() * 3 + 1)],
        startDate: this.getRandomDate(new Date(2015, 3, 1), new Date()),
        completeDate: this.getRandomDate(new Date(), new Date(2016, 0, 1))
      });
    }
    return rows;
  };

  rowGetter = (index) => {
    return Selectors.getRows(this.state)[index];
  };

  rowsCount = () => {
    return Selectors.getRows(this.state).length;
  };

  getAllColumns =(revertToDefaults) => {
      let allColumns = [];
      let selectedColKeys = _.map(this.state.columns, function(col){
          return col.key;
      });

      _.filter(this._columns, function(col){
        let colObj = {
            key: col.key,
            name: col.name,
            isSelected: selectedColKeys.indexOf(col.key) > -1
        }
          allColumns.push(colObj);
      });
      for(let i=0; i<this._columns.length; i++){
        
      }
      return allColumns;
  }

  updateSelectedColumns = (value) => {
    let selectedColKeys = _.map(value, function(val){
        return val.key;
    });
    let allColumns = this._columns;
    let updatedColumnList = _.map(selectedColKeys, function(col){
        return _.find(allColumns, function(val){
            return col === val.key;
        });
    });
    this.setState({columns: updatedColumnList});
  };

  getTotalNoOfRecords = () => {
    return this.rowsCount();
  }

  handleGridSort = (sortColumn, sortDirection) => {
    this.setState({ sortColumn: sortColumn, sortDirection: sortDirection });
  };

  render() {
    return (
      <div>
        
      <ReactDataGrid
        onGridSort={this.handleGridSort}
        enableCellSelect={true}
        columns={this.state.columns}
        rowGetter={this.rowGetter}
        rowsCount={this.rowsCount()}
        minHeight={500}
        toolbar={<Toolbar totalRecords={this.getTotalNoOfRecords} enableFilter={true} enableAddOrRemoveColumns={true} applySelectedColumns = {this.updateSelectedColumns} getAllColumns={this.getAllColumns} displayTotalNoOfRecords={false}  />}
        onAddFilter={this.handleFilterChange}
        getValidFilterValues={this.getValidFilterValues}
        getValidFilterValuesForTypeAhead={this.getValidFilterValuesForTypeAhead}
        onClearFilters={this.handleOnClearFilters} />
        </div>);
        
  }
}

const exampleDescription = (
  <p>Using the same approach as regular Filters setting <code>column.filterable = true</code>, Custom Filters can be implemented and applied as below. Add the attribute <code>code.filterRenderer = NumberFilterableHeaderCell</code> to the column object will
  allow having a Numeric Filter.</p>
);

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Custom Filters Example',
  exampleDescription,
  examplePath: './scripts/example22-custom-filters.js',
  examplePlaygroundLink: undefined
});