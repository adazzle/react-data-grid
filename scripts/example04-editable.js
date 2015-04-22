var ReactGrid             = require('../build/react-data-grid');
var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');

var EditableExample = `
function createRows(numberOfRows){
  var _rows = [];
  for (var i = 1; i < numberOfRows; i++) {
    _rows.push({
      id: i,
      title: 'Title ' + i,
      count: i * 1000
    });
  }
  return _rows;
}

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
  name: 'Title',
  editable : true
},
{
  key: 'count',
  name: 'Count',
  editable : true
}
];

var Example = React.createClass({

  getInitialState : function(){
    return {rows : createRows(1000)}
  },

  rowGetter : function(rowIdx){
    return this.state.rows[rowIdx]
  },

  handleRowUpdated : function(e){
    //merge updated row with current row and rerender by setting state
    var rows = this.state.rows;
    Object.assign(rows[e.rowIdx], e.updated);
    this.setState({rows:rows});
  },

  render:function(){
    return(
      <ReactDataGrid
      enableCellSelect={true}
      columns={columns}
      rowGetter={this.rowGetter}
      rowsCount={this.state.rows.length}
      minHeight={500}
      onRowUpdated={this.handleRowUpdated} />
    )
  }

});

React.render(<Example />, mountNode);
`;

  module.exports = React.createClass({

    render:function(){
      return(
        <div>
          <h3>Editable Example</h3>
          <ReactPlayground codeText={EditableExample} />
        </div>
      )
    }

  });
