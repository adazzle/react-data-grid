import React from 'react';
import PropTypes from 'prop-types';
import focusableComponentWrapper from './focusableComponentWrapper';
import '../../../themes/react-data-grid-cell.css';

class OverflowCell extends React.Component {
  getStyle() {
    let style = {
      position: 'absolute',
      width: this.props.column.width,
      height: this.props.height,
      left: this.props.column.left,
      border: '1px solid #eee'
    };
    return style;
  }

  render() {
    return (<div tabIndex="-1" style={this.getStyle() } width="100%" className="react-grid-Cell"></div>);
  }
}

OverflowCell.isSelected = (props) => {
  const { cellMetaData, rowIdx, idx }  = props;
  if (cellMetaData == null) { return false; }

  const { selected } = cellMetaData;

  return selected && selected.rowIdx === rowIdx && selected.idx === idx;
};

OverflowCell.isScrolling = props => props.cellMetaData.isScrollingHorizontallyWithKeyboard;

OverflowCell.propTypes = {
  rowIdx: PropTypes.number,
  idx: PropTypes.number,
  height: PropTypes.number,
  column: PropTypes.object,
  cellMetaData: PropTypes.object
};

OverflowCell.displayName = 'Cell';

const OverflowCellComponent = OverflowCell;
export default focusableComponentWrapper(OverflowCell);
export { OverflowCellComponent };
