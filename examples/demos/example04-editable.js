import React from 'react';
import DataGrid, { valueCellContentRenderer, DataGridEditor, withDataGridEditor } from 'react-data-grid';
import update from 'immutability-helper';
import Wrapper from './Wrapper';

const box = { boxShadow: '0 0 5px 5px #ddd', padding: 8, background: '#fff', width: 400 };
const inputWrapper = { marginTop: 8, marginBottom: 8 };
const input = { height: 34, width: 380 };

class TextEditorWithDataGridEditor extends React.Component {
  inputRef = React.createRef();

  render() {
    return (
      <DataGridEditor inputRef={this.inputRef}>
        {({ onKeyDown }) => (
          <div style={box}>
            <label>TextEditorWithDataGridEditor</label>
            <div style={inputWrapper}>
              <input
                ref={this.inputRef}
                className="rdg-text-editor"
                style={input}
                value={this.props.value}
                onChange={e => this.props.onChange(e.target.value)}
                onKeyDown={onKeyDown}
              />
            </div>
          </div>
        )}
      </DataGridEditor>
    );
  }
}

class TextEditor extends React.Component {
  render() {
    return (
      <div style={box}>
        <label>Wrapped TextEditor</label>
        <div style={inputWrapper}>
          <input
            ref={this.props.inputRef}
            type="number"
            className="rdg-text-editor"
            style={input}
            value={this.props.value}
            onChange={e => this.props.onChange(e.target.value)}
            onKeyDown={this.props.onKeyDown}
          />
        </div>
      </div>
    );
  }
}

export default class extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
        key: 'id',
        name: 'ID',
        width: 80
      },
      {
        key: 'task',
        name: 'Title - new editor',
        editable: true,
        enableNewEditor: true
      },
      {
        key: 'priority',
        name: 'Priority - render props editor',
        editable: true,
        enableNewEditor: true,
        editor: TextEditorWithDataGridEditor
      },
      {
        key: 'complete',
        name: '% Complete - HOC editor',
        editable: true,
        enableNewEditor: true,
        editor: withDataGridEditor(TextEditor)
      },
      {
        key: 'issueType',
        name: 'Issue Type',
        editable: true
      },
      {
        key: 'startDate',
        name: 'Start Date',
        editable: true
      },
      {
        key: 'completeDate',
        name: 'Expected Complete',
        editable: true
      }
    ];

    this.state = { rows: this.createRows(1000) };
  }

  getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  };

  createRows = (numberOfRows) => {
    const rows = [];
    for (let i = 1; i < numberOfRows; i++) {
      rows.push({
        id: i,
        task: `Task ${i}`,
        complete: Math.min(100, Math.round(Math.random() * 110)),
        priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
        issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
        startDate: this.getRandomDate(new Date(2015, 3, 1), new Date()),
        completeDate: this.getRandomDate(new Date(), new Date(2016, 0, 1))
      });
    }
    return rows;
  };

  rowGetter = (i) => {
    return this.state.rows[i];
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

  render() {
    return (
      <Wrapper title="Editable Example">
        <DataGrid
          enableCellSelect
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={500}
          onGridRowsUpdated={this.handleGridRowsUpdated}
          defaultCellContentRenderer={valueCellContentRenderer}
        />
      </Wrapper>
    );
  }
}
