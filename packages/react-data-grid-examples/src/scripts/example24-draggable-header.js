const React = require('react');
const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const { DraggableHeader: { DraggableContainer, DraggableHeaderCell } } = require('react-data-grid-addons');

const Example = React.createClass({
  getInitialState() {
    this._columns = [
      { 
        id: 1,
        key: 'id',
        name: 'ID',
        draggable: true,
      },
      { 
        id: 2,
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

    return { column: this._columns, rows: this.createRows()};
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

    this._rows = rows;
  },

  rowGetter(i) {
    return this._rows[i];
  },

  onHeaderDrop: function(a, b) {
    console.log(a,b);
  },

  render() {
    return  (
      <DraggableContainer 
        onHeaderDrop={this.onHeaderDrop}>
        <ReactDataGrid
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this._rows.length}
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
  examplePlaygroundLink: 'https://jsfiddle.net/f6mbnb8z/1/'
});
