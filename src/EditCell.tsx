import React, { forwardRef, useState, useCallback } from 'react';
import clsx from 'clsx';

import { EditorContainer, EditorContainer2, EditorPortal } from './editors';
import { CellRendererProps, SharedEditorContainerProps, SharedEditor2Props } from './types';
import { useCombinedRefs } from './hooks';

type SharedCellRendererProps<R, SR> = Pick<CellRendererProps<R, SR>,
| 'rowIdx'
| 'row'
| 'column'
| 'lastFrozenColumnIndex'
>;

interface EditCellRendererProps<R, SR> extends SharedCellRendererProps<R, SR>, Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'children'> {
  editorPortalTarget: Element;
  editorContainerProps: SharedEditorContainerProps;
  editor2Props: SharedEditor2Props<R>;
}

function EditCell<R, SR>({
  className,
  column,
  lastFrozenColumnIndex,
  row,
  rowIdx,
  editorPortalTarget,
  editorContainerProps,
  editor2Props,
  onKeyDown,
  ...props
}: EditCellRendererProps<R, SR>, ref: React.Ref<HTMLDivElement>) {
  const [dimensions, setDimensions] = useState<{ left: number; top: number } | null>(null);

  const cellRef = useCallback(node => {
    if (node !== null) {
      const { left, top } = node.getBoundingClientRect();
      setDimensions({ left, top });
    }
  }, []);

  const { cellClass } = column;
  className = clsx(
    'rdg-cell',
    {
      'rdg-cell-frozen': column.frozen,
      'rdg-cell-frozen-last': column.idx === lastFrozenColumnIndex
    },
    'rdg-cell-selected',
    'rdg-cell-editing',
    typeof cellClass === 'function' ? cellClass(row) : cellClass,
    className
  );

  function getCellContent() {
    if (dimensions === null) return;
    const { scrollTop: docTop, scrollLeft: docLeft } = document.scrollingElement || document.documentElement;
    const { left, top } = dimensions;
    const gridLeft = left + docLeft;
    const gridTop = top + docTop;

    if (column.editor2 !== undefined) {
      return (
        <EditorContainer2
          {...editor2Props}
          editorPortalTarget={editorPortalTarget}
          rowIdx={rowIdx}
          column={column}
          left={gridLeft}
          top={gridTop}
        />
      );
    }

    const editor = (
      <EditorContainer<R, SR>
        {...editorContainerProps}
        rowIdx={rowIdx}
        row={row}
        column={column}
        left={gridLeft}
        top={gridTop}
      />
    );

    if (column.editorOptions?.createPortal !== false) {
      return (
        <EditorPortal target={editorPortalTarget}>
          {editor}
        </EditorPortal>
      );
    }

    return editor;
  }

  return (
    <div
      role="gridcell"
      aria-colindex={column.idx + 1} // aria-colindex is 1-based
      aria-selected
      ref={useCombinedRefs(cellRef, ref)}
      className={className}
      style={{
        width: column.width,
        left: column.left
      }}
      onKeyDown={onKeyDown}
      {...props}
    >
      {getCellContent()}
    </div>
  );
}

export default forwardRef(EditCell) as <R, SR = unknown>(props: EditCellRendererProps<R, SR> & { ref?: React.Ref<HTMLDivElement> }) => JSX.Element;
