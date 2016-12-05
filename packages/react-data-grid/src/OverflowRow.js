import React from 'react';
import focusableComponentWrapper from './focusableComponentWrapper';
import '../../../themes/react-data-grid-row.css';

class OverflowRow extends React.Component {
  render() {
    return (<div tabIndex="-1" style={{ border: '1px solid #eee', height: this.props.height + 'px' }} width="100%" className="react-grid-Row"></div>);
  }
}

OverflowRow.isSelected = props => {
  const { cellMetaData, idx } = props;
  if (cellMetaData == null) { return false; }

  const { selected } = cellMetaData;

  return selected && selected.rowIdx === idx;
};

OverflowRow.isScrolling = props => props.cellMetaData.isScrollingVerticallyWithKeyboard;

OverflowRow.propTypes = {
  idx: React.PropTypes.number,
  height: React.PropTypes.number,
  cellMetaData: React.PropTypes.object
};

const OverflowRowComponent = OverflowRow;
export default focusableComponentWrapper(OverflowRow);
export { OverflowRowComponent };
