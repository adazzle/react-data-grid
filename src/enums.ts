export enum CellNavigationMode {
  NONE = 'none',
  CHANGE_ROW = 'changeRow',
  LOOP_OVER_ROW = 'loopOverRow'
}

export enum UpdateActions {
  CELL_UPDATE = 'CELL_UPDATE',
  COLUMN_FILL = 'COLUMN_FILL',
  COPY_PASTE = 'COPY_PASTE',
  CELL_DRAG = 'CELL_DRAG'
}

export type SortDirection = 'ASC' | 'DESC' | 'NONE';
