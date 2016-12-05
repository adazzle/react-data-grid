
var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');


var SimpleExample = `
//helper to generate a random date
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}

//generate a fixed number of rows and set their properties
var _rows = [];
for (var i = 1; i < 100; i++) {
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

//Custom Formatter component
var PercentCompleteFormatter = React.createClass({
  render:function(){
    var percentComplete = this.props.value + '%';
    return (
      <div className="progress" style={{marginTop:'20px'}}>
        <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width:percentComplete}}>
        {percentComplete}
      </div>
      </div>);
    }
  });

//Columns definition
var columns = [
{
  key: 'id',
  name: 'ID',
  width: 80
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
  name: '% Complete',
  formatter : PercentCompleteFormatter
},
{
  key: 'startDate',
  name: 'Start Date'
},
{
  key: 'completeDate',
  name: 'Expected Complete'
}
]

var Example = React.createClass({
  render: function() {
    return  (<ReactDataGrid
    columns={columns}
    rowGetter={rowGetter}
    rowsCount={_rows.length}
    minHeight={500} />);
  }
});
ReactDOM.render(<Example />, mountNode);
`;

module.exports = React.createClass({

  render:function(){
    return(
      <div>
        <h3>Custom Formatter Example</h3>
        <p>Its possible to create your own formatters for a given column by setting its <code>formatter</code> property. Here a React component is used to format the %complete column. A custom formatter will always receive a <code>value</code> prop, the value of the cell and this can be used however needed. Here we render a progress bar based on the <code>props.value</code></p>
        <ReactPlayground codeText={SimpleExample} />
      </div>
    )
  }

});
