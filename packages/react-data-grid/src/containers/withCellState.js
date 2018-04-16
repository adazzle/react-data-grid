import { connect, EventTypes } from '../stateManagement';

const mapStateToProps = ({ copiedPosition, draggedPosition }, { rowIdx, idx } = {}) => {
  const isCopied = copiedPosition != null ? copiedPosition.rowIdx === rowIdx && copiedPosition.idx === idx : false;
  const isDraggedOver = draggedPosition != null && draggedPosition.idx === idx && draggedPosition.overRowIdx !== undefined;
  const isDraggedOverUp = isDraggedOver && rowIdx < draggedPosition.rowIdx && rowIdx >= draggedPosition.overRowIdx;
  const isDraggedOverDown = isDraggedOver && rowIdx > draggedPosition.rowIdx && rowIdx <= draggedPosition.overRowIdx;

  return {
    isCopied,
    isDraggedOverUp,
    isDraggedOverDown
  };
};
const mapDispatchToProps = (dispatch) => ({
  selectCell: ({ idx, rowIdx }) => dispatch({ idx, rowIdx, type: EventTypes.selectCell }),
  dragEnter: ({ overRowIdx }) => dispatch({ overRowIdx, type: EventTypes.dragEnter })
});

// TODO: Decide how to optimize containers, may be use Redux
const shouldUpdate = (state, newState) => (
  state.isCopied !== newState.isCopied ||
  state.isDraggedOverDown !== newState.isDraggedOverDown ||
  state.isDraggedOverUp !== newState.isDraggedOverUp
);

export default function withCellState(Component) {
  return connect(mapStateToProps, mapDispatchToProps, shouldUpdate)(Component);
}
