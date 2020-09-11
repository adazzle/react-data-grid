import React, { PropsWithChildren } from 'react';
import './rdg-toolbar.less';

interface Props {
  onAddRow: (arg: { newRowIndex: number }) => void;
  numberOfRows: number;
}

export default function Toolbar(props: PropsWithChildren<Props>) {
  function onAddRow() {
    props.onAddRow({ newRowIndex: props.numberOfRows });
  }

  return (
    <div className="rdg-toolbar">
      <div className="tools">
        <button type="button" className="btn" onClick={onAddRow}>Add Row</button>
        {props.children}
      </div>
    </div>
  );
}
