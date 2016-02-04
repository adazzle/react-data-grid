const React = require('react');

const CheckboxEditor = React.createClass({

  propTypes: {
    value: React.PropTypes.bool.isRequired,
    rowIdx: React.PropTypes.number.isRequired,
    column: React.PropTypes.shape({
      key: React.PropTypes.string.isRequired,
      onCellChange: React.PropTypes.func.isRequired
    }).isRequired,
    dependentValues: React.PropTypes.object
  },

  handleChange(e: Event) {
    this.props.column.onCellChange(this.props.rowIdx, this.props.column.key, this.props.dependentValues, e);
  },

  render(): ? ReactElement {
    let checked = this.props.value != null ? this.props.value : false;
    let checkboxName = 'checkbox' + this.props.rowIdx;
    return (
      <div className="react-grid-checkbox-container" onClick={this.handleChange}>
          <input className="react-grid-checkbox" type="checkbox" name={checkboxName} checked={checked} />
          <label htmlFor={checkboxName} className="react-grid-checkbox-label"></label>
      </div>);
  }
});

module.exports = CheckboxEditor;
