const React = require('react');
import PropTypes from 'prop-types';
const Moment = require('moment');
const DateRangeFilter = require('./widgets/DateRangeFilter');

class DateRangeEditor extends React.Component {
  static displayName = 'DateRangeEditor';

  static propTypes = {
    format: PropTypes.string,
    ranges: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.shape({
      startDate: PropTypes.Date.isRequired,
      endDate: PropTypes.Date.isRequired
    }).isRequired
  };

  static defaultProps = {
    format: 'YYYY-MM-DD',
    ranges: []
  };

  rangeSeparatorChar = ' - ';

  isDateValid = (date) => {
    return new Moment(date, this.props.format, true).isValid();
  };

  validate = (value) => {
    return this.isDateValid(value.startDate)
    && this.isDateValid(value.endDate)
    && (new Moment(value.startDate, this.props.format).isBefore(value.endDate)
    || new Moment(value.startDate, this.props.format).isSame(value.endDate));
  };

  handleDateFilterApply = (startDate, endDate) => {
    this.commit({value: {startDate: startDate, endDate: endDate}});
  };

  render() {
    return (
      <div style={this.getStyle()} onKeyDown={this.onKeyDown}>
  <DateRangeFilter ref={(node) => this.datepicker = node} onApply={this.handleDateFilterApply}  format={this.props.format} ranges={this.props.ranges} startDate={this.props.value.startDate} endDate={this.props.value.endDate} />
      </div>
    );
  }
}

module.exports = DateRangeEditor;
