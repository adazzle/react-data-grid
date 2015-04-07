/* @flow */
/* Flow issues:
overrides? getDefaultValue, getStyle, onKeyDown
*/
/**
 * @jsx React.DOM
 */
'use strict';

var React                   = require('react');
var ReactSelect             = require('react-select');
var KeyboardHandlerMixin    = require('../../KeyboardHandlerMixin');
var ExcelColumn             = require('../grids/ExcelColumn');
var EditorBase              = require('./EditorBase');

var optionPropType = React.PropTypes.shape({
      name    :   React.PropTypes.required,
      value :   React.PropTypes.string
    });

class AutoCompleteEditor extends EditorBase{

  getValue(): any{
    var value, updated = {};
    if(this.hasResults() && this.isFocusedOnSuggestion()){
      value = this.getLabel(this.refs.autoComplete.state.focusedOption);
    }else{
      value = this.refs.autoComplete.state.inputValue;
    }
    updated[this.props.column.key] = value;
    return updated;
  }

  hasResults(): boolean{
    return this.refs.autoComplete.state.filteredOptions > 0;
  }

  render(): ?ReactElement {
    var label = this.props.label != null ? this.props.label : 'title';
    return (<div >
      <ReactSelect  search={this.props.search} ref="autoComplete" options={this.props.options} value={this.props.value} />
      </div>);
  }

  inheritContainerStyles(): boolean{
    return false;
  }

  isFocusedOnSuggestion(): boolean{
    var autoComplete = this.refs.autoComplete;
    return autoComplete.state.focusedOption != null;
  }

  getLabel(item: any): string {
    var label = this.props.label != null ? this.props.label : 'label';
    if (typeof label === "function") {
      return label(item);
    } else if (typeof label === "string") {
      return item[label];
    }
  }
};

AutoCompleteEditor.propTypes = {
    onCommit : React.PropTypes.func.isRequired,
    options : React.PropTypes.arrayOf(optionPropType).isRequired,
    label : React.PropTypes.string,
    value : React.PropTypes.any.isRequired,
    valueParams: React.PropTypes.arrayOf(React.PropTypes.string),
    column: React.PropTypes.shape(ExcelColumn).isRequired,
    resultIdentifier : React.PropTypes.string,
    search : React.PropTypes.string
};

AutoCompleteEditor.defaultProps = {
      resultIdentifier : 'id'
};

module.exports = AutoCompleteEditor;
