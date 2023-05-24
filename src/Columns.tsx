import { useRowSelection } from './hooks/useRowSelection';
import type { Column, FormatterProps, GroupFormatterProps, HeaderRendererProps } from './types';
import { SelectCellFormatter } from './formatters';

export const SELECT_COLUMN_KEY = 'select-row';

function HeaderRenderer(props: HeaderRendererProps<unknown>) {
  const [isRowSelected, onRowSelectionChange] = useRowSelection();

  return (
    <SelectCellFormatter
      aria-label="Select All"
      tabIndex={props.tabIndex}
      value={isRowSelected}
      onChange={(checked) => {
        onRowSelectionChange({ type: 'HEADER', checked });
      }}
    />
  );
}

function SelectFormatter(props: FormatterProps<unknown>) {
  const [isRowSelected, onRowSelectionChange] = useRowSelection();

  return (
    <SelectCellFormatter
      aria-label="Select"
      tabIndex={props.tabIndex}
      value={isRowSelected}
      onChange={(checked, isShiftClick) => {
        onRowSelectionChange({ type: 'ROW', row: props.row, checked, isShiftClick });
      }}
    />
  );
}

function SelectGroupFormatter(props: GroupFormatterProps<unknown>) {
  const [isRowSelected, onRowSelectionChange] = useRowSelection();

  return (
    <SelectCellFormatter
      aria-label="Select Group"
      tabIndex={props.tabIndex}
      value={isRowSelected}
      onChange={(checked) => {
        onRowSelectionChange({ type: 'ROW', row: props.row, checked, isShiftClick: false });
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
    return <HeaderRenderer {...props} />;
  },
  formatter(props) {
    return <SelectFormatter {...props} />;
  },
  groupFormatter(props) {
    return <SelectGroupFormatter {...props} />;
  }
};
