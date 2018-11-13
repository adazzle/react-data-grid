const React = require('react');
require('../../../../themes/react-data-grid-toolbar.css');
import PropTypes from 'prop-types';
import AddOrRemoveColumns from './AddorRemoveColumns';
import TotalNoOfRecords from './TotalNoOfRecords';

class Toolbar extends React.Component {
  constructor(props){
    super(props);
    this.state = {showColumns: false};
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
    if(this.node){
      if(this.node.contains(e.target)){
        return;
      }
    }
    this.setState({showColumns: false});
  };

  onAddRow = () => {
    if (this.props.onAddRow !== null && this.props.onAddRow instanceof Function) {
      this.props.onAddRow({newRowIndex: this.props.numberOfRows});
    }
  };

  renderAddRowButton = () => {
    if (this.props.onAddRow ) {
      return (<span><button type="button" className="btn" onClick={this.onAddRow}>
        {this.props.addRowButtonText}
      </button></span>);
    }
  };

  renderToggleFilterButton = () => {
    if (this.props.enableFilter) {
      return (<span><button type="button" className="btn" onClick={this.props.onToggleFilter}>
      {this.props.filterRowsButtonText}
    </button></span>);
    }
  };
  
  openOrCloseColumns = () =>{
    this.setState({showColumns: !this.state.showColumns});
 };

 onColumnUpdate = (value) =>{
   this.props.applySelectedColumns(value)
   this.setState({showColumns : false});
 };

 onCancel = () => {
   this.setState({showColumns : false});
 };

 getAllColumns = (revertToDefaults) => {
   return this.props.getAllColumns(revertToDefaults);
 };

 addOrRemoveColumns=()=>{
  if(this.props.enableAddOrRemoveColumns){
   return (<span class="pull-right" ref={node => this.node = node}>
             <button type="button" className="button button-secondary button-small" onClick={this.openOrCloseColumns}><span className="add-or-remove-columns-button"></span></button>
             <div>{this.state.showColumns ? <AddOrRemoveColumns onColumnUpdate={this.onColumnUpdate} getAllColumns={this.getAllColumns} onCancel={this.onCancel}/>: null}</div>
           </span>);
  } 
 };

 displayTotalNoOfRecords=()=>{
     return(<TotalNoOfRecords noOfRecords={this.props.totalRecords()} additionalText={this.props.additionalText}></TotalNoOfRecords>);
 };

  render() {
    return (
      <div className="react-grid-Toolbar">
        <div className="tools">
          {this.props.displayTotalNoOfRecords ? this.displayTotalNoOfRecords(): null}
          {this.renderAddRowButton()}
          {this.renderToggleFilterButton()}
          {this.addOrRemoveColumns()}
          {this.props.children}
        </div>
      </div>);
  }
}

module.exports = Toolbar;
