/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from 'react';
import { EventTypes } from './common/enums';
import { CellMetaData, IRowRendererProps, CalculatedColumn } from './common/types';
import EventBus from './EventBus';

interface Props<R> {
  height: number;
  columns: CalculatedColumn<R>[];
  row: unknown;
  cellRenderer?(): void;
  cellMetaData: CellMetaData<R>;
  isSelected?: boolean;
  idx: number;
  extraClasses?: string;
  forceUpdate?: boolean;
  subRowDetails?: unknown;
  isRowHovered?: boolean;
  colOverscanStartIdx: number;
  colOverscanEndIdx: number;
  columnGroupDisplayName: string;
  columnGroupName: string;
  isExpanded: boolean;
  treeDepth?: number;
  name: string;
  renderer?: React.ComponentType;
  eventBus: EventBus;
  renderBaseRow(p: IRowRendererProps<R>): React.ReactElement;
}

export default forwardRef<HTMLDivElement, Props<any>>(function RowGroup(props, ref) {
  function onRowExpandToggle(expand?: boolean) {
    const { onRowExpandToggle } = props.cellMetaData;
    if (onRowExpandToggle) {
      const shouldExpand = expand == null ? !props.isExpanded : expand;
      onRowExpandToggle({ rowIdx: props.idx, shouldExpand, columnGroupName: props.columnGroupName, name: props.name });
    }
  }

  function onRowExpandClick() {
    onRowExpandToggle(!props.isExpanded);
  }

  function onClick() {
    props.eventBus.dispatch(EventTypes.SELECT_CELL, { rowIdx: props.idx, idx: 0 });
  }

  const Renderer = props.renderer || DefaultBase;

  return (
    <div className="rdg-row-group" onClick={onClick}>
      <Renderer {...props} ref={ref} onRowExpandClick={onRowExpandClick} onRowExpandToggle={onRowExpandToggle} />
    </div>
  );
});

interface DefaultBaseProps extends Props<any> {
  onRowExpandClick(): void;
  onRowExpandToggle(expand?: boolean): void;
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
      className="rdg-row-default-group"
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
