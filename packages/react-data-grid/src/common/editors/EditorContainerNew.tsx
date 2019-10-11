import React, { KeyboardEvent, useState, useRef, useEffect } from 'react';
import { isElement, isValidElementType } from 'react-is';

import { CalculatedColumn, EditorProps, CommitEvent, Dimension, Omit } from '../types';
import SimpleTextEditorNew from './SimpleTextEditorNew';
import ClickOutside from './ClickOutside';
import { InteractionMasksProps, InteractionMasksState } from '../../masks/InteractionMasks';

type SharedInteractionMasksProps<R> = Pick<InteractionMasksProps<R>, 'scrollLeft' | 'scrollTop'>;
type SharedInteractionMasksState = Pick<InteractionMasksState, 'firstEditorKeyPress'>;

type ValueType<R> = R[keyof R];

function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export interface Props<R> extends SharedInteractionMasksProps<R>, SharedInteractionMasksState, Omit<Dimension, 'zIndex'> {
  rowIdx: number;
  rowData: R;
  value: ValueType<R>;
  column: CalculatedColumn<R>;
  onGridKeyDown?(e: KeyboardEvent): void;
  onCommit(e: CommitEvent<R>): void;
  onCommitCancel(): void;
}

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
  const changeCommitted = useRef(false);
  const changeCanceled = useRef(false);
  const prevScrollLeft = usePrevious(scrollLeft);
  const prevScrollTop = usePrevious(scrollTop);

  if (
    (prevScrollLeft !== undefined && prevScrollLeft !== scrollLeft)
    || (prevScrollTop !== undefined && prevScrollTop !== scrollTop)
  ) {
    props.onCommitCancel();
  }

  function onKeyDown(e: KeyboardEvent<HTMLElement>) {
    switch (e.key) {
      case 'Enter':
        onCommit({ key: 'Enter' });
        break;
      case 'Tab':
        onCommit({ key: 'Tab' });
        break;
      case 'Escape':
        onCommitCancel();
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        onCommit(e);
        break;
      case 'ArrowRight':
      case 'ArrowLeft':
        onCommit(e);
        break;
      default:
        break;
    }

    if (props.onGridKeyDown) {
      props.onGridKeyDown(e);
    }
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
    value,
    rowData,
    height,
    onCommit,
    onCommitCancel,
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
        value={value as unknown as string}
        onChange={setValue}
        onCommit={onCommit}
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
