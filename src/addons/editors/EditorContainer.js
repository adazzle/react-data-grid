/* @flow */
/**
* @jsx React.DOM


*/
'use strict';

var React                   = require('react');
var joinClasses              = require('classnames');
var keyboardHandlerMixin    = require('../../KeyboardHandlerMixin');
var SimpleTextEditor        = require('./SimpleTextEditor');
var isFunction              = require('../utils/isFunction');
var cloneWithProps          = require('react/lib/cloneWithProps');


var EditorContainer = React.createClass({

  mixins : [keyboardHandlerMixin],

  propTypes : {
    rowData :React.PropTypes.object.isRequired,
    value: React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number, React.PropTypes.object, React.PropTypes.bool]).isRequired,
    cellMetaData: React.PropTypes.shape({
      selected: React.PropTypes.object.isRequired,
      copied: React.PropTypes.object,
      dragged: React.PropTypes.object,
      onCellClick: React.PropTypes.func,
      onCellDoubleClick: React.PropTypes.func
    }).isRequired,
    column : React.PropTypes.object.isRequired,
    height : React.PropTypes.number.isRequired
  },

  changeCommitted: false,

  getInitialState(){
    return {isInvalid : false}
  },

  componentDidMount: function() {
    var inputNode = this.getInputNode();
    if(inputNode !== undefined){
      this.setTextInputFocus();
      if(!this.getEditor().disableContainerStyles){
        inputNode.className += ' editor-main';
        inputNode.style.height = this.props.height - 1 + 'px';
      }
    }
  },

  createEditor(): ReactElement{
    var editorProps = {
		ref: 'editor',
    name: 'editor',
		column : this.props.column,
		value : this.getInitialValue(),
		onCommit : this.commit,
		rowMetaData : this.getRowMetaData(),
		height : this.props.height,
    onBlur : this.commit,
    onOverrideKeyDown : this.onKeyDown
	};
    var customEditor = this.props.column.editor;
    if(customEditor && React.isValidElement(customEditor)){
      //return custom column editor or SimpleEditor if none specified
      return React.addons.cloneWithProps(customEditor, editorProps)
    }else{
      return <SimpleTextEditor ref={'editor'} column={this.props.column} value={this.getInitialValue()} rowMetaData={this.getRowMetaData()} />;
    }
  },

  getRowMetaData(): ?any {
    //clone row data so editor cannot actually change this
    var columnName = this.props.column.ItemId;
    //convention based method to get corresponding Id or Name of any Name or Id property
    if(typeof this.props.column.getRowMetaData === 'function'){
      return this.props.column.getRowMetaData(this.props.rowData, this.props.column);
    }
  },

  onPressEnter(e: SyntheticKeyboardEvent){
    this.commit({key : 'Enter'});
  },

  onPressTab(e: SyntheticKeyboardEvent){
    this.commit({key : 'Tab'});
  },

  onPressEscape(e: SyntheticKeyboardEvent){
    if(!this.editorIsSelectOpen()){
      this.props.cellMetaData.onCommitCancel();
    } else {
      // prevent event from bubbling if editor has results to select
      e.stopPropagation();
    }
  },

  onPressArrowDown(e: SyntheticKeyboardEvent){
    if(this.editorHasResults()){
      //dont want to propogate as that then moves us round the grid
      e.stopPropagation();
    }
    else {
      this.commit(e);
    }
  },

  onPressArrowUp(e: SyntheticKeyboardEvent){
    if(this.editorHasResults()){
      //dont want to propogate as that then moves us round the grid
      e.stopPropagation();
    }
    else {
      this.commit(e);
    }
  },

  onPressArrowLeft(e: SyntheticKeyboardEvent){
    //prevent event propogation. this disables left cell navigation
    if(!this.isCaretAtBeginningOfInput()){
      e.stopPropagation();
    }
    else {
      this.commit(e);
    }
  },

  onPressArrowRight(e: SyntheticKeyboardEvent){
    //prevent event propogation. this disables right cell navigation
    if(!this.isCaretAtEndOfInput()){
      e.stopPropagation();
    }
    else {
      this.commit(e);
    }
  },

  editorHasResults(): boolean{
    if(this.getEditor().getInputNode().tagName === 'SELECT'){
      return true;
    }
    if(isFunction(this.getEditor().hasResults)){
      return this.getEditor().hasResults();
    }else{
      return false;
    }
  },

  editorIsSelectOpen() {
    if(isFunction(this.getEditor().isSelectOpen)){
      return this.getEditor().isSelectOpen();
    }else{
      return false;
    }
  },

  getEditor(): Editor {
    //TODO need to check that this.refs.editor conforms to the type
    //this function is basically just a type cast for the sake of flow
    return this.refs.editor;
  },

  commit(args: {key : string}){
    var opts = args || {};
    var updated = this.getEditor().getValue();
    if(this.isNewValueValid(updated)){
      var cellKey = this.props.column.key;
      this.props.cellMetaData.onCommit({cellKey: cellKey, rowIdx: this.props.rowIdx, updated : updated, key : opts.key});
    }
    this.changeCommitted = true;
  },

  isNewValueValid(value: string): boolean{
    if(isFunction(this.getEditor().validate)){
      var isValid = this.getEditor().validate(value);
      this.setState({isInvalid : !isValid});
      return isValid;
    }else{
      return true;
    }
  },

  getInputNode(): HTMLInputElement{
    return this.getEditor().getInputNode();
  },

  getInitialValue(): string{
    var selected = this.props.cellMetaData.selected;
    var keyCode = selected.initialKeyCode;
    if(keyCode === 'Delete' || keyCode === 'Backspace'){
      return '';
    }else if(keyCode === 'Enter'){
      return this.props.value;
    }else{
      var text = keyCode ? String.fromCharCode(keyCode) : this.props.value;
      return text;
    }

  },

  getContainerClass(){
    return joinClasses({
      'has-error' : this.state.isInvalid === true
    })
  },

  setCaretAtEndOfInput(){
    var input = this.getInputNode();
    //taken from http://stackoverflow.com/questions/511088/use-javascript-to-place-cursor-at-end-of-text-in-text-input-element
    var txtLength = input.value.length;
    if(input.setSelectionRange){
      input.setSelectionRange(txtLength, txtLength);
    }else if(input.createTextRange){
      var fieldRange = input.createTextRange();
      fieldRange.moveStart('character', txtLength);
      fieldRange.collapse();
      fieldRange.select();
    }
  },

  isCaretAtBeginningOfInput(): boolean{
    var inputNode = this.getInputNode();
    return inputNode.selectionStart === inputNode.selectionEnd
      && inputNode.selectionStart === 0;
  },

  isCaretAtEndOfInput(): boolean{
    var inputNode = this.getInputNode();
    return inputNode.selectionStart === inputNode.value.length;
  },

  setTextInputFocus(){
    var selected = this.props.cellMetaData.selected;
    var keyCode = selected.initialKeyCode;
    var inputNode = this.getInputNode();
    inputNode.focus();
    if(inputNode.tagName === "INPUT"){
      if(!this.isKeyPrintable(keyCode)){
        inputNode.focus();
        inputNode.select();
      }else{
        inputNode.select();
      }
    }
  },

  componentWillUnmount: function() {
    if (!this.changeCommitted && !this.hasEscapeBeenPressed()) {
      this.commit({key:'Enter'});
    }
  },

  renderStatusIcon(): ?ReactElement{
    if(this.state.isInvalid === true){
      return <span className="glyphicon glyphicon-remove form-control-feedback"></span>
    }
  },

  hasEscapeBeenPressed() {
    var pressed = false;
    var escapeKey = 27;
    if (window.event.keyCode === escapeKey) {
      pressed = true;
    } else if (window.event.which === escapeKey){
      pressed  = true;
    }
    return pressed;
  },

  render(): ?ReactElement{
    return (
      <div className={this.getContainerClass()} onKeyDown={this.onKeyDown} >
      {this.createEditor()}
      {this.renderStatusIcon()}
      </div>
    )
  }
});

module.exports = EditorContainer;
