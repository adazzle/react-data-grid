
var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');


var RowActionsExample = `
var RowActionsCell = ReactDataGridPlugins.Draggable.RowActionsCell;
var DraggableContainer = ReactDataGridPlugins.Draggable.Container;

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
    return  (
    <DraggableContainer>
      <ReactDataGrid
        rowActionsCell={RowActionsCell}
        columns={columns}
        rowGetter={rowGetter}
        rowsCount={_rows.length}
        minHeight={500} />
    </DraggableContainer>);
  }
});
ReactDOM.render(<Example />, mountNode);
`;

module.exports = React.createClass({

  render:function(){
    return(
      <div>
        <h3>A Simple Example</h3>
        <ReactPlayground codeText={RowActionsExample} />
      </div>
    )
  }

});
