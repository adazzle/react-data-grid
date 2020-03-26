/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from 'react';
import { RowExpandToggleEvent, Omit, CellRendererProps } from './common/types';
import EventBus from './EventBus';

interface Props<R, SR> {
  height: number;
  row: unknown;
  cellRenderer?: React.ComponentType<CellRendererProps<R, SR>>;
  isSelected?: boolean;
  rowIdx: number;
  forceUpdate?: boolean;
  isRowHovered?: boolean;
  columnGroupDisplayName: string;
  columnGroupName: string;
  isExpanded: boolean;
  treeDepth?: number;
  name: string;
  renderer?: React.ComponentType;
  eventBus: EventBus;
  onRowExpandToggle?: (event: RowExpandToggleEvent) => void;
}

export default forwardRef<HTMLDivElement, Props<any, any>>(function RowGroup(props, ref) {
  function onRowExpandToggle(expand?: boolean) {
    const { onRowExpandToggle } = props;
    if (onRowExpandToggle) {
      const shouldExpand = expand == null ? !props.isExpanded : expand;
      onRowExpandToggle({ rowIdx: props.rowIdx, shouldExpand, columnGroupName: props.columnGroupName, name: props.name });
    }
  }

  function onRowExpandClick() {
    onRowExpandToggle(!props.isExpanded);
  }

  function onClick() {
    props.eventBus.dispatch('SELECT_CELL', { rowIdx: props.rowIdx, idx: 0 });
  }

  const Renderer = props.renderer || DefaultBase;

  return (
    <div className="rdg-row-group" onClick={onClick}>
      <Renderer {...props} ref={ref} onRowExpandClick={onRowExpandClick} onRowExpandToggle={onRowExpandToggle} />
    </div>
  );
}) as <R, SR>(props: Props<R, SR> & { ref?: React.Ref<HTMLDivElement> }) => JSX.Element;

interface DefaultBaseProps extends Omit<Props<any, any>, 'onRowExpandToggle'> {
  onRowExpandClick: () => void;
  onRowExpandToggle: (expand?: boolean) => void;
}

const DefaultBase = forwardRef<HTMLDivElement, DefaultBaseProps>(function DefaultBase(props, ref) {
  function onKeyDown({ key }: React.KeyboardEvent) {
    const { onRowExpandToggle } = props;
    if (key === 'ArrowLeft') {
      onRowExpandToggle(false);
    }
    if (key === 'ArrowRight') {
      onRowExpandToggle(true);
    }
    if (key === 'Enter') {
      onRowExpandToggle(!props.isExpanded);
    }
  }

  const { treeDepth = 0, height, onRowExpandClick, isExpanded, columnGroupDisplayName, name } = props;
  const marginLeft = treeDepth * 20;

  return (
    <div
      className="rdg-row-group"
      style={{ height }}
      onKeyDown={onKeyDown}
      tabIndex={0}
      ref={ref}
    >
      <span
        className="rdg-row-expand-icon"
        style={{ marginLeft }}
        onClick={onRowExpandClick}
      >
        {isExpanded ? String.fromCharCode(9660) : String.fromCharCode(9658)}
      </span>
      <strong>{columnGroupDisplayName}: {name}</strong>
    </div>
  );
});
