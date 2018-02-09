import connect from '../stateManagement/Connect';
import EventTypes from '../stateManagement/EventTypes';
import InteractionMasks from '../masks/InteractionMasks';

const mapStateToProps = ({selectedPosition}) => ({selectedPosition});

const mapDispatchToProps = () => [EventTypes.editCell, EventTypes.selectCell];

const subscriptions = (updateStore) => {
  return {
    [EventTypes.selectCell]: ({idx, rowIdx}) => updateStore({selectedPosition: {idx, rowIdx}})
  };
};

export default connect(mapStateToProps, mapDispatchToProps, subscriptions)(InteractionMasks);
