import { connect, EventTypes } from '../stateManagement';
import InteractionMasks from '../masks/InteractionMasks';

const mapStateToProps = ({ selectedPosition, isEditorEnabled, firstEditorKeyPress }) => ({ selectedPosition, isEditorEnabled, firstEditorKeyPress });
const mapDispatchToProps = (dispatch) => ({
  selectCell: ({ idx, rowIdx }) => dispatch({
    idx,
    rowIdx,
    type: EventTypes.selectCell
  }),
  toggleCellEdit: (isEditorEnabled, firstEditorKeyPress) => dispatch({
    isEditorEnabled,
    firstEditorKeyPress,
    type: EventTypes.toggleCellEdit
  }),
  onCommit: () => dispatch({ isEditorEnabled: false, type: EventTypes.onCommit }),
  onCommitCancel: () => dispatch({ isEditorEnabled: false, type: EventTypes.onCommitCancel })
});

export default connect(mapStateToProps, mapDispatchToProps)(InteractionMasks);
