import React from 'react';
import PropTypes from 'prop-types';

import '../../../../../themes/react-data-grid-checkbox.css';

export default class CheckboxEditor extends React.Component {
  static propTypes = {
    value: PropTypes.bool,
    rowIdx: PropTypes.number,
    column: PropTypes.shape({
      key: PropTypes.string,
      onCellChange: PropTypes.func
    }),
    dependentValues: PropTypes.object
  };

  handleChange = (e) => {
    this.props.column.onCellChange(this.props.rowIdx, this.props.column.key, this.props.dependentValues, e);
  };

  render() {
    const checked = this.props.value != null ? this.props.value : false;

    return (
      <label className="react-grid-checkbox-container checkbox-align">
        <input className="react-grid-checkbox" type="checkbox" onChange={this.handleChange} checked={checked} />
        <span className="react-grid-checkbox-label" />
      </label>
    );
  }
}
