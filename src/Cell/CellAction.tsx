import React, { useState } from 'react';
import classNames from 'classnames';

import { CellActionButton } from '../common/types';

export interface CellActionProps extends CellActionButton {
  isFirst: boolean;
}

export default function CellAction({ icon, actions, callback, isFirst }: CellActionProps) {
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
