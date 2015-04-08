/* @flow */
var Editors = {
  AutoComplete     : require('./AutoCompleteEditor'),
  DropDownEditor   : require('./DropDownEditor'),
  SimpleTextEditor : require('./SimpleTextEditor'),
  AutoCompleteAsync: require('./AutoCompleteAsyncEditor'),
  DateRangeEditor  : require('./DateRangeEditor')
}

module.exports = Editors;
