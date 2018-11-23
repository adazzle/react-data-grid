import React from 'react';
import PropTypes from 'prop-types';
import {getSize, getColumn} from './ColumnUtils';

class EmptyChildRow extends React.Component {

  constructor() {
    super();
    this.onAddSubRow = this.onAddSubRow.bind(this);
  }

  onAddSubRow() {
    this.props.onAddSubRow(this.props.parentRowId);
  }

  getFrozenColumnsWidth() {
    let fixedWidth = 0;
    const size = getSize(this.props.columns);
    for (let i = 0; i < size; i++) {
      const column = getColumn(this.props.columns, i);
      if (column) {
        if (getValue(column, 'frozen')) {
          fixedWidth += getValue(column, 'width');
        }
      }
    }
    return fixedWidth;
  }

  render() {
    const { cellHeight, treeDepth } = this.props;
    const height = 12;
    const width = 12;
    const left = treeDepth * 15;
    const top = (cellHeight - 12) / 2;
    const style = {
      height: cellHeight,
      borderBottom: '1px solid #dddddd'
    };
    const expandColumn = getColumn(this.props.columns.filter(c => c.key === this.props.expandColumnKey), 0);

    const cellLeft = expandColumn ? expandColumn.left  : 0;
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
