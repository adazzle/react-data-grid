import { useRowSelection } from './hooks/useRowSelection';
import type { Column, RenderCellProps, RenderGroupCellProps, RenderHeaderCellProps } from './types';
import { SelectCellFormatter } from './cellRenderers';

export const SELECT_COLUMN_KEY = 'select-row';

function HeaderRenderer(props: RenderHeaderCellProps<unknown>) {
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

function SelectFormatter(props: RenderCellProps<unknown>) {
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

function SelectGroupFormatter(props: RenderGroupCellProps<unknown>) {
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
  renderHeaderCell(props) {
    return <HeaderRenderer {...props} />;
  },
  renderCell(props) {
    return <SelectFormatter {...props} />;
  },
  renderGroupCell(props) {
    return <SelectGroupFormatter {...props} />;
  }
};
