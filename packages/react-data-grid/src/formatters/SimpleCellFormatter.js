const React = require('react');
const PropTypes = require('prop-types');

const SimpleCellFormatter = React.createClass({
  propTypes: {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.bool]).isRequired
  },

  shouldComponentUpdate(nextProps: any): boolean {
    return nextProps.value !== this.props.value;
  },

  render(): ?ReactElement {
    return <div title={this.props.value}>{this.props.value}</div>;
  }
});

module.exports = SimpleCellFormatter;
