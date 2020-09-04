import React, { useRef, useCallback, useLayoutEffect } from 'react';
import { useClickOutside } from './hooks';
import { preventDefault } from './utils';
import { EditorProps, OldEditorProps, Editor } from './types';

/** @deprecated */
export function wrapOldEditor<TRow, TSummaryRow = unknown>(
  EditorComponent: React.ComponentType<OldEditorProps<TRow[keyof TRow], TRow, TSummaryRow>>
): React.ComponentType<EditorProps<TRow, TSummaryRow>> {
  return ({
    column,
    row,
    // rowIdx,
    rowHeight,
    top,
    left,
    // editorPortalTarget,
    onRowChange,
    onClose
  }) => {
    // @ts-expect-error
    const value = row[column.key];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const editorRef = useRef<Editor<any>>(null);
    const onClickCapture = useClickOutside(onCommit);

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

    function onCommit() {
      const update = editorRef.current!.getValue();
      const newRow = { ...row, ...update };
      onRowChange(newRow, true);
    }

    function onCommitCancel() {
      onClose(false);
    }

    function onOverrideKeyDown() {
      // TODO? leave it as noop?
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

    function editorIsSelectOpen(): boolean {
      return editorRef.current?.isSelectOpen?.() ?? false;
    }

    function editorHasResults(): boolean {
      return editorRef.current?.hasResults?.() ?? false;
    }

    function preventDefaultNavigation(key: string): boolean {
      return (key === 'ArrowLeft' && !isCaretAtBeginningOfInput())
        || (key === 'ArrowRight' && !isCaretAtEndOfInput())
        || (key === 'Escape' && editorIsSelectOpen())
        || (['ArrowUp', 'ArrowDown'].includes(key) && editorHasResults());
    }

    function onKeyDown(e: React.KeyboardEvent) {
      if (preventDefaultNavigation(e.key)) {
        e.stopPropagation();
      } else if (['Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        onCommit();
      } else if (e.key === 'Escape') {
        onCommitCancel();
      }
    }

    return (
      <div
        className="rdg-editor-container"
        style={{ height: rowHeight, width: column.width, left, top }}
        onClickCapture={onClickCapture}
        onKeyDown={onKeyDown}
        onContextMenu={preventDefault}
      >
        <EditorComponent
          ref={editorRef}
          column={column}
          row={row}
          height={rowHeight}
          value={value}
          onCommit={onCommit}
          onCommitCancel={onCommitCancel}
          onOverrideKeyDown={onOverrideKeyDown}
        />
      </div>
    );
  };
}
