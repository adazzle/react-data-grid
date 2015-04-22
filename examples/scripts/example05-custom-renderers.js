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

module.exports = React.createClass({

  render:function(){
    return(
      <div>
      <QuickStartDescription title="A Simple Example"/>
      <ReactGrid
        columns={columns}
        rowGetter={rowGetter}
        rowsCount={_rows.length}
        minHeight={500} />
      </div>
    )
  }

});
