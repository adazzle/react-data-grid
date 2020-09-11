export enum CellNavigationMode {
  none = 'none',
  changeRow = 'changeRow',
  loopOverRow = 'loopOverRow'
}

export enum UpdateActions {
  cellUpdate = 'CELL_UPDATE',
  columnFill = 'COLUMN_FILL',
  copyPaste = 'COPY_PASTE',
  cellDrag = 'CELL_DRAG'
}

export type SortDirection = 'ASC' | 'DESC' | 'NONE';
