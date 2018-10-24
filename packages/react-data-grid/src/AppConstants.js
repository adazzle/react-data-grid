import keyMirror from 'keymirror';

const constants = {
  UpdateActions: keyMirror({
    CELL_UPDATE: null,
    COLUMN_FILL: null,
    COPY_PASTE: null,
    CELL_DRAG: null
  }),
  DragItemTypes: {
    Column: 'column'
  },
  CellExpand: {
    DOWN_TRIANGLE: String.fromCharCode('9660'),
    RIGHT_TRIANGLE: String.fromCharCode('9654')
  }
};

module.exports = constants;
