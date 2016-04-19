var ReactGrid             = require('../build/react-data-grid');
var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');

var ResizableExample = `
//helper to generate a random date
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
};

var _rows = [];
for (var i = 1; i < 1000; i++) {
  _rows.push({
    id: i,
    task: 'Task ' + i,
    complete: Math.min(100, Math.round(Math.random() * 110)),
    priority : ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
    issueType : ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
    startDate: randomDate(new Date(2015, 3, 1), new Date()),
    completeDate: randomDate(new Date(), new Date(2016, 0, 1))
  });
}

//function to retrieve a row for a given index
var rowGetter = function(i){
  return _rows[i];
};


//Columns definition
var columns = [
{
  key: 'id',
  name: 'ID',
  resizable : true,
  width : 40
},
{
  key: 'task',
  name: 'Title',
  resizable : true
},
{
  key: 'priority',
  name: 'Priority',
  resizable : true
},
{
  key: 'issueType',
  name: 'Issue Type',
  resizable : true
},
{
  key: 'complete',
  name: '% Complete',
  resizable : true
},
{
  key: 'startDate',
  name: 'Start Date',
  resizable : true
},
{
  key: 'completeDate',
  name: 'Expected Complete',
  resizable : true
}
]

ReactDOM.render(<ReactDataGrid
  columns={columns}
  rowGetter={rowGetter}
  rowsCount={_rows.length}
  minHeight={500} />, mountNode);
`;

module.exports = React.createClass({

  render:function(){
    return(
      <div>
        <h3>Resizable Columns Example</h3>
        <p>To make a given column resizable, set <code>column.resizable = true</code></p>
        <p>If you need to know when a column has been resized, use the <code>onColumnResize</code> prop. This will be triggered when a column is
        resized and will report the column index and its new width. These can be saved on the back-end and used to restore column widths when
        the component is initialized, by setting <code>width</code> key in each column.</p>
        <ReactPlayground codeText={ResizableExample} />
      </div>
    )
  }

});
