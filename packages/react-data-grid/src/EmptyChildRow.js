import React, { PropTypes } from 'react';
import ColumnUtils from './ColumnUtils';

class EmptyChildRow extends React.Component {

  constructor() {
    super();
    this.onAddSubRow = this.onAddSubRow.bind(this);
  }

  onAddSubRow() {
    this.props.onAddSubRow(this.props.parentRowId);
  }

  getFixedColumnsWidth() {
    let fixedWidth = 0;
    let size = ColumnUtils.getSize(this.props.columns);
    for (let i = 0; i < size; i++) {
      let column = ColumnUtils.getColumn(this.props.columns, i);
      if (column) {
        if (ColumnUtils.getValue(column, 'locked')) {
          fixedWidth += ColumnUtils.getValue(column, 'width');
        }
      }
    }
    return fixedWidth;
  }

  render() {
    let { cellHeight, treeDepth } = this.props;
    const height = 12;
    const width = 12;
    let left = treeDepth * 15;
    let top = (cellHeight - 12) / 2;
    let style = {
      height: cellHeight,
      borderBottom: '1px solid #dddddd'
    };
    let expandColumn = ColumnUtils.getColumn(this.props.columns.filter(c => c.key === this.props.expandColumnKey), 0);

    let cellLeft = expandColumn ? expandColumn.left  : 0;
    return (<div className="react-grid-Row rdg-add-child-row-container" style={style}>
      <div className="react-grid-Cell" style={{ position: 'absolute', height: cellHeight, width: '100%', left: cellLeft }}>
        <div className="rdg-empty-child-row" style={{ marginLeft: '30px', lineHeight: `${cellHeight}px` }}>
          <div className="'rdg-child-row-action-cross rdg-child-row-action-cross-last" />
          <div style={{ left: left, top: top, width: width, height: height }} className="rdg-child-row-btn" onClick={this.onAddSubRow}>
            <div className="glyphicon glyphicon-plus-sign"></div>
          </div>
        </div>
      </div>
    </div>);
  }
}

EmptyChildRow.propTypes = {
  treeDepth: PropTypes.number.isRequired,
  cellHeight: PropTypes.number.isRequired,
  onAddSubRow: PropTypes.func.isRequired,
  parentRowId: PropTypes.number,
  columns: PropTypes.array.isRequired,
  expandColumnKey: PropTypes.string.isRequired
};

export default EmptyChildRow;
