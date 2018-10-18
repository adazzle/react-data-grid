
const React          = require('react');
const moment         = require('moment');
import PropTypes from 'prop-types';

class DateRangeFormatter extends React.Component {
  static propTypes = {
    value: PropTypes.shape({
      startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    }).isRequired,
    inputFormat: PropTypes.string,
    displayFormat: PropTypes.string
  };

  static defaultProps = {
    inputFormat: 'YYYY-MM-DD',
    displayFormat: 'YYYY-MM-DD',
    value: {startDate: null, endDate: null}
  };

  formatDate = (date) => {
    if (moment.isMoment(date)) {
      return moment(date).format(this.props.displayFormat);
    }

    return moment(date, this.props.inputFormat).format(this.props.displayFormat);
  };

  render() {
    let startDate = this.props.value.startDate;
    let endDate = this.props.value.endDate;
    return (<span>{startDate} to {endDate}</span>);
  }
}

module.exports = DateRangeFormatter;
