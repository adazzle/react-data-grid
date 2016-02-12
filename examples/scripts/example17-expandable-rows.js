var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');
//this leads to Row is undefined?
var Row                   = require('../build/react-data-grid-with-addons').Row

var SimpleExample = `

var getDefaultRows = function() {
  var _rows = [];
  for (var i = 1; i < 1000; i++) {
    _rows.push({
      id: i,
      task: 'Task ' + i,
      priority : ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
      expanded: false,
      childRows : [{
        id: i + 0.1,
        task: 'Task ' + i + '0.1',
        priority : ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)]}]
    });
  };
  return _rows;
}

//Columns definition
var columns = [
{
  key: 'id',
  name: 'ID'
},
{
  key: 'task',
  name: 'Title'
},
{
  key: 'priority',
  name: 'Priority'
}
];

var Example = React.createClass({

  getInitialState: function() {
    return { rows: getDefaultRows() }
  },

  rowGetter: function(idx){
    return this.state.rows[idx];
  },

  handleRowExpand: function(idx) {
    var _rows = this.state.rows;
    _rows[idx].expanded = true;
    this.setState({ rows: _rows });
  },

  render: function() {
    return  (<ReactDataGrid
    columns={columns}
    rowGetter={this.rowGetter}
    rowsCount={this.state.rows.length}
    minHeight={500}
    enableRowExpand={true}
    onRowExpand={this.handleRowExpand} />);
  }
});
ReactDOM.render(<Example />, mountNode);

`;

module.exports = React.createClass({

  render:function(){
    return(
      <div>
        <h3>Expandable Rows</h3>
        <p>This shows how you can nest rows</p>
        <ReactPlayground codeText={SimpleExample} />
      </div>
    )
  }

});
