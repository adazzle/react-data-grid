import React, { PropsWithChildren } from 'react';
import './rdg-toolbar.less';

interface Props {
  onAddRow?: (arg: { newRowIndex: number }) => void;
  onToggleFilter?: () => void;
  enableFilter?: boolean;
  numberOfRows: number;
  addRowButtonText?: string;
  filterRowsButtonText?: string;
}

export default function Toolbar(props: PropsWithChildren<Props>) {
  function onAddRow() {
    props.onAddRow?.({ newRowIndex: props.numberOfRows });
  }

  return (
    <div className="rdg-toolbar">
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
