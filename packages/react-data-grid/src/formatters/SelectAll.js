import React from 'react';
import PropTypes from 'prop-types';

export default function SelectAll(props) {
  return (
    <label className="react-grid-checkbox-container checkbox-align">
      <input
        className="react-grid-checkbox"
        type="checkbox"
        ref={props.inputRef}
        onChange={props.onChange}
      />
      <span className="react-grid-checkbox-label" />
    </label>
  );
}

SelectAll.propTypes = {
  onChange: PropTypes.func,
  inputRef: PropTypes.func
};
