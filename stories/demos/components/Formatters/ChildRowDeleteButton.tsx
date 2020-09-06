import React from 'react';
import { useFocusRef } from '../../../../src/hooks';

export interface ChildRowDeleteButtonProps {
  isCellSelected: boolean;
  isDeleteSubRowEnabled: boolean;
  onDeleteSubRow: () => void;
}

export function ChildRowDeleteButton({ isCellSelected, onDeleteSubRow, isDeleteSubRowEnabled }: ChildRowDeleteButtonProps) {
  const iconRef = useFocusRef<HTMLSpanElement>(isCellSelected);

  function handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      onDeleteSubRow();
    }
  }

  return (
    <>
      <div className="rdg-child-row-action-cross" />
      {isDeleteSubRowEnabled && (
        <div className="rdg-child-row-btn" onClick={onDeleteSubRow}>
          <span
            ref={iconRef}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
          >
            ❌
          </span>
        </div>
      )}
    </>
  );
}
