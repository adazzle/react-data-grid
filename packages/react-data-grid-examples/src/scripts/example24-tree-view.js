const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');

function createRows() {
  let rows = [];
  for (let i = 0; i < 1000; i++) {
    let price = Math.random() * 30;
    let row = {
      name: 'supplier ' + i,
      format: 'package ' + i,
      position: 'Run of site',
      price: price,
      children: [{ name: 'supplier ' + i, format: '728x90', position: 'run of site', price: price / 2 },
      { name: 'supplier ' + i, format: '480x600', position: 'run of site', price: price * 0.25 },
      { name: 'supplier ' + i, format: '328x70', position: 'run of site', price: price * 0.25 }]
    };
    rows.push(row);
  }
  return rows;
}


let columns = [
  {
    key: 'name',
    name: 'Name'
  },
  {
    key: 'format',
    name: 'format'
  },
  {
    key: 'position',
    name: 'position'
  },
  {
    key: 'price',
    name: 'price'
  }
];

const Example = React.createClass({
  getInitialState() {
    let rows = createRows();
    return { expanded: {}, rowCount: rows.length, rows: rows };
  },

  getSubRowDetails(rowItem) {
    let isExpanded = this.state.expanded[rowItem.name] ? this.state.expanded[rowItem.name] : false;
    return {
      group: rowItem.children && rowItem.children.length > 0,
      expanded: isExpanded,
      children: rowItem.children,
      field: 'name'
    };
  },

  getRows(i) {
    return this.state.rows[i];
  },

  onCellExpand(args) {
    let rowKey = args.rowData.name;
    let rowCount = this.state.rowCount;
    let expanded = Object.assign({}, this.state.expanded);
    if (this.state.expanded && !expanded[rowKey]) {
      expanded[rowKey] = !args.expandArgs.expanded;
      rowCount += args.expandArgs.children.length;
    } else if (expanded[rowKey]) {
      delete expanded[rowKey];
      rowCount -= args.expandArgs.children.length;
    }
    this.setState({ expanded: expanded, rowCount: rowCount });
  },

  render() {
    return (<ReactDataGrid
      enableCellSelect={true}
      columns={columns}
      rowGetter={this.getRows}
      rowsCount={this.state.rowCount}
      getSubRowDetails={this.getSubRowDetails}
      minHeight={500}
      onCellExpand={this.onCellExpand} />);
  }
});

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Tree View',
  exampleDescription: 'This examples demonstrates how a nested JSON data structure can be passed as row data in order to display a tree view',
  examplePath: './scripts/example24-tree-view.js'
});
