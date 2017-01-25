const React = require('react');

const SimpleCellFormatter = React.createClass({
  propTypes: {
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.object, React.PropTypes.bool]).isRequired
  },

  shouldComponentUpdate(nextProps: any): boolean {
    return nextProps.value !== this.props.value;
  },

  render(): ?ReactElement {
    return <div title={this.props.value}>{this.props.value}</div>;
  }
});

module.exports = SimpleCellFormatter;
