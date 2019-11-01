import React, { KeyboardEvent, useState, useEffect, useCallback, useRef, cloneElement } from 'react';
import { isValidElementType, isElement } from 'react-is';

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

let changeCommitted = false;
let changeCanceled = false;

export default function EditorContainer<R, K extends keyof R>(props: Props<R, K>): JSX.Element {
  const [value, setValue] = useState<ValueType<R> | string>(() => getInitialValue(props));

  const { width, height, left, top, scrollLeft, scrollTop, onCommit, column, rowIdx, onCommitCancel, rowData } = props;
  const { key, getRowMetaData } = column;

  const prevScrollLeft = useRef<number>(scrollLeft);
  const prevScrollTop = useRef<number>(scrollTop);

  const commit = useCallback(() => {
    const updated: never = { [key]: value } as never;
    changeCommitted = true;
    const cellKey = key;
    onCommit({ cellKey, rowIdx, updated });
  }, [key, onCommit, rowIdx, value]);

  const commitCancel = useCallback(() => {
    changeCanceled = true;
    onCommitCancel();
  }, [onCommitCancel]);

  useEffect(() => {
    if (prevScrollLeft.current !== scrollLeft || prevScrollTop.current !== scrollTop) {
      commitCancel();
      return;
    }

    prevScrollLeft.current = scrollLeft;
    prevScrollTop.current = scrollTop;
  }, [commitCancel, scrollLeft, scrollTop]);

  useEffect(() => {
    return () => {
      if (!changeCommitted && !changeCanceled) {
        commit();
      }
    };
  }, [commit]);

  const handleRightClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  // FIX ME
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorProps: any = {
    value,
    column,
    onChange: setValue,
    // clone row data so editor cannot actually change this
    // convention based method to get corresponding Id or Name of any Name or Id property
    rowMetaData: getRowMetaData && getRowMetaData(rowData, column),
    rowData,
    onCommit: commit,
    onCommitCancel: commitCancel
  };

  const CustomEditor = column.editor as React.ComponentType<{}>;
  return (
    <ClickOutside onClickOutside={commit}>
      <div
        className="rdg-editor-container"
        style={{ height, width, left, top }}
        onContextMenu={handleRightClick}
      >
        <DataGridEditorContext.Provider
          value={{
            firstEditorKeyPress: props.firstEditorKeyPress,
            commit,
            commitCancel,
            onGridKeyDown: props.onGridKeyDown
          }}
        >
          {isElement(CustomEditor)
            ? cloneElement(CustomEditor, editorProps)
            : isValidElementType(CustomEditor)
              ? <CustomEditor {...editorProps} />
              : <NewSimpleTextEditor {...editorProps} />}
        </DataGridEditorContext.Provider>
      </div>
    </ClickOutside>
  );
}
