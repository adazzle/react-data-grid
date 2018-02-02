import Cell from '../Cell';
import { connect } from '../stateManagement/state/RxState';
import initialState from '../stateManagement/state/initialState';


const isCellSelected = (selectedPosition, {idx, rowIdx}) => selectedPosition.idx === idx && selectedPosition.rowIdx === rowIdx;

const isCellEditing = ({selectedPosition, isEditing}, ownProps) => isCellSelected(selectedPosition, ownProps) && isEditing === true;

const isCellChanging = (state, ownProps) => {
  const {selectedPosition, lastSelectedPosition} = state;
  return isCellSelected(selectedPosition, ownProps) || isCellSelected(lastSelectedPosition, ownProps);
};

/* State Subscriber
  respond to changes in state, in order to re-render only when condition is met
*/

const stateSubscriber = ownProps => ({cell}) => {
  return false;
};

/* MapStateToProps */

const mapStateToProps = ({cell} = initialState, ownProps) => {
  const {selectedPosition, lastSelectedPosition} = cell;
  return {
    isSelected: isCellSelected(selectedPosition, ownProps),
    wasPreviouslySelected: isCellSelected(lastSelectedPosition, ownProps),
    isEditorEnabled: isCellEditing(cell, ownProps)
  };
};

module.exports = connect(mapStateToProps, [], stateSubscriber)(Cell);
