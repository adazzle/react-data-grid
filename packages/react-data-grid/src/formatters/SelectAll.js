import React from 'react';
import PropTypes from 'prop-types';

const SelectAll = (props) => {
  return (
    <div className="react-grid-checkbox-container checkbox-align">
      <input
        className="react-grid-checkbox"
        type="checkbox"
        name="select-all-checkbox"
        id="select-all-checkbox"
        ref={props.inputRef}
        onChange={props.onChange}
      />
      <label htmlFor="select-all-checkbox" className="react-grid-checkbox-label"></label>
    </div>
  );
};

SelectAll.propTypes = {
  onChange: PropTypes.func,
  inputRef: PropTypes.func
};

export default SelectAll;
