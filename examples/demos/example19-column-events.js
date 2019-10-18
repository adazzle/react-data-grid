import React from 'react';
import DataGrid from 'react-data-grid';
import { Editors } from 'react-data-grid-addons';
import update from 'immutability-helper';
import Wrapper from './Wrapper';

const { DropDownEditor } = Editors;
const titles = ['Dr.', 'Mr.', 'Mrs.', 'Miss', 'Ms.'];

export default class extends React.Component {
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
          onDoubleClick(ev, args) {
            console.log(`The user entered edit mode on title column with rowIdx: ${args.rowIdx} & rowId: ${args.rowId}`);
          }
        }
      },
      {
        key: 'name',
        name: 'Name',
        editable: true,
        resizable: true,
        events: {
          onKeyDown(ev) {
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
        title: titles[Math.floor(Math.random() * 4)],
        name: `Name ${i}`,
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

    this.setState({ rows });
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
      <Wrapper title="Column Events Example">
        <DataGrid
          ref={(node) => this.grid = node}
          columns={this.getColumns()}
          enableCellSelect
          rowGetter={this.rowGetter}
          onGridRowsUpdated={this.handleGridRowsUpdated}
          rowsCount={this.state.rows.length}
          minHeight={500}
        />
      </Wrapper>
    );
  }
}
