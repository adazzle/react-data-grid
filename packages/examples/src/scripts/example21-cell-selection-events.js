var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');


var SimpleExample = `

var SimpleCheckboxEditor = ReactDataGridPlugins.Editors.SimpleCheckboxEditor;
var SimpleCheckboxFormatter = ReactDataGridPlugins.Editors.SimpleCheckboxFormatter;
var _rows = [];
for (var i = 1; i < 1000; i++) {
  _rows.push({
    id: i,
    title: 'Title ' + i,
    count: i * 1000,
    active: i % 2
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
  name: 'Title',
  editable: true
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
  
  onCellSelected(coordinates) {
    this.refs.grid.openCellEditor(coordinates.rowIdx, coordinates.idx);
  },
  
  onCellDeSelected(coordinates) {
    if (coordinates.idx === 2) {
      alert('the editor for cell (' + coordinates.rowIdx + ',' + coordinates.idx + ') should have just closed');
    }
  },
  
  render: function() {
    var rowText = this.state.selectedRows.length === 1 ? 'row' : 'rows';
    return  (<div>
      <span>{this.state.selectedRows.length} {rowText} selected</span>
      <ReactDataGrid ref="grid"
    rowKey='id'
    columns={columns}
    rowGetter={rowGetter}
    rowsCount={_rows.length}
    enableRowSelect='multi'
    minHeight={500}
    onRowSelect={this.onRowSelect}
    enableCellSelect={true}
    onCellSelected={this.onCellSelected}
    onCellDeSelected={this.onCellDeSelected} /></div>);
  }
});
ReactDOM.render(<Example />, mountNode);
`;

module.exports = React.createClass({

  render:function(){
    return(
      <div>
        <h3>Cell selection/delesection events</h3>
        <p>Define onCellSelected and onCellDeSelected callback handlers and pass them as props to enable events upon cell selection/deselection.</p>
        <p>if passed, onCellSelected will be triggered each time a cell is selected with the cell coordinates. Similarly, onCellDeSelected will be triggered when a cell is deselected.</p>
        <ReactPlayground codeText={SimpleExample} />
      </div>
    )
  }

});