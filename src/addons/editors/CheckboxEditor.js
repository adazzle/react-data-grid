const React = require('react');

const CheckboxEditor = React.createClass({

  propTypes: {
    value: React.PropTypes.bool.isRequired,
    rowIdx: React.PropTypes.number.isRequired,
    column: React.PropTypes.shape({
      key: React.PropTypes.string.isRequired,
      onCellChange: React.PropTypes.func.isRequired
    }).isRequired
  },

  handleChange(e: Event) {
    this.props.column.onCellChange(this.props.rowIdx, this.props.column.key, e);
  },

  render(): ? ReactElement {
    let checked = this.props.value != null ? this.props.value : false;
    return (<input className="react-grid-CheckBox" type="checkbox" checked={checked} onClick={this.handleChange} onChange={this.handleChange} />);
  }
});

module.exports = CheckboxEditor;
