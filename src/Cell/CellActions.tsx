import React from 'react';

import CellAction from './CellAction';
import { CellMetaData, CellContentRendererProps } from '../common/types';

type CellActionsProps<R> = Pick<CellContentRendererProps<R>, 'column' | 'rowData'> & Pick<Required<CellMetaData<R>>, 'getCellActions'>;

export default function CellActions<R>({ getCellActions, column, rowData }: CellActionsProps<R>) {
  const cellActionButtons = getCellActions(column, rowData);
  if (cellActionButtons && cellActionButtons.length > 0) {
    const actionButtons = cellActionButtons.map((action, index) => {
      return <CellAction key={index} isFirst={index === 0} {...action} />;
    });

    return <>{actionButtons}</>;
  }
  return null;
}
