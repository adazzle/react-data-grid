import React, { useRef, useEffect } from 'react';

export interface ChildRowDeleteButtonProps {
  isCellActive?: boolean;
  onDeleteSubRow: () => void;
  isDeleteSubRowEnabled: boolean;
}

export function ChildRowDeleteButton({ isCellActive, onDeleteSubRow, isDeleteSubRowEnabled }: ChildRowDeleteButtonProps) {
  const iconRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (isCellActive) {
      iconRef.current?.focus();
    }
  }, [isCellActive]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.key === 'Delete') {
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
