
var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');


var SingleSelectExample = `

var _rows = [];
for (var i = 1; i < 100; i++) {
  _rows.push({
    id: i,
    name: 'Name ' + i,
    count: i * 100
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
  key: 'name',
  name: 'Name'
},
{
  key: 'count',
  name: 'Count'
}
]

var Example = React.createClass({
  render: function() {
    return  (<ReactDataGrid
    enableRowSelect={true}
    columns={columns}
    rowGetter={rowGetter}
    rowsCount={_rows.length}
    minHeight={500} />);
  }
});
React.render(<Example />, mountNode);
`;

module.exports = React.createClass({

  render:function(){
    return(
      <div>
        <h3>Single Row Select Example</h3>
        <ReactPlayground codeText={SingleSelectExample} />
      </div>
    )
  }

});
