
var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');


var SimpleExample = `

var _rows = [];
for (var i = 1; i < 1000; i++) {
  _rows.push({
    id: i,
    title: 'Title ' + i,
    count: i * 1000
  });
}

//A rowGetter function is required by the grid to retrieve a row for a given index
var rowGetter = function(i){
  return _rows[i];
};


var columns = [
{
  key: 'id',
  name: 'ID'
},
{
  key: 'title',
  name: 'Title'
},
{
  key: 'count',
  name: 'Count'
}
]

var Example = React.createClass({

  getInitialState: function() {
    return {selectedRows: []}
  },

  onRowSelect: function(rows) {
    this.setState({selectedRows: rows});
  },

  render: function() {
    var rowText = this.state.selectedRows.length === 1 ? 'row' : 'rows';
    return  (<div>
      <span>{this.state.selectedRows.length} {rowText} selected</span>
      <ReactDataGrid
    rowKey='id'
    columns={columns}
    rowGetter={rowGetter}
    rowsCount={_rows.length}
    enableRowSelect='multi'
    minHeight={500}
    onRowSelect={this.onRowSelect} /></div>);
  }
});
React.render(<Example />, mountNode);
`;

module.exports = React.createClass({

  render:function(){
    return(
      <div>
        <h3>Multiple Row Select</h3>
        <p>By setting enableRowSelect='multi' and passing a rowKey property to determine the name of the unique id of each row, you can enable multi row select</p>
        <p>Each time a row is clicked, onRowSelect prop will be called passing the array of selected rows</p>
        <ReactPlayground codeText={SimpleExample} />
      </div>
    )
  }

});
