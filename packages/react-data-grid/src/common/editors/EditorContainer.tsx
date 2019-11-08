import React, { KeyboardEvent, useRef, useState, useEffect, useCallback, createElement, cloneElement } from 'react';
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

export interface EditorContainerProps<R, RK extends keyof R, CK extends keyof R> extends SharedInteractionMasksProps<R, RK>, SharedInteractionMasksState, Omit<Dimension, 'zIndex'> {
  rowIdx: number;
  rowData: R;
  value: R[CK];
  column: CalculatedColumn<R, unknown, CK>;
  onCommit(e: CommitEvent<R, { [k: string]: R[CK] }>): void;
  onCommitCancel(): void;
}

function getInitialValue<R, CK extends keyof R>({ key, value }: { key: string | null; value: R[CK] }): R[CK] | string {
  // TODO: Do we need to activate editor when Delete, Backspace or other keys are pressed?
  // These keys only make sense for a textbox editor. Activating a complex editor like a date-picker or a modal would not be intuitive
  if (key === 'Delete' || key === 'Backspace') {
    return '';
  }
  if (key === 'Enter') {
    return value;
  }

  return key || value;
}

export default function EditorContainer<R, RK extends keyof R, CK extends keyof R = keyof R>({
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
}: EditorContainerProps<R, RK, CK>) {
  const legacyEditorRef = useRef<Editor<{ [k: string]: R[CK] }>>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const [value, setValue] = useState(() => getInitialValue({ key: firstEditorKeyPress, value: props.value }));
  const prevScrollLeft = useRef(scrollLeft);
  const prevScrollTop = useRef(scrollTop);
  const { enableNewEditor, getRowMetaData, editor } = column;

  const getInputNode = useCallback(() => {
    return enableNewEditor
      ? editorRef.current
      : legacyEditorRef.current && legacyEditorRef.current.getInputNode();
  }, [enableNewEditor]);

  useEffect(() => {
    const inputNode = getInputNode();

    if (inputNode instanceof HTMLElement) {
      inputNode.focus();
    }
    if (inputNode instanceof HTMLInputElement) {
      inputNode.select();
    }
  }, [getInputNode]);

  // Cancel changes and close editor on scroll
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
    return legacyEditorRef.current && legacyEditorRef.current.hasResults
      ? legacyEditorRef.current.hasResults()
      : false;
  }

  function legacy_editorIsSelectOpen(): boolean {
    return legacyEditorRef.current && legacyEditorRef.current.isSelectOpen
      ? legacyEditorRef.current.isSelectOpen()
      : false;
  }

  function legacy_isNewValueValid(value: unknown): boolean {
    if (legacyEditorRef.current && legacyEditorRef.current.validate) {
      const isValid = legacyEditorRef.current.validate(value);
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
    if (
      (key === 'ArrowLeft' && !isCaretAtBeginningOfInput())
      || (key === 'ArrowRight' && !isCaretAtEndOfInput())
    ) {
      return true;
    }

    return enableNewEditor
      ? false
      : legacy_preventDefaultNavigation(key);
  }

  function legacy_commit(): void {
    const updated = legacyEditorRef.current!.getValue();
    if (legacy_isNewValueValid(updated)) {
      const cellKey = column.key;
      onCommit({ cellKey, rowIdx, updated });
    }
  }

  function commit(): void {
    const cellKey = column.key;
    if (enableNewEditor) {
      // TODO: Allow users to tweak updated value. This can be useful for editors that update multiple related fields
      const updated = { [cellKey]: value as R[CK] };
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

  const editorProps: EditorProps<R[CK], unknown, R, CK> = {
    editorRef,
    column,
    value: value as R[CK],
    onChange: setValue,
    rowMetaData: getRowMetaData && getRowMetaData(rowData, column),
    rowData,
    height,
    onCommit: commit,
    onCommitCancel,
    onOverrideKeyDown: onKeyDown
  };

  function legacy_createEditor() {
    const legacyEditorProps = {
      ref: legacyEditorRef,
      ...editorProps
    };

    if (isElement(editor)) {
      return cloneElement(editor, legacyEditorProps);
    }

    if (isValidElementType(editor)) {
      return createElement(editor, legacyEditorProps);
    }

    return (
      <LegacyTextEditor
        ref={legacyEditorRef as unknown as React.RefObject<LegacyTextEditor>}
        column={column}
        value={value as string}
        onCommit={commit}
      />
    );
  }

  function createEditor() {
    if (isElement(editor)) {
      throw new Error('React element is not supported in the new editor API. Please use a Component.');
    }

    if (isValidElementType(editor)) {
      return createElement(editor, editorProps);
    }

    return (
      <TextEditor
        editorRef={editorRef}
        value={value as string}
        onChange={setValue}
        onCommit={commit}
      />
    );
  }

  const className = classNames('rdg-editor-container', { 'has-error': !enableNewEditor && isInvalid });

  return (
    <ClickOutside onClickOutside={commit}>
      <div
        className={className}
        style={{ height, width, left, top }}
        onKeyDown={onKeyDown}
        onContextMenu={e => e.preventDefault()}
      >
        {
          enableNewEditor
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
