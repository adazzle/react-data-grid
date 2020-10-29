import React, { useState, useCallback } from 'react';
import clsx from 'clsx';

import EditorContainer from './editors/EditorContainer';
import { CellRendererProps, SharedEditorContainerProps, SharedEditorProps } from './types';

type SharedCellRendererProps<R, SR> = Pick<CellRendererProps<R, SR>,
  | 'rowIdx'
  | 'row'
  | 'column'
>;

interface EditCellRendererProps<R, SR> extends SharedCellRendererProps<R, SR>, Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'children'> {
  editorPortalTarget: Element;
  editorContainerProps: SharedEditorContainerProps;
  editorProps: SharedEditorProps<R>;
}

export default function EditCell<R, SR>({
  className,
  column,
  row,
  rowIdx,
  editorPortalTarget,
  editorContainerProps,
  editorProps,
  onKeyDown,
  ...props
}: EditCellRendererProps<R, SR>) {
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
      'rdg-cell-frozen-last': column.isLastFrozenColumn
    },
    'rdg-cell-selected',
    'rdg-cell-editing',
    typeof cellClass === 'function' ? cellClass(row) : cellClass,
    className
  );

  function getCellContent() {
    if (dimensions === null) return;
    const { scrollTop: docTop, scrollLeft: docLeft } = document.scrollingElement ?? document.documentElement;
    const { left, top } = dimensions;
    const gridLeft = left + docLeft;
    const gridTop = top + docTop;

    return (
      <EditorContainer
        {...editorProps}
        editorPortalTarget={editorPortalTarget}
        rowIdx={rowIdx}
        column={column}
        left={gridLeft}
        top={gridTop}
      />
    );
  }

  return (
    <div
      role="gridcell"
      aria-colindex={column.idx + 1} // aria-colindex is 1-based
      aria-selected
      ref={cellRef}
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
