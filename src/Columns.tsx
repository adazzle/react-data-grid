import { SelectCellFormatter } from './formatters';
import { useRowSelection } from './hooks/useRowSelection';
import type { Column, FormatterProps, GroupFormatterProps } from './types';

export const SELECT_COLUMN_KEY = 'select-row';

function SelectFormatter(props: FormatterProps<unknown>) {
  const [isRowSelected, onRowSelectionChange] = useRowSelection();

  return (
    <SelectCellFormatter
      aria-label="Select"
      isCellSelected={props.isCellSelected}
      value={isRowSelected}
      onChange={(checked, isShiftClick) => {
        onRowSelectionChange({ row: props.row, checked, isShiftClick });
      }}
    />
  );
}

function SelectGroupFormatter(props: GroupFormatterProps<unknown>) {
  const [isRowSelected, onRowSelectionChange] = useRowSelection();

  return (
    <SelectCellFormatter
      aria-label="Select Group"
      isCellSelected={props.isCellSelected}
      value={isRowSelected}
      onChange={(checked) => {
        onRowSelectionChange({ row: props.row, checked, isShiftClick: false });
      }}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SelectColumn: Column<any, any> = {
  key: SELECT_COLUMN_KEY,
  name: '',
  width: 35,
  minWidth: 35,
  maxWidth: 35,
  resizable: false,
  sortable: false,
  frozen: true,
  headerRenderer(props) {
    return (
      <SelectCellFormatter
        aria-label="Select All"
        isCellSelected={props.isCellSelected}
        value={props.allRowsSelected}
        onChange={props.onAllRowsSelectionChange}
      />
    );
  },
  formatter(props) {
    return <SelectFormatter {...props} />;
  },
  groupFormatter(props) {
    return <SelectGroupFormatter {...props} />;
  }
};
