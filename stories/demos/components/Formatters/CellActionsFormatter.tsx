import { useState } from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import { usePopper } from 'react-popper';
import { createPortal } from 'react-dom';

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
  const [reference, setReference] = useState<HTMLDivElement | null>(null);
  const [popper, setPopper] = useState<HTMLDivElement | null>(null);
  const { styles } = usePopper(reference, popper, {
    placement: 'bottom-start',
    modifiers: [{ name: 'offset', options: { offset: [0, -8] } }]
  });

  const cellActionClasses = clsx('rdg-cell-action', {
    'rdg-cell-action-last': isFirst
  });

  const actionButtonClasses = clsx('rdg-cell-action-button', {
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
      <div ref={setReference} className={actionButtonClasses} onClick={onActionIconClick}>
        {icon}
      </div>
      {isOpen && actions && actions.length && createPortal(
        <div ref={setPopper} className="rdg-cell-action-menu" style={styles.popper}>
          {actions.map((action, index) => <span key={index} onClick={action.callback}>{action.text}</span>)}
        </div>,
        document.body
      )}
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
