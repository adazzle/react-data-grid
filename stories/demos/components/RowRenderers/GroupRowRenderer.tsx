import React from 'react';

import { Row, RowRendererProps } from '../../../../src';
import RowGroup from './RowGroup';

import './GroupRowRenderer.less';

export interface RowData<R, SR> {
  name?: string;
  groupKey?: string;
  __metaData?: RowGroupMetaData<R, SR>;
}

export interface RowGroupMetaData<R, SR> {
  isGroup: boolean;
  treeDepth: number;
  isExpanded: boolean;
  columnGroupName: string;
  columnGroupDisplayName: string;
  getRowRenderer?: (props: RowRendererProps<R, SR>, rowIdx: number) => React.ReactElement;
}

export interface RowExpandToggleEvent {
  rowIdx: number;
  shouldExpand: boolean;
  columnGroupName: string;
  name: string;
  groupKey: string;
}

export interface GroupRowRendererProps<R, SR> extends RowRendererProps<R, SR> {
  onRowExpandToggle: (event: RowExpandToggleEvent) => void;
  rowGroupRenderer?: React.ComponentType;
}

export function GroupRowRenderer<R extends RowData<R, SR>, SR>(props: GroupRowRendererProps<R, SR>) {
  const { __metaData } = props.row;

  if (__metaData) {
    if (__metaData.getRowRenderer) {
      return __metaData.getRowRenderer(props, props.rowIdx);
    }
    if (__metaData.isGroup) {
      return (
        <RowGroup<R, SR>
          {...props}
          {...__metaData}
          name={props.row.name!}
          groupKey={props.row.groupKey!}
        />
      );
    }
  }

  return <Row {...props} />;
}
