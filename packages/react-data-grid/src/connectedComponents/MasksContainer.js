import connect from '../stateManagement/Connect';
import EventTypes from '../stateManagement/EventTypes';
import InteractionMasks from '../masks/InteractionMasks';

const mapStateToProps = ({selectedPosition, isEditorEnabled, firstEditorKeyPress}) => ({selectedPosition, isEditorEnabled, firstEditorKeyPress});

const mapDispatchToProps = () => [EventTypes.editCell, EventTypes.selectCell, EventTypes.onCommit];

const subscriptions = (updateStore) => {
  return {
    [EventTypes.selectCell]: ({idx, rowIdx}) => updateStore({selectedPosition: {idx, rowIdx}}),
    [EventTypes.editCell]: (firstEditorKeyPress) => updateStore({isEditorEnabled: true, firstEditorKeyPress}),
    [EventTypes.onCommit]: () => updateStore({isEditorEnabled: false}),
    [EventTypes.onCommitCancel]: () => updateStore({isEditorEnabled: false})
  };
};

export default connect(mapStateToProps, mapDispatchToProps, subscriptions)(InteractionMasks);
