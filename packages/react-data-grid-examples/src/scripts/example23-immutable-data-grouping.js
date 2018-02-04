const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');
const faker = require('faker');
const Immutable = require('immutable');
const {
  ToolsPanel: { AdvancedToolbar: Toolbar, GroupedColumnsPanel },
  Data: { Selectors },
  Draggable: { Container: DraggableContainer }
 } = require('react-data-grid-addons');

import PropTypes from 'prop-types';

faker.locale = 'en_GB';

let _rows = [];
let _cols = [];

for (let j = 0; j < 50; j++) {
  _cols.push({key: 'col' + j, name: 'col' + j, width: 150, draggable: true});
}

for (let rowIdx = 1; rowIdx < 100; rowIdx++) {
  let row = {};
  _cols.forEach((c, colIdx) => {
    row[c.key] = '(' + colIdx + ',' + rowIdx + ')';
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
        <GroupedColumnsPanel groupBy={this.props.groupBy} onColumnGroupAdded={this.props.onColumnGroupAdded} onColumnGroupDeleted={this.props.onColumnGroupDeleted}/>
      </Toolbar>);
  }
}

class Example extends React.Component {
  state = {
    rows: new Immutable.fromJS(_rows),
    cols: new Immutable.List(_cols),
    groupBy: [],
    expandedRows: {}
  };

  getRows = () => {
    let rows = Selectors.getRows(this.state);
    return rows;
  };

  getRowAt = (index) => {
    let rows = this.getRows();
    return rows.get(index);
  };

  getSize = () => {
    return this.getRows().size;
  };

  onColumnGroupAdded = (colName) => {
    let columnGroups = this.state.groupBy.slice(0);
    if (columnGroups.indexOf(colName) === -1) {
      columnGroups.push(colName);
    }
    this.setState({ groupBy: columnGroups });
  };

  onColumnGroupDeleted = (name) => {
    let columnGroups = this.state.groupBy.filter(function(g) {return g !== name;});
    this.setState({ groupBy: columnGroups });
  };

  onRowExpandToggle = (args) => {
    let expandedRows = Object.assign({}, this.state.expandedRows);
    expandedRows[args.columnGroupName] = Object.assign({}, expandedRows[args.columnGroupName]);
    expandedRows[args.columnGroupName][args.name] = { isExpanded: args.shouldExpand };
    this.setState({expandedRows: expandedRows});
  };

  render() {
    return (
      <DraggableContainer>
          <ReactDataGrid
            ref={ node => this.grid = node }
            enableCellSelect={true}
            enableDragAndDrop={true}
            columns={_cols}
            rowGetter={this.getRowAt}
            rowsCount={this.getSize()}
            onRowExpandToggle={this.onRowExpandToggle}
            toolbar={<CustomToolbar groupBy={this.state.groupBy} onColumnGroupAdded={this.onColumnGroupAdded} onColumnGroupDeleted={this.onColumnGroupDeleted}/>}
            rowHeight={50}
            minHeight={600}
            />
      </DraggableContainer>
    );
  }
}

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Row Grouping (immutable collection input) Example',
  examplePath: './scripts/example23-immutable-data-grouping.js'
});
