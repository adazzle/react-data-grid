import React from 'react';
import { SelectCellFormatter } from './formatters';
import { Column } from './common/types';

// TODO: fix type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SelectColumn: Column<any, any, any> = {
  key: 'select-row',
  name: '',
  width: 60,
  filterable: false,
  frozen: true,
  headerRenderer(props) {
    return (
      <SelectCellFormatter
        value={props.allRowsSelected}
        onChange={props.onAllRowsSelectionChange}
      />
    );
  },
  cellContentRenderer(props) {
    return props.isSummaryRow ? null : (
      <SelectCellFormatter
        value={props.isRowSelected}
        onChange={(value, isShiftClick) => props.onRowSelectionChange(props.rowIdx, props.rowData, value, isShiftClick)}
      />
    );
  }
};
