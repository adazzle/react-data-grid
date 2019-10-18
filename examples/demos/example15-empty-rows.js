import React from 'react';
import DataGrid from 'react-data-grid';
import Wrapper from './Wrapper';

class EmptyRowsView extends React.Component {
  render() {
    return <div>Nothing to show</div>;
  }
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this._rows = [];
    this._columns = [
      { key: 'id', name: 'ID' },
      { key: 'title', name: 'Title' },
      { key: 'count', name: 'Count' }
    ];

    this.state = null;
  }

  rowGetter = (i) => {
    return this._rows[i];
  };

  render() {
    return (
      <Wrapper title="Empty rows grid">
        <DataGrid
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this._rows.length}
          minHeight={500}
          emptyRowsView={EmptyRowsView}
        />
      </Wrapper>
    );
  }
}
