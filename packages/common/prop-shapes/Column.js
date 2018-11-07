import PropTypes from 'prop-types';

module.exports = PropTypes.shape({
  name: PropTypes.node.isRequired,
  key: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  filterable: PropTypes.bool
});
