
var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');

var EmptyRowsExample = `
var _rows = [];
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

var EmptyRowsView = React.createClass({
 render: function() {
   return (<div>Nothing to show</div>)
 }
});


var Example = React.createClass({
  render: function() {
    return  (<ReactDataGrid
    columns={columns}
    rowGetter={rowGetter}
    rowsCount={_rows.length}
    minHeight={500}
    emptyRowsView={EmptyRowsView} />);
  }
});
ReactDOM.render(<Example />, mountNode);
`;

module.exports = React.createClass({

  render: function() {
    return (
      <div>
        <h3>Empty Rows Example</h3>
        <ReactPlayground codeText={EmptyRowsExample} />
      </div>
    );
  }

});
