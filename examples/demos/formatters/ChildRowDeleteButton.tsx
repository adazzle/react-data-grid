import React from 'react';
import { RemoveCircle } from '@material-ui/icons';

export interface ChildRowDeleteButtonProps {
  onDeleteSubRow(): void;
  isDeleteSubRowEnabled: boolean;
}

export function ChildRowDeleteButton({ onDeleteSubRow, isDeleteSubRowEnabled }: ChildRowDeleteButtonProps) {
  return (
    <>
      <div className="rdg-child-row-action-cross" />
      {isDeleteSubRowEnabled && (
        <div className="rdg-child-row-btn" style={{ left: 15 }} onClick={onDeleteSubRow}>
          <RemoveCircle />
        </div>
      )}
    </>
  );
}
