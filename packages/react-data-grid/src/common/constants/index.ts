import * as CellNavigationMode from './CellNavigationMode';
import * as EventTypes from './EventTypes';
import * as HeaderRowType from './HeaderRowType';

enum UpdateActions {
  CELL_UPDATE = 'CELL_UPDATE',
  COLUMN_FILL = 'COLUMN_FILL',
  COPY_PASTE = 'COPY_PASTE',
  CELL_DRAG = 'CELL_DRAG'
}

enum DragItemTypes {
  Column = 'column'
}

enum CellExpand {
  DOWN_TRIANGLE = '\u25BC',
  RIGHT_TRIANGLE = '\u25B6'
}

export {
  CellNavigationMode,
  EventTypes,
  HeaderRowType,
  UpdateActions,
  CellExpand,
  DragItemTypes
};
