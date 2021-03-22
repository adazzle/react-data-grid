import clsx from "clsx";
import React, { forwardRef, memo, useRef } from "react";
import { useCombinedRefs } from "./hooks";
import type { CellRendererProps } from "./types";
import { getCellStyle, wrapEvent } from "./utils";

function Cell<R, SR>(
  {
    className,
    column,
    isCellSelected,
    isCopied,
    isDraggedOver,
    isRowSelected,
    row,
    rowIdx,
    dragHandleProps,
    onRowClick,
    onClick,
    onDoubleClick,
    onContextMenu,
    onRowChange,
    selectCell,
    selectRow,
    ...props
  }: CellRendererProps<R, SR>,
  ref: React.Ref<HTMLDivElement>
) {
  const cellRef = useRef<HTMLDivElement>(null);

  const { cellClass } = column;
  className = clsx(
    "rdg-cell",
    {
      "rdg-cell-frozen": column.frozen,
      "rdg-cell-frozen-last": column.isLastFrozenColumn,
      "rdg-cell-selected": isCellSelected,
      "rdg-cell-copied": isCopied,
      "rdg-cell-dragged-over": isDraggedOver,
    },
    typeof cellClass === "function" ? cellClass(row) : cellClass,
    className
  );

  function selectCellWrapper(openEditor?: boolean) {
    selectCell({ idx: column.idx, rowIdx }, openEditor);
  }

  function handleClick(event: React.MouseEvent) {
    selectCellWrapper(column.editorOptions?.editOnClick);
    onRowClick?.(rowIdx, row, column, event);
  }

  function handleContextMenu() {
    selectCellWrapper();
  }

  function handleDoubleClick() {
    selectCellWrapper(true);
  }

  function handleRowChange(newRow: R) {
    onRowChange(rowIdx, newRow);
  }

  function onRowSelectionChange(checked: boolean, isShiftClick: boolean) {
    selectRow({ rowIdx, checked, isShiftClick });
  }

  return (
    <div
      role="gridcell"
      aria-colindex={column.idx + 1} // aria-colindex is 1-based
      aria-selected={isCellSelected}
      ref={useCombinedRefs(cellRef, ref)}
      className={className}
      style={getCellStyle(column)}
      onClick={wrapEvent(handleClick, onClick)}
      onDoubleClick={wrapEvent(handleDoubleClick, onDoubleClick)}
      onContextMenu={wrapEvent(handleContextMenu, onContextMenu)}
      {...props}
    >
      {!column.rowGroup && (
        <>
          <column.formatter
            column={column}
            rowIdx={rowIdx}
            row={row}
            isCellSelected={isCellSelected}
            isRowSelected={isRowSelected}
            onRowSelectionChange={onRowSelectionChange}
            onRowChange={handleRowChange}
          />
          {dragHandleProps && (
            <div className="rdg-cell-drag-handle" {...dragHandleProps} />
          )}
        </>
      )}
    </div>
  );
}

export default memo(forwardRef(Cell)) as <R, SR = unknown>(
  props: CellRendererProps<R, SR> & React.RefAttributes<HTMLDivElement>
) => JSX.Element;
