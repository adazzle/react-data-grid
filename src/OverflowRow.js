import React from 'react';
import focusableComponentWrapper from './focusableComponentWrapper';

class OverflowRow extends React.Component {
  isSelected(props = this.props) {
    const { cellMetaData, idx } = props;
    if (cellMetaData == null) { return false; }

    const { selected } = cellMetaData;

    return selected & selected.rowIdx === idx;
  }

  render() {
    return (<div tabIndex="-1" style={{ border: '1px solid #eee', height: this.props.height + 'px' }} width="100%" className="react-grid-Row"></div>);
  }
}

OverflowRow.propTypes = {
  idx: React.PropTypes.number,
  height: React.PropTypes.number,
  cellMetaData: React.PropTypes.object
};

export default focusableComponentWrapper(OverflowRow);
