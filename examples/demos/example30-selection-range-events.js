import React from 'react';
import DataGrid from 'react-data-grid';
import Wrapper from './Wrapper';

export default class extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
        key: 'id',
        name: 'ID'
      },
      {
        key: 'title',
        name: 'Title'
      },
      {
        key: 'count',
        name: 'Count'
      }
    ];

    this.state = { rows: this.createRows(1000) };
  }

  createRows = () => {
    const rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        title: `Title ${i}`,
        count: i * 1000,
        isSelected: false
      });
    }

    return rows;
  };

  rowGetter = (i) => {
    return this.state.rows[i];
  };

  onStart = (selectedRange) => {
    this.textarea.value += 'START: '
      + `(${selectedRange.topLeft.idx}, ${selectedRange.topLeft.rowIdx}) -> `
      + `(${selectedRange.bottomRight.idx}, ${selectedRange.bottomRight.rowIdx})\n`;
    this.textarea.scrollTop = this.textarea.scrollHeight;
  };

  onUpdate = (selectedRange) => {
    this.textarea.value += 'UPDATE: '
      + `(${selectedRange.topLeft.idx}, ${selectedRange.topLeft.rowIdx}) -> `
      + `(${selectedRange.bottomRight.idx}, ${selectedRange.bottomRight.rowIdx})\n`;
    this.textarea.scrollTop = this.textarea.scrollHeight;
  };

  onComplete = () => {
    this.textarea.value += 'END\n';
    this.textarea.scrollTop = this.textarea.scrollHeight;
  };

  render() {
    return (
      <Wrapper title="Selection Range Events">
        <textarea
          ref={(element) => this.textarea = element}
          style={{ width: '100%', marginBottom: '1em', padding: '0.5em', border: '1px solid black' }}
          rows={5}
        />
        <DataGrid
          rowKey="id"
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={500}
          cellRangeSelection={{
            onStart: this.onStart,
            onUpdate: this.onUpdate,
            onComplete: this.onComplete
          }}
        />
      </Wrapper>
    );
  }
}
