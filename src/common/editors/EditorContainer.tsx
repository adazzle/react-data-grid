import React, { KeyboardEvent } from 'react';
import classNames from 'classnames';
import { Clear } from '@material-ui/icons';

import { CalculatedColumn, Editor, CommitEvent, Dimension, Omit } from '../types';
import SimpleTextEditor from './SimpleTextEditor';
import ClickOutside from './ClickOutside';
import { InteractionMasksProps } from '../../masks/InteractionMasks';

type SharedInteractionMasksProps<R, K extends keyof R> = Pick<InteractionMasksProps<R, K>, 'scrollLeft' | 'scrollTop'>;

type ValueType<R> = R[keyof R];

export interface Props<R, K extends keyof R> extends SharedInteractionMasksProps<R, K>, Omit<Dimension, 'zIndex'> {
  rowIdx: number;
  rowData: R;
  value: ValueType<R>;
  column: CalculatedColumn<R>;
  onGridKeyDown?(e: KeyboardEvent): void;
  onCommit(e: CommitEvent<R>): void;
  onCommitCancel(): void;
  firstEditorKeyPress: string | null;
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
      this.commit();
    }
  }

  onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    switch (e.key) {
      case 'Enter':
      case 'Tab':
        this.commit();
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

    this.props.onGridKeyDown?.(e);
  };

  createEditor() {
    // return custom column editor or SimpleEditor if none specified
    if (this.props.column.editor) {
      return (
        <this.props.column.editor
          ref={this.editor}
          column={this.props.column}
          value={this.getInitialValue() as R[keyof R & string] & R[keyof R & number] & R[keyof R & symbol]}
          rowData={this.props.rowData}
          height={this.props.height}
          onCommit={this.commit}
          onCommitCancel={this.commitCancel}
          onOverrideKeyDown={this.onKeyDown}
        />
      );
    }

    return (
      <SimpleTextEditor
        ref={this.editor as unknown as React.RefObject<SimpleTextEditor>}
        column={this.props.column as CalculatedColumn<unknown>}
        value={this.getInitialValue() as string}
        onCommit={this.commit}
      />
    );
  }

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
      this.commit();
    }
  };

  onPressArrowLeft = (e: KeyboardEvent) => {
    // prevent event propogation. this disables left cell navigation
    if (!this.isCaretAtBeginningOfInput()) {
      e.stopPropagation();
    } else {
      this.commit();
    }
  };

  onPressArrowRight = (e: KeyboardEvent) => {
    // prevent event propogation. this disables right cell navigation
    if (!this.isCaretAtEndOfInput()) {
      e.stopPropagation();
    } else {
      this.commit();
    }
  };

  editorHasResults = () => {
    return this.editor.current?.hasResults?.() ?? false;
  };

  editorIsSelectOpen = () => {
    return this.editor.current?.isSelectOpen?.() ?? false;
  };

  getInputNode = () => {
    return this.editor.current?.getInputNode();
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

  commit = () => {
    const { onCommit } = this.props;
    const updated = this.editor.current?.getValue() as never;
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
    const editor = this.editor.current;
    if (editor?.validate) {
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
