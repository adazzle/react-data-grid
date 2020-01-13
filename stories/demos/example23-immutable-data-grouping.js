import React from 'react';
import PropTypes from 'prop-types';
import DataGrid from 'react-data-grid';
import { ToolsPanel, Data, Draggable } from 'react-data-grid-addons';
import faker from 'faker';
import Wrapper from './Wrapper';

const { AdvancedToolbar: Toolbar, GroupedColumnsPanel } = ToolsPanel;
const { Selectors } = Data;
const { Container: DraggableContainer } = Draggable;

faker.locale = 'en_GB';

const _rows = [];
const _cols = [];

for (let j = 0; j < 50; j++) {
  _cols.push({ key: `col${j}`, name: `col${j}`, width: 150, draggable: true });
}

for (let rowIdx = 1; rowIdx < 100; rowIdx++) {
  const row = {};
  _cols.forEach((c, colIdx) => {
    row[c.key] = `(${colIdx},${rowIdx})`;
  });
  _rows.push(row);
}

class CustomToolbar extends React.Component {
  static propTypes = {
    groupBy: PropTypes.array.isRequired,
    onColumnGroupAdded: PropTypes.func.isRequired,
    onColumnGroupDeleted: PropTypes.func.isRequired
  };

  render() {
    return (
      <Toolbar>
        <GroupedColumnsPanel groupBy={this.props.groupBy} onColumnGroupAdded={this.props.onColumnGroupAdded} onColumnGroupDeleted={this.props.onColumnGroupDeleted} />
      </Toolbar>
    );
  }
}

export default class extends React.Component {
  state = {
    rows: _rows,
    cols: _cols,
    groupBy: [],
    expandedRows: {}
  };

  getRows = () => {
    return Selectors.getRows(this.state);
  };

  getRowAt = (index) => {
    const rows = this.getRows();
    return rows[index];
  };

  getSize = () => {
    return this.getRows().length;
  };

  onColumnGroupAdded = (colName) => {
    const columnGroups = this.state.groupBy.slice(0);
    if (columnGroups.indexOf(colName) === -1) {
      columnGroups.push(colName);
    }
    this.setState({ groupBy: columnGroups });
  };

  onColumnGroupDeleted = (name) => {
    const columnGroups = this.state.groupBy.filter(function(g) { return g !== name; });
    this.setState({ groupBy: columnGroups });
  };

  onRowExpandToggle = (args) => {
    const expandedRows = { ...this.state.expandedRows };
    expandedRows[args.columnGroupName] = { ...expandedRows[args.columnGroupName] };
    expandedRows[args.columnGroupName][args.name] = { isExpanded: args.shouldExpand };
    this.setState({ expandedRows });
  };

  render() {
    return (
      <Wrapper title="Row Grouping (immutable collection input) Example">
        <DraggableContainer>
          <CustomToolbar
            groupBy={this.state.groupBy}
            onColumnGroupAdded={this.onColumnGroupAdded}
            onColumnGroupDeleted={this.onColumnGroupDeleted}
          />
        </DraggableContainer>
        <DraggableContainer>
          <DataGrid
            ref={node => this.grid = node}
            enableCellSelect
            columns={_cols}
            rowGetter={this.getRowAt}
            rowsCount={this.getSize()}
            onRowExpandToggle={this.onRowExpandToggle}
            rowHeight={50}
            minHeight={600}
          />
        </DraggableContainer>
      </Wrapper>
    );
  }
}
