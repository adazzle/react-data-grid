const { editors: { SimpleTextEditor, CheckboxEditor } } = require('react-data-grid');

const Editors = {
  AutoComplete: require('./AutoCompleteEditor'),
  DropDownEditor: require('./DropDownEditor'),
  ContainerEditorWrapper: require('./ContainerEditorWrapper'),
  DateRangeEditor: require('./DateRangeEditor'),
  SimpleTextEditor,
  CheckboxEditor
};

module.exports = Editors;
