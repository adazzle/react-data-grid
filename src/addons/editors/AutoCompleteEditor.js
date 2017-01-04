const React                   = require('react');
const ReactDOM                = require('react-dom');
const Select                  = require('react-select');
const ExcelColumn             = require('../../PropTypeShapes/ExcelColumn');

/**
* Search options using specified search term treating options as an array
* of candidates.
*
* @param {Array.<Object>} options
* @param {String} searchTerm
* @param {Callback} cb
*/
function searchArray(options, searchTerm, cb) {
  let results = [];

  if (options) {
    let searchRegExp = new RegExp(searchTerm, 'i');
    for (let i = 0, len = options.length; i < len; i++) {
      if (searchRegExp.exec(options[i].title)) {
        results.push(options[i]);
      }
    }
  }

  cb(null, results);
}

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
    search: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    editorDisplayValue: React.PropTypes.func
  },

  getInitialState() {
    return {
      selectedLabel: this.props.value
    };
  },

  getDefaultProps(): {resultIdentifier: string} {
    return {
      resultIdentifier: 'id',
      search: searchArray,
      options: []
    };
  },

  handleChange(newOption) {
    const newLabel = newOption[this.getLabelKey()];
    this.setState({selectedLabel: newLabel}, () => this.props.onCommit());
  },

  getValue(): any {
    let value;
    let updated = {};
    if (this.hasSelectedLabel()) {
      if (this.props.valueParams) {
        const selectedOption = this.getOptionForLabel(this.state.selectedLabel);
        value = this.constuctValueFromParams(selectedOption, this.props.valueParams);
      } else {
        value = this.state.selectedLabel;
      }
    }

    updated[this.props.column.key] = value;
    return updated;
  },

  getEditorValue() {
    let value;
    if (this.hasSelectedLabel()) {
      let { column, editorDisplayValue } = this.props;
      let label = this.state.selectedLabel;
      if (editorDisplayValue && typeof editorDisplayValue === 'function') {
        label = editorDisplayValue(column, label);
      }
      value = this.getValueForLabel(label);
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
    return this.props.options.length > 0;
  },

  hasSelectedLabel() {
    return this.hasResults() && this.state.selectedLabel != null;
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

  getOptions(input, callback) {
    let trimmedInput = input != null ? input.trim() : input;
    this.props.search(
      this.props.options,
      trimmedInput,
      (err, results) => {
        callback(err, {options: results});
      }
    );
  },

  render(): ?ReactElement {
    let noResults = 'No results found';
    return (<div height={this.props.height}>
      <Select.Async
        name="auto-complete-editor"
        valueKey={this.props.resultIdentifier}
        labelKey={this.getLabelKey()}
        loadOptions={this.getOptions}
        cache={false}
        value={this.getEditorValue()}
        onChange={this.handleChange}
        onFocus={this.props.onFocus}
        noResultsText={noResults}
        searchPromptText={noResults}
        />
    </div>);
  }
});

module.exports = AutoCompleteEditor;
