import React from 'react';
import _ from 'underscore'
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import './AddOrRemoveColumnsStyles.css';

class AddOrRemoveColumns extends React.Component {
  constructor(props) {
    super(props);
    this.getColumnsForList = this.getColumnsForList.bind(this);
    this.applySelectedColumns = this.applySelectedColumns.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createCheckbox = this.createCheckbox.bind(this);
    this.createCheckboxes = this.createCheckboxes.bind(this);
    this.setSelectedItems = this.setSelectedItems.bind(this);
    this.cancelDialog = this.cancelDialog.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.unSelectAll = this.unSelectAll.bind(this)
    this.revertToDefaults = this.revertToDefaults.bind(this);;
    this.state = { selectedColumns: [], allColumns: this.getColumnsForList(false, false, true), selectAllColumns: false, deselectAllColumns: false, displayErrorMessage: false };
  }

  setSelectedItems(value) {
    var selectedValues = this.state.selectedColumns;
    this.setState({ selectedColumns: [] });
    selectedValues.push(value);
    this.setState({ selectedColumns: selectedValues });
  }

  selectAll() {
    this.setState({ deselectAllColumns: false });
    this.setState({ selectAllColumns: true });
    this.setState({selectedColumns: []});
    let selectedColumns = [];
    let allColumns = this.state.allColumns;
    _.map(allColumns, function (col) {
      var currentCol = col;
      currentCol.isSelected = true;
      selectedColumns.push(currentCol);
    });
    if(this.state.displayErrorMessage)
        this.setState({displayErrorMessage: selectedColumns.length === 0});
    this.setState({ selectedColumns });
  }

  unSelectAll() {
    this.setState({ selectAllColumns: false });
    this.setState({ deselectAllColumns: true });
    this.setState({selectedColumns: []});
    let selectedColumns = [];
    let allColumns = this.state.allColumns;
    _.map(allColumns, function (col) {
      var currentCol = col;
      currentCol.isSelected = false;
    });
    this.setState({ selectedColumns: [] });
  }

  revertToDefaults() {
    this.setState({ deselectAllColumns: false });
    this.setState({ selectAllColumns: false });
    var allColumns = this.getColumnsForList(false, false, false, true)
    var parentScope = this;
    this.setState({allColumns});
    var selectedColumns = [];
    this.setState({selectedColumns});
    selectedColumns = _.filter(allColumns, function(col){
      return col.isSelected
    });
    if(this.state.displayErrorMessage)
        this.setState({displayErrorMessage: selectedColumns.length === 0});
    this.setState({selectedColumns});
  }

  handleChange(value) {
    this.setState({ deselectAllColumns: false });
    this.setState({ selectAllColumns: false });
    let selectedValues = this.state.selectedColumns;
    let allColumns = this.state.allColumns;
    this.setState({ selectedColumns: [] });
    _.map(allColumns, function (col) {
      if (col.key === value.key) {
        col.isSelected = value.isSelected;
      }
    });
    selectedValues = _.filter(allColumns, function (col) {
      return col.isSelected === true;
    });
    if(this.state.displayErrorMessage)
        this.setState({displayErrorMessage: selectedValues.length === 0});
    this.setState({ allColumns });
    this.setState({ selectedColumns: selectedValues });
  }

  getColumnsForList(selectAll, deselectAll, firstCall, revertToDefaults) {
    let columns = firstCall || revertToDefaults ? this.props.getAllColumns(revertToDefaults) : this.state.allColumns;
    let allColumns = [];
    if (selectAll) {
      _.map(columns, function (col) {
        col.isSelected = true;
        allColumns.push(col);
      });
    } else {
      if (deselectAll) {
        _.map(columns, function (col) {
          col.isSelected = false;
          allColumns.push(col);
        });
      }
    }
    return allColumns.length > 0 ? allColumns : columns;
  }

  applySelectedColumns() {
    var isEmptySelection = this.state.selectedColumns.length === 0;
    this.setState({displayErrorMessage : isEmptySelection});
    if(!isEmptySelection)
        this.props.onColumnUpdate(this.state.selectedColumns);
  }

  cancelDialog(){
    this.props.onCancel();
  }

  createCheckbox = (colObj) => (
    <Checkbox
      optionObj={colObj}
      handleCheckboxChange={this.handleChange}
      setSelectedItems={this.setSelectedItems}
    />
  )

  createCheckboxes = (selectAll, deselectAll) => (
    this.getColumnsForList(selectAll, deselectAll).map(this.createCheckbox)
  )

  render() {
    return (
      <div className="columnStyles">
        <div >
          <div className="row content">
            <div className="innerContent">
              <form>
                <div className="content">
                  <label>Show/Hide Columns</label>
                  <div>
                    <span className="ico-family green ico-check"></span><a onClick={this.selectAll} className="pdng-lt-5 green-underline">Select All</a>
                    <span className="pdng-lt-10 green ico-family ico-uncheck"></span><a onClick={this.unSelectAll} className="pdng-lt-5 green-underline">Unselect All</a>
                    {/* <span className="pdng-lt-10 green ico-family ico-reset"></span><a onClick={this.revertToDefaults} className="pdng-lt-5 green-underline">Reset To Default</a> */}
                  </div>
                  <div>{this.state.displayErrorMessage ? <span><span className="ico-family ico-error-icon"></span><span className="error-text pdng-lt-5">Please select at least one column.</span></span> : <span></span>}</div>
                  <div className="columnsList">
                    {this.createCheckboxes(this.state.selectAllColumns, this.state.deselectAllColumns)}
                  </div>
                  <div className="footerButtons">
                    <button type="button" className="button button-primary" onClick={this.applySelectedColumns}>Update</button>
                    <button type="button" className="button button-secondary" onClick={this.cancelDialog}>Cancel</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AddOrRemoveColumns.propTypes = {
  onColumnUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  getAllColumns: PropTypes.func.isRequired,
  children: PropTypes.element
};
export default AddOrRemoveColumns;