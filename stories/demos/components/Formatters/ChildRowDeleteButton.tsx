import React from 'react';

export interface ChildRowDeleteButtonProps {
  onDeleteSubRow: () => void;
  isDeleteSubRowEnabled: boolean;
}

export function ChildRowDeleteButton({ onDeleteSubRow, isDeleteSubRowEnabled }: ChildRowDeleteButtonProps) {
  return (
    <>
      <div className="rdg-child-row-action-cross" />
      {isDeleteSubRowEnabled && (
        <div className="rdg-child-row-btn" onClick={onDeleteSubRow}>
          ❌
        </div>
      )}
    </>
  );
}
