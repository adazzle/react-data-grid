const React                   = require('react');
const ReactDOM                = require('react-dom');
const Select                  = require('react-select');
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
    onFocus: React.PropTypes.func,
    editorDisplayValue: React.PropTypes.func
  },

  getInitialState() {
    return {
      selectedOption: this.getOptionForLabel(this.props.value)
    };
  },

  getDefaultProps(): {resultIdentifier: string} {
    return {
      resultIdentifier: 'id'
    };
  },

  handleChange(newOption) {
    this.setState({selectedOption: newOption}, () => this.props.onCommit());
  },

  getValue(): any {
    let value;
    let updated = {};
    if (this.hasResults()) {
      if (this.props.valueParams) {
        value = this.constuctValueFromParams(this.state.selectedOption, this.props.valueParams);
      } else {
        value = this.state.selectedOption[this.getLabelKey()];
      }
    }

    updated[this.props.column.key] = value;
    return updated;
  },

  getEditorValue() {
    let value;
    if (this.hasResults()) {
      let { column, editorDisplayValue } = this.props;
      if (editorDisplayValue && typeof editorDisplayValue === 'function') {
        let label = this.state.selectedOption[this.getLabelKey()];
        label = editorDisplayValue(column, label);
        value = this.getValueForLabel(label);
      }
      value = this.state.selectedOption[this.props.resultIdentifier];
    }
    return value;
  },

  getOptionForLabel(label) {
    let option;
    let labelOptions = this.props.options.filter(o => o[this.getLabelKey()] === label);
    if (labelOptions.length === 1) {
      option = labelOptions[0];
    }
    return option;
  },

  getValueForLabel(label) {
    let value;
    let labelOption = this.getOptionForLabel(label);
    if (labelOption != null) {
      value = labelOption[this.props.resultIdentifier];
    }
    return value;
  },

  getInputNode() {
    return ReactDOM.findDOMNode(this).getElementsByTagName('input')[0];
  },

  getLabelKey() {
    let labelKey = this.props.label != null ? this.props.label : 'title';
    return labelKey;
  },

  getLabel(item: any): string {
    let label = this.getLabelKey();
    if (typeof label === 'function') {
      return label(item);
    } else if (typeof label === 'string') {
      return item[label];
    }
  },

  hasResults(): boolean {
    return this.state.selectedOption != null;
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

  disableContainerStyles() {
    return true;
  },

  render(): ?ReactElement {
    return (<div height={this.props.height} onKeyDown={this.props.onKeyDown}>
      <Select
        name="auto-complete-editor"
        valueKey={this.props.resultIdentifier}
        labelKey={this.getLabelKey()}
        options={this.props.options}
        value={this.getEditorValue()}
        onChange={this.handleChange}
        onFocus={this.props.onFocus} />
      </div>);
  }
});

module.exports = AutoCompleteEditor;
