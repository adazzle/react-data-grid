import { SelectCellFormatter } from './formatters';
import { useAllRowsSelected, useAllRowsSelectedChange } from './hooks';
import type { Column } from './types';
import { stopPropagation } from './utils/domUtils';

export const SELECT_COLUMN_KEY = 'select-row';

function HeaderRenderer() {
  const allRowsSelected = useAllRowsSelected();
  const onAllRowsSelectionChange = useAllRowsSelectedChange();

  return (
    <SelectCellFormatter
      aria-label="Select All"
      value={allRowsSelected}
      onChange={onAllRowsSelectionChange}
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
  headerRenderer: HeaderRenderer,
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
  },
  groupFormatter(props) {
    return (
      <SelectCellFormatter
        aria-label="Select Group"
        tabIndex={-1}
        isCellSelected={props.isCellSelected}
        value={props.isRowSelected}
        onChange={props.onRowSelectionChange}
        // Stop propagation to prevent row selection
        onClick={stopPropagation}
      />
    );
  }
};
