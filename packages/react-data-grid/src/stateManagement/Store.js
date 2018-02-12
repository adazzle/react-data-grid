let state = {
  selectedPosition: {
    idx: -1,
    rowIdx: -1
  },
  isEditorEnabled: false,
  firstEditorKeyPress: null
};

export const createStore = () => ({
  getState() {
    return state;
  },
  updateStore(newState) {
    state = {...state, ...newState};
  }
});
