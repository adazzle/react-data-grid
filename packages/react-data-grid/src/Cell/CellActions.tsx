import React from 'react';

import { CellMetaData } from '../common/types';
import CellAction from './CellAction';
import { CellProps } from '../Cell';

type CellActionsProps<R> = Pick<CellProps<R>, 'column' | 'rowData'> & Pick<CellMetaData<R>, 'getCellActions'>;

export default function CellActions<R>({ getCellActions, column, rowData }: CellActionsProps<R>) {
  if (getCellActions) {
    const cellActionButtons = getCellActions(column, rowData);
    if (cellActionButtons && cellActionButtons.length > 0) {
      const actionButtons = cellActionButtons.map((action, index) => {
        return <CellAction key={index} isFirst={index === 0} {...action} />;
      });

      return <>{actionButtons}</>;
    }
  }
  return null;
}
