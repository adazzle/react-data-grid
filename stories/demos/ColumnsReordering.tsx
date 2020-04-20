import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop, DragObjectWithType } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import DataGrid, { Column, HeaderRendererProps } from '../../src';

function wrapRefs<T>(...refs: React.Ref<T>[]) {
  return (handle: T | null) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(handle);
      } else if (ref !== null) {
        // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31065
        (ref as React.MutableRefObject<T | null>).current = handle;
      }
    }
  };
}

interface Row {
  id: number;
  task: string;
  complete: number;
  priority: string;
  issueType: string;
  startDate: string;
  completeDate: string;
}

interface ColumnDragObject extends DragObjectWithType {
  key: string;
}

function DraggableHeaderRenderer<R>({ onColumnsReorder, ...props }: HeaderRendererProps<R> & { onColumnsReorder: (sourceKey: string, targetKey: string) => void }) {
  const [{ isDragging }, drag] = useDrag({
    item: { key: props.column.key, type: 'COLUMN_DRAG' },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'COLUMN_DRAG',
    drop({ key, type }: ColumnDragObject) {
      if (type === 'COLUMN_DRAG') {
        onColumnsReorder(key, props.column.key);
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  });

  return (
    <div
      ref={wrapRefs(drag, drop)}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isOver ? '#ececec' : 'inherit',
        cursor: 'move'
      }}
    >
      {props.column.name}
    </div>
  );
}

function getRandomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}

function createRows(): Row[] {
  const rows = [];
  for (let i = 1; i < 500; i++) {
    rows.push({
      id: i,
      task: `Task ${i}`,
      complete: Math.min(100, Math.round(Math.random() * 110)),
      priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
      issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
      startDate: getRandomDate(new Date(2015, 3, 1), new Date()),
      completeDate: getRandomDate(new Date(), new Date(2016, 0, 1))
    });
  }

  return rows;
}

export default function ColumnsReordering() {
  const [rows] = useState(createRows);
  const [columns, setColumns] = useState<Column<Row>[]>(() => [
    {
      key: 'id',
      name: 'ID',
      width: 80
    },
    {
      key: 'task',
      name: 'Title',
      resizable: true,
      headerRenderer: HeaderRenderer
    },
    {
      key: 'priority',
      name: 'Priority',
      resizable: true,
      headerRenderer: HeaderRenderer
    },
    {
      key: 'issueType',
      name: 'Issue Type',
      resizable: true,
      headerRenderer: HeaderRenderer
    },
    {
      key: 'complete',
      name: '% Complete',
      resizable: true,
      headerRenderer: HeaderRenderer
    },
    {
      key: 'startDate',
      name: 'Start Date',
      resizable: true,
      headerRenderer: HeaderRenderer
    },
    {
      key: 'completeDate',
      name: 'Expected Complete',
      width: 200,
      resizable: true,
      headerRenderer: HeaderRenderer
    }
  ]);

  function HeaderRenderer(props: HeaderRendererProps<Row>) {
    return <DraggableHeaderRenderer {...props} onColumnsReorder={onColumnsReorder} />;
  }

  function onColumnsReorder(sourceKey: string, targetKey: string) {
    const sourceColumn = columns.find(c => c.key === sourceKey)!;
    const targetColumn = columns.find(c => c.key === targetKey)!;

    const reorderedColumns = columns.map(c => {
      if (c === sourceColumn) return targetColumn;
      if (c === targetColumn) return sourceColumn;
      return c;
    });

    setColumns(reorderedColumns);
  }

  return (
    <DndProvider backend={Backend}>
      <DataGrid
        columns={columns}
        rows={rows}
      />
    </DndProvider>
  );
}
