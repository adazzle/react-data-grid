import PropTypes from 'prop-types';
Object.assign = require('object-assign');

const action = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string,
  callback: PropTypes.func
};

export default Object.assign({}, action, { actions: PropTypes.arrayOf(action) });
