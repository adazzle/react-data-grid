import React from 'react';
import ExcelColumn from '../../../../PropTypeShapes/ExcelColumn';

class NumberFilterableHeaderCell extends React.Component {
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
    this.state = this.getRows();
  }

  attachTooltip() {
    if ($) {
      $('[data-toggle="tooltip"]').tooltip();
    }
  }

  getRows() {
    let originalRows = [];
    let minValue = Number.MAX_SAFE_INTEGER;
    let maxValue = Number.MIN_SAFE_INTEGER;
    let allValues = [];
    for (let i = 0; i < this.props.rowsCount; i++) {
      originalRows[i] = this.props.rowGetter(i);
      if (!isNaN(this.props.rowGetter(i)[this.props.column.key]) && minValue > this.props.rowGetter(i)[this.props.column.key]) {
        minValue = parseInt(this.props.rowGetter(i)[this.props.column.key], 10);
      }
      if (!isNaN(this.props.rowGetter(i)[this.props.column.key]) && maxValue < this.props.rowGetter(i)[this.props.column.key]) {
        maxValue = parseInt(this.props.rowGetter(i)[this.props.column.key], 10);
      }
      if (!isNaN(this.props.rowGetter(i)[this.props.column.key])) {
        allValues.push(parseInt(this.props.rowGetter(i)[this.props.column.key], 10));
      }
    }
    allValues = allValues.sort(function(a, b) { return a - b; });

    return { originalRows, minValue, maxValue, allValues };
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
          for (let objValue of this.state.allValues) {
            if (begin <= objValue && objValue <= end) {
              returnList.push(objValue);
            }
          }
        } else if (obj.indexOf('>') > -1) { // handle greater then
          let begin = parseInt(obj.split('>')[1], 10);
          let _maxValue = (greaterThenBegin > this.state.maxValue ? greaterThenBegin : this.state.maxValue);
          for (let objValue of this.state.allValues) {
            if (begin <= objValue && objValue <= (intersection ? lessThenBegin : _maxValue)) {
              returnList.push(objValue);
            }
          }
        } else if (obj.indexOf('<') > -1) { // handle less then
          let end = parseInt(obj.split('<')[1], 10);
          let _minValue = (lessThenBegin < this.state.minValue ? lessThenBegin : this.state.minValue);
          for (let objValue of this.state.allValues) {
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
    this.setState({filters});
    this.props.onChange({filterTerm: filters, column: this.props.column, rawValue: value});
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

NumberFilterableHeaderCell.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  column: React.PropTypes.shape(ExcelColumn),
  rowGetter: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.func]).isRequired,
  rowsCount: React.PropTypes.number.isRequired
};

module.exports = NumberFilterableHeaderCell;
