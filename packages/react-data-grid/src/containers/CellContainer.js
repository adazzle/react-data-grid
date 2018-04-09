import { connect, EventTypes } from '../stateManagement';
import Cell from '../Cell';

const mapStateToProps = ({ copiedPosition }, { rowIdx, idx } = {}) => {
  const isCopied = copiedPosition != null ? copiedPosition.rowIdx === rowIdx && copiedPosition.idx === idx : false;

  return {
    isCopied
  };
};
const mapDispatchToProps = (dispatch) => ({
  selectCell: ({ idx, rowIdx }) => dispatch({
    idx,
    rowIdx,
    type: EventTypes.selectCell
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
