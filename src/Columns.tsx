import React from 'react';
import { SelectCellFormatter } from './formatters';
import { Column } from './common/types';

// TODO: fix type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SelectColumn: Column<any, any> = {
  key: 'select-row',
  name: '',
  width: 35,
  maxWidth: 35,
  frozen: true,
  headerRenderer(props) {
    return (
      <SelectCellFormatter
        value={props.allRowsSelected}
        onChange={props.onAllRowsSelectionChange}
      />
    );
  },
  formatter(props) {
    return (
      <SelectCellFormatter
        value={props.isRowSelected}
        onChange={props.onRowSelectionChange}
      />
    );
  }
};
