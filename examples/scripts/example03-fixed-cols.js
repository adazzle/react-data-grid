var ReactGrid             = require('../build/react-data-grid');
var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');

var FixedExample = `
var _rows = [];
for (var i = 1; i < 1000; i++) {
  _rows.push({
    id: i,
    title: 'Title ' + i,
    count: i * 1000,
    firstName : 'Johnny' + i
  });
}

var rowGetter = function(i){
  return _rows[i];
};


var columns = [
{
  key: 'id',
  name: 'ID',
  locked : true,
  width : 200
},
{
  key: 'title',
  name: 'Title',
  width : 200
},
{
  key: 'count',
  name: 'Count',
  width : 200
},
{
  key: 'firstName',
  name: 'First Name',
  width : 200
},
{
  key: 'lastName',
  name: 'Last Name',
  width : 200
},
{
  key: 'email',
  name: 'Email',
  width : 200
},
{
  key: 'street',
  name: 'Street',
  width : 100
},
{
  key: 'zipCode',
  name: 'ZipCode',
  width : 100
},
];

React.render(<ReactDataGrid
  columns={columns}
  rowGetter={rowGetter}
  rowsCount={_rows.length}
  minHeight={500} />, mountNode);
`;

module.exports = React.createClass({

  render:function(){
    return(
      <div>
        <h3>Frozen Columns Example</h3>
        <p>To make a given column frozen, set <code>column.locked = true</code>. In this example, the ID columns has been frozen and will remain in position as you scroll horizontally</p>
        <ReactPlayground codeText={FixedExample} />
      </div>
    )
  }

});
