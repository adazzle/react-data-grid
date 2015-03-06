/* @flow */
/* Flow issues:
overrides? getDefaultValue, getStyle, onKeyDown
*/
/**
 * @jsx React.DOM
 */
'use strict';

var React                   = require('react/addons');
var cx                      = React.addons.classSet;
var ReactAutocomplete       = require('ron-react-autocomplete');
var KeyboardHandlerMixin    = require('../../KeyboardHandlerMixin');
var ExcelColumn             = require('../grids/ExcelColumn');

var optionPropType = React.PropTypes.shape({
      id    :   React.PropTypes.required,
      title :   React.PropTypes.string
    });

var AutoCompleteEditor = React.createClass({

  propTypes : {
    onCommit : React.PropTypes.func.isRequired,
    options : React.PropTypes.arrayOf(optionPropType).isRequired,
    label : React.PropTypes.string,
    value : React.PropTypes.any.isRequired,
    valueParams: React.PropTypes.arrayOf(React.PropTypes.string),
    column: React.PropTypes.shape(ExcelColumn).isRequired,
    resultIdentifier : React.PropTypes.string,
    search : React.PropTypes.string
  },

  getDefaultProps(): {resultIdentifier: string}{
    return {
      resultIdentifier : 'id'
    }
  },

  getValue(): any{
    var value, updated = {};
    if(this.hasResults() && this.isFocusedOnSuggestion()){
      value = this.getLabel(this.refs.autoComplete.state.focusedValue);
      if(this.props.valueParams){
        value = this.constuctValueFromParams(this.refs.autoComplete.state.focusedValue, this.props.valueParams);
      }
    }else{
      value = this.refs.autoComplete.state.searchTerm;
    }
    updated[this.props.column.key] = value;
    return updated;
  },

  getInputNode(): HTMLInputElement{
    return this.getDOMNode().getElementsByTagName("input")[0];
  },

  render(): ?ReactElement {
    var label = this.props.label != null ? this.props.label : 'title';
    return (<div height={this.props.height} onKeyDown={this.props.onKeyDown}>
      <ReactAutocomplete  search={this.props.search} ref="autoComplete" label={label} resultIdentifier={this.props.resultIdentifier} options={this.props.options} value={{title : this.props.value}} />
      </div>);
  },

  hasResults(): boolean{
    return this.refs.autoComplete.state.results.length > 0;
  },

  isFocusedOnSuggestion(): boolean{
    var autoComplete = this.refs.autoComplete;
    return autoComplete.state.focusedValue != null;
  },

  getLabel(item: any): string {
    var label = this.props.label != null ? this.props.label : 'title';
    if (typeof label === "function") {
      return label(item);
    } else if (typeof label === "string") {
      return item[label];
    }
  },

  constuctValueFromParams(obj: any, props: ?Array<string>): string {
    if(!props){
      return '';
    }
    var ret = [];
    for (var i = 0, ii = props.length; i < ii; i++) {
      ret.push(obj[props[i]]);
    }
    return ret.join('|');
  }
});

module.exports = AutoCompleteEditor;
