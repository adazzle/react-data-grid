import * as EventTypes from './EventTypes';

const getInitialState = () => ({
  selectedPosition: {
    idx: -1,
    rowIdx: -1
  },
  copiedPosition: null,
  draggedPosition: null,
  isEditorEnabled: false,
  firstEditorKeyPress: null
});

const handlers = {
  [EventTypes.selectCell]: (state, { idx, rowIdx }) => ({ ...state, selectedPosition: { idx, rowIdx } }),
  [EventTypes.toggleCellEdit]: (state, { isEditorEnabled, firstEditorKeyPress }) => ({ ...state, isEditorEnabled, firstEditorKeyPress }),
  [EventTypes.onCommit]: (state) => ({ ...state, isEditorEnabled: false }),
  [EventTypes.onCommitCancel]: (state) => ({ ...state, isEditorEnabled: false }),
  [EventTypes.copyCell]: (state, { idx, rowIdx, value }) => ({ ...state, copiedPosition: { idx, rowIdx, value } }),
  [EventTypes.cancelCopyCell]: (state) => ({ ...state, copiedPosition: null }),
  [EventTypes.dragStart]: (state, { idx, rowIdx }) => ({ ...state, draggedPosition: { idx, rowIdx } }),
  [EventTypes.dragEnter]: (state, { overRowIdx }) => {
    const { draggedPosition } = state;
    return { ...state, draggedPosition: { ...draggedPosition, overRowIdx } };
  },
  [EventTypes.dragEnd]: (state) => ({ ...state, draggedPosition: null })
};

export default function reducer(state = getInitialState(), action) {
  return handlers[action.type] ? handlers[action.type](state, action) : state;
}
