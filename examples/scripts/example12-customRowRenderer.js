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



var RowRenderer = React.createClass({
 getRowStyle: function() {
   return {
     backgroundColor: this.getRowBackground()
   }
 },
 getRowBackground: function() {
   return this.props.idx % 2 ?  'green' : 'white'
 },
 render: function() {
   //here we are just changing the style
   //but we could replace this with anything we liked, cards, images, etc
   //usually though it will just be a matter of wrapping a div, and then calling back through to the grid
   return (<div style={this.getRowStyle()}><ReactDataGrid.Row {...this.props}/></div>)
 }
});


var Example = React.createClass({
  //Pass in our row renderer, allows complete control over the markup of the grid
  render: function() {
    return  (<ReactDataGrid
    columns={columns}
    rowGetter={rowGetter}
    rowsCount={_rows.length}
    minHeight={500}
    rowRenderer={RowRenderer} />);
  }
});
React.render(<Example />, mountNode);
`;
  module.exports = React.createClass({

    render:function(){
      return(
        <div>
          <h3>Custom Row Renderer Data Example</h3>
          <p>You can easily customise the look and feel of the grid</p>
          <p>Here, we override the entire RowRenderer, giving us total control on markup</p>
          <p>In this case we are just adding a wrapper div with a background colour, then calling abck into teh standard grid renderer</p>
          <p>Though you can easily do a whole lot more, and render cards, images, or anything else that fits your needs</p>
          <ReactPlayground codeText={SimpleExample} />
        </div>
      )
    }

  });
