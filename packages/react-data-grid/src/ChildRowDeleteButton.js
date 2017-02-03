import React from 'react';
require('../../../themes/react-data-grid-cell.css');

const ChildRowDeleteButton = ({treeDepth, cellHeight, siblingIndex, numberSiblings}) => {
  let className = 'rdg-child-row-action-cross';
  if (siblingIndex === 0) {
    className = 'rdg-child-row-action-cross-first';
  } else if (siblingIndex === numberSiblings - 1) {
    className = 'rdg-child-row-action-cross-last';
  }
  const height = 12;
  const width = 12;
  let left = treeDepth * 15;
  let top = (cellHeight - 12) / 2;
  return (<div>
    <div className={className} />
    <div style={{ left: left, top: top, width: width, height: height }} className="rdg-child-row-remove-btn">
      <div
        >X</div>
    </div></div>);
};

export default ChildRowDeleteButton;
