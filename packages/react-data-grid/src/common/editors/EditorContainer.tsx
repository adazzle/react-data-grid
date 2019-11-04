import React, { KeyboardEvent, useRef, useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { isElement, isValidElementType } from 'react-is';
import { Clear } from '@material-ui/icons';

import { CalculatedColumn, Editor, EditorProps, CommitEvent, Dimension, Omit } from '../types';
import TextEditor from './TextEditor';
import LegacyTextEditor from './LegacyTextEditor';
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
  onCommit(e: CommitEvent<R>): void;
  onCommitCancel(): void;
}

function getInitialValue<R>({ key, value }: { key: string | null; value: ValueType<R> }): ValueType<R> | string {
  if (key === 'Delete' || key === 'Backspace') {
    return '';
  }
  if (key === 'Enter') {
    return value;
  }

  return key || value;
}

export default function EditorContainer<R, K extends keyof R>({
  rowIdx,
  column,
  rowData,
  width,
  height,
  left,
  top,
  onCommit,
  onCommitCancel,
  scrollLeft,
  scrollTop,
  firstEditorKeyPress,
  ...props
}: Props<R, K>) {
  const editorRef = useRef<Editor>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const [value, setValue] = useState(() => getInitialValue({ key: firstEditorKeyPress, value: props.value }));
  const prevScrollLeft = useRef(scrollLeft);
  const prevScrollTop = useRef(scrollTop);

  const getInputNode = useCallback(() => {
    return column.enableNewEditor
      ? inputRef.current
      : editorRef.current && editorRef.current.getInputNode();
  }, [column.enableNewEditor]);

  useEffect(() => {
    const inputNode = getInputNode();

    if (inputNode instanceof HTMLElement) {
      inputNode.focus();
    }
    if (inputNode instanceof HTMLInputElement) {
      inputNode.select();
    }
  }, [getInputNode]);

  // Cancel changes on scroll
  if (prevScrollLeft.current !== scrollLeft || prevScrollTop.current !== scrollTop) {
    onCommitCancel();
  }

  function isCaretAtBeginningOfInput(): boolean {
    const inputNode = getInputNode();
    return inputNode instanceof HTMLInputElement
      && inputNode.selectionEnd === 0;
  }

  function isCaretAtEndOfInput(): boolean {
    const inputNode = getInputNode();
    return inputNode instanceof HTMLInputElement
      && inputNode.selectionStart === inputNode.value.length;
  }

  function legacy_editorHasResults(): boolean {
    return editorRef.current && editorRef.current.hasResults
      ? editorRef.current.hasResults()
      : false;
  }

  function legacy_editorIsSelectOpen(): boolean {
    return editorRef.current && editorRef.current.isSelectOpen
      ? editorRef.current.isSelectOpen()
      : false;
  }

  function legacy_isNewValueValid(value: unknown): boolean {
    if (editorRef.current && editorRef.current.validate) {
      const isValid = editorRef.current.validate(value);
      setIsInvalid(!isValid);
      return isValid;
    }

    return true;
  }

  function legacy_preventDefaultNavigation(key: string): boolean {
    return (key === 'Escape' && legacy_editorIsSelectOpen())
      || (['ArrowUp', 'ArrowDown'].includes(key) && legacy_editorHasResults());
  }

  function preventDefaultNavigation(key: string): boolean {
    console.log(key);
    if (
      (key === 'ArrowLeft' && !isCaretAtBeginningOfInput())
      || (key === 'ArrowRight' && !isCaretAtEndOfInput())
    ) {
      return true;
    }

    return column.enableNewEditor
      ? false
      : legacy_preventDefaultNavigation(key);
  }

  function legacy_commit(): void {
    const updated = editorRef.current!.getValue();
    if (legacy_isNewValueValid(updated)) {
      const cellKey = column.key;
      onCommit({ cellKey, rowIdx, updated });
    }
  }

  function commit(): void {
    const cellKey = column.key;
    if (column.enableNewEditor) {
      const updated = { [cellKey]: value } as never;
      onCommit({ cellKey, rowIdx, updated });
      return;
    }

    legacy_commit();
  }

  function onKeyDown(e: KeyboardEvent<HTMLElement>) {
    if (preventDefaultNavigation(e.key)) {
      e.stopPropagation();
      return;
    }

    if (['Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      commit();
    } else if (e.key === 'Escape') {
      onCommitCancel();
    }
  }

  function getRowMetaData() {
    // clone row data so editor cannot actually change this
    // convention based method to get corresponding Id or Name of any Name or Id property
    if (column.getRowMetaData) {
      return column.getRowMetaData(rowData, column);
    }
  }

  type P = EditorProps<ValueType<R> | string, unknown, R>;

  function legacy_createEditor() {
    const editorProps: P & { ref: React.RefObject<Editor> } = {
      ref: editorRef,
      inputRef,
      column,
      value,
      onChange: setValue,
      rowMetaData: getRowMetaData(),
      rowData,
      height,
      onCommit: commit,
      onCommitCancel,
      onOverrideKeyDown: onKeyDown
    };

    const editor = column.editor as React.ComponentType<P>;

    if (isElement(editor)) {
      return React.cloneElement(editor, editorProps);
    }

    if (isValidElementType(editor)) {
      return React.createElement(editor, editorProps);
    }

    return (
      <LegacyTextEditor
        ref={editorRef as unknown as React.RefObject<LegacyTextEditor>}
        column={column as CalculatedColumn<unknown>}
        value={value as string}
        onCommit={commit}
      />
    );
  }

  function createEditor() {
    const editorProps: P = {
      inputRef,
      column,
      value,
      onChange: setValue,
      rowMetaData: getRowMetaData(),
      rowData,
      height,
      onCommit: commit,
      onCommitCancel
    };

    // TODO: fix editor types
    const editor = column.editor as React.ComponentType<P>;

    if (isElement(editor)) {
      throw new Error('React element is not supported in the new editor API. Please use a Component.');
    }

    if (isValidElementType(editor)) {
      return React.createElement(editor, editorProps);
    }

    return (
      <TextEditor
        inputRef={inputRef}
        value={value as string}
        onChange={setValue as unknown as (value: string) => void}
        onCommit={commit}
      />
    );
  }

  const className = classNames('rdg-editor-container', { 'has-error': isInvalid });

  return (
    <ClickOutside onClickOutside={commit}>
      <div
        className={className}
        style={{ height, width, left, top }}
        onKeyDown={onKeyDown}
        onContextMenu={e => e.preventDefault()}
      >
        {
          column.enableNewEditor
            ? createEditor()
            : (
              <>
                {legacy_createEditor()}
                {isInvalid && <Clear className="form-control-feedback" />}
              </>
            )
        }
      </div>
    </ClickOutside>
  );
}
