import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

class RowGroup extends Component {

  constructor() {
    super();
    this.checkFocus = this.checkFocus.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onRowExpandToggle = this.onRowExpandToggle.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onRowExpandClick = this.onRowExpandClick.bind(this);
  }

  componentDidMount() {
    this.checkFocus();
  }

  componentDidUpdate() {
    this.checkFocus();
  }

  isSelected() {
    let meta = this.props.cellMetaData;
    if (meta == null) { return false; }

    return (
      meta.selected
      && meta.selected.rowIdx === this.props.idx
    );
  }

  onClick(e) {
    let meta = this.props.cellMetaData;
    if (meta != null && meta.onCellClick && typeof(meta.onCellClick) === 'function') {
      meta.onCellClick({rowIdx: this.props.idx, idx: 0}, e);
    }
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
      'react-grid-Row',
      {'row-selected': this.isSelected()}
    );
  }

  checkFocus() {
    if (this.isSelected()) {
      ReactDOM.findDOMNode(this).focus();
    }
  }

  render() {
    let treeDepth = this.props.treeDepth || 0;
    let marginLeft = treeDepth * 20;
    let style = {
      height: '50px',
      overflow: 'hidden',
      border: '1px solid #dddddd',
      paddingTop: '15px',
      paddingLeft: '5px'
    };
    return (
      <div style={style} className={this.getClassName()} onClick={this.onClick} onKeyDown={this.onKeyDown} tabIndex={-1}>
        <span className="row-expand-icon" style={{float: 'left', marginLeft: marginLeft, cursor: 'pointer'}} onClick={this.onRowExpandClick} >{this.props.isExpanded ? String.fromCharCode('9660') : String.fromCharCode('9658')}</span>
        <strong>{this.props.columnGroupName} : {this.props.name}</strong>
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
  idx: PropTypes.number.isRequired
};

export default RowGroup;
