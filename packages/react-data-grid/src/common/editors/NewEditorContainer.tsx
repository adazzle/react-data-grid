import React, { KeyboardEvent } from 'react';
import { isValidElementType } from 'react-is';

import { InteractionMasksProps, InteractionMasksState } from '../../masks/InteractionMasks';
import { CalculatedColumn, CommitEvent, Dimension, Omit } from '../types';
import ClickOutside from './ClickOutside';
import NewSimpleTextEditor from './NewSimpleTextEditor';


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

export interface EditorContext {
  firstEditorKeyPress: string | null;
  commit(): void;
  commitCancel(): void;
  onGridKeyDown?(e: KeyboardEvent): void;
}

export const DataGridEditorContext = React.createContext<Partial<EditorContext>>({});

export default class EditorContainer<R, K extends keyof R> extends React.Component<Props<R, K>, State<R>> {
  static displayName = 'EditorContainer';

  changeCommitted = false;
  changeCanceled = false;

  readonly state: Readonly<State<R>> = {
    value: getInitialValue(this.props)
  };

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

  onChange = (value: ValueType<R>) => {
    this.setState({ value });
  };

  createEditor() {
    // FIX ME
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const editorProps: any = {
      value: this.state.value,
      column: this.props.column,
      onChange: this.onChange,
      rowMetaData: this.getRowMetaData(),
      rowData: this.props.rowData,
      onCommit: this.commit,
      onCommitCancel: this.commitCancel
    };

    const CustomEditor = this.props.column.editor as React.ComponentType<{}>;

    return (
      <DataGridEditorContext.Provider
        value={{
          firstEditorKeyPress: this.props.firstEditorKeyPress,
          commit: this.commit,
          commitCancel: this.commitCancel,
          onGridKeyDown: this.props.onGridKeyDown
        }}
      >
        {isValidElementType(CustomEditor) ? <CustomEditor {...editorProps} /> : <NewSimpleTextEditor {...editorProps} />}
      </DataGridEditorContext.Provider>
    );
  }

  getRowMetaData() {
    // clone row data so editor cannot actually change this
    // convention based method to get corresponding Id or Name of any Name or Id property
    if (this.props.column.getRowMetaData) {
      return this.props.column.getRowMetaData(this.props.rowData, this.props.column);
    }
  }

  commit = () => {
    const { onCommit, column } = this.props;
    const updated: never = { [column.key]: this.state.value } as never;
    this.changeCommitted = true;
    const cellKey = this.props.column.key;
    onCommit({ cellKey, rowIdx: this.props.rowIdx, updated });
  };

  commitCancel = () => {
    this.changeCanceled = true;
    this.props.onCommitCancel();
  };

  handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  render() {
    const { width, height, left, top } = this.props;

    return (
      <ClickOutside onClickOutside={this.commit}>
        <div
          className="rdg-editor-container"
          style={{ height, width, left, top }}
          onContextMenu={this.handleRightClick}
        >
          {this.createEditor()}
        </div>
      </ClickOutside>
    );
  }
}
