import React from 'react';
import DataGrid from 'react-data-grid';
import Wrapper from './Wrapper';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this._columns = [
      { key: 'id', name: 'ID' },
      { key: 'title', name: 'Title', editable: true },
      { key: 'count', name: 'Count' }
    ];

    const rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        title: `Title ${i}`,
        count: i * 1000,
        active: i % 2
      });
    }

    this._rows = rows;

    this.state = { selectedCell: undefined, prevSelectedCell: undefined };
  }

  rowGetter = (index) => {
    return this._rows[index];
  };

  onSelectedCellChange = ({ rowIdx, idx }) => {
    this.setState(({ selectedCell }) => ({
      selectedCell: { rowIdx, idx },
      prevSelectedCell: selectedCell ? { ...selectedCell } : undefined
    }));
    this.grid.openCellEditor(rowIdx, idx);
  };

  render() {
    const { selectedCell, prevSelectedCell } = this.state;
    return (
      <Wrapper title="Cell selection/delesection events">
        <div className="rdg-toolbar">
          {selectedCell && <>({selectedCell.idx}, {selectedCell.rowIdx}) is selected</>}
          {prevSelectedCell && <> and ({prevSelectedCell.idx}, {prevSelectedCell.rowIdx}) was deselected</>}
        </div>
        <DataGrid
          ref={node => this.grid = node}
          rowKey="id"
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this._rows.length}
          minHeight={500}
          enableCellSelect
          enableCellAutoFocus={false}
          onSelectedCellChange={this.onSelectedCellChange}
        />
      </Wrapper>
    );
  }
}
