const React                   = require('react');
const ReactDOM                = require('react-dom');
const ReactAutocomplete       = require('ron-react-autocomplete');
const ExcelColumn             = require('../../PropTypeShapes/ExcelColumn');

let optionPropType = React.PropTypes.shape({
  id: React.PropTypes.required,
  title: React.PropTypes.string
});

const AutoCompleteEditor = React.createClass({

  propTypes: {
    onCommit: React.PropTypes.func,
    options: React.PropTypes.arrayOf(optionPropType),
    label: React.PropTypes.any,
    value: React.PropTypes.any,
    height: React.PropTypes.number,
    valueParams: React.PropTypes.arrayOf(React.PropTypes.string),
    column: React.PropTypes.shape(ExcelColumn),
    resultIdentifier: React.PropTypes.string,
    search: React.PropTypes.string,
    onKeyDown: React.PropTypes.func,
    onFocus: React.PropTypes.func
  },

  getDefaultProps(): {resultIdentifier: string} {
    return {
      resultIdentifier: 'id'
    };
  },

  handleChange() {
    this.props.onCommit();
  },

  getValue(): any {
    let value;
    let updated = {};
    if (this.hasResults() && this.isFocusedOnSuggestion()) {
      value = this.getLabel(this.refs.autoComplete.state.focusedValue);
      if (this.props.valueParams) {
        value = this.constuctValueFromParams(this.refs.autoComplete.state.focusedValue, this.props.valueParams);
      }
    } else {
      value = this.refs.autoComplete.state.searchTerm;
    }

    updated[this.props.column.key] = value;
    return updated;
  },

  getInputNode() {
    return ReactDOM.findDOMNode(this).getElementsByTagName('input')[0];
  },

  getLabel(item: any): string {
    let label = this.props.label != null ? this.props.label : 'title';
    if (typeof label === 'function') {
      return label(item);
    } else if (typeof label === 'string') {
      return item[label];
    }
  },

  hasResults(): boolean {
    return this.refs.autoComplete.state.results.length > 0;
  },

  isFocusedOnSuggestion(): boolean {
    let autoComplete = this.refs.autoComplete;
    return autoComplete.state.focusedValue != null;
  },

  constuctValueFromParams(obj: any, props: ?Array<string>): string {
    if (!props) {
      return '';
    }

    let ret = [];
    for (let i = 0, ii = props.length; i < ii; i++) {
      ret.push(obj[props[i]]);
    }
    return ret.join('|');
  },

  render(): ?ReactElement {
    let label = this.props.label != null ? this.props.label : 'title';
    return (<div height={this.props.height} onKeyDown={this.props.onKeyDown}>
      <ReactAutocomplete search={this.props.search} ref="autoComplete" label={label} onChange={this.handleChange} onFocus={this.props.onFocus} resultIdentifier={this.props.resultIdentifier} options={this.props.options} value={{title: this.props.value}} />
      </div>);
  }
});

module.exports = AutoCompleteEditor;
