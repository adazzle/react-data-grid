import connect from '../stateManagement/Connect';
import Cell from '../Cell';
import EventTypes from '../stateManagement/EventTypes';

const mapDispatchToProps = (dispatch) => {
  return {
    onCellClick({ idx, rowIdx }) {
      dispatch(EventTypes.onCellClick, { idx, rowIdx });
    }
  };
};

const mapStateToProps = (state) => {
  const {isEditorEnabled, firstEditorKeyPress} = state;
  return {
    isEditorEnabled, firstEditorKeyPress
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cell);

