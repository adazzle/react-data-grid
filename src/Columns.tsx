import { SelectCellFormatter } from './formatters';
import { useRowSelection, useRowSelectionChange } from './hooks';
import type { Column, FormatterProps, GroupFormatterProps } from './types';
import { stopPropagation } from './utils/domUtils';

export const SELECT_COLUMN_KEY = 'select-row';

function SelectFormatter(props: FormatterProps) {
  const isRowSelected = useRowSelection();
  const onRowSelectionChange = useRowSelectionChange();

  return (
    <SelectCellFormatter
      aria-label="Select"
      tabIndex={-1}
      isCellSelected={props.isCellSelected}
      value={isRowSelected}
      onClick={stopPropagation}
      onChange={onRowSelectionChange}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SelectGroupFormatter(props: GroupFormatterProps<any, any>) {
  const isRowSelected = useRowSelection();
  const onRowSelectionChange = useRowSelectionChange();

  return (
    <SelectCellFormatter
      aria-label="Select Group"
      tabIndex={-1}
      isCellSelected={props.isCellSelected}
      value={isRowSelected}
      onChange={onRowSelectionChange}
      // Stop propagation to prevent row selection
      onClick={stopPropagation}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SelectColumn: Column<any, any> = {
  key: SELECT_COLUMN_KEY,
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
  formatter: SelectFormatter,
  groupFormatter: SelectGroupFormatter
};
