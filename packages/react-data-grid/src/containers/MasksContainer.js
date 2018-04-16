import { connect, EventTypes } from '../stateManagement';
import InteractionMasks from '../masks/InteractionMasks';

const mapStateToProps = ({ selectedPosition, copiedPosition, draggedPosition, isEditorEnabled, firstEditorKeyPress }) => ({
  selectedPosition,
  copiedPosition,
  draggedPosition,
  isEditorEnabled,
  firstEditorKeyPress
});

const mapDispatchToProps = (dispatch, { onCommit }) => ({
  selectCell: ({ idx, rowIdx }) => dispatch({ idx, rowIdx, type: EventTypes.selectCell }),
  toggleCellEdit: (isEditorEnabled, firstEditorKeyPress) => dispatch({ isEditorEnabled, firstEditorKeyPress, type: EventTypes.toggleCellEdit }),
  onCommit: (...args) => {
    dispatch({ isEditorEnabled: false, type: EventTypes.onCommit });
    onCommit(...args);
  },
  onCommitCancel: () => dispatch({ isEditorEnabled: false, type: EventTypes.onCommitCancel }),
  copyCell: ({ idx, rowIdx, value }) => dispatch({ idx, rowIdx, value, type: EventTypes.copyCell }),
  cancelCopyCell: () => dispatch({ type: EventTypes.cancelCopyCell }),
  dragStart: ({ idx, rowIdx }) => dispatch({ idx, rowIdx, type: EventTypes.dragStart }),
  dragEnd: () => dispatch({ type: EventTypes.dragEnd })
});

export default connect(mapStateToProps, mapDispatchToProps)(InteractionMasks);
