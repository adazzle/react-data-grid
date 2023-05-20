import { css } from '@linaria/core';

const cellExpandClassname = css`
  /* needed on chrome */
  float: right;
  float: inline-end;
  display: table;
  block-size: 100%;

  > span {
    display: table-cell;
    vertical-align: middle;
    cursor: pointer;
  }
`;

interface CellExpanderFormatterProps {
  isCellSelected: boolean;
  expanded: boolean;
  onCellExpand: () => void;
}

export function CellExpanderFormatter({
  isCellSelected,
  expanded,
  onCellExpand
}: CellExpanderFormatterProps) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onCellExpand();
    }
  }

  return (
    <div className={cellExpandClassname}>
      <span onClick={onCellExpand} onKeyDown={handleKeyDown}>
        <span tabIndex={isCellSelected ? 0 : -1}>{expanded ? '\u25BC' : '\u25B6'}</span>
      </span>
    </div>
  );
}
