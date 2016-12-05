import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import '../../../themes/react-data-grid-row.css';

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
    let style = {
      height: '50px',
      overflow: 'hidden',
      border: '1px solid #dddddd',
      paddingTop: '15px',
      paddingLeft: '5px'
    };
    let rowGroupRendererProps = Object.assign({ onRowExpandClick: this.onRowExpandClick }, this.props);

    return (
      <div style={style} className={this.getClassName()} onClick={this.onClick} onKeyDown={this.onKeyDown} tabIndex={-1}>
        <this.props.renderer {...rowGroupRendererProps} />
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
  renderer: PropTypes.func
};

const DefaultRowGroupRenderer = (props) => {
  let treeDepth = props.treeDepth || 0;
  let marginLeft = treeDepth * 20;

  return (
    <div>
      <span className="row-expand-icon" style={{float: 'left', marginLeft: marginLeft, cursor: 'pointer'}} onClick={props.onRowExpandClick} >{props.isExpanded ? String.fromCharCode('9660') : String.fromCharCode('9658')}</span>
      <strong>{props.columnGroupName} : {props.name}</strong>
    </div>);
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
