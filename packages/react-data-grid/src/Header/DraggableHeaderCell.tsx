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
import { Column } from '../common/types';

interface DragCollectProps {
  connectDragSource: DragElementWrapper<DragSourceOptions>;
  isDragging: boolean;
}

interface DropCollectProps {
  connectDropTarget: ConnectDropTarget;
  isOver: boolean;
  canDrop: boolean;
  draggedHeader: { key: string };
}

interface DraggableHeaderCellProps extends DragCollectProps, DropCollectProps {
  children: JSX.Element;
}

function DraggableHeaderCell(props: DraggableHeaderCellProps): JSX.Element {
  const {
    connectDragSource,
    connectDropTarget,
    isDragging,
    isOver,
    canDrop
  } = props;

  // set drag source and drop target on header cell
  // width: 0 - otherwise drag clone was wrongly positioned
  return connectDragSource(
    connectDropTarget(
      <div
        className={classNames('rdg-draggable-header-cell', { 'rdg-can-drop': isOver && canDrop })}
        style={{ opacity: isDragging ? 0.2 : 1 }}
      >
        {props.children}
      </div>
    )!
  )!;
}

interface RequiredProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<any, any, any>;
  onHeaderDrop(source: number, target: number): void;
}

const headerCellSource: DragSourceSpec<RequiredProps, { key: string }> = {
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
const target: DropTargetSpec<RequiredProps> = {
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

function targetCollect(connect: DropTargetConnector, monitor: DropTargetMonitor): DropCollectProps {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    draggedHeader: monitor.getItem()
  };
}

export default DragSource('Column', headerCellSource, collect as DragSourceCollector<DragCollectProps, unknown>)(
  DropTarget('Column', target, targetCollect as DropTargetCollector<DropCollectProps, unknown>)(
    DraggableHeaderCell
  )
);
