var PropTypes = require('react').PropTypes;

module.exports = {
  selected    : PropTypes.object.isRequired,
  copied      : PropTypes.object,
  dragged     : PropTypes.object,
  onCellClick : PropTypes.func.isRequired
}
