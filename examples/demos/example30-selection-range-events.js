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

    this.state = { rows: this.createRows(1000), selectedRange: undefined, selectedRanges: [] };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedRanges !== prevState.selectedRanges) {
      this.divRef.scrollTop = this.divRef.scrollHeight;
    }
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

  onSelectedCellRangeChange = (selectedRange) => {
    this.setState({ selectedRange });
    if (!selectedRange.isDragging) {
      this.setState({
        selectedRanges: [...this.state.selectedRanges, selectedRange]
      });
    }
  };

  render() {
    const { selectedRange, selectedRanges } = this.state;
    return (
      <Wrapper title="Selection Range Events">
        <div
          className="react-grid-Toolbar"
          style={{ minHeight: 48, overflow: 'auto' }}
          ref={r => this.divRef = r}
        >
          Previous selections <br />
          {selectedRanges.map(selectedRange => <SelectedRange selectedRange={selectedRange} />)}
          Current selection <br />
          {selectedRange && <SelectedRange selectedRange={selectedRange} />}
        </div>
        <DataGrid
          rowKey="id"
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={500}
          onSelectedCellRangeChange={this.onSelectedCellRangeChange}
        />
      </Wrapper>
    );
  }
}

function SelectedRange({ selectedRange }) {
  return (
    <>
      ({selectedRange.topLeft.idx}, {selectedRange.topLeft.rowIdx}) ->
      ({selectedRange.bottomRight.idx}, {selectedRange.bottomRight.rowIdx})
      <br />
    </>
  );
}
