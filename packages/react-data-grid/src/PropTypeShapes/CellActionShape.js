import PropTypes from 'prop-types';

const action = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string,
  callback: PropTypes.func
};

module.exports = Object.assign({}, action, { actions: PropTypes.arrayOf(action) });
