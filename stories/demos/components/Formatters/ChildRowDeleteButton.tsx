import React, { useRef, useLayoutEffect } from 'react';

export interface ChildRowDeleteButtonProps {
  isCellSelected: boolean;
  isDeleteSubRowEnabled: boolean;
  onDeleteSubRow: () => void;
}

export function ChildRowDeleteButton({ isCellSelected, onDeleteSubRow, isDeleteSubRowEnabled }: ChildRowDeleteButtonProps) {
  const iconRef = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    if (!isCellSelected) return;
    iconRef.current?.focus({ preventScroll: true });
  }, [isCellSelected]);

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
