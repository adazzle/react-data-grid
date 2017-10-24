const React = require('react');
import PropTypes from 'prop-types';
const createReactClass = require('create-react-class');
const ReactDOM = require('react-dom');
const Moment = require('moment');
const DateRangeFilter = require('./widgets/DateRangeFilter');
type DateRangeValue = { startDate: Date; endDate: Date};

const DateRangeEditor = createReactClass({
  displayName: 'DateRangeEditor',

  propTypes: {
    format: PropTypes.string,
    ranges: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.shape({
      startDate: PropTypes.Date.isRequired,
      endDate: PropTypes.Date.isRequired
    }).isRequired
  },

  getDefaultProps(): {format: string; ranges: Array<Date>} {
    return {
      format: 'YYYY-MM-DD',
      ranges: []
    };
  },

  rangeSeparatorChar: ' - ',

  overrides: {
    checkFocus: function() {
      this.setTextInputFocus();
    },
    getInputNode(): HTMLElement {
      return ReactDOM.findDOMNode(this.refs.datepicker);
    },
    getValue(): DateRangeValue {
      let dateToParse = this.getInputNode().value;
      let dateRanges = dateToParse.split(this.rangeSeparatorChar);
      if (dateRanges.length !== 2) {
        throw new Error('DateRangeEditor.getValue error : ' + dateToParse + ' is not in the correct format');
      }

      return {startDate: dateRanges[0].trim(), endDate: dateRanges[1].trim()};
    }
  },

  isDateValid(date: Date): boolean {
    return new Moment(date, this.props.format, true).isValid();
  },

  validate(value: DateRangeValue): boolean {
    return this.isDateValid(value.startDate)
    && this.isDateValid(value.endDate)
    && (new Moment(value.startDate, this.props.format).isBefore(value.endDate)
    || new Moment(value.startDate, this.props.format).isSame(value.endDate));
  },

  handleDateFilterApply(startDate: string, endDate: string) {
    this.commit({value: {startDate: startDate, endDate: endDate}});
  },

  render(): ?ReactElement {
    return (
      <div style={this.getStyle()} onKeyDown={this.onKeyDown}>
  <DateRangeFilter ref={(node) => this.datepicker = node} onApply={this.handleDateFilterApply}  format={this.props.format} ranges={this.props.ranges} startDate={this.props.value.startDate} endDate={this.props.value.endDate} />
      </div>
    );
  }
});

module.exports = DateRangeEditor;
