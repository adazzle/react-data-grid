/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import SelectCellFormatter from './formatters/SelectCellFormatter';
import {
  Column,
  FormatterProps,
  HeaderRowProps
} from './common/types';

// TODO: fix type
export const SelectColumn: Column<any> = {
  key: 'select-row',
  name: '',
  width: 60,
  filterable: false,
  frozen: true,
  headerRenderer: (props: HeaderRowProps<any>) => (
    <SelectCellFormatter
      value={props.allRowsSelected}
      onChange={props.onAllRowsSelectionChange}
    />
  ),
  formatter: (props: FormatterProps<boolean>) => (
    <SelectCellFormatter
      value={props.isRowSelected}
      onChange={(value, isShiftClick) => props.onRowSelectionChange(props.rowIdx, props.row, value, isShiftClick)}
    />
  )
};
