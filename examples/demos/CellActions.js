import React, { useState } from 'react';
import classNames from 'classnames';

function CellAction({ icon, actions, callback, isFirst }) {
  const [isOpen, setIsOpen] = useState(false);

  const cellActionClasses = classNames('rdg-cell-action', {
    'rdg-cell-action-last': isFirst
  });

  const actionButtonClasses = classNames('rdg-cell-action-button', {
    'rdg-cell-action-button-toggled': isOpen
  });

  function onActionIconClick() {
    if (typeof callback === 'function') {
      callback();
    }

    if (actions && actions.length > 0) {
      setIsOpen(!isOpen);
    }
  }

  return (
    <div className={cellActionClasses} onMouseLeave={() => setIsOpen(false)}>
      <div className={actionButtonClasses} onClick={onActionIconClick}>
        {icon}
      </div>
      {
        isOpen && actions && actions.length && (
          <div className="rdg-cell-action-menu">
            {actions.map((action, index) => <span key={index} onClick={action.callback}>{action.text}</span>)}
          </div>
        )
      }
    </div>
  );
}
export default function CellActions({ actions }) {
  if (actions && actions.length > 0) {
    const actionButtons = actions.map((action, index) => {
      return <CellAction key={index} isFirst={index === 0} {...action} />;
    });

    return <>{actionButtons}</>;
  }
  return null;
}
