import React from 'react';
import EditorPortal from './EditorPortal';
import { CalculatedColumn } from '../common/types';
import { InteractionMasksProps } from '../masks/InteractionMasks';
import { UpdateActions } from '../common/enums';

interface EditorContainerProps<R, K extends keyof R> extends Pick<InteractionMasksProps<R, K>, 'canvasRef' | 'rowHeight' | 'scrollTop' | 'scrollLeft' | 'onRowsUpdate'> {
  column: CalculatedColumn<R>;
  row: R;
  rowIdx: number;
}

export default function EditorContainer<R, K extends keyof R>({
  column,
  row,
  rowIdx,
  rowHeight,
  canvasRef,
  scrollTop,
  scrollLeft,
  onRowsUpdate
}: EditorContainerProps<R, K>) {
  const Editor = column.editor2!;

  function onChange<K extends keyof R>(rowUpdate: { [k in K]: R[k] }) {
    onRowsUpdate({
      cellKey: column.key,
      fromRow: rowIdx,
      toRow: rowIdx,
      updated: rowUpdate as never, // TODO: fix type, or data structure
      action: UpdateActions.CELL_UPDATE
    });
  }

  function getContainerStyle(): React.CSSProperties | undefined {
    if (!canvasRef.current) return;
    const { top, left } = canvasRef.current.getBoundingClientRect();
    const { scrollTop: docTop, scrollLeft: docLeft } = document.scrollingElement || document.documentElement;
    return {
      left: left + docLeft + column.left - (column.frozen ? 0 : scrollLeft),
      top: top + docTop + rowIdx * rowHeight - scrollTop,
      width: column.width,
      height: rowHeight
    };
  }

  return (
    <EditorPortal target={document.body}>
      <div className="rdg-editor-container" style={getContainerStyle()}>
        <Editor
          column={column}
          row={row}
          onChange={onChange}
        />
      </div>
    </EditorPortal>
  );
}
