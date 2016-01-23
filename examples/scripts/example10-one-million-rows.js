var ReactGrid             = require('../build/react-data-grid');
var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');

var millionRowsExample = `
//helper to generate a random date
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
};

var _rows = [];
for (var i = 1; i < 1000000; i++) {
  _rows.push({
    id: i,
    task: 'Task ' + i,
    complete: 'a',
    priority : 'b',
    issueType : 'c'
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
  name: 'ID'

},
{
  key: 'task',
  name: 'Title'
},
{
  key: 'priority',
  name: 'Priority'
},
{
  key: 'issueType',
  name: 'Issue Type'
},
{
  key: 'complete',
  name: '% Complete'
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
        <h3>One Million Rows Example</h3>
        <p></p>
        <ReactPlayground codeText={millionRowsExample} />
        </div>
      )
    }

  });
