let ReactGrid             = require('../build/react-data-grid');
let _             = require('../build/underscore');
let QuickStartDescription = require('../components/QuickStartDescription')
let ReactPlayground       = require('../assets/js/ReactPlayground');

let EditableExample = `
let Toolbar = ReactDataGrid.Toolbar;

let NumberFilterRenderer = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func.isRequired
  },

  getInitialState : function(){
    return {filterTerm: '', filterCriterias:[]};
  },                                                 
  isNumericRange: function(contentString) {
        let inputRange = contentString.split("-"), opr="";
        let minNumber = parseFloat(inputRange[0]);
        let maxNumber = parseFloat(inputRange[1]);
        if(maxNumber){
            if(maxNumber > minNumber){
                opr = "-";                
            }else{
                opr = "==";                
            }
        }else{
            opr = "==";           
        }
        return {contentString:contentString, opr:opr, filterableNumber:minNumber, maxNumber:maxNumber};
  },
  isGreaterLesser: function(contentString, srcOpr) {
        let inputRange = contentString.split(srcOpr), opr="";
        let filterableNumber = inputRange[1];  
        if(filterableNumber){
            opr = srcOpr;            
        }else{
            opr = "==";            
        }
        return {contentString:contentString, opr:opr, filterableNumber:filterableNumber}
  },
  handleChange: function(e) {
    let val = e.target.value;
    let spiltedFilterValues = val.split(","), filterCriterias = [];          
   
    for (let filterVal in spiltedFilterValues) {        
        if(spiltedFilterValues[filterVal]){       
            let contentString = spiltedFilterValues[filterVal];
            if(contentString.indexOf("-")!=-1){               
                filterCriterias.push(this.isNumericRange(contentString));
            }else if(contentString.indexOf(">")!= -1){
                filterCriterias.push(this.isGreaterLesser(contentString, ">"));                    
            }else if(contentString.indexOf("<")!= -1){       
                filterCriterias.push(this.isGreaterLesser(contentString, "<"));
            }else{                                    
                filterCriterias.push({contentString:contentString, opr:"==", filterableNumber:contentString});
            }
        }
    }    
    this.setState({filterTerm: val,  filterCriterias:filterCriterias});
    this.props.onChange({filterTerm: val, columnKey: this.props.column.key, filterCriterias:filterCriterias, filterType:'numeric'});
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
  let _rows = [];
  for (let i = 1; i < numberOfRows; i++) {
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
let rowGetter = function(i){
  return _rows[i];
};

//Columns definition
let columns = [
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
  filterHeaderRenderer: NumberFilterRenderer
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


let Example = React.createClass({

  getInitialState : function(){
    let originalRows = createRows(1000);
    let rows = originalRows.slice(0);
    //store the original rows array, and make a copy that can be used for modifying eg.filtering, sorting
    return {originalRows : originalRows, rows : rows, filters : {}};
  },

  rowGetter : function(rowIdx){
    return this.state.rows[rowIdx];
  },

  handleGridSort : function(sortColumn, sortDirection){
    let comparer = function(a, b) {
      if(sortDirection === 'ASC'){
        return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
      }else if(sortDirection === 'DESC'){
        return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
      }
    }
    let rows;
    if (sortDirection === 'NONE') {
      let originalRows = this.state.originalRows;
      rows = this.filterRows(originalRows, this.state.filters);
    } else {
      rows = this.state.rows.sort(comparer);
    }
    this.setState({rows : rows});
  },
  filterConditionCheck : function(source, min, max, opr, gridValue) {
        switch(opr) {
                case '-':
                    return (parseFloat(source) >=min && parseFloat(source) <=max) ? true : false;       
                    break;
                case '>':
                    return (parseFloat(source) > min) ? true : false;                    
                    break;
                case '<':
                    return (parseFloat(source) < min) ? true : false;                    
                    break;
                case '==':
                    return (parseFloat(source) == min) ? true : false;                       
                    break;
                default:
                    let rowValue = source.toString().toLowerCase();            
                   return (rowValue.indexOf(gridValue.toLowerCase()) === -1) ? false : true;  
            }
  },
  filterRows : function(originalRows, filters, filterableNumber, maxNumber, opr) {
    let _this = this;
    let rows = originalRows.filter(function(r){
      let include = true;      
      for (let columnKey in filters) {
        if(filters.hasOwnProperty(columnKey)) {             
            include = _this.filterConditionCheck(r[columnKey], filterableNumber, maxNumber, opr, filters[columnKey]);            
        }
      } 
      return include;
    });
    
    return rows;
  },
  handleFilterChange : function(filter){     
    this.setState(function(currentState) {
      if (filter.filterTerm) {
        currentState.filters[filter.columnKey] = filter.filterTerm;
      } else {
        delete currentState.filters[filter.columnKey];
      }    
      if(filter.filterTerm=='' || filter.filterType!='numeric'){
            currentState.rows = this.filterRows(currentState.originalRows, currentState.filters);                
      }else if(filter.filterType=='numeric'){       
            let filterCriterias = filter.filterCriterias, tmpCurrentState = [], _this=this;         
            _.each(filterCriterias, function(contentString){
                if(contentString){                                      
                    tmpCurrentState.push(_this.filterRows(currentState.originalRows, currentState.filters, contentString.filterableNumber, contentString.maxNumber,contentString.opr)); 
                }
            });                       
           currentState.rows = _.unique(_.flatten(tmpCurrentState));           
      }
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
