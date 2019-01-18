const React = require('react');
require('../../../../themes/react-data-grid-toolbar.css');
import PropTypes from 'prop-types';
import AddOrRemoveColumns from './AddorRemoveColumns';
import TotalNoOfRecords from './TotalNoOfRecords';

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showColumns: false };
  }

  static propTypes = {
    onAddRow: PropTypes.func,
    onToggleFilter: PropTypes.func,
    applySelectedColumns: PropTypes.func,
    getAllColumns: PropTypes.func,
    enableFilter: PropTypes.bool,
    numberOfRows: PropTypes.number,
    addRowButtonText: PropTypes.string,
    filterRowsButtonText: PropTypes.string,
    children: PropTypes.any
  };

  static defaultProps = {
    enableAddRow: true,
    addRowButtonText: 'Add Row',
    filterRowsButtonText: 'Filter Rows'
  };

  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleClick, false);
  };

  componentWillMount = () => {
    document.removeEventListener('mousedown', this.handleClick, false);
  };

  handleClick = (e) => {
    if (this.node && e) {
      if (this.node.contains(e.target)) {
        return;
      }
    }
    this.setState({ showColumns: false });
  };

  onAddRow = () => {
    if (this.props.onAddRow !== null && this.props.onAddRow instanceof Function) {
      this.props.onAddRow({ newRowIndex: this.props.numberOfRows });
    }
  };

  displayTotalNoOfRecords = () => {
    return (<TotalNoOfRecords noOfRecords={this.props.totalRecords()} additionalText={this.props.additionalText}></TotalNoOfRecords>);
  };

  addOrRemoveColumns = () => {
    if (this.props.enableAddOrRemoveColumns) {
      return (<span className="pull-right" ref={node => this.node = node}>
        {this.props.enableResetToDefaultColumns ? <span className="mrgn-rt-10 resetToDefaults"><a onClick={this.getDefaultColumns}><span className="green ico-family ico-reset pdng-rt-5"></span><span className="green-underline">Reset To Default</span></a></span> : ''}
        <button type="button" className="button button-secondary button-small" onClick={this.openOrCloseColumns}><span className="add-or-remove-columns-button"></span></button>
        <div>{this.state.showColumns ? <AddOrRemoveColumns onColumnUpdate={this.onColumnUpdate} getAllColumns={this.getAllColumns} onCancel={this.onCancel} /> : null}</div>
      </span>);
    }
    return null;
  };

  getAllColumns = () => {
    return this.props.getAllColumns();
  };

  getDefaultColumns = () => {
    this.props.getDefaultColumns();
  };

  onCancel = () => {
    this.setState({ showColumns: false });
  };

  openOrCloseColumns = () => {
    this.setState({ showColumns: !this.state.showColumns });
  };

  onColumnUpdate = (value) => {
    this.props.applySelectedColumns(value);
    this.setState({ showColumns: false });
  };

  renderToggleFilterButton = () => {
    if (this.props.enableFilter) {
      return (<span><button type="button" className="btn" onClick={this.props.onToggleFilter}>
        {this.props.filterRowsButtonText}
      </button></span>);
    }
  };

  renderAddRowButton = () => {
    if (this.props.onAddRow) {
      return (<span><button type="button" className="btn" onClick={this.onAddRow}>
        {this.props.addRowButtonText}
      </button></span>);
    }
  };

  render() {
    return (
      <div className="react-grid-Toolbar">
        <div className="tools">
          {this.props.displayTotalNoOfRecords ? this.displayTotalNoOfRecords() : null}
          {this.renderAddRowButton()}
          {this.renderToggleFilterButton()}
          {this.addOrRemoveColumns()}
          {this.props.children}
        </div>
      </div>);
  }
}

module.exports = Toolbar;
