import React from 'react';
import classNames from 'classnames';

const ChildRowDeleteButton = ({treeDepth, cellHeight, siblingIndex, numberSiblings, onDeleteSubRow, isDeleteSubRowEnabled, allowAddChildRow = true }) => {
  const lastSibling = siblingIndex === numberSiblings - 1;
  let className = classNames(
    { 'rdg-child-row-action-cross': allowAddChildRow === true || !lastSibling },
    { 'rdg-child-row-action-cross-last': allowAddChildRow === false && (lastSibling || numberSiblings === 1) }
  );
  const height = 12;
  const width = 12;
  let left = treeDepth * 15;
  let top = (cellHeight - 12) / 2;
  return (<div>
    <div className={className} />
    {isDeleteSubRowEnabled && <div style={{ left: left, top: top, width: width, height: height }} className="rdg-child-row-btn" onClick={onDeleteSubRow}>
      <div className="glyphicon glyphicon-remove-sign"></div>
    </div>}</div>);
};

export default ChildRowDeleteButton;
