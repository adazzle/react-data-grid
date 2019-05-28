import React, { useCallback } from 'react';

interface Props {
  name: string;
  columnKey: string;
  onColumnGroupDeleted(columnKey: string): void;
}

export default function GroupedColumnButton({ name, columnKey, onColumnGroupDeleted }: Props) {
  const onClick = useCallback(
    () => onColumnGroupDeleted(columnKey),
    [columnKey, onColumnGroupDeleted]
  );

  return (
    <div className="grouped-col-btn btn btn-sm">
      <span className="grouped-col-btn__name">{name}</span>
      <span className="grouped-col-btn__remove glyphicon glyphicon-trash" onClick={onClick} />
    </div>
  );
}
