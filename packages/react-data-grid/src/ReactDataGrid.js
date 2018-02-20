import React from 'react';
import PropTypes from 'prop-types';
import GridContainer from './connectedComponents/GridContainer';
import Constants from './AppConstants';

class ReactDataGrid extends React.Component {

  static propTypes = {
    rowGetter: PropTypes.func,
    rowKey: PropTypes.string,
    onGridRowsUpdated: PropTypes.func
  };

  onGridRowsUpdated = (cellKey, fromRow, toRow, updated, action, originRow) => {
    const rowIds = [];
    const {rowGetter, rowKey, onGridRowsUpdated} = this.props;
    for (let i = fromRow; i <= toRow; i++) {
      rowIds.push(rowGetter(i)[rowKey]);
    }

    const fromRowData = rowGetter(action === Constants.UpdateActions.COPY_PASTE ? originRow : fromRow);
    const fromRowId = fromRowData[rowKey];
    const toRowId = rowGetter(toRow)[rowKey];
    onGridRowsUpdated({cellKey, fromRow, toRow, fromRowId, toRowId, rowIds, updated, action, fromRowData});
  };

  onCommit = (commit) => {
    const targetRow = commit.rowIdx;
    this.onGridRowsUpdated(commit.cellKey, targetRow, targetRow, commit.updated, Constants.UpdateActions.CELL_UPDATE);
  };

  render() {
    return (
      <GridContainer {...this.props} onCommit={this.onCommit}/>
    );
  }
}

module.exports = ReactDataGrid;
