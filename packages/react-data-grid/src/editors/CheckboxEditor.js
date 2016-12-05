const React = require('react');
require('../../../../themes/react-data-grid-checkbox.css');

const CheckboxEditor = React.createClass({

  propTypes: {
    value: React.PropTypes.bool,
    rowIdx: React.PropTypes.number,
    column: React.PropTypes.shape({
      key: React.PropTypes.string,
      onCellChange: React.PropTypes.func
    }),
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
