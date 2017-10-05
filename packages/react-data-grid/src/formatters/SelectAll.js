const React = require('react');

const SelectAll = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func,
    selectAllCheckbox: React.PropTypes.element
  },

  render(): ?ReactElement {
    return (
      <div className="react-grid-checkbox-container checkbox-align">
      <input className="react-grid-checkbox" type="checkbox" name="select-all-checkbox" id="select-all-checkbox" ref={grid => selectAllCheckbox = grid} onChange={this.props.onChange} />
      <label htmlFor="select-all-checkbox" className="react-grid-checkbox-label"></label>
    </div>
  );
  }
});

module.exports = SelectAll;
