import React, { KeyboardEvent, useRef, useState, useLayoutEffect, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { Clear } from '@material-ui/icons';

import { CalculatedColumn, Editor, CommitEvent, Dimension, Omit } from '../common/types';
import SimpleTextEditor from './SimpleTextEditor';
import ClickOutside from './ClickOutside';
import { InteractionMasksProps } from '../masks/InteractionMasks';
import { preventDefault } from '../utils';

type SharedInteractionMasksProps<R, SR> = Pick<InteractionMasksProps<R, SR>, 'scrollLeft' | 'scrollTop'>;

export interface EditorContainerProps<R, SR> extends SharedInteractionMasksProps<R, SR>, Omit<Dimension, 'zIndex'> {
  rowIdx: number;
  row: R;
  column: CalculatedColumn<R, SR>;
  onGridKeyDown?(e: KeyboardEvent): void;
  onCommit(e: CommitEvent): void;
  onCommitCancel(): void;
  firstEditorKeyPress: string | null;
}

export default function EditorContainer<R, SR>({
  rowIdx,
  column,
  row,
  width,
  height,
  left,
  top,
  onCommit,
  onCommitCancel,
  scrollLeft,
  scrollTop,
  firstEditorKeyPress: key
}: EditorContainerProps<R, SR>) {
  const editorRef = useRef<Editor>(null);
  const [isValid, setValid] = useState(true);
  const getInputNode = useCallback(() => editorRef.current?.getInputNode(), []);

  useLayoutEffect(() => {
    const inputNode = getInputNode();

    if (inputNode instanceof HTMLElement) {
      inputNode.focus();
    }
    if (inputNode instanceof HTMLInputElement) {
      inputNode.select();
    }
  }, [getInputNode]);

  // close editor when scrolling
  useEffect(() => onCommitCancel, [scrollTop, scrollLeft, onCommitCancel]);

  function getInitialValue() {
    const value = row[column.key as keyof R];
    if (key === 'Delete' || key === 'Backspace') {
      return '';
    }
    if (key === 'Enter') {
      return value;
    }

    return key || value;
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

  function editorHasResults(): boolean {
    return editorRef.current?.hasResults?.() ?? false;
  }

  function editorIsSelectOpen(): boolean {
    return editorRef.current?.isSelectOpen?.() ?? false;
  }

  function isNewValueValid(value: unknown): boolean {
    const isValid = editorRef.current?.validate?.(value);
    if (typeof isValid === 'boolean') {
      setValid(isValid);
      return isValid;
    }
    return true;
  }

  function preventDefaultNavigation(key: string): boolean {
    return (key === 'ArrowLeft' && !isCaretAtBeginningOfInput())
      || (key === 'ArrowRight' && !isCaretAtEndOfInput())
      || (key === 'Escape' && editorIsSelectOpen())
      || (['ArrowUp', 'ArrowDown'].includes(key) && editorHasResults());
  }

  function commit(): void {
    if (!editorRef.current) return;
    const updated = editorRef.current.getValue();
    if (isNewValueValid(updated)) {
      const cellKey = column.key;
      onCommit({ cellKey, rowIdx, updated });
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLElement>) {
    if (preventDefaultNavigation(e.key)) {
      e.stopPropagation();
    } else if (['Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      commit();
    }
  }

  function createEditor() {
    // return custom column editor or SimpleEditor if none specified
    if (column.editor) {
      return (
        <column.editor
          ref={editorRef}
          column={column}
          value={getInitialValue() as R[keyof R & string] & R[keyof R & number] & R[keyof R & symbol]}
          row={row}
          height={height}
          onCommit={commit}
          onCommitCancel={onCommitCancel}
          onOverrideKeyDown={onKeyDown}
        />
      );
    }

    return (
      <SimpleTextEditor
        ref={editorRef as unknown as React.RefObject<SimpleTextEditor>}
        column={column}
        value={getInitialValue() as string}
        onCommit={commit}
      />
    );
  }

  const className = classNames('rdg-editor-container', {
    'has-error': !isValid
  });

  return (
    <ClickOutside onClickOutside={commit}>
      <div
        className={className}
        style={{ height, width, left, top }}
        onKeyDown={onKeyDown}
        onContextMenu={preventDefault}
      >
        {createEditor()}
        {!isValid && <Clear className="form-control-feedback" />}
      </div>
    </ClickOutside>
  );
}
