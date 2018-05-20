const PropTypes = require('prop-types');
const SortableHeaderCell    = require('../cells/headerCells/SortableHeaderCell');

const SortItemShape = PropTypes.shape({
  column: PropTypes.string,
  direction: PropTypes.oneOf(Object.keys(SortableHeaderCell.DEFINE_SORT))
});

const SortDataShape = PropTypes.arrayOf(SortItemShape);

module.exports = SortDataShape;
