import React from 'react';
const EmptyChildRow = ({treeDepth, cellHeight, onAddSubRow, AddNewText = 'Add New'}) => {
  const height = 12;
  const width = 12;
  let left = treeDepth * 15;
  let top = (cellHeight - 12) / 2;
  let style = {
    height: cellHeight,
    borderBottom: '1px solid #dddddd'
  };
  return (<div className="react-grid-Row" style={style}>
    <div className="react-grid-Cell" style={{ position: 'absolute', height: cellHeight, width: '100%' }}>
      <div className="rdg-empty-child-row" style={{ marginLeft: '30px', lineHeight: `${cellHeight}px` }}>
      <div className="'rdg-child-row-action-cross rdg-child-row-action-cross-last" />
      <div style={{ left: left, top: top, width: width, height: height }} className="rdg-child-row-btn" onClick={onAddSubRow}>
        <div className="glyphicon glyphicon-plus-sign"></div>
      </div>
        <a href="#">{AddNewText}</a>
      </div>
    </div>
  </div>);
};

export default EmptyChildRow;
