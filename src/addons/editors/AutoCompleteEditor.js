/* @flow */
/* Flow issues:
overrides? getDefaultValue, getStyle, onKeyDown
*/

import React from 'react';
import ReactSelect from 'react-select';
import EditorBase from './EditorBase';

let optionPropType = React.PropTypes.shape({
      name    :   React.PropTypes.required,
      value :   React.PropTypes.string
    });

class AutoCompleteEditor extends EditorBase {

  getValue(): any {
    var value, updated = {};
    if(this.hasResults() && this.isFocusedOnSuggestion()){
      value = this.select.state.focusedOption.value;
    }else{
      value = this.select.state.inputValue;
    }
    updated[this.props.column.key] = value;
    return updated;
  }

  hasResults(): boolean{
    return this.select.state.isOpen && this.select.state.filteredOptions.length > 0;
  }

  render(): ?ReactElement {
    var selectRef = (c) => this.select = c;
    return (
      <div height={this.props.height} onKeyDown={this.props.onKeyDown}>
        <ReactSelect ref={selectRef} options={this.props.options} value={this.props.value} />
      </div>);
  }

  isFocusedOnSuggestion(): boolean{
    return this.select.state.focusedOption != null;
  }

}

AutoCompleteEditor.propTypes = {
    onCommit : React.PropTypes.func.isRequired,
    options : React.PropTypes.arrayOf(optionPropType).isRequired,
    label : React.PropTypes.string,
    value : React.PropTypes.any.isRequired,
    valueParams: React.PropTypes.arrayOf(React.PropTypes.string),
    column: React.PropTypes.object.isRequired,
    resultIdentifier : React.PropTypes.string,
    search : React.PropTypes.string
};

AutoCompleteEditor.defaultProps = {
      resultIdentifier : 'id'
};

module.exports = AutoCompleteEditor;
