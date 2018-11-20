// Used for displaying the value of a dropdown (using DropDownEditor) when not editing it.
// Accepts the same parameters as the DropDownEditor.
const React = require('react');
import PropTypes from 'prop-types';

class DropDownFormatter extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          id: PropTypes.string,
          title: PropTypes.string,
          value: PropTypes.string,
          text: PropTypes.string
        })
      ])).isRequired,
    value: PropTypes.string.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.value !== this.props.value;
  }

  render() {
    const value = this.props.value;
    let option = this.props.options.filter(function(v) {
      return v === value || v.value === value;
    })[0];
    if (!option) {
      option = value;
    }
    const title = option.title || option.value || option;
    const text = option.text || option.value || option;
    return <div title={title}>{text}</div>;
  }
}

module.exports = DropDownFormatter;
