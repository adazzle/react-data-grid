import React from 'react';
import ExcelColumn from '../../../../PropTypeShapes/ExcelColumn';

class NumericFilter extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.getRows = this.getRows.bind(this);
    this.getNumericValues = this.getNumericValues.bind(this);
    this.state = this.getRows();
  }

  componentDidMount() {
    this.attachTooltip();
  }

  componentDidUpdate() {
    this.attachTooltip();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getRows(nextProps));
  }

  attachTooltip() {
    if ($) {
      $('[data-toggle="tooltip"]').tooltip();
    } else if (jQuery) {
      jQuery('[data-toggle="tooltip"]').tooltip();
    }
  }

  filterValues(row, columnFilter, columnKey) {
    // implement default filter logic
    let value = parseInt(row[columnKey], 10);
    if (columnFilter.filterTerm.indexOf(value) === -1) {
      return false;
    }
    return true;
  }

  getRows(nextProps) {
    let props = nextProps || this.props;
    let minValue = Number.MIN_VALUE;
    let maxValue = Number.MAX_VALUE;
    let allRowsValues = this.props.getValidFilterValues(props.column.key);
    allRowsValues = allRowsValues.sort(function(a, b) { return a - b; });
    for (let i = 0; i < allRowsValues.length; i++) {
      let value = parseInt(allRowsValues[i], 10);
      if (minValue > value) {
        minValue = parseInt(value, 10);
      }
      if (maxValue < value) {
        maxValue = parseInt(value, 10);
      }
      allRowsValues[i] = value;
    }
    return { minValue, maxValue, allRowsValues };
  }

  getNumericValues(value) {
    let returnList = [];
    let greaterThenBegin = -1;
    let lessThenBegin = -1;
    let intersection = false;
    // check comma
    let list = value.split(',');
    if (list.length > 0) {
      // check first greater and less values
      for (let obj of list) {
        if (obj.indexOf('>') > -1) {
          greaterThenBegin = parseInt(obj.split('>')[1], 10);
        }
        if (obj.indexOf('<') > -1) {
          lessThenBegin = parseInt(obj.split('<')[1], 10);
        }
      }
      // check if we have an intersection
      if (greaterThenBegin > 0 && lessThenBegin > 0 && greaterThenBegin < lessThenBegin) {
        intersection = true;
      }
      // handle each value with comma
      for (let obj of list) {
        if (obj.indexOf('-') > 0) { // handle dash
          let begin = parseInt(obj.split('-')[0], 10);
          let end = parseInt(obj.split('-')[1], 10);
          for (let objValue of this.state.allRowsValues) {
            if (begin <= objValue && objValue <= end) {
              returnList.push(objValue);
            }
          }
        } else if (obj.indexOf('>') > -1) { // handle greater then
          let begin = parseInt(obj.split('>')[1], 10);
          let _maxValue = (greaterThenBegin > this.state.maxValue ? greaterThenBegin : this.state.maxValue);
          for (let objValue of this.state.allRowsValues) {
            if (begin <= objValue && objValue <= (intersection ? lessThenBegin : _maxValue)) {
              returnList.push(objValue);
            }
          }
        } else if (obj.indexOf('<') > -1) { // handle less then
          let end = parseInt(obj.split('<')[1], 10);
          let _minValue = (lessThenBegin < this.state.minValue ? lessThenBegin : this.state.minValue);
          for (let objValue of this.state.allRowsValues) {
            if ((intersection ? greaterThenBegin : _minValue) <= objValue && objValue <= end) {
              returnList.push(objValue);
            }
          }
        } else { // handle normal values
          returnList.push(parseInt(obj, 10));
        }
      }
    }

    // remove duplicates
    returnList = returnList.filter((val, index, array) => { return array.indexOf(val) === index; });
    // sort
    returnList = returnList.sort(function(a, b) { return a - b; });

    return returnList;
  }

  handleKeyPress(e) { // Validate the input
    let regex = '>|<|-|,|([0-9])';
    let result = RegExp(regex).test(e.key);
    if (result === false) {
      e.preventDefault();
    }
  }

  handleChange(e) {
    let value = e.target.value;
    let filters = this.getNumericValues(value);
    this.props.onChange({filterTerm: (filters.length > 0 ? filters : null), column: this.props.column, rawValue: value, filterValues: this.filterValues });
  }

  render() {
    let inputKey = 'header-filter-' + this.props.column.key;
    let columnStyle = {
      float: 'left',
      marginRight: 5,
      maxWidth: '80%'
    };
    let badgeStyle = {
      cursor: 'help'
    };

    let tooltipText = '<table><tbody><tr><td colspan="2"><strong>Input Methods:</strong></td></tr><tr><td><strong>- &nbsp;</strong></td><td style="text-align:left">Range</td></tr><tr><td><strong>> &nbsp;</strong></td><td style="text-align:left"> Greater Then</td></tr><tr><td><strong>< &nbsp;</strong></td><td style="text-align:left"> Less Then</td></tr></tbody>';

    return (
      <div>
        <div style={columnStyle}>
          <input key={inputKey} type="text" placeholder="e.g. 3,10-15,>20" className="form-control input-sm" onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
        </div>
        <div className="input-sm">
          <span className="badge" style={badgeStyle} data-toggle="tooltip" data-container="body" data-html="true" title={tooltipText}>?</span>
        </div>
      </div>
    );
  }
}

NumericFilter.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  column: React.PropTypes.shape(ExcelColumn),
  getValidFilterValues: React.PropTypes.func
};

module.exports = NumericFilter;
