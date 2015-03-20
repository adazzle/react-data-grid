/* @flow */
var Editors = {
  AutoComplete     : require('./AutoCompleteEditor'),
  DropDownEditor   : require('./DropDownEditor'),
  SimpleTextEditor : require('./SimpleTextEditor'),
  AutoCompleteAsync: require('./AutoCompleteAsyncEditor')
}

module.exports = Editors;
