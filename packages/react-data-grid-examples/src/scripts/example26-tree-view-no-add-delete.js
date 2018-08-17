const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');

function createRows() {
  let rows = [];
  for (let i = 0; i < 100; i++) {
    let price = Math.random() * 30;
    let row = {
      id: 'row' + i,
      name: 'supplier ' + i,
      format: 'package ' + i,
      position: 'Run of site',
      price: price,
      children: [
        { id: 'row' + i + '-0', name: 'supplier ' + i, format: '728x90', position: 'run of site', price: price / 2 },
        { id: 'row' + i + '-1', name: 'supplier ' + i, format: '480x600', position: 'run of site', price: price * 0.25 },
        { id: 'row' + i + '-2', name: 'supplier ' + i, format: '328x70', position: 'run of site', price: price * 0.25 }
      ]
    };
    rows.push(row);
  }
  return rows;
}


let columns = [
  {
    key: 'id',
    name: 'id',
    frozen: true
  },
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

class Example extends React.Component {
  constructor(props) {
    super(props);
    let rows = createRows();
    this.state = { expanded: {}, rows: rows };
  }

  getRows = (i) => {
    return this.state.rows[i];
  };

  getSubRowDetails = (rowItem) => {
    let isExpanded = this.state.expanded[rowItem.name] ? this.state.expanded[rowItem.name] : false;
    return {
      group: rowItem.children && rowItem.children.length > 0,
      expanded: isExpanded,
      children: rowItem.children,
      field: 'format',
      treeDepth: rowItem.treeDepth || 0,
      siblingIndex: rowItem.siblingIndex,
      numberSiblings: rowItem.numberSiblings
    };
  };

  onCellExpand = (args) => {
    let rows = this.state.rows.slice(0);
    let rowKey = args.rowData.name;
    let rowIndex = rows.indexOf(args.rowData);
    let subRows = args.expandArgs.children;

    let expanded = Object.assign({}, this.state.expanded);
    if (expanded && !expanded[rowKey]) {
      expanded[rowKey] = true;
      this.updateSubRowDetails(subRows, args.rowData.treeDepth);
      rows.splice(rowIndex + 1, 0, ...subRows);
    } else if (expanded[rowKey]) {
      expanded[rowKey] = false;
      rows.splice(rowIndex + 1, subRows.length);
    }

    this.setState({ expanded: expanded, rows: rows });
  };

  updateSubRowDetails = (subRows, parentTreeDepth) => {
    let treeDepth = parentTreeDepth || 0;
    subRows.forEach((sr, i) => {
      sr.treeDepth = treeDepth + 1;
      sr.siblingIndex = i;
      sr.numberSiblings = subRows.length;
    });
  };

  render() {
    return (<ReactDataGrid
      enableCellSelect={true}
      columns={columns}
      rowGetter={this.getRows}
      rowsCount={this.state.rows.length}
      getSubRowDetails={this.getSubRowDetails}
      minHeight={500}
      onCellExpand={this.onCellExpand} />);
  }
}

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Tree View',
  exampleDescription: 'This examples demonstrates how a nested JSON data structure can be passed as row data in order to display a tree view with no adding & deleting of rows',
  examplePath: './scripts/example26-tree-view-no-add-delete.js'
});
