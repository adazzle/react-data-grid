import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { isElement } from 'react-is';
import Draggable from './Draggable';
import { isFrozen } from './ColumnUtils';
import { HeaderRowType } from './common/enums';
import { Column } from './common/types';

function SimpleCellRenderer({ column, rowType }: { column: Column; rowType: HeaderRowType }) {
  const headerText = rowType === HeaderRowType.HEADER ? column.name : '';
  return <div>{headerText}</div>;
}

interface Props {
  renderer?: React.ReactElement | React.ComponentType<{ column: Column; rowType: HeaderRowType }>;
  column: Column;
  rowType: HeaderRowType;
  height: number;
  onResize(column: Column, width: number): void;
  onResizeEnd(column: Column, width: number): void;
  onHeaderDrop(): void;
  draggableHeaderCell: React.ComponentType<{ column: Column; onHeaderDrop(): void }>;
  className?: string;
}

export default class HeaderCell extends React.Component<Props> {
  onDrag = (x: number) => {
    const { onResize } = this.props;
    if (onResize) {
      const width = this.getWidthFromMouseEvent(x);
      if (width > 0) {
        onResize(this.props.column, width);
      }
    }
  };

  onDragEnd = (x: number) => {
    const width = this.getWidthFromMouseEvent(x);
    this.props.onResizeEnd(this.props.column, width);
  };

  getWidthFromMouseEvent(x: number): number {
    const node = ReactDOM.findDOMNode(this) as Element;
    const left = node.getBoundingClientRect().left;
    return x - left;
  }

  getCell() {
    const { height, column, rowType } = this.props;
    const renderer = this.props.renderer || SimpleCellRenderer;
    if (isElement(renderer)) {
      // if it is a string, it's an HTML element, and column is not a valid property, so only pass height
      if (typeof renderer.type === 'string') {
        return React.cloneElement(renderer, { height });
      }
      return React.cloneElement(renderer, { column, height });
    }
    return React.createElement(renderer, { column, rowType });
  }

  setScrollLeft(scrollLeft: number) {
    const node = ReactDOM.findDOMNode(this) as HTMLElement | null;
    if (node) {
      node.style.transform = `translate(${scrollLeft}px, 0)`;
    }
  }

  removeScroll() {
    const node = ReactDOM.findDOMNode(this) as HTMLElement | null;
    if (node) {
      node.style.transform = null;
    }
  }

  render() {
    const { column, rowType, height } = this.props;

    const className = classNames('react-grid-HeaderCell', {
      'react-grid-HeaderCell--frozen': isFrozen(column)
    }, this.props.className, column.cellClass);

    const style: React.CSSProperties = {
      width: column.width,
      left: column.left,
      height
    };

    const cell = (
      <div className={className} style={style}>
        {this.getCell()}
        {column.resizable && (
          <Draggable
            className="react-grid-HeaderCell__resizeHandle"
            onDrag={this.onDrag}
            onDragEnd={this.onDragEnd}
          />
        )}
      </div>
    );

    if (rowType === HeaderRowType.HEADER && column.draggable) {
      const DraggableHeaderCell = this.props.draggableHeaderCell;
      return (
        <DraggableHeaderCell
          column={column}
          onHeaderDrop={this.props.onHeaderDrop}
        >
          {cell}
        </DraggableHeaderCell>
      );
    }

    return cell;
  }
}
