/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from 'react';

import { GroupRowRendererProps, RowGroupMetaData } from './GroupRowRenderer';
import { Omit } from '../../../../src';

type RowGroupProps<R, SR> = GroupRowRendererProps<R, SR> & RowGroupMetaData<R, SR> & {
  groupKey: string;
  name: string;
  renderer?: React.ComponentType;
};

export default forwardRef<HTMLDivElement, RowGroupProps<any, any>>(function RowGroup(props, ref) {
  function onRowExpandToggle(expand?: boolean) {
    const shouldExpand = expand == null ? !props.isExpanded : expand;
    props.onRowExpandToggle({ rowIdx: props.rowIdx, shouldExpand, columnGroupName: props.columnGroupName, name: props.name, groupKey: props.groupKey });
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
}) as <R, SR>(props: RowGroupProps<R, SR> & { ref?: React.Ref<HTMLDivElement> }) => JSX.Element;

interface DefaultBaseProps extends Omit<RowGroupProps<any, any>, 'onRowExpandToggle'> {
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

  const { treeDepth = 0, onRowExpandClick, isExpanded, columnGroupDisplayName, name } = props;
  const marginLeft = treeDepth * 20;

  return (
    <div
      className="rdg-row-default-group"
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
