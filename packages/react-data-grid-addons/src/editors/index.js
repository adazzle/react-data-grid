import { SimpleTextEditor, CheckboxEditor } from 'common/editors';

const Editors = {
  AutoComplete: require('./AutoCompleteEditor'),
  DropDownEditor: require('./DropDownEditor'),
  ContainerEditorWrapper: require('./ContainerEditorWrapper'),
  SimpleTextEditor,
  CheckboxEditor
};

module.exports = Editors;
