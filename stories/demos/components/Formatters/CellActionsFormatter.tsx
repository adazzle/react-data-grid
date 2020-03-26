import React, { useState, ReactNode } from 'react';
import classNames from 'classnames';

import './CellActionsFormatter.less';

interface Action {
  text: ReactNode;
  callback: () => void;
}

interface CellActionButton {
  icon: ReactNode;
  actions?: Action[];
  callback?: () => void;
}

interface CellActionProps extends CellActionButton {
  isFirst: boolean;
}

function CellAction({ icon, actions, callback, isFirst }: CellActionProps) {
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

interface CellActionsFormatterProps {
  actions: CellActionButton[];
}

export function CellActionsFormatter({ actions }: CellActionsFormatterProps) {
  const actionButtons = actions.map((action, index) => {
    return <CellAction key={index} isFirst={index === 0} {...action} />;
  });

  return <>{actionButtons}</>;
}
