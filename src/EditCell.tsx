import { useState, useCallback } from 'react';
import { css } from '@linaria/core';

import { cellSelectedClassname } from './style';
import EditorContainer from './editors/EditorContainer';
import { getCellStyle, getCellClassname } from './utils';
import type { CellRendererProps, SharedEditorProps, Omit } from './types';

const cellEditing = css`
  padding: 0;
`;

const cellEditingClassname = `rdg-cell-editing ${cellEditing}`;

type SharedCellRendererProps<R, SR> = Pick<CellRendererProps<R, SR>,
  | 'rowIdx'
  | 'row'
  | 'column'
>;

interface EditCellProps<R, SR> extends SharedCellRendererProps<R, SR>, Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'children'> {
  editorProps: SharedEditorProps<R>;
}

export default function EditCell<R, SR>({
  className,
  column,
  row,
  rowIdx,
  editorProps,
  ...props
}: EditCellProps<R, SR>) {
  const [dimensions, setDimensions] = useState<{ left: number; top: number } | null>(null);

  const cellRef = useCallback(node => {
    if (node !== null) {
      const { left, top } = node.getBoundingClientRect();
      setDimensions({ left, top });
    }
  }, []);

  const { cellClass } = column;
  className = getCellClassname(
    column,
    cellSelectedClassname,
    cellEditingClassname,
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
      style={getCellStyle(column)}
      {...props}
    >
      {getCellContent()}
    </div>
  );
}
