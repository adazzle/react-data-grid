import React, { useCallback } from 'react';
import { Delete } from '@material-ui/icons';

export default function GroupedColumnButton({ name, columnKey, onColumnGroupDeleted }) {
  const onClick = useCallback(
    () => onColumnGroupDeleted(columnKey),
    [columnKey, onColumnGroupDeleted]
  );

  return (
    <div className="grouped-col-btn btn">
      {name} <Delete onClick={onClick} />
    </div>
  );
}
