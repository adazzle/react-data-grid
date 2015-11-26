/* @flow */
/**
 * @jsx React.DOM
 */
'use strict';

var React                   = require('react');

var CheckboxEditor = React.createClass({

  PropTypes : {
    value : React.PropTypes.bool.isRequired,
    rowIdx : React.PropTypes.number.isRequired,
    column: React.PropTypes.shape({
      key: React.PropTypes.string.isRequired,
      onCellChange: React.PropTypes.func.isRequired
    }).isRequired
  },

  render(): ? ReactElement {
    var checked = this.props.value != null ? this.props.value : false;
    var checkboxName = 'checkbox' + this.props.rowIdx;
    return (
      <div className="react-grid-checkbox-container" onClick={this.handleChange}>
          <input className="react-grid-checkbox" type="checkbox" name={checkboxName} checked={checked} />
          <label for={checkboxName} className="react-grid-checkbox-label"></label>
      </div>);
  },

  handleChange(e: Event){
    this.props.column.onCellChange(this.props.rowIdx, this.props.column.key, e);
  }
});

module.exports = CheckboxEditor;
