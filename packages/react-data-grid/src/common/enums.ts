export enum CellExpand {
  DOWN_TRIANGLE = '\u25BC',
  RIGHT_TRIANGLE = '\u25B6'
}

export enum CellNavigationMode {
  NONE = 'none',
  CHANGE_ROW = 'changeRow',
  LOOP_OVER_ROW = 'loopOverRow'
}

export enum DragItemTypes {
  Column = 'column'
}

export enum EventTypes {
  SELECT_CELL = 'SELECT_CELL',
  SELECT_START = 'SELECT_START',
  SELECT_UPDATE = 'SELECT_UPDATE',
  SELECT_END = 'SELECT_END',
  DRAG_ENTER = 'DRAG_ENTER',
  SCROLL_TO_COLUMN = 'SCROLL_TO_COLUMN'
}

export enum HeaderRowType {
  HEADER = 'header',
  FILTER = 'filter'
}

export enum UpdateActions {
  CELL_UPDATE = 'CELL_UPDATE',
  COLUMN_FILL = 'COLUMN_FILL',
  COPY_PASTE = 'COPY_PASTE',
  CELL_DRAG = 'CELL_DRAG'
}
