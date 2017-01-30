// Used for displaying the value of a dropdown (using DropDownEditor) when not editing it.
// Accepts the same parameters as the DropDownEditor.
const React = require('react');

const DropDownFormatter = React.createClass({
  propTypes: {
    options: React.PropTypes.arrayOf(React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.objectOf({
        id: React.PropTypes.string,
        title: React.PropTypes.string,
        value: React.PropTypes.string,
        text: React.PropTypes.string
      })
    ])).isRequired,
    value: React.PropTypes.string.isRequired
  },

  shouldComponentUpdate(nextProps: any): boolean {
    return nextProps.value !== this.props.value;
  },

  render(): ?ReactElement {
    let value = this.props.value;
    let option = this.props.options.filter(function(v) {
      return v === value || v.value === value;
    })[0];
    if (!option) {
      option = value;
    }
    let title = option.title || option.value || option;
    let text = option.text || option.value || option;
    return <div title={title}>{text}</div>;
  }
});

module.exports = DropDownFormatter;
