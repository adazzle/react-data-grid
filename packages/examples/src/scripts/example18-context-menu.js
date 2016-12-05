import React from 'react';
import ReactPlayground from '../assets/js/ReactPlayground';

let example = `
// Import the necessary modules.
var ContextMenu = ReactDataGridPlugins.Menu.ContextMenu;
var MenuItem = ReactDataGridPlugins.Menu.MenuItem;
var SubMenu = ReactDataGridPlugins.Menu.SubMenu;

var _rows = [];
for (var i = 1; i < 1000; i++) {
  _rows.push({
    id: i,
    title: 'Title ' + i,
    count: i * 1000
  });
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
];

// Create the React Data Grid and pass your context menu to the contextMenu prop.
var Example = React.createClass({
  getInitialState: function() {
    return {rows: _rows};
  },
  rowGetter: function(rowIdx) {
    return this.state.rows[rowIdx];
  },
  deleteRow: function(e, data) {
    this.state.rows.splice(data.rowIdx, 1);
    this.setState({rows: this.state.rows});
  },
  insertRowAbove: function(e, data) {
    this.insertRow(data.rowIdx);
  },
  insertRowBelow: function(e, data) {
    this.insertRow(data.rowIdx + 1);
  },
  insertRow: function(rowIdx) {
    var newRow = {
      id: 0,
      title: 'New at ' + (rowIdx + 1),
      count: 0
    }
    this.state.rows.splice(rowIdx, 0, newRow);
    this.setState({rows: this.state.rows});
  },
  render: function() {
    return (
      <ReactDataGrid
        contextMenu={<MyContextMenu onRowDelete={this.deleteRow} onRowInsertAbove={this.insertRowAbove} onRowInsertBelow={this.insertRowBelow} />}
        columns={columns}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.length}
        minHeight={500} />
    );
  }
});

// Create the context menu.
// Use this.props.rowIdx and this.props.idx to get the row/column where the menu is shown.
var MyContextMenu = React.createClass({
  onRowDelete: function(e, data) {
    if (typeof(this.props.onRowDelete) === 'function') {
      this.props.onRowDelete(e, data);
    }
  },
  onRowInsertAbove: function(e, data) {
    if (typeof(this.props.onRowInsertAbove) === 'function') {
      this.props.onRowInsertAbove(e, data);
    }
  },
  onRowInsertBelow: function(e, data) {
    if (typeof(this.props.onRowInsertBelow) === 'function') {
      this.props.onRowInsertBelow(e, data);
    }
  },
  render: function() {
    return (
      <ContextMenu>
        <MenuItem data={{rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onRowDelete}>Delete Row</MenuItem>
        <SubMenu title="Insert Row">
          <MenuItem data={{rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onRowInsertAbove}>Above</MenuItem>
          <MenuItem data={{rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onRowInsertBelow}>Below</MenuItem>
        </SubMenu>
      </ContextMenu>
    );
  }
});

ReactDOM.render(<Example />, mountNode);
`;

class ContextMenuExample extends React.Component {
  render() {
    return (
      <div>
        <h3>Context Menu Example</h3>
        <p>
          To use a context menu on the grid, create a <code>ReactDataGridPlugins.Menu.ContextMenu</code> and then set the <code>contextMenu</code> prop of the grid to this context menu.
          Please note you must include the <code>react-data-grid.ui-plugins.js</code> package to create the context menu.
        </p>
        <p>If you need to know the row and column index where the context menu is shown, use the context menu's <code>rowIdx</code> and <code>idx</code> props.</p>
        <p>Credits: the context menu we use is <a href="https://github.com/vkbansal/react-contextmenu">react-contextmenu</a> by <a href="https://github.com/vkbansal">Vivek Kumar Bansal</a>.</p>
        <ReactPlayground codeText={example} />
      </div>
    );
  }
}

module.exports = ContextMenuExample;
