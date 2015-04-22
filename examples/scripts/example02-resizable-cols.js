var ReactGrid   = require('../build/react-data-grid');
var QuickStartDescription = require('../components/QuickStartDescription')

var _rows = [];
for (var i = 1; i < 1000; i++) {
  _rows.push({
    id: i,
    title: 'Title ' + i,
    count: i * 1000
  });
}

var rowGetter = function(i){
  return _rows[i];
};

var getRowCount = function(){
  return _rows.length;
}

var columns = [
{
  key: 'id',
  name: 'ID',
  resizable : true
},
{
  key: 'title',
  name: 'Title',
  resizable : true
},
{
  key: 'count',
  name: 'Count',
  resizable : true
}
]

module.exports = React.createClass({

  render:function(){
    return(
      <div>
      <h3>Resizable Columns Example</h3>
      <p>To enable column resizing for a give column, set <code className="javascript">column.resizable = true</code> <a href="https://github.com/adazzle/react-data-grid/blob/master/examples/scripts/example02-resizable-cols.js">View Source</a></p>
      <ReactGrid
        columns={columns}
        rowGetter={rowGetter}
        rowsCount={_rows.length}
        minHeight={500} />
      </div>
    )
  }

});
