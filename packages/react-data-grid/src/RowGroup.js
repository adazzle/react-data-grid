import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import '../../../themes/react-data-grid-row.css';
import utils from './utils';

class RowGroup extends Component {

  constructor() {
    super();
    this.onRowExpandToggle = this.onRowExpandToggle.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onRowExpandClick = this.onRowExpandClick.bind(this);
  }

  onKeyDown(e) {
    if (e.key === 'ArrowLeft') {
      this.onRowExpandToggle(false);
    }
    if (e.key === 'ArrowRight') {
      this.onRowExpandToggle(true);
    }
    if (e.key === 'Enter') {
      this.onRowExpandToggle(!this.props.isExpanded);
    }
  }

  onRowExpandClick() {
    this.onRowExpandToggle(!this.props.isExpanded);
  }

  onRowExpandToggle(expand) {
    let shouldExpand = expand == null ? !this.props.isExpanded : expand;
    let meta = this.props.cellMetaData;
    if (meta != null && meta.onRowExpandToggle && typeof(meta.onRowExpandToggle) === 'function') {
      meta.onRowExpandToggle({rowIdx: this.props.idx, shouldExpand: shouldExpand, columnGroupName: this.props.columnGroupName, name: this.props.name});
    }
  }

  getClassName() {
    return classnames(
      'react-grid-row-group',
      'react-grid-Row'
    );
  }

  render() {
    let lastColumn = utils.last(this.props.columns);

    let style = {
      overflow: 'hidden',
      width: lastColumn.left + lastColumn.width
    };

    let onClickPreventionHandler = (event) => {
      e.stopPropagation();
      e.preventDefault();
    };

    return (
      <div style={style} className={this.getClassName()} onKeyDown={this.onKeyDown} tabIndex={-1} onClick={onClickPreventionHandler}>
         <this.props.renderer {...this.props} onRowExpandClick={this.onRowExpandClick} />
      </div>
    );
  }
}

RowGroup.propTypes = {
  name: PropTypes.string.isRequired,
  columnGroupName: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  treeDepth: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  cellMetaData: PropTypes.object,
  idx: PropTypes.number.isRequired,
  renderer: PropTypes.func,
  columns: PropTypes.array.isRequired
};

const DefaultRowGroupRenderer = (props) => {
  let treeDepth = props.treeDepth || 0;
  let marginLeft = treeDepth * 20;

  let style = {
    height: '50px',
    border: '1px solid #dddddd',
    paddingTop: '15px',
    paddingLeft: '5px'
  };

  return (
    <div style={style}>
      <span className="row-expand-icon" style={{float: 'left', marginLeft: marginLeft, cursor: 'pointer'}} onClick={props.onRowExpandClick} >{props.isExpanded ? String.fromCharCode('9660') : String.fromCharCode('9658')}</span>
      <strong>{props.columnGroupName} : {props.name}</strong>
    </div>
  );
};

DefaultRowGroupRenderer.propTypes = {
  onRowExpandClick: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  treeDepth: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  columnGroupName: PropTypes.string.isRequired
};

RowGroup.defaultProps = {
  renderer: DefaultRowGroupRenderer
};

export default RowGroup;
