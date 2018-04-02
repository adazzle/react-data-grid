import { connect, EventTypes } from '../stateManagement';
import Cell from '../Cell';

// const mapEventsToProps = () => [EventTypes.selectCell];
// const mapStateToProps = () => { };
// export default connect(mapStateToProps, mapEventsToProps)(Cell);

const mapDispatchToProps = (dispatch) => ({
  selectCell: ({ idx, rowIdx }) => dispatch({
    idx,
    rowIdx,
    type: EventTypes.selectCell
  })
});
export default connect(undefined, mapDispatchToProps)(Cell);

