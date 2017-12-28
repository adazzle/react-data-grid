const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');
const { Menu: { ContextMenu, MenuItem, SubMenu } } = require('react-data-grid-addons');

import PropTypes from 'prop-types';

class Example extends React.Component {
  constructor(props) {
    super(props);
    this._columns = [
      { key: 'id', name: 'ID' },
      { key: 'title', name: 'Title' },
      { key: 'count', name: 'Count' }
    ];

    let rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        title: 'Title ' + i,
        count: i * 1000
      });
    }

    this.state = { rows };
  }

  rowGetter = (rowIdx) => {
    return this.state.rows[rowIdx];
  };

  deleteRow = (e, { rowIdx }) => {
    this.state.rows.splice(rowIdx, 1);
    this.setState({rows: this.state.rows});
  };

  insertRowAbove = (e, { rowIdx }) => {
    this.insertRow(rowIdx);
  };

  insertRowBelow = (e, { rowIdx }) => {
    this.insertRow(rowIdx + 1);
  };

  insertRow = (rowIdx) => {
    const newRow = {
      id: 0,
      title: 'New at ' + (rowIdx + 1),
      count: 0
    };

    let rows = [...this.state.rows];
    rows.splice(rowIdx, 0, newRow);

    this.setState({ rows });
  };

  render() {
    return (
      <ReactDataGrid
        contextMenu={<MyContextMenu onRowDelete={this.deleteRow} onRowInsertAbove={this.insertRowAbove} onRowInsertBelow={this.insertRowBelow} />}
        contextMenuId="myContextMenu"
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.length}
        minHeight={500} />
    );
  }
}

// Create the context menu.
// Use this.props.rowIdx and this.props.idx to get the row/column where the menu is shown.
class MyContextMenu extends React.Component {
  static propTypes = {
    onRowDelete: PropTypes.func.isRequired,
    onRowInsertAbove: PropTypes.func.isRequired,
    onRowInsertBelow: PropTypes.func.isRequired,
    rowIdx: PropTypes.string.isRequired,
    idx: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  };

  onRowDelete = (e, data) => {
    if (typeof(this.props.onRowDelete) === 'function') {
      this.props.onRowDelete(e, data);
    }
  };

  onRowInsertAbove = (e, data) => {
    if (typeof(this.props.onRowInsertAbove) === 'function') {
      this.props.onRowInsertAbove(e, data);
    }
  };

  onRowInsertBelow = (e, data) => {
    if (typeof(this.props.onRowInsertBelow) === 'function') {
      this.props.onRowInsertBelow(e, data);
    }
  };

  render() {
    return (
      <ContextMenu id={this.props.id || ''}>
        <MenuItem data={{rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onRowDelete}>Delete Row</MenuItem>
        <SubMenu title="Insert Row">
          <MenuItem data={{rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onRowInsertAbove}>Above</MenuItem>
          <MenuItem data={{rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onRowInsertBelow}>Below</MenuItem>
        </SubMenu>
      </ContextMenu>
    );
  }
}

const exampleDescription = (
  <div>
    <p>
      To use a context menu on the grid, create a <code>ReactDataGridPlugins.Menu.ContextMenu</code> and then set the <code>contextMenu</code> prop of the grid to this context menu.
      Please note you must include the <code>react-data-grid.ui-plugins.js</code> package to create the context menu.
    </p>
    <p>If you need to know the row and column index where the context menu is shown, use the context menu's <code>rowIdx</code> and <code>idx</code> props.</p>
    <p>Credits: the context menu we use is <a href="https://github.com/vkbansal/react-contextmenu">react-contextmenu</a> by <a href="https://github.com/vkbansal">Vivek Kumar Bansal</a>.</p>
  </div>
);

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Context Menu Example',
  exampleDescription,
  examplePath: './scripts/example18-context-menu.js',
  examplePlaygroundLink: undefined
});
