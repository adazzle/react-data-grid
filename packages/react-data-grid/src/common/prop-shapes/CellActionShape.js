import PropTypes from 'prop-types';

export default PropTypes.shape({
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  callback: PropTypes.func,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      callback: PropTypes.func
    })
  )
});
