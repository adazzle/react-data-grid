import React, {Component} from 'react';
import PropTypes from 'prop-types';
import utils from './utils';
const cellMetaDataShape = require('./PropTypeShapes/CellMetaDataShape');

import '../../../themes/react-data-grid-row.css';

class RowGroup extends Component {
  constructor(props) {
    super(props);

    this.onRowExpandToggle = this.onRowExpandToggle.bind(this);
    this.onRowExpandClick = this.onRowExpandClick.bind(this);
    this.setScrollLeft = this.setScrollLeft.bind(this);
  }

  onRowExpandToggle(expand) {
    let shouldExpand = expand == null ? !this.props.isExpanded : expand;
    let meta = this.props.cellMetaData;
    if (meta != null && meta.onRowExpandToggle && typeof(meta.onRowExpandToggle) === 'function') {
      meta.onRowExpandToggle({rowIdx: this.props.idx, shouldExpand: shouldExpand, columnGroupName: this.props.columnGroupName, name: this.props.name});
    }
  }

  onRowExpandClick() {
    this.onRowExpandToggle(!this.props.isExpanded);
  }

  setScrollLeft(scrollLeft) {
    if (this.rowGroupRenderer) {
      this.rowGroupRenderer.setScrollLeft ? this.rowGroupRenderer.setScrollLeft(scrollLeft) : null;
    }
  }

  render() {
    let lastColumn = utils.last(this.props.columns);

    let style = {width: lastColumn.left + lastColumn.width};

    return (
      <div style={style} className="react-grid-row-group">
         <this.props.renderer ref={(node) => {this.rowGroupRenderer = node; }} {...this.props} onRowExpandClick={this.onRowExpandClick} onRowExpandToggle={this.onRowExpandToggle}/>
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
  colVisibleStart: PropTypes.number.isRequired,
  colVisibleEnd: PropTypes.number.isRequired,
  colDisplayStart: PropTypes.number.isRequired,
  colDisplayEnd: PropTypes.number.isRequired,
  isScrolling: PropTypes.bool.isRequired,
  columnGroupName: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  treeDepth: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  renderer: PropTypes.func
};

class DefaultRowGroupRenderer extends Component {

  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(e) {
    if (e.key === 'ArrowLeft') {
      this.props.onRowExpandToggle(false);
    }
    if (e.key === 'ArrowRight') {
      this.props.onRowExpandToggle(true);
    }
    if (e.key === 'Enter') {
      this.props.onRowExpandToggle(!this.props.isExpanded);
    }
  }

  render() {
    let treeDepth = this.props.treeDepth || 0;
    let marginLeft = treeDepth * 20;

    let style = {
      height: '50px',
      border: '1px solid #dddddd',
      paddingTop: '15px',
      paddingLeft: '5px'
    };

    return (
      <div style={style} onKeyDown={this.onKeyDown} tabIndex={0}>
        <span
          className="row-expand-icon"
          style={{ float: 'left', marginLeft: marginLeft, cursor: 'pointer' }}
          onClick={this.props.onRowExpandClick}
        >
          {this.props.isExpanded
            ? String.fromCharCode('9660')
            : String.fromCharCode('9658')}
        </span>
        <strong>
          {this.props.columnGroupName}: {this.props.name}
        </strong>
      </div>
    );
  }
}

DefaultRowGroupRenderer.propTypes = {
  onRowExpandClick: PropTypes.func.isRequired,
  onRowExpandToggle: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  treeDepth: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  columnGroupName: PropTypes.string.isRequired,
  hideColumnName: PropTypes.bool
};

RowGroup.defaultProps = {
  renderer: DefaultRowGroupRenderer
};

export default RowGroup;
