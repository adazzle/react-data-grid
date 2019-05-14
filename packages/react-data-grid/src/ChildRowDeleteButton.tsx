import React from 'react';

export interface ChildRowDeleteButtonProps {
  treeDepth: number;
  cellHeight: number;
  onDeleteSubRow(): void;
  isDeleteSubRowEnabled: boolean;
}

export default function ChildRowDeleteButton({ treeDepth, cellHeight, onDeleteSubRow, isDeleteSubRowEnabled }: ChildRowDeleteButtonProps) {
  const height = 12;
  const width = 12;
  const left = treeDepth * 15;
  const top = (cellHeight - 12) / 2;
  return (
    <div>
      <div className="rdg-child-row-action-cross" />
      {isDeleteSubRowEnabled && (
        <div style={{ left, top, width, height }} className="rdg-child-row-btn" onClick={onDeleteSubRow}>
          <div className="glyphicon glyphicon-remove-sign" />
        </div>
      )}
    </div>
  );
}
