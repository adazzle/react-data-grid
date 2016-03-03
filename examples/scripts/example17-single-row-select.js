
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
  render: function() {
    return  (<ReactDataGrid
    rowKey='id'
    columns={columns}
    rowGetter={rowGetter}
    rowsCount={_rows.length}
    enableRowSelect='single'
    minHeight={500} />);
  }
});
ReactDOM.render(<Example />, mountNode);
`;

module.exports = React.createClass({

  render:function(){
    return(
      <div>
        <h3>Single Row Select</h3>
        <p>By setting enableRowSelect='single' and passing a rowKey property to determine the name of the unique id of each row, you can enable single row select</p>
        <p>Each time a row is clicked, onRowSelect prop will be called passing the selected row</p>
        <ReactPlayground codeText={SimpleExample} />
      </div>
    )
  }

});
