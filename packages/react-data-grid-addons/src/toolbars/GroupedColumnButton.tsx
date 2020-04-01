import React, { useCallback } from 'react';

interface Props {
  name: string;
  columnKey: string;
  onColumnGroupDeleted: (columnKey: string) => void;
}

export default function GroupedColumnButton({ name, columnKey, onColumnGroupDeleted }: Props) {
  const onClick = useCallback(
    () => onColumnGroupDeleted(columnKey),
    [columnKey, onColumnGroupDeleted]
  );

  return (
    <div className="grouped-col-btn btn">
      {name} <div onClick={onClick} />
    </div>
  );
}
