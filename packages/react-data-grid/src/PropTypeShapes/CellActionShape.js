import PropTypes from 'prop-types';

const CellActionShape = {
  icon: PropTypes.string.isRequired,
  callback: PropTypes.func,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      callback: PropTypes.func
    })
  )
};

export default CellActionShape;
