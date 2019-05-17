import React from 'react';

interface Props {
  onAddRow?(arg: { newRowIndex: number }): void;
  onToggleFilter?(): void;
  enableFilter?: boolean;
  numberOfRows: number;
  addRowButtonText: string;
  filterRowsButtonText: string;
  children: React.ReactNode;
}

export default function Toolbar(props: Props) {
  function onAddRow() {
    props.onAddRow!({ newRowIndex: props.numberOfRows });
  }

  return (
    <div className="react-grid-Toolbar">
      <div className="tools">
        {props.onAddRow && (
          <button type="button" className="btn" onClick={onAddRow}>
            {props.addRowButtonText}
          </button>
        )}
        {props.enableFilter && (
          <button type="button" className="btn" onClick={props.onToggleFilter}>
            {props.filterRowsButtonText}
          </button>
        )}
        {props.children}
      </div>
    </div>
  );
}

Toolbar.defaultProps = {
  addRowButtonText: 'Add Row',
  filterRowsButtonText: 'Filter Rows'
};
