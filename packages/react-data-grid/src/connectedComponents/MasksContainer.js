import connect from '../stateManagement/Connect';
import EventTypes from '../stateManagement/EventTypes';
import InteractionMasks from '../masks/InteractionMasks';

const mapStateToProps = ({selectedPosition, isEditorEnabled, firstEditorKeyPress}) => ({selectedPosition, isEditorEnabled, firstEditorKeyPress});

const mapDispatchToProps = () => [EventTypes.editCell, EventTypes.selectCell];

const subscriptions = (updateStore) => {
  return {
    [EventTypes.selectCell]: ({idx, rowIdx}) => updateStore({selectedPosition: {idx, rowIdx}}),
    [EventTypes.editCell]: (isEditorEnabled, firstEditorKeyPress) => updateStore({isEditorEnabled, firstEditorKeyPress})
  };
};

export default connect(mapStateToProps, mapDispatchToProps, subscriptions)(InteractionMasks);
