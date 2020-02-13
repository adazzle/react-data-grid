import React, { useEffect } from 'react';

import { CalculatedColumn, CommitEvent } from '../common/types';
import { InteractionMasksProps } from '../masks/InteractionMasks';
import EditorPortal from './EditorPortal';
import OldEditorContainer from './EditorContainer';
import NewEditorContainer2 from './EditorContainer2';

type SharedInteractionMasksProps<R, SR> = Pick<InteractionMasksProps<R, SR>,
  | 'canvasRef'
  | 'editorPortalTarget'
  | 'rowHeight'
  | 'scrollTop'
  | 'scrollLeft'
>;

export interface EditorContainerWrapperProps<R, SR> extends SharedInteractionMasksProps<R, SR> {
  rowIdx: number;
  row: R;
  column: CalculatedColumn<R, SR>;
  onCommit(e: CommitEvent): void;
  onCommitCancel(): void;
  firstEditorKeyPress: string | null;
}

export default function EditorContainerWrapper<R, SR>({
  column,
  row,
  rowIdx,
  scrollTop,
  scrollLeft,
  rowHeight,
  canvasRef,
  editorPortalTarget,
  firstEditorKeyPress,
  onCommit,
  onCommitCancel
}: EditorContainerWrapperProps<R, SR>) {
  // close editor when scrolling
  useEffect(() => onCommitCancel, [scrollTop, scrollLeft, onCommitCancel]);

  function getContainerStyle(): React.CSSProperties | undefined {
    if (!canvasRef.current) return;
    const { left, top } = canvasRef.current.getBoundingClientRect();
    const { scrollTop: docTop, scrollLeft: docLeft } = document.scrollingElement || document.documentElement;
    return {
      left: left + docLeft + column.left - (column.frozen ? 0 : scrollLeft),
      top: top + docTop + rowIdx * rowHeight - scrollTop,
      width: column.width,
      height: rowHeight
    };
  }

  return (

    <EditorPortal target={editorPortalTarget}>
      {column.editor2 !== undefined
        ? (
          <NewEditorContainer2
            column={column}
            row={row}
            rowIdx={rowIdx}
            onCommit={onCommit}
            onCommitCancel={onCommitCancel}
            style={getContainerStyle()}
          />
        )
        : (
          <OldEditorContainer
            column={column}
            row={row}
            rowIdx={rowIdx}
            onCommit={onCommit}
            onCommitCancel={onCommitCancel}
            firstEditorKeyPress={firstEditorKeyPress}
            style={getContainerStyle()}
          />
        )}
    </EditorPortal>
  );
}
