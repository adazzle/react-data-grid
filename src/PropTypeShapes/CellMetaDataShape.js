const PropTypes = require('react').PropTypes;

module.exports = {
  selected: PropTypes.object.isRequired,
  copied: PropTypes.object,
  dragged: PropTypes.object,
  onCellClick: PropTypes.func.isRequired,
  onCellDoubleClick: PropTypes.func.isRequired,
  onCommit: PropTypes.func.isRequired,
  onCommitCancel: PropTypes.func.isRequired,
  handleDragEnterRow: PropTypes.func.isRequired,
  handleTerminateDrag: PropTypes.func.isRequired
};
