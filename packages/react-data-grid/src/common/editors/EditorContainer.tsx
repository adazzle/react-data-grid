import React, { KeyboardEvent } from 'react';
import classNames from 'classnames';
import { isElement, isValidElementType } from 'react-is';
import { Clear } from '@material-ui/icons';

import { CalculatedColumn, Editor, EditorProps, CommitEvent, Dimension, Omit } from '../types';
import SimpleTextEditor from './SimpleTextEditor';
import ClickOutside from './ClickOutside';
import { InteractionMasksProps, InteractionMasksState } from '../../masks/InteractionMasks';

type SharedInteractionMasksProps<R, K extends keyof R> = Pick<InteractionMasksProps<R, K>, 'scrollLeft' | 'scrollTop'>;
type SharedInteractionMasksState = Pick<InteractionMasksState, 'firstEditorKeyPress'>;

type ValueType<R> = R[keyof R];

export interface Props<R, K extends keyof R> extends SharedInteractionMasksProps<R, K>, SharedInteractionMasksState, Omit<Dimension, 'zIndex'> {
  rowIdx: number;
  rowData: R;
  value: ValueType<R>;
  column: CalculatedColumn<R>;
  onGridKeyDown?(e: KeyboardEvent): void;
  onCommit(e: CommitEvent<R>): void;
  onCommitCancel(): void;
}

interface State {
  isInvalid: boolean;
}

export default class EditorContainer<R, K extends keyof R> extends React.Component<Props<R, K>, State> {
  static displayName = 'EditorContainer';

  changeCommitted = false;
  changeCanceled = false;

  private readonly editor = React.createRef<Editor>();
  readonly state: Readonly<State> = { isInvalid: false };

  componentDidMount() {
    const inputNode = this.getInputNode();
    if (inputNode instanceof HTMLElement) {
      inputNode.focus();
    }
    if (inputNode instanceof HTMLInputElement) {
      inputNode.select();
    }
  }

  componentDidUpdate(prevProps: Props<R, K>) {
    if (prevProps.scrollLeft !== this.props.scrollLeft || prevProps.scrollTop !== this.props.scrollTop) {
      this.commitCancel();
    }
  }

  componentWillUnmount() {
    if (!this.changeCommitted && !this.changeCanceled) {
      this.commit({ key: 'Enter' });
    }
  }

  onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    switch (e.key) {
      case 'Enter':
        this.onPressEnter();
        break;
      case 'Tab':
        this.onPressTab();
        break;
      case 'Escape':
        this.onPressEscape(e);
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        this.onPressArrowUpOrDown(e);
        break;
      case 'ArrowLeft':
        this.onPressArrowLeft(e);
        break;
      case 'ArrowRight':
        this.onPressArrowRight(e);
        break;
      default:
        break;
    }

    if (this.props.onGridKeyDown) {
      this.props.onGridKeyDown(e);
    }
  };

  createEditor() {
    type P = EditorProps<ValueType<R> | string, unknown, R>;
    const editorProps: P & { ref: React.RefObject<Editor> } = {
      ref: this.editor,
      column: this.props.column,
      value: this.getInitialValue(),
      rowMetaData: this.getRowMetaData(),
      rowData: this.props.rowData,
      height: this.props.height,
      onCommit: this.commit,
      onCommitCancel: this.commitCancel,
      onBlur: this.commit,
      onOverrideKeyDown: this.onKeyDown
    };

    const CustomEditor = this.props.column.editor as React.ComponentType<P>;
    // return custom column editor or SimpleEditor if none specified
    if (isElement(CustomEditor)) {
      return React.cloneElement(CustomEditor, editorProps);
    }
    if (isValidElementType(CustomEditor)) {
      return <CustomEditor {...editorProps} />;
    }

    return (
      <SimpleTextEditor
        ref={this.editor as unknown as React.RefObject<SimpleTextEditor>}
        column={this.props.column as CalculatedColumn<unknown>}
        value={this.getInitialValue() as string}
        onBlur={this.commit}
      />
    );
  }

  onPressEnter = () => {
    this.commit({ key: 'Enter' });
  };

  onPressTab = () => {
    this.commit({ key: 'Tab' });
  };

  onPressEscape = (e: KeyboardEvent) => {
    if (!this.editorIsSelectOpen()) {
      this.commitCancel();
    } else {
      // prevent event from bubbling if editor has results to select
      e.stopPropagation();
    }
  };

  onPressArrowUpOrDown = (e: KeyboardEvent) => {
    if (this.editorHasResults()) {
      // dont want to propogate as that then moves us round the grid
      e.stopPropagation();
    } else {
      this.commit(e);
    }
  };

  onPressArrowLeft = (e: KeyboardEvent) => {
    // prevent event propogation. this disables left cell navigation
    if (!this.isCaretAtBeginningOfInput()) {
      e.stopPropagation();
    } else {
      this.commit(e);
    }
  };

  onPressArrowRight = (e: KeyboardEvent) => {
    // prevent event propogation. this disables right cell navigation
    if (!this.isCaretAtEndOfInput()) {
      e.stopPropagation();
    } else {
      this.commit(e);
    }
  };

  editorHasResults = () => {
    const { hasResults } = this.getEditor();
    return hasResults ? hasResults() : false;
  };

  editorIsSelectOpen = () => {
    const { isSelectOpen } = this.getEditor();
    return isSelectOpen ? isSelectOpen() : false;
  };

  getRowMetaData() {
    // clone row data so editor cannot actually change this
    // convention based method to get corresponding Id or Name of any Name or Id property
    if (this.props.column.getRowMetaData) {
      return this.props.column.getRowMetaData(this.props.rowData, this.props.column);
    }
  }

  getEditor = () => {
    return this.editor.current!;
  };

  getInputNode = () => {
    return this.getEditor().getInputNode();
  };

  getInitialValue(): ValueType<R> | string {
    const { firstEditorKeyPress: key, value } = this.props;
    if (key === 'Delete' || key === 'Backspace') {
      return '';
    }
    if (key === 'Enter') {
      return value;
    }

    return key || value;
  }

  commit = (args: { key?: string } = {}) => {
    const { onCommit } = this.props;
    const updated = this.getEditor().getValue();
    if (this.isNewValueValid(updated)) {
      this.changeCommitted = true;
      const cellKey = this.props.column.key;
      onCommit({ cellKey, rowIdx: this.props.rowIdx, updated, key: args.key });
    }
  };

  commitCancel = () => {
    this.changeCanceled = true;
    this.props.onCommitCancel();
  };

  isNewValueValid = (value: unknown) => {
    const editor = this.getEditor();
    if (editor.validate) {
      const isValid = editor.validate(value);
      this.setState({ isInvalid: !isValid });
      return isValid;
    }

    return true;
  };

  isCaretAtBeginningOfInput = () => {
    const inputNode = this.getInputNode();
    return inputNode instanceof HTMLInputElement
      && inputNode.selectionEnd === 0;
  };

  isCaretAtEndOfInput = () => {
    const inputNode = this.getInputNode();
    return inputNode instanceof HTMLInputElement
      && inputNode.selectionStart === inputNode.value.length;
  };

  handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  renderStatusIcon() {
    return this.state.isInvalid
      && <Clear className="form-control-feedback" />;
  }

  render() {
    const { width, height, left, top } = this.props;
    const className = classNames('rdg-editor-container', {
      'has-error': this.state.isInvalid
    });

    return (
      <ClickOutside onClickOutside={this.commit}>
        <div
          className={className}
          style={{ height, width, left, top }}
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
