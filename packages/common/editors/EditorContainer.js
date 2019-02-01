import React from 'react';
import PropTypes from 'prop-types';
import joinClasses from 'classnames';

import SimpleTextEditor from './SimpleTextEditor';
import { isFunction } from 'common/utils';
import { isKeyPrintable, isCtrlKeyHeldDown } from 'common/utils/keyboardUtils';
import * as zIndexes from 'common/constants/zIndexes';
import ClickOutside from './ClickOutside';

require('../../../themes/react-data-grid-core.css');

class EditorContainer extends React.Component {
  static displayName = 'EditorContainer';

  static propTypes = {
    rowIdx: PropTypes.number,
    rowData: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.bool]).isRequired,
    column: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    onGridKeyDown: PropTypes.func,
    onCommit: PropTypes.func,
    onCommitCancel: PropTypes.func,
    firstEditorKeyPress: PropTypes.string,
    scrollLeft: PropTypes.number,
    scrollTop: PropTypes.number
  };

  state = { isInvalid: false };
  changeCommitted = false;
  changeCanceled = false;

  componentDidMount() {
    const inputNode = this.getInputNode();
    if (inputNode !== undefined) {
      this.setTextInputFocus();
      if (!this.getEditor().disableContainerStyles) {
        inputNode.className += ' editor-main';
        inputNode.style.height = this.props.height - 1 + 'px';
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.scrollLeft !== this.props.scrollLeft || prevProps.scrollTop !== this.props.scrollTop) {
      this.commitCancel();
    }
  }

  componentWillUnmount() {
    if (!this.changeCommitted && !this.changeCanceled) {
      this.commit({ key: 'Enter' });
    }
  }

  isKeyExplicitlyHandled = (key) => {
    return isFunction(this['onPress' + key]);
  };

  checkAndCall = (methodName, args) => {
    if (isFunction(this[methodName])) {
      this[methodName](args);
    }
  };

  onKeyDown = (e) => {
    if (isCtrlKeyHeldDown(e)) {
      this.checkAndCall('onPressKeyWithCtrl', e);
    } else if (this.isKeyExplicitlyHandled(e.key)) {
      // break up individual keyPress events to have their own specific callbacks
      const callBack = 'onPress' + e.key;
      this.checkAndCall(callBack, e);
    } else if (isKeyPrintable(e.keyCode)) {
      e.stopPropagation();
      this.checkAndCall('onPressChar', e);
    }

    // Track which keys are currently down for shift clicking etc
    this._keysDown = this._keysDown || {};
    this._keysDown[e.keyCode] = true;
    if (isFunction(this.props.onGridKeyDown)) {
      this.props.onGridKeyDown(e);
    }
  };

  setEditorRef = (editor) => {
    this.editor = editor;
  }

  createEditor = () => {
    const editorProps = {
      ref: this.setEditorRef,
      column: this.props.column,
      value: this.getInitialValue(),
      onCommit: this.commit,
      onCommitCancel: this.commitCancel,
      rowMetaData: this.getRowMetaData(),
      rowData: this.props.rowData,
      height: this.props.height,
      onBlur: this.commit,
      onOverrideKeyDown: this.onKeyDown
    };

    const CustomEditor = this.props.column.editor;
    // return custom column editor or SimpleEditor if none specified
    if (React.isValidElement(CustomEditor)) {
      return React.cloneElement(CustomEditor, editorProps);
    }
    if (isFunction(CustomEditor)) {
      return <CustomEditor ref={this.setEditorRef} {...editorProps} />;
    }

    return (
      <SimpleTextEditor
        ref={this.setEditorRef}
        column={this.props.column}
        value={this.getInitialValue()}
        onBlur={this.commit}
        rowMetaData={this.getRowMetaData()}
      />
    );
  };

  onPressEnter = () => {
    this.commit({ key: 'Enter' });
  };

  onPressTab = () => {
    this.commit({ key: 'Tab' });
  };

  onPressEscape = (e) => {
    if (!this.editorIsSelectOpen()) {
      this.commitCancel();
    } else {
      // prevent event from bubbling if editor has results to select
      e.stopPropagation();
    }
  };

  onPressArrowDown = (e) => {
    if (this.editorHasResults()) {
      // dont want to propogate as that then moves us round the grid
      e.stopPropagation();
    } else {
      this.commit(e);
    }
  };

  onPressArrowUp = (e) => {
    if (this.editorHasResults()) {
      // dont want to propogate as that then moves us round the grid
      e.stopPropagation();
    } else {
      this.commit(e);
    }
  };

  onPressArrowLeft = (e) => {
    // prevent event propogation. this disables left cell navigation
    if (!this.isCaretAtBeginningOfInput()) {
      e.stopPropagation();
    } else {
      this.commit(e);
    }
  };

  onPressArrowRight = (e) => {
    // prevent event propogation. this disables right cell navigation
    if (!this.isCaretAtEndOfInput()) {
      e.stopPropagation();
    } else {
      this.commit(e);
    }
  };

  editorHasResults = () => {
    if (isFunction(this.getEditor().hasResults)) {
      return this.getEditor().hasResults();
    }

    return false;
  };

  editorIsSelectOpen = () => {
    if (isFunction(this.getEditor().isSelectOpen)) {
      return this.getEditor().isSelectOpen();
    }

    return false;
  };

  getRowMetaData = () => {
    // clone row data so editor cannot actually change this
    // convention based method to get corresponding Id or Name of any Name or Id property
    if (typeof this.props.column.getRowMetaData === 'function') {
      return this.props.column.getRowMetaData(this.props.rowData, this.props.column);
    }
  };

  getEditor = () => {
    return this.editor;
  };

  getInputNode = () => {
    return this.getEditor().getInputNode();
  };

  getInitialValue = () => {
    const { firstEditorKeyPress: key, value } = this.props;
    if (key === 'Delete' || key === 'Backspace') {
      return '';
    } else if (key === 'Enter') {
      return value;
    }

    return key || value;
  };

  getContainerClass = () => {
    return joinClasses({
      'rdg-editor-container': true,
      'has-error': this.state.isInvalid === true
    });
  };

  commit = (args) => {
    const { onCommit } = this.props;
    const opts = args || {};
    const updated = this.getEditor().getValue();
    if (this.isNewValueValid(updated)) {
      this.changeCommitted = true;
      const cellKey = this.props.column.key;
      onCommit({ cellKey: cellKey, rowIdx: this.props.rowIdx, updated: updated, key: opts.key });
    }
  };

  commitCancel = () => {
    this.changeCanceled = true;
    this.props.onCommitCancel();
  };

  isNewValueValid = (value) => {
    if (isFunction(this.getEditor().validate)) {
      const isValid = this.getEditor().validate(value);
      this.setState({ isInvalid: !isValid });
      return isValid;
    }

    return true;
  };

  setCaretAtEndOfInput = () => {
    const input = this.getInputNode();
    // taken from http://stackoverflow.com/questions/511088/use-javascript-to-place-cursor-at-end-of-text-in-text-input-element
    const txtLength = input.value.length;
    if (input.setSelectionRange) {
      input.setSelectionRange(txtLength, txtLength);
    } else if (input.createTextRange) {
      const fieldRange = input.createTextRange();
      fieldRange.moveStart('character', txtLength);
      fieldRange.collapse();
      fieldRange.select();
    }
  };

  isCaretAtBeginningOfInput = () => {
    const inputNode = this.getInputNode();
    return inputNode.selectionStart === inputNode.selectionEnd
      && inputNode.selectionStart === 0;
  };

  isCaretAtEndOfInput = () => {
    const inputNode = this.getInputNode();
    return inputNode.selectionStart === inputNode.value.length;
  };

  handleRightClick = (e) => {
    e.stopPropagation();
  };

  setTextInputFocus = () => {
    const keyCode = this.props.firstEditorKeyPress;
    const inputNode = this.getInputNode();
    inputNode.focus();
    if (inputNode.tagName === 'INPUT') {
      if (!isKeyPrintable(keyCode)) {
        inputNode.focus();
        inputNode.select();
      } else {
        inputNode.select();
      }
    }
  };

  renderStatusIcon = () => {
    if (this.state.isInvalid === true) {
      return <span className="glyphicon glyphicon-remove form-control-feedback"></span>;
    }
  };

  render() {
    const { width, height, left, top } = this.props;
    const style = { position: 'absolute', height, width, left, top, zIndex: zIndexes.EDITOR_CONTAINER };
    return (
      <ClickOutside onClickOutside={this.commit}>
        <div
          style={style}
          className={this.getContainerClass()}
          onKeyDown={this.onKeyDown}
          onContextMenu={this.handleRightClick}
        >
          {this.createEditor()}
          {this.renderStatusIcon()}
        </div>
      </ClickOutside>
    );
  }
}

module.exports = EditorContainer;
