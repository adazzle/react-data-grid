import React from 'react';
import DataGrid from 'react-data-grid';
import Wrapper from './Wrapper';

export default class extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.createRows();
    this._columns = [
      { key: 'id', name: 'ID' },
      { key: 'title', name: 'Title' },
      { key: 'count', name: 'Count' }
    ];

    this.state = {
      value: 10,
      scrollToRowIndex: 10
    };
  }

  createRows = () => {
    const rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        title: `Title ${i}`,
        count: i * 1000
      });
    }

    this._rows = rows;
  };

  rowGetter = (i) => {
    return this._rows[i];
  };

  render() {
    return (
      <Wrapper title="Programmatic Scrolling Example">
        <div style={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
          <span style={{ marginRight: '10px' }}>Row Index: </span>
          <input
            style={{ marginRight: '10px', border: '1px outset lightgray', padding: '3px' }}
            type="text"
            value={this.state.value}
            onChange={(event) => { this.setState({ value: event.target.value }); }}
          />
          <button
            type="button"
            style={{ padding: '5px' }}
            onClick={() => this.setState({ scrollToRowIndex: this.state.value })}
          >Scroll to row
          </button>
        </div>
        <DataGrid
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this._rows.length}
          minHeight={500}
          scrollToRowIndex={+this.state.scrollToRowIndex}
        />
      </Wrapper>
    );
  }
}
