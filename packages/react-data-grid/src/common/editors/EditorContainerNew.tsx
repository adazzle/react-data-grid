import React, { KeyboardEvent, useState, useRef } from 'react';
import { isElement, isValidElementType } from 'react-is';

import { CalculatedColumn, EditorProps, CommitEvent, Dimension, Omit } from '../types';
import SimpleTextEditorNew from './SimpleTextEditorNew';
import ClickOutside from './ClickOutside';
import { InteractionMasksProps, InteractionMasksState } from '../../masks/InteractionMasks';

type SharedInteractionMasksProps<R> = Pick<InteractionMasksProps<R>, 'scrollLeft' | 'scrollTop'>;
type SharedInteractionMasksState = Pick<InteractionMasksState, 'firstEditorKeyPress'>;

type ValueType<R> = R[keyof R];

export interface Props<R> extends SharedInteractionMasksProps<R>, SharedInteractionMasksState, Omit<Dimension, 'zIndex'> {
  rowIdx: number;
  rowData: R;
  value: ValueType<R>;
  column: CalculatedColumn<R>;
  onGridKeyDown?(e: KeyboardEvent): void;
  onCommit(e: CommitEvent<R>): void;
  onCommitCancel(): void;
}

// function usePrevious<T>(value: T) {
//   const ref = useRef<T>();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }

export default function EditorContainer<R>({
  scrollLeft,
  scrollTop,
  width,
  height,
  left,
  top,
  column,
  rowData,
  rowIdx,
  firstEditorKeyPress,
  ...props
}: Props<R>) {
  const [value, setValue] = useState(() => getInitialValue());
  const [hasResults] = useState(false);
  // const prevScrollLeft = usePrevious(scrollLeft);
  // const prevScrollTop = usePrevious(scrollTop);
  const changeCommitted = useRef(false);
  const changeCanceled = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // if (scrollLeft !== prevScrollLeft || scrollTop !== prevScrollTop) {
  //   props.onCommitCancel();
  // }

  function onKeyDown(e: KeyboardEvent<HTMLElement>) {
    switch (e.key) {
      case 'Enter':
        onPressEnter();
        break;
      case 'Tab':
        onPressTab();
        break;
      case 'Escape':
        onPressEscape(e);
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        onPressArrowUpOrDown(e);
        break;
      case 'ArrowLeft':
        onPressArrowLeft(e);
        break;
      case 'ArrowRight':
        onPressArrowRight(e);
        break;
      default:
        break;
    }

    if (props.onGridKeyDown) {
      props.onGridKeyDown(e);
    }
  }

  function onPressEnter() {
    onCommit({ key: 'Enter' });
  }

  function onPressTab() {
    onCommit({ key: 'Tab' });
  }

  function onPressEscape(e: KeyboardEvent) {
    console.log(e);
    onCommitCancel();
    // if (!editorIsSelectOpen()) {
    //   onCommitCancel();
    // } else {
    //   // prevent event from bubbling if editor has results to select
    //   e.stopPropagation();
    // }
  }

  function onPressArrowUpOrDown(e: KeyboardEvent) {
    if (hasResults) {
      // dont want to propogate as that then moves us round the grid
      e.stopPropagation();
    } else {
      onCommit(e);
    }
  }

  function onPressArrowLeft(e: KeyboardEvent) {
    // prevent event propogation. this disables left cell navigation
    if (!isCaretAtBeginningOfInput()) {
      e.stopPropagation();
    } else {
      onCommit(e);
    }
  }

  function onPressArrowRight(e: KeyboardEvent) {
    // prevent event propogation. this disables right cell navigation
    if (!isCaretAtEndOfInput()) {
      e.stopPropagation();
    } else {
      onCommit(e);
    }
  }

  function isCaretAtBeginningOfInput() {
    const inputNode = inputRef.current;
    return inputNode instanceof HTMLInputElement
      && inputNode.selectionEnd === 0;
  }

  function isCaretAtEndOfInput() {
    const inputNode = inputRef.current;
    return inputNode instanceof HTMLInputElement
      && inputNode.selectionStart === inputNode.value.length;
  }

  function getRowMetaData() {
    // clone row data so editor cannot actually change this
    // convention based method to get corresponding Id or Name of any Name or Id property
    if (column.getRowMetaData) {
      return column.getRowMetaData(rowData, column);
    }
  }

  function getInitialValue(): ValueType<R> | string {
    if (firstEditorKeyPress === 'Delete' || firstEditorKeyPress === 'Backspace') {
      return '';
    }
    if (firstEditorKeyPress === 'Enter') {
      return props.value;
    }

    return firstEditorKeyPress || props.value;
  }

  function onCommit(args: { key?: string } = {}) {
    changeCommitted.current = true;
    props.onCommit({
      rowIdx,
      updated: {
        [column.key]: value
      } as never,
      cellKey: column.key,
      key: args.key
    });
  }

  function onCommitCancel() {
    changeCanceled.current = true;
    props.onCommitCancel();
  }

  function onContextMenu(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  let editor: React.ReactElement;
  type P = EditorProps<ValueType<R> | string, unknown, R>;
  const editorProps: P = {
    column,
    inputRef,
    value,
    rowData,
    height,
    onCommit,
    onCommitCancel,
    onBlur: onCommit,
    onChange: setValue,
    rowMetaData: getRowMetaData(),
    onOverrideKeyDown: onKeyDown
  };

  const CustomEditor = column.editor as React.ComponentType<P>;
  // return custom column editor or SimpleEditor if none specified
  if (isElement(CustomEditor)) {
    editor = React.cloneElement(CustomEditor, editorProps);
  } else if (isValidElementType(CustomEditor)) {
    editor = <CustomEditor {...editorProps} />;
  } else {
    editor = (
      <SimpleTextEditorNew
        inputRef={inputRef}
        value={value as unknown as string}
        onChange={setValue}
        onBlur={onCommit}
      />
    );
  }

  return (
    <ClickOutside onClickOutside={onCommit}>
      <div
        className="rdg-editor-container"
        style={{ height, width, left, top }}
        onKeyDown={onKeyDown}
        onContextMenu={onContextMenu}
      >
        {editor}
      </div>
    </ClickOutside>
  );
}
