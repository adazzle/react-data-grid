const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
import _ from 'underscore'
const React = require('react');
const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');
class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.getRandomDate = this.getRandomDate.bind(this);
    this.getAllColumns = this.getAllColumns.bind(this);
    this.rowsCount = this.rowsCount.bind(this);
    this.createRows = this.createRows.bind(this);
    this.rowGetter = this.rowGetter.bind(this);
    this.getDefaultColumns = this.getDefaultColumns.bind(this);
    this.updateSelectedColumns = this.updateSelectedColumns.bind(this);
    this.getTotalNoOfRecords = this.getTotalNoOfRecords.bind(this);
    this.handleGridSort = this.handleGridSort.bind(this);
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
    this.gridConfig = {
      defaultColumnKeys:[
        'id',
        'task',
        'priority',
        'developer'
      ],
      columns: this._columns
    }

    this.state = { rows: this.createRows(1000), columns: this._columns};
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

  getAllColumns =() => {
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
      return allColumns;
  }

  getDefaultColumns(){
    let defaultColumnKeys = this.gridConfig.defaultColumnKeys;
    let defaultColumns = _.filter(this.state.columns, function(col){
      return defaultColumnKeys.indexOf(col.key) > -1;
    });
    this.setState({columns: defaultColumns});
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
        columns={this.state.columns}
        rowGetter={this.rowGetter}
        rowsCount={this.rowsCount()}
        minHeight={500}
        toolbar={<Toolbar totalRecords={this.getTotalNoOfRecords} enableAddOrRemoveColumns={true} enableResetToDefaultColumns={true} applySelectedColumns = {this.updateSelectedColumns} getAllColumns={this.getAllColumns} getDefaultColumns={this.getDefaultColumns} displayTotalNoOfRecords={false}  />}/>
        </div>);
  }
}

const exampleDescription = (
  <p>Here all the columns names are picked up using the column keys and the list of columns is generated. AddOrRemoveColumns feature is added as part of the Toolbar.
     Pass the flags <br ></br>
     <code>enableAddOrRemoveColumns:true</code><br ></br>
     <code>applySelectedColumns : function to apply the selected Columns </code><br ></br>
     <code>getAllColumns: function to build all the column names  </code><br ></br>
     If we want to enable ResetToDefault feature which discards your current selection and you can pass in a set of default columns to be set as a state. 
     Please pass the below props.<br ></br>
     <code>enableResetToDefaultColumns:true,</code><br ></br>
     <code>getDefaultColumns: function to pass all the default columns if configured  </code>
  </p>
);

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Add/Remove Columns Example',
  exampleDescription,
  examplePath: './scripts/example30-add-or-remove-columns.js',
  examplePlaygroundLink: undefined
});