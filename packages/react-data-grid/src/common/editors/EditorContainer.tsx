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

interface State<R> {
  isInvalid: boolean;
  value: ValueType<R> | string;
}

function getInitialValue<R, K extends keyof R>({ firstEditorKeyPress: key, value }: Props<R, K>): ValueType<R> | string {
  if (key === 'Delete' || key === 'Backspace') {
    return '';
  }
  if (key === 'Enter') {
    return value;
  }

  return key || value;
}

export default class EditorContainer<R, K extends keyof R> extends React.Component<Props<R, K>, State<R>> {
  static displayName = 'EditorContainer';

  changeCommitted = false;
  changeCanceled = false;

  private readonly editor = React.createRef<Editor>();
  readonly state: Readonly<State<R>> = {
    isInvalid: false,
    value: getInitialValue(this.props)
  };

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
      this.commit();
    }
  }

  preventDefaultNavigation = (e: KeyboardEvent<HTMLElement>): boolean => {
    if (
      // prevent event from bubbling if editor has results to select
      (e.key === 'Escape' && this.editorIsSelectOpen())
      // dont want to propogate as that then moves us round the grid
      || ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && this.editorHasResults())
      // prevent event propogation. this disables left cell navigation
      || (e.key === 'ArrowLeft' && !this.isCaretAtBeginningOfInput())
      // prevent event propogation. this disables right cell navigation
      || (e.key === 'ArrowRight' && !this.isCaretAtEndOfInput())
    ) {
      e.stopPropagation();
      return true;
    }

    return false;
  };

  onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (this.props.column.enableNewEditor || !this.preventDefaultNavigation(e)) {
      if (['Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        this.commit();
      } else if (e.key === 'Escape') {
        this.commitCancel();
      }
    }

    if (this.props.onGridKeyDown) {
      this.props.onGridKeyDown(e);
    }
  };

  onChange = (value: ValueType<R>) => {
    this.setState({ value });
  };

  createEditor() {
    type P = EditorProps<ValueType<R> | string, unknown, R>;
    const editorProps: P & { ref: React.RefObject<Editor> } = {
      ref: this.editor,
      column: this.props.column,
      value: this.state.value,
      onChange: this.onChange,
      rowMetaData: this.getRowMetaData(),
      rowData: this.props.rowData,
      height: this.props.height,
      onCommit: this.commit,
      onCommitCancel: this.commitCancel,
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
        value={this.state.value as string}
        onChange={this.onChange as unknown as (value: string) => void}
        onCommit={this.commit}
      />
    );
  }

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
    return this.getEditor() && this.getEditor().getInputNode();
  };

  commit = () => {
    const { onCommit, column } = this.props;
    const updated: never = column.enableNewEditor
      ? this.getEditor().getValue()
      : { [column.key]: this.state.value } as never;

    if (this.isNewValueValid(updated)) {
      this.changeCommitted = true;
      const cellKey = this.props.column.key;
      onCommit({ cellKey, rowIdx: this.props.rowIdx, updated });
    }
  };

  commitCancel = () => {
    this.changeCanceled = true;
    this.props.onCommitCancel();
  };

  isNewValueValid = (value: unknown) => {
    const editor = this.getEditor();
    if (editor && editor.validate) {
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
