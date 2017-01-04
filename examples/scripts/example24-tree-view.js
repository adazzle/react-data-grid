
var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');
var SimpleExample = `
var Selectors = ReactDataGridPlugins.Data.Selectors;
var _rows = [
        {name: 'supplier 1', 
        format: 'package 1', 
        position: 'Run of site',
        price: 30,
        children: [{name: 'supplier 1', format: '728x90', position: 'run of site', price: 10},
        {name: 'supplier 1', format: '480x600', position: 'run of site', price: 5},
        {name: 'supplier 1', format: '328x70', position: 'run of site', price: 15}]}
    ];



//A rowGetter function is required by the grid to retrieve a row for a given index
var rowGetter = function(i){
  return _rows[i];
};


var columns = [
{
  key: 'name',
  name: 'Name'
},
{
  key: 'format',
  name: 'format'
},
{
  key: 'position',
  name: 'position'
},
{
  key: 'price',
  name: 'price'
}
]

var Example = React.createClass({
    
    getInitialState : function(){
        return {rows: _rows, groupBy: [], expandedRows: {}};
    },

    getRows: function() {
        var rows = Selectors.getRows(this.state);
        return rows;
    },

    getRowAt : function(index){
        var rows = this.getRows();
        return rows[index];
    },

    getSize : function() {
        return this.getRows().length;
    },
  
  getSubRowDetails(rowItem, index) {
    var isExpanded = this.state.expanded[rowItem.name] ? this.state.expanded[rowItem.name] : false;
    if (rowItem.folder) {
        return {
            group: true,
            expanded: isExpanded,
            children: rowItem.children,
            field: 'name'
        };
    } else {
        return null;
    }
  },
    
  onCellExpand(args) {
   let rowKey = args.rowData.name;
   let rowCount = this.state.rowCount;
   let expanded = Object.assign({}, this.state.expanded);
   if(this.state.expanded && !expanded[rowKey]) {
     expanded[rowKey] = !args.expandArgs.expanded;
     rowCount += args.expandArgs.children.length;
   } else if (expanded[rowKey]){
     delete expanded[rowKey];
     rowCount -= args.expandArgs.children.length;
   }
   this.setState({expanded: expanded, rowCount: rowCount});
  },
  
  render: function() {
    return  (<ReactDataGrid
    enableCellSelect={true}
    columns={columns}
    rowGetter={this.getRowAt}
    rowsCount={this.getSize()}
    minHeight={500}
    onCellExpand={this.onCellExpand} />);
  }
});
ReactDOM.render(<Example />, mountNode);
`;

module.exports = React.createClass({

  render:function(){
    return(
      <div>
        <h3>Tree View Example</h3>
        <ReactPlayground codeText={SimpleExample} />
      </div>
    )
  }

});