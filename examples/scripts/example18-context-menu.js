import React from 'react';
import ReactPlayground from '../assets/js/ReactPlayground';

let example = `
// Import the necessary modules.
var ContextMenu = ReactDataGrid.Menu.ContextMenu;
var MenuItem = ReactDataGrid.Menu.MenuItem;
var SubMenu = ReactDataGrid.Menu.SubMenu;

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

// Create the React Data Grid and pass your context menu to the contextMenu property.
var Example = React.createClass({
  getInitialState: function() {
    return {rows: _rows};
  },
  rowGetter: function(rowIdx) {
    return this.state.rows[rowIdx];
  },
  handleMenuItemClick: function(e, data) {
    switch (data.action) {
      case 'Delete Row':
        this.deleteRow(data.rowIdx);
        break;
      case 'Insert Row Above':
      	this.insertRow(data.rowIdx);
        break;
      case 'Insert Row Below':
      	this.insertRow(data.rowIdx + 1);
        break;
    }
  },
  deleteRow: function(rowIdx) {
    this.state.rows.splice(rowIdx, 1);
    this.setState({rows: this.state.rows});
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
        contextMenu={<MyContextMenu onItemClick={this.handleMenuItemClick} />}
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
  onItemClick: function(e, data) {
    if (this.props.onItemClick) {
      this.props.onItemClick(e, data);
    }
  },
  render: function() {
    return (
      <ContextMenu>
        <MenuItem data={{action: 'Delete Row', rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onItemClick}>Delete Row</MenuItem>
        <SubMenu title="Insert Row">
          <MenuItem data={{action: 'Insert Row Above', rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onItemClick}>Above</MenuItem>
          <MenuItem data={{action: 'Insert Row Below', rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onItemClick}>Below</MenuItem>
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
        <ReactPlayground codeText={example} />
      </div>
    );
  }
}

module.exports = ContextMenuExample;
