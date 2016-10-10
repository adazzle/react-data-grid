import React from 'react';
import focusableComponentWrapper from './focusableComponentWrapper';

class OverflowCell extends React.Component {
  isSelected(props = this.props) {
    const { cellMetaData, rowIdx, idx }  = props;
    if (cellMetaData == null) { return false; }

    const { selected } = cellMetaData;

    return selected && selected.rowIdx === rowIdx && selected.idx === idx;
  }

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

OverflowCell.propTypes = {
  rowIdx: React.PropTypes.number,
  idx: React.PropTypes.number,
  height: React.PropTypes.number,
  column: React.PropTypes.object,
  cellMetaData: React.PropTypes.object
};

export default focusableComponentWrapper(OverflowCell);
