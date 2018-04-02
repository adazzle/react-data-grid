import * as EventTypes from './EventTypes';

const getInitialState = () => ({
  selectedPosition: {
    idx: -1,
    rowIdx: -1
  },
  isEditorEnabled: false,
  firstEditorKeyPress: null
});

const handlers = {
  [EventTypes.selectCell]: (state, { idx, rowIdx }) => ({ ...state, selectedPosition: { idx, rowIdx } }),
  [EventTypes.toggleCellEdit]: (state, { isEditorEnabled, firstEditorKeyPress }) => ({ ...state, isEditorEnabled, firstEditorKeyPress }),
  [EventTypes.onCommit]: (state) => ({ ...state, isEditorEnabled: false }),
  [EventTypes.onCommitCancel]: (state) => ({ ...state, isEditorEnabled: false })
};

export default function reducer(state = getInitialState(), action) {
  return handlers[action.type] ? handlers[action.type](state, action) : state;
}
