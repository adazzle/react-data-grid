const React = require('react');
const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const { DraggableHeader: { DraggableContainer, DraggableHeaderCell } } = require('react-data-grid-addons');

const Example = React.createClass({
  getInitialState() {
    this._columns = [
      { 
        id: 10,
        key: 'id',
        name: 'ID',
        draggable: true,
      },
      { 
        id: 12,
        key: 'title',
        name: 'Title',
        draggable: true
      },
      { 
        id: 3,
        key: 'count',
        name: 'Count',
        draggable: true
      } 
    ];

    return { columns: this._columns, rows: this.createRows() };
  },

  createRows() {
    let rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        title: 'Title ' + i,
        count: i * 1000
      });
    }

    return rows;
  },

  rowGetter(i) {
    return this.state.rows[i];
  },

  onHeaderDrop: function(source, target) {
    const columns = this.state.columns;
    // find index of column in array based on his id
    const columnSourceIndex = columns.findIndex(i => i.id === source);
    const columnTargetIndex = columns.findIndex(i => i.id === target);
    console.log("Source index:", columnSourceIndex, "Target index:", columnTargetIndex);
    // change order of items
    // TODO - make it immutable
    columns.splice(columnTargetIndex, 0, columns.splice(columnSourceIndex, 1)[0]);
  
    this.setState({
      columns: columns
    });
  },

  render() {
    return  (
      <DraggableContainer 
        onHeaderDrop={this.onHeaderDrop}>
        <ReactDataGrid
          columns={this.state.columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={500} />
      </DraggableContainer>  
    );
  }
});

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Draggable header',
  exampleDescription: 'Draggable header',
  examplePath: './scripts/example24-draggable-header.js',
  //examplePlaygroundLink: ''
});