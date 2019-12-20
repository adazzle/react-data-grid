import classNames from 'classnames';
import React from 'react';
import {
  ConnectDropTarget,
  DragElementWrapper,
  DragSource,
  DragSourceCollector,
  DragSourceConnector,
  DragSourceMonitor,
  DragSourceOptions,
  DragSourceSpec,
  DropTarget,
  DropTargetCollector,
  DropTargetConnector,
  DropTargetMonitor,
  DropTargetSpec
} from 'react-dnd';
import { CalculatedColumn, Primitive } from '../common/types';

interface Row {
  [key: string]: Primitive | object;
}

interface RequiredProps<TRow> {
  column: CalculatedColumn<TRow, keyof TRow>;
  onHeaderDrop(source: string, target: string): void;
}

interface DragCollectProps {
  connectDragSource: DragElementWrapper<DragSourceOptions>;
  isDragging: boolean;
}

interface DropCollectProps<TRow> {
  connectDropTarget: ConnectDropTarget;
  isOver: boolean;
  canDrop: boolean;
  draggedHeader: Pick<CalculatedColumn<TRow, keyof TRow>, 'key'>;
}

interface Props<TRow> extends DragCollectProps, DropCollectProps<TRow>, RequiredProps<TRow> {
  children: React.ReactText | JSX.Element;
}

export type DraggableHeaderCellProps<TRow> = Pick<Props<TRow>, 'column' | 'onHeaderDrop' | 'children'>;

function DraggableHeaderCell<TRow>({
  connectDragSource,
  connectDropTarget,
  isDragging,
  isOver,
  canDrop,
  children
}: Props<TRow>): JSX.Element {
  // set drag source and drop target on header cell
  // width: 0 - otherwise drag clone was wrongly positioned
  return connectDragSource(
    connectDropTarget(
      <div
        className={classNames('rdg-draggable-header-cell', { 'rdg-can-drop': isOver && canDrop })}
        style={{ opacity: isDragging ? 0.2 : 1 }}
      >
        {children}
      </div>
    )!
  )!;
}

const headerCellSource: DragSourceSpec<RequiredProps<Row>, Pick<CalculatedColumn<Row>, 'key'>> = {
  beginDrag(props) {
    return {
      // source column
      key: props.column.key
    };
  },
  endDrag(props, monitor) {
    // check if drop was made in droppable zone
    if (monitor.didDrop()) {
      const { source, target } = monitor.getDropResult();
      return props.onHeaderDrop(source, target);
    }
  }
};

// drop target
const target: DropTargetSpec<RequiredProps<Row>> = {
  drop(props, monitor) {
    const source = monitor.getItem().key;
    const targetKey = props.column.key;
    return {
      source,
      target: targetKey
    };
  }
};

// drop source
function collect(connect: DragSourceConnector, monitor: DragSourceMonitor): DragCollectProps {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function targetCollect(connect: DropTargetConnector, monitor: DropTargetMonitor): DropCollectProps<Row> {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    draggedHeader: monitor.getItem()
  };
}

export default DragSource('Column', headerCellSource, collect as DragSourceCollector<DragCollectProps, unknown>)(
  DropTarget('Column', target, targetCollect as DropTargetCollector<DropCollectProps<Row>, unknown>)(
    DraggableHeaderCell
  )
);
