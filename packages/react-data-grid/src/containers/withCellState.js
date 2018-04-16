import { connect, EventTypes } from '../stateManagement';

const mapDispatchToProps = (dispatch) => ({
  selectCell: ({ idx, rowIdx }) => dispatch({ idx, rowIdx, type: EventTypes.selectCell }),
  dragEnter: ({ overRowIdx }) => dispatch({ overRowIdx, type: EventTypes.dragEnter })
});

// TODO: Decide how to optimize containers, may be use Redux
const shouldUpdate = () => false;

export default function withCellState(Component) {
  return connect(undefined, mapDispatchToProps, shouldUpdate)(Component);
}
