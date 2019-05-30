import React from 'react';

import CellAction from './CellAction';
import { Props as CellProps } from '../Cell';

type CellActionsProps = Pick<CellProps,
'cellMetaData'
| 'column'
| 'rowData'
>;

export default function CellActions({ cellMetaData, column, rowData }: CellActionsProps) {
  if (cellMetaData.getCellActions) {
    const cellActionButtons = cellMetaData.getCellActions(column, rowData);
    if (cellActionButtons && cellActionButtons.length > 0) {
      const actionButtons = cellActionButtons.map((action, index) => {
        return <CellAction key={index} isFirst={index === 0} {...action} />;
      });

      return <>{actionButtons}</>;
    }
  }
  return null;
}
