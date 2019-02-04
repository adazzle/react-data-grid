import { SimpleTextEditor, CheckboxEditor } from 'common/editors';
import ContainerEditorWrapper from './ContainerEditorWrapper';

const Editors = {
  AutoComplete: require('./AutoCompleteEditor'),
  DropDownEditor: require('./DropDownEditor'),
  ContainerEditorWrapper,
  SimpleTextEditor,
  CheckboxEditor
};

module.exports = Editors;
