import React, { PropTypes } from 'react';

class EmptyChildRow extends React.Component {

  constructor() {
    super();
    this.onAddSubRow = this.onAddSubRow.bind(this);
  }

  onAddSubRow() {
    this.props.onAddSubRow(this.props.lastSibling);
  }

  render() {
    let {cellHeight, treeDepth} = this.props;
    const height = 12;
    const width = 12;
    let left = treeDepth * 15;
    let top = (cellHeight - 12) / 2;
    let style = {
      height: cellHeight,
      borderBottom: '1px solid #dddddd'
    };
    let cellLeft = this.props.columns.filter(c => c.key === this.props.subRowDetails.field)[0].left;
    return (<div className="react-grid-Row" style={style}>
      <div className="react-grid-Cell" style={{ position: 'absolute', height: cellHeight, width: '100%', cellLeft: cellLeft }}>
        <div className="rdg-empty-child-row" style={{ marginLeft: '30px', lineHeight: `${cellHeight}px` }}>
          <div className="'rdg-child-row-action-cross rdg-child-row-action-cross-last" />
          <div style={{ left: left, top: top, width: width, height: height }} className="rdg-child-row-btn" onClick={this.onAddSubRow}>
            <div className="glyphicon glyphicon-plus-sign"></div>
          </div>
        </div>
      </div>
    </div>);
  }
}

EmptyChildRow.propTypes = {
  treeDepth: PropTypes.number.isRequired,
  cellHeight: PropTypes.number.isRequired,
  onAddSubRow: PropTypes.func.isRequired,
  lastSibling: PropTypes.object,
  columns: PropTypes.array.isRequired,
  subRowDetails: PropTypes.object.isRequired
};

export default EmptyChildRow;
