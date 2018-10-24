import * as CellNavigationMode from './CellNavigationMode';
import * as EventTypes from './EventTypes';
import * as HeaderRowType from './HeaderRowType';
import keyMirror from 'keymirror';


const UpdateActions = keyMirror({
  CELL_UPDATE: null,
  COLUMN_FILL: null,
  COPY_PASTE: null,
  CELL_DRAG: null
});

const DragItemTypes = {
  Column: 'column'
};

const CellExpand = {
  DOWN_TRIANGLE: String.fromCharCode(9660),
  RIGHT_TRIANGLE: String.fromCharCode(9654)
};


export {
  CellNavigationMode,
  EventTypes,
  HeaderRowType,
  UpdateActions,
  CellExpand,
  DragItemTypes
};
