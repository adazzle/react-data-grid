import React from 'react';
import classNames from 'classnames';

const ChildRowDeleteButton = ({treeDepth, cellHeight, siblingIndex, numberSiblings, onDeleteSubRow}) => {
  const firstSibling = siblingIndex === 0;
  const lastSibling = siblingIndex === numberSiblings - 1;
  let className = classNames(
    { 'rdg-child-row-action-cross-first': firstSibling },
    { 'rdg-child-row-action-cross-last': lastSibling },
    { 'rdg-child-row-action-cross': !firstSibling && !lastSibling }
  );
  const height = 12;
  const width = 12;
  let left = treeDepth * 15;
  let top = (cellHeight - 12) / 2;
  return (<div>
    <div className={className} />
    <div style={{ left: left, top: top, width: width, height: height }} className="rdg-child-row-remove-btn" onClick={onDeleteSubRow}>
      <div
        >X</div>
    </div></div>);
};

export default ChildRowDeleteButton;
