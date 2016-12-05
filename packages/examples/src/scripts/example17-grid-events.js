
var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');


var SimpleExample = `
var Example = React.createClass({
  getInitialState: function(){
    let rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        title: 'Title ' + i,
        count: i * 1000,
        isSelected: false
      });
    }
    return {rows};
  },
  getColumns: function() {
    return  [
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
    ];
  },
  rowGetter: function(i) {
    return this.state.rows[i];
  },
  onRowClick: function(rowIdx, row) {
    let rows = this.state.rows;
    rows[rowIdx] = Object.assign({}, row, {isSelected: !row.isSelected});
    this.setState({rows});
  },
  onKeyDown: function(e) {
      if (e.ctrlKey && e.keyCode === 65) {
        e.preventDefault();

        let rows = [];
        this.state.rows.forEach((r) =>{
          rows.push(Object.assign({}, r, {isSelected: true}));
        });

        this.setState({rows});
      }
  },
  render: function() {
    return  (
      <ReactDataGrid
        rowKey='id'
        columns={this.getColumns()}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.length}
        minHeight={500}
        rowSelection={{
          showCheckbox: false,
          selectBy: {
            isSelectedKey: 'isSelected'
          }
        }}
        onRowClick={this.onRowClick}
        onGridKeyDown={this.onKeyDown}
         />);
  }
});
ReactDOM.render(<Example />, mountNode);
`;

module.exports = React.createClass({

  render:function(){
    return(
      <div>
        <h3>Grid Events</h3>
        <h4>onRowClick</h4>
        <p>Called when a row cell is clicked.  Arguments are <code>rowIndex</code> and <code>row</code>.</p>
        <h4>onGridKeyUp/onGridKeyDown</h4>
        <p>Called when a key is pressed or released on the Grid viewport. Argument is a React <a href="https://facebook.github.io/react/docs/events.html">SyntheticEvent</a>.</p>
        <ReactPlayground codeText={SimpleExample} />
      </div>
    )
  }

});
