import React from 'react';
import PropTypes from 'prop-types';
import DataGrid from 'react-data-grid';
import { Menu } from 'react-data-grid-addons';
import Wrapper from './Wrapper';

const { ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } = Menu;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this._columns = [
      { key: 'id', name: 'ID' },
      { key: 'title', name: 'Title' },
      { key: 'count', name: 'Count' }
    ];

    const rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        title: `Title ${i}`,
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
    this.setState({ rows: this.state.rows });
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
      title: `New at ${rowIdx + 1}`,
      count: 0
    };

    const rows = [...this.state.rows];
    rows.splice(rowIdx, 0, newRow);

    this.setState({ rows });
  };

  render() {
    return (
      <Wrapper title="Context Menu Example">
        <DataGrid
          contextMenu={<MyContextMenu id="customizedContextMenu" onRowDelete={this.deleteRow} onRowInsertAbove={this.insertRowAbove} onRowInsertBelow={this.insertRowBelow} />}
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={500}
          RowsContainer={ContextMenuTrigger}
        />
      </Wrapper>
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
    if (typeof this.props.onRowDelete === 'function') {
      this.props.onRowDelete(e, data);
    }
  };

  onRowInsertAbove = (e, data) => {
    if (typeof this.props.onRowInsertAbove === 'function') {
      this.props.onRowInsertAbove(e, data);
    }
  };

  onRowInsertBelow = (e, data) => {
    if (typeof this.props.onRowInsertBelow === 'function') {
      this.props.onRowInsertBelow(e, data);
    }
  };

  render() {
    const { idx, id, rowIdx } = this.props;

    return (
      <ContextMenu id={id}>
        <MenuItem data={{ rowIdx, idx }} onClick={this.onRowDelete}>Delete Row</MenuItem>
        <SubMenu title="Insert Row">
          <MenuItem data={{ rowIdx, idx }} onClick={this.onRowInsertAbove}>Above</MenuItem>
          <MenuItem data={{ rowIdx, idx }} onClick={this.onRowInsertBelow}>Below</MenuItem>
        </SubMenu>
      </ContextMenu>
    );
  }
}
