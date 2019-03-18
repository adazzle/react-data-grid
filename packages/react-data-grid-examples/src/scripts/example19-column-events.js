import React from 'react';
import ReactDataGrid from 'react-data-grid';
import { Editors } from 'react-data-grid-addons';
import update from 'immutability-helper';

import exampleWrapper from '../components/exampleWrapper';

const { DropDownEditor } = Editors;
const titles = ['Dr.', 'Mr.', 'Mrs.', 'Miss', 'Ms.'];

class Example extends React.Component {
  constructor(props) {
    super(props);
    this._columns = [
      {
        key: 'id',
        name: 'ID',
        resizable: true
      },
      {
        key: 'title',
        name: 'Title',
        editor: <DropDownEditor options={titles} />,
        resizable: true,
        events: {
          onDoubleClick: function(ev, args) {
            console.log('The user entered edit mode on title column with rowIdx: ' + args.rowIdx + ' & rowId: ' + args.rowId);
          }
        }
      },
      {
        key: 'name',
        name: 'Name',
        editable: true,
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
        editable: true,
        resizable: true
      }
    ];

    const rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        title: titles[Math.floor((Math.random() * 4))],
        name: "Name " + i,
        age: Math.floor((Math.random() * 100) + 1)
      });
    }

    this.state = { rows };
  }

  rowGetter = (rowIdx) => {
    return this.state.rows[rowIdx];
  };

  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    const rows = this.state.rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      const rowToUpdate = rows[i];
      const updatedRow = update(rowToUpdate, { $merge: updated });
      rows[i] = updatedRow;
    }

    this.setState({ rows: rows });
  };

  cellEditWithOneClick = (ev, { idx, rowIdx }) => {
    this.grid.openCellEditor(rowIdx, idx);
  };

  getColumns = () => {
    const clonedColumns = this._columns.slice();
    clonedColumns[3].events = {
      onClick: this.cellEditWithOneClick
    };

    return clonedColumns;
  };

  render() {
    return (
      <ReactDataGrid
        ref={(node) => this.grid = node}
        columns={this.getColumns()}
        enableCellSelect
        rowGetter={this.rowGetter}
        onGridRowsUpdated={this.handleGridRowsUpdated}
        rowsCount={this.state.rows.length}
        minHeight={500}
      />
    );
  }
}

const exampleDescription = (
  <div>
    <p>
      By adding an <code>event</code> object with callbacks for the native react events you can bind events to a specific column. That will not break the default behaviour of the grid
      and will run only for the specified column.
    </p>
    <p>
      Every event callback must respect this standard in order to work correctly: <code>function onXxx(ev :SyntheticEvent, (idx, rowIdx, rowId, column): args)</code>
    </p>
  </div>
);

export default exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Column Events Example',
  exampleDescription,
  examplePath: './scripts/example19-column-events.js',
  examplePlaygroundLink: undefined
});
