
var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');
var SimpleExample = `

function createRows() {
  var rows = [{name: 'row0'}];
  for (var i = 1; i < 1000; i++) {
    var price = Math.random() * 30;
    var row = {name: 'supplier ' + i,
        format: 'package ' + i,
        position: 'Run of site',
        price: price,
        children: [{name: 'supplier ' + i, format: '728x90', position: 'run of site', price: price/2},
        {name: 'supplier ' + i, format: '480x600', position: 'run of site', price: price * .25},
        {name: 'supplier ' + i, format: '328x70', position: 'run of site', price: price * .25, children: [{name: 'another sub row'}] }]}
    rows.push(row);
  }
  return rows;
}

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
    
  getInitialState() {
    var rows = createRows();
    return {expanded: {}, rowCount: rows.length, rows: rows}
  },
  
  getSubRowDetails(rowItem, index) {
    var isExpanded = this.state.expanded[rowItem.name] ? this.state.expanded[rowItem.name] : false;
    if (rowItem.children) {
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

  getRows(i) {
    return this.state.rows[i];
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
    rowGetter={this.getRows}
    rowsCount={this.state.rowCount}
    getSubRowDetails={this.getSubRowDetails}
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