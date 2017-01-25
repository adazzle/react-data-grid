import keyMirror from 'fbjs/lib/keyMirror';

const constants = {
  UpdateActions: keyMirror({
    CELL_UPDATE: null,
    COLUMN_FILL: null,
    COPY_PASTE: null,
    CELL_DRAG: null
  }),
  DragItemTypes: {
    Column: 'column'
  }
};

module.exports = constants;
