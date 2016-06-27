var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');
//this leads to Row is undefined?
var Row                   = require('react-data-grid').Row

var SimpleExample = `

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
};

//function to retrieve a row for a given index
var rowGetter = function(i){
  return _rows[i];
};


//Columns definition
var columns = [
{
  key: 'id',
  name: 'ID',
  locked : true
},
{
  key: 'task',
  name: 'Title',
  width: 200
},
{
  key: 'priority',
  name: 'Priority',
  width: 200
},
{
  key: 'issueType',
  name: 'Issue Type',
  width: 200
},
{
  key: 'complete',
  name: '% Complete',
  width: 200
},
{
  key: 'startDate',
  name: 'Start Date',
  width: 200
},
{
  key: 'completeDate',
  name: 'Expected Complete',
  width: 200
},
{
  key: 'completeDate',
  name: 'Expected Complete',
  width: 200
}
]




var RowRenderer = React.createClass({
  setScrollLeft: function(scrollBy) {
    //if you want freeze columns to work, you need to make sure you implement this as apass through
    this.refs.row.setScrollLeft(scrollBy);
  },
 getRowStyle: function() {
   return {
     color: this.getRowBackground()
   }
 },
 getRowBackground: function() {
   return this.props.idx % 2 ?  'green' : 'blue'
 },
 render: function() {
   //here we are just changing the style
   //but we could replace this with anything we liked, cards, images, etc
   //usually though it will just be a matter of wrapping a div, and then calling back through to the grid
   return (<div style={this.getRowStyle()}><ReactDataGrid.Row ref="row" {...this.props}/></div>)
 }
});

var Example = React.createClass({
  render: function() {
    return  (<ReactDataGrid
    columns={columns}
    rowGetter={rowGetter}
    rowsCount={_rows.length}
    minHeight={500}
    rowRenderer={RowRenderer}/>);
  }
});
ReactDOM.render(<Example />, mountNode);
`;

module.exports = React.createClass({

  render:function(){
    return(
      <div>
        <h3>Overriding the row renderer</h3>
        <p>This shows how you can easily override the default row renderer</p>
        <p>Here we are just using that to wrap the default renderer, and then going back into the 'normal' flow, just changing some backgrounds</p>
        <p>NOTE: if you want to use fixed columns as well, make sure you implement and pass through the call to setScrollLeft</p>
        <ReactPlayground codeText={SimpleExample} />
      </div>
    )
  }

});
