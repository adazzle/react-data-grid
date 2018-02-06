import connect from '../stateManagement/Connect';
import EventTypes from '../stateManagement/EventTypes';
import InteractionMasks from '../masks/InteractionMasks';

const mapStateToProps = (selectedPosition) => {
  return {
    selectedPosition
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editCell(selectedPosition, keyCode) {
      dispatch(EventTypes.editCell, selectedPosition, keyCode);
    }
  };
};

const subscribeToEvents = (subscribe, setState) => {
  subscribe(EventTypes.onCellClick, (idx, rowIdx) => {
    setState({selectedPosition: {idx, rowIdx}});
  });
};

export default connect(mapStateToProps, mapDispatchToProps, subscribeToEvents)(InteractionMasks);
