import React from 'react';
import PropTypes from 'prop-types';

class SimpleCellFormatter extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.bool])
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.value !== this.props.value;
  }

  render() {
    return <div title={this.props.value}>{this.props.value}</div>;
  }
}

export default SimpleCellFormatter;
