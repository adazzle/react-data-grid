const React = require('react');
const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const { DraggableHeader: { DraggableContainer, DraggableHeaderCell } } = require('react-data-grid-addons');

const Example = React.createClass({
  getInitialState() {
    this._columns = [
      { 
        order: 1,
        key: 'id',
        name: 'ID',
        draggable: true,
      },
      { 
        order: 2,
        key: 'title',
        name: 'Title',
        draggable: true
      },
      { 
        order: 3,
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
    const stateCopy = Object.assign({}, this.state);
    
    const columnSourceIndex = this.state.columns.findIndex(i => i.order === source);
    const columnTargetIndex = this.state.columns.findIndex(i => i.order === target);

    stateCopy.columns.splice(columnTargetIndex, 0, stateCopy.columns.splice(columnSourceIndex, 1)[0]);

    this.setState({
      columns: []
    })

    this.setState(Object.assign({},{
      columns: stateCopy.columns
    }));
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