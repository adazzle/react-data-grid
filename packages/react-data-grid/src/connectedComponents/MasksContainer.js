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

// const mapDispatchToProps = () => [EventTypes.toggleCellEdit, EventTypes.selectCell, EventTypes.onCommit];

// const subscriptions = (updateStore) => ({
//   [EventTypes.selectCell]: ({ idx, rowIdx }) => updateStore({ selectedPosition: { idx, rowIdx } }),
//   [EventTypes.toggleCellEdit]: (isEditorEnabled, firstEditorKeyPress) => updateStore({ isEditorEnabled, firstEditorKeyPress }),
//   [EventTypes.onCommit]: () => updateStore({ isEditorEnabled: false }),
//   [EventTypes.onCommitCancel]: () => updateStore({ isEditorEnabled: false })
// });

// export default connect(mapStateToProps, mapDispatchToProps, subscriptions)(InteractionMasks);

export default connect(mapStateToProps, mapDispatchToProps)(InteractionMasks);
