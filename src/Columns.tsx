import React from 'react';
import { SelectCellFormatter } from './formatters';
import { Column } from './types';
import { stopPropagation } from './utils';

// TODO: fix type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SelectColumn: Column<any, any> = {
  key: 'select-row',
  name: '',
  width: 35,
  maxWidth: 35,
  resizable: false,
  sortable: false,
  frozen: true,
  headerRenderer(props) {
    return (
      <SelectCellFormatter
        aria-label="Select All"
        value={props.allRowsSelected}
        onChange={props.onAllRowsSelectionChange}
      />
    );
  },
  formatter(props) {
    return (
      <SelectCellFormatter
        aria-label="Select"
        tabIndex={-1}
        isCellSelected={props.isCellSelected}
        value={props.isRowSelected}
        onClick={stopPropagation}
        onChange={props.onRowSelectionChange}
      />
    );
  }
};
