import { css } from '@linaria/core';

const cellDragHandle = css`
  cursor: move;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 8px;
  height: 8px;
  background-color: var(--selection-color);

  &:hover {
    width: 16px;
    height: 16px;
    border: 2px solid var(--selection-color);
    background-color: var(--background-color);
  }
`;

const cellDragHandleClassname = `rdg-cell-drag-handle ${cellDragHandle}`;

export default function DragHandle(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cellDragHandleClassname} {...props} />;
}
