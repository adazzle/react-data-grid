import React from 'react';
import ReactPlayground from '../assets/js/ReactPlayground';

let example = `
var Editors             = ReactDataGridPlugins.Editors;
var DropDownEditor      = ReactDataGridPlugins.Editors.DropDownEditor;

var titles = ['Dr.', 'Mr.', 'Mrs.', 'Miss', 'Ms.'];

var _rows = [];
for (var i = 1; i < 1000; i++) {
  _rows.push({
    id: i,
    title: titles[Math.floor((Math.random() * 4))],
    name: "Name " + i,
    age: Math.floor((Math.random() * 100) + 1)
  });
};

var columns = [
  {
    key: 'id',
    name: 'ID',
    resizable: true
  },
  {
    key: 'title',
    name: 'Title',
    editor : <DropDownEditor options={titles}/>,
    resizable: true,
    events: {
      onDoubleClick: function(ev, args) {
          console.log("The user entered edit mode on title column with rowId: " + args.rowIdx);
      },
    }
  },
  {
    key: 'name',
    name: 'Name',
    editable:true,
    resizable: true,
    events: {
      onKeyDown: function(ev) {
        if (ev.key === 'Enter') {
          alert('Thanks for commiting a result with Enter');
        }
      }
    }
  },
  {
    key: 'age',
    name: 'Age',
    editable:true,
    resizable: true
  }
];

// Create the React Data Grid and pass your context menu to the contextMenu prop.
var Example = React.createClass({
  getInitialState: function() {
    return {rows: _rows};
  },

  rowGetter: function(rowIdx) {
    return this.state.rows[rowIdx];
  },

  handleGridRowsUpdated : function(updatedRowData) {
    var rows = this.state.rows;

    for (var i = updatedRowData.fromRow; i <= updatedRowData.toRow; i++) {
      var rowToUpdate = rows[i];
      var updatedRow = React.addons.update(rowToUpdate, {$merge: updatedRowData.updated});
      rows[i] = updatedRow;
    }

    this.setState({rows: rows});
  },

  cellEditWithOneClick: function(ev, args) {
    var idx = args.idx;
    var rowIdx = args.rowIdx;
    this.refs.grid.openCellEditor(rowIdx, idx);
  },

  getColumns: function() {
    var clonedColumns = columns.slice();
    clonedColumns[1].events = {
      onClick: this.cellEditWithOneClick.bind(this)
    };
    clonedColumns[3].events = {
      onClick: this.cellEditWithOneClick.bind(this)
    };

    return clonedColumns;
  },

  render: function() {
    return (
      <ReactDataGrid
        ref="grid"
        columns={this.getColumns()}
        enableCellSelect={true}
        rowGetter={this.rowGetter}
        onGridRowsUpdated={this.handleGridRowsUpdated}
        rowsCount={this.state.rows.length}
        minHeight={500} />
    );
  }
});

ReactDOM.render(<Example />, mountNode);
`;

class ColumnEventsExample extends React.Component {
  render() {
    return (
      <div>
        <h3>Column Events Example</h3>
        <p>
          By adding an <code>event</code> object with callbacks for the native react events you can bind events to a specific column. That will not break the default behaviour of the grid
          and will run only for the specified column.
        </p>
        <p>
          Every event callback must respect this standard in order to work correctly: <code>function onXxx(ev :SyntheticEvent, (rowIdx, idx, column): args)</code>
        </p>
        <ReactPlayground codeText={example} />
      </div>
    );
  }
}

module.exports = ColumnEventsExample;
