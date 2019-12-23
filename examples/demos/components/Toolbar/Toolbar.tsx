import React, { PropsWithChildren, useCallback } from 'react';
import './toolbar.less';

interface Props {
  onAddRow?(arg: { newRowIndex: number }): void;
  onToggleFilter?(): void;
  enableFilter?: boolean;
  numberOfRows: number;
  addRowButtonText?: string;
  filterRowsButtonText?: string;
}

export default function Toolbar(props: PropsWithChildren<Props>) {
  const onAddRow = useCallback(() => {
    props.onAddRow?.({ newRowIndex: props.numberOfRows });
  }, [props.numberOfRows, props.onAddRow]);

  return (
    <div className="react-grid-Toolbar">
      <div className="tools">
        {props.onAddRow && (
          <button type="button" className="btn" onClick={onAddRow}>
            {props.addRowButtonText || 'Add Row'}
          </button>
        )}
        {props.enableFilter && (
          <button type="button" className="btn" onClick={props.onToggleFilter}>
            {props.filterRowsButtonText || 'Filter Rows'}
          </button>
        )}
        {props.children}
      </div>
    </div>
  );
}
