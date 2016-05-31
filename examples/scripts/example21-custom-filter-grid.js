var ReactGrid             = require('../build/react-data-grid');
var _             = require('../build/underscore');
var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');

var EditableExample = `
var Toolbar = ReactDataGrid.Toolbar;

var NumberFilterRenderer = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func.isRequired
  },

  getInitialState : function(){
    return {filterTerm: '', filterCriterias:[]};
  },                                                 
      
  handleChange: function(e) {
    let val = e.target.value;
    let spiltedFilterValues = val.split(",");         
    let filterCriterias = [];   
    if(isNaN(spiltedFilterValues)){
        for (let filterVal in spiltedFilterValues) {        
            if(spiltedFilterValues[filterVal]){       
                let contentString = spiltedFilterValues[filterVal];
                if(contentString.indexOf("-")!=-1){               
                    let strSplit = contentString.split("-");
                    let minNumber = parseFloat(strSplit[0]);
                    let maxNumber = parseFloat(strSplit[1]);
                    if(maxNumber){
                        if(maxNumber > minNumber){
                            filterCriterias.push({contentString:contentString, opr:"-", filterableNumber:minNumber, maxNumber:maxNumber});
                        }else{
                            filterCriterias.push({contentString:contentString, opr:"==", filterableNumber:minNumber});
                        }
                    }else{
                        filterCriterias.push({contentString:contentString, opr:"==", filterableNumber:minNumber});
                    }
                }else if(contentString.indexOf(">")!= -1){                       
                    let strSplit = contentString.split(">");
                    let filterableNumber = strSplit[1];  
                    if(filterableNumber){
                        filterCriterias.push({contentString:contentString, opr:">", filterableNumber:filterableNumber});
                    }else{
                        filterCriterias.push({contentString:contentString, opr:"==", filterableNumber:filterableNumber});
                    }
                }else if(contentString.indexOf("<")!= -1){       
                    let filterableContent = contentString.split("<");
                    let filterableNumber = filterableContent[1];  
                    if(filterableNumber){
                       filterCriterias.push({contentString:contentString, opr:"<", filterableNumber:filterableNumber});
                    }else{
                        filterCriterias.push({contentString:contentString, opr:"==", filterableNumber:filterableNumber});
                    }
                }else{                                    
                    filterCriterias.push({contentString:contentString, opr:"==", filterableNumber:contentString});
                }
            }
        }
    }else{        
        filterCriterias.push({contentString:val, opr:"==", filterableNumber:val});
    }
    console.log(val);
    console.log(this.props.column.key);
    console.log(filterCriterias);
    this.setState({filterTerm: val,  filterCriterias:filterCriterias});
    //this.props.onChange({filterTerm: val, columnKey: this.props.column.key, filterCriterias:filterCriterias});
  },

  renderInput: function() {
    if (this.props.column.filterable === false) {
      return <span/>;
    }

    let inputKey = 'header-filter-' + this.props.column.key;
    return (<input key={inputKey} type="text" className="form-control input-sm" placeholder="Search" value={this.state.filterTerm} onChange={this.handleChange}/>);
  },

  render: function() {
    return (
      <div>
        <div className="form-group">
          {this.renderInput()}
        </div>
      </div>
    );
  }
});

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
  sortable : true,
  filterable: true
},
{
  key: 'priority',
  name: 'Priority',
  sortable : true,
  filterable: true
},
{
  key: 'issueType',
  name: 'Issue Type',
  sortable : true,
  filterable: true
},
{
  key: 'complete',
  name: '% Complete',
  sortable : true,
  filterable: true,
  filterHeaderRenderer: <NumberFilterRenderer onChange={this.props.onFilterChange}/>
},
{
  key: 'startDate',
  name: 'Start Date',
  sortable : true,
  filterable: true
},
{
  key: 'completeDate',
  name: 'Expected Complete',
  sortable : true,
  filterable: true
}
]


var Example = React.createClass({

  getInitialState : function(){
    var originalRows = createRows(1000);
    var rows = originalRows.slice(0);
    //store the original rows array, and make a copy that can be used for modifying eg.filtering, sorting
    return {originalRows : originalRows, rows : rows, filters : {}};
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
    var rows;
    if (sortDirection === 'NONE') {
      var originalRows = this.state.originalRows;
      rows = this.filterRows(originalRows, this.state.filters);
    } else {
      rows = this.state.rows.sort(comparer);
    }
    this.setState({rows : rows});
  },

  filterRows : function(originalRows, filters) {
    var rows = originalRows.filter(function(r){
      var include = true;
      for (var columnKey in filters) {
        if(filters.hasOwnProperty(columnKey)) {
          var rowValue = r[columnKey].toString().toLowerCase();            
          if(rowValue.indexOf(filters[columnKey].toLowerCase()) === -1) {
            include = false;
          }
        }
      }
      return include;
    });
    return rows;
  },

  filterNumRows : function(originalRows, filters, filterableNumber, maxNumber, opr) {
    var rows = originalRows.filter(function(r){
      var include = true;      
      for (var columnKey in filters) {
        if(filters.hasOwnProperty(columnKey)) {  
            if(opr=='-'){
                if(parseInt(r[columnKey]) >= filterableNumber && parseInt(r[columnKey]) <= maxNumber){}else{     
                    include = false;
                }
            }else if(opr=='>'){
                if(!(parseInt(r[columnKey]) > filterableNumber)){include = false;}
            }else if(opr=='<'){               
                if(parseInt(r[columnKey]) < filterableNumber){}else{     
                    include = false;
                }
            }else if(opr=='=='){                
                if(parseInt(r[columnKey]) == filterableNumber){                 
                }else{                
                    include = false;
                }  
            }       
        }
      }
      return include;
    });
    return rows;
  },

  handleFilterChangeNum : function(filter){   
    this.setState(function(currentState) {
      if (filter.filterTerm) {
        currentState.filters[filter.columnKey] = filter.filterTerm;
      } else {
        delete currentState.filters[filter.columnKey];
      }   
        if(filter.filterTerm==''){
            currentState.rows = this.filterRows(currentState.originalRows, currentState.filters);
            return currentState;
        }else{
            var filterCriterias = filter.filterCriterias;        
            var tmpCurrentState = []; 
            for (var filterCriteriasVal in filterCriterias) {        
                if(filterCriterias[filterCriteriasVal]){            
                    var contentString = filterCriterias[filterCriteriasVal];                   
                    tmpCurrentState.push(this.filterNumRows(currentState.originalRows, currentState.filters, contentString.filterableNumber, contentString.maxNumber,contentString.opr));                    
                }
            }
            currentState.rows = _.unique(_.flatten(tmpCurrentState));
            return currentState;
        }
    });
  },
  
  handleFilterChange : function(filter){
    this.setState(function(currentState) {
      if (filter.filterTerm) {
        currentState.filters[filter.columnKey] = filter.filterTerm;
      } else {
        delete currentState.filters[filter.columnKey];
      }
      currentState.rows = this.filterRows(currentState.originalRows, currentState.filters);
      return currentState;
    });
  },

  render:function(){
    return(
      <ReactDataGrid
        onGridSort={this.handleGridSort}
        columns={columns}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.length}
        minHeight={500}
        onRowUpdated={this.handleRowUpdated}
        toolbar={<Toolbar enableFilter={true}/>}
        onAddFilter={this.handleFilterChange}
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
      <h3>Filterable Sortable Columns Example</h3>
      <p>While ReactDataGrid does not provide the ability to sort or filter directly, it does provide hooks that allow you to provide your own sort and filter function. This is done via the <code>onGridSort</code> and <code>onAddFilter</code> props. To enable sorting for a given column, set <code>column.sortable = true</code> for that column, to enable filtering for a given column, set <code>column.filterable = true</code> for that column. Now when the header cell is clicked for that column, <code>onGridSort</code> will be triggered passing the column name and the sort direction, when the filterable cell has a new filter value entered for that column, <code>onAddFilter</code> will be triggered passing the filter key and value.</p>
      <ReactPlayground codeText={EditableExample} />
      </div>
    )
  }

});
