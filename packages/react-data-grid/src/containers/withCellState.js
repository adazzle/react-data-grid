import { connect, EventTypes } from '../stateManagement';

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

export default function withCellState(Component) {
  return connect(mapStateToProps, mapDispatchToProps)(Component);
}
