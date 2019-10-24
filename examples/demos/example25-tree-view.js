import React from 'react';
import DataGrid from 'react-data-grid';
import Wrapper from './Wrapper';

function createRows() {
  const rows = [];
  for (let i = 0; i < 100; i++) {
    const price = Math.random() * 30;
    const row = {
      id: `row${i}`,
      name: `supplier ${i}`,
      format: `package ${i}`,
      position: 'Run of site',
      price,
      children: [
        { id: `row${i}-0`, name: `supplier ${i}`, format: '728x90', position: 'run of site', price: price / 2 },
        { id: `row${i}-1`, name: `supplier ${i}`, format: '480x600', position: 'run of site', price: price * 0.25 },
        { id: `row${i}-2`, name: `supplier ${i}`, format: '328x70', position: 'run of site', price: price * 0.25 }
      ]
    };
    rows.push(row);
  }
  return rows;
}


const columns = [
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

export default class extends React.Component {
  constructor(props) {
    super(props);
    const rows = createRows();
    this.state = { expanded: {}, rows };
  }

  getRows = (i) => {
    return this.state.rows[i];
  };

  getSubRowDetails = (rowItem) => {
    const isExpanded = this.state.expanded[rowItem.name] ? this.state.expanded[rowItem.name] : false;
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
    const rows = this.state.rows.slice(0);
    const rowKey = args.rowData.name;
    const rowIndex = rows.indexOf(args.rowData);
    const subRows = args.expandArgs.children;

    const expanded = { ...this.state.expanded };
    if (expanded && !expanded[rowKey]) {
      expanded[rowKey] = true;
      this.updateSubRowDetails(subRows, args.rowData.treeDepth);
      rows.splice(rowIndex + 1, 0, ...subRows);
    } else if (expanded[rowKey]) {
      expanded[rowKey] = false;
      rows.splice(rowIndex + 1, subRows.length);
    }

    this.setState({ expanded, rows });
  };

  updateSubRowDetails = (subRows, parentTreeDepth) => {
    const treeDepth = parentTreeDepth || 0;
    subRows.forEach((sr, i) => {
      sr.treeDepth = treeDepth + 1;
      sr.siblingIndex = i;
      sr.numberSiblings = subRows.length;
    });
  };

  onDeleteSubRow = (args) => {
    const idToDelete = args.rowData.id;
    let rows = this.state.rows.slice(0);
    // Remove sub row from parent row.
    rows = rows.map(r => {
      let children = [];
      if (r.children) {
        children = r.children.filter(sr => sr.id !== idToDelete);
        if (children.length !== r.children.length) {
          this.updateSubRowDetails(children, r.treeDepth);
        }
      }
      return { ...r, children };
    });
    // Remove sub row from flattened rows.
    rows = rows.filter(r => r.id !== idToDelete);
    this.setState({ rows });
  };

  onAddSubRow = (args) => {
    console.log('add sub row');
    console.log(args);
  };

  render() {
    return (
      <Wrapper title="Tree View">
        <DataGrid
          enableCellSelect
          columns={columns}
          rowGetter={this.getRows}
          rowsCount={this.state.rows.length}
          getSubRowDetails={this.getSubRowDetails}
          onDeleteSubRow={this.onDeleteSubRow}
          minHeight={500}
          onCellExpand={this.onCellExpand}
          onAddSubRow={this.onAddSubRow}
        />
      </Wrapper>
    );
  }
}
