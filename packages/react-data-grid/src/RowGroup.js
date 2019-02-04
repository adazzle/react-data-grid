import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { last } from 'common/utils';
import cellMetaDataShape from 'common/prop-shapes/CellMetaDataShape';
import { EventTypes } from 'common/constants';

import '../../../themes/react-data-grid-row.css';

class RowGroup extends Component {
  onRowExpandToggle = (expand) => {
    const shouldExpand = expand == null ? !this.props.isExpanded : expand;
    const meta = this.props.cellMetaData;
    if (meta != null && typeof meta.onRowExpandToggle === 'function') {
      meta.onRowExpandToggle({ rowIdx: this.props.idx, shouldExpand: shouldExpand, columnGroupName: this.props.columnGroupName, name: this.props.name });
    }
  }

  onClick = () => {
    this.props.eventBus.dispatch(EventTypes.SELECT_CELL, { rowIdx: this.props.idx });
  }

  onRowExpandClick = () => {
    this.onRowExpandToggle(!this.props.isExpanded);
  }

  render() {
    const lastColumn = last(this.props.columns);
    const style = { width: lastColumn.left + lastColumn.width };

    return (
      <div style={style} className="react-grid-row-group" onClick={this.onClick}>
        <this.props.renderer {...this.props} onRowExpandClick={this.onRowExpandClick} onRowExpandToggle={this.onRowExpandToggle} />
      </div>
    );
  }
}

RowGroup.propTypes = {
  height: PropTypes.number.isRequired,
  columns: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  row: PropTypes.any.isRequired,
  cellRenderer: PropTypes.func,
  cellMetaData: PropTypes.shape(cellMetaDataShape),
  isSelected: PropTypes.bool,
  idx: PropTypes.number.isRequired,
  expandedRows: PropTypes.arrayOf(PropTypes.object),
  extraClasses: PropTypes.string,
  forceUpdate: PropTypes.bool,
  subRowDetails: PropTypes.object,
  isRowHovered: PropTypes.bool,
  colVisibleStartIdx: PropTypes.number.isRequired,
  colVisibleEndIdx: PropTypes.number.isRequired,
  colOverscanStartIdx: PropTypes.number.isRequired,
  colOverscanEndIdx: PropTypes.number.isRequired,
  isScrolling: PropTypes.bool.isRequired,
  columnGroupName: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  treeDepth: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  renderer: PropTypes.func,
  eventBus: PropTypes.object.isRequired,
  rowRef: PropTypes.func.isRequired
};

class Defaultbase extends Component {
  onKeyDown = (e) => {
    const { onRowExpandToggle, isExpanded } = this.props;
    if (e.key === 'ArrowLeft') {
      onRowExpandToggle(false);
    }
    if (e.key === 'ArrowRight') {
      onRowExpandToggle(true);
    }
    if (e.key === 'Enter') {
      onRowExpandToggle(!isExpanded);
    }
  };

  render() {
    const { treeDepth = 0, height, rowRef, onRowExpandClick, isExpanded, columnGroupDisplayName, name } = this.props;
    const marginLeft = treeDepth * 20;
    const style = {
      height,
      border: '1px solid #dddddd',
      paddingTop: '15px',
      paddingLeft: '5px'
    };

    return (
      <div style={style} onKeyDown={this.onKeyDown} tabIndex={0} ref={rowRef} >
        <span
          className="row-expand-icon"
          style={{ float: 'left', marginLeft, cursor: 'pointer' }}
          onClick={onRowExpandClick} >
          {isExpanded ? String.fromCharCode(9660) : String.fromCharCode(9658)}
        </span>
        <strong>{columnGroupDisplayName}: {name}</strong>
      </div>
    );
  }
}

Defaultbase.propTypes = {
  onRowExpandClick: PropTypes.func.isRequired,
  onRowExpandToggle: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  height: PropTypes.number.isRequired,
  treeDepth: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  columnGroupName: PropTypes.string.isRequired,
  columnGroupDisplayName: PropTypes.string.isRequired,
  rowRef: PropTypes.func.isRequired,
  hideColumnName: PropTypes.bool
};

RowGroup.defaultProps = {
  renderer: Defaultbase
};

export default RowGroup;
