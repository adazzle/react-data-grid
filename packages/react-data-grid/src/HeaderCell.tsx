import React from 'react';
import classNames from 'classnames';
import { isElement } from 'react-is';
import { isFrozen } from './ColumnUtils';
import { HeaderRowType } from './common/enums';
import { CalculatedColumn } from './common/types';

function SimpleCellRenderer<R>({ column, rowType }: { column: CalculatedColumn<R>; rowType: HeaderRowType }) {
  const headerText = rowType === HeaderRowType.HEADER ? column.name : '';
  return <div>{headerText}</div>;
}

interface Props<R> {
  renderer?: CalculatedColumn<R>['headerRenderer'];
  column: CalculatedColumn<R>;
  rowType: HeaderRowType;
  height: number;
  onResize(column: CalculatedColumn<R>, width: number): void;
  onResizeEnd(column: CalculatedColumn<R>, width: number): void;
  onHeaderDrop?(): void;
  draggableHeaderCell?: React.ComponentType<{ column: CalculatedColumn<R>; onHeaderDrop(): void }>;
  className?: string;
}

export default class HeaderCell<R> extends React.Component<Props<R>> {
  private readonly cell = React.createRef<HTMLDivElement>();

  private onMouseDown = (event: React.MouseEvent) => {
    if (event.button !== 0) {
      return;
    }

    const { right } = event.currentTarget.getBoundingClientRect();
    const offset = right - event.clientX;

    if (offset > 11) { // +1px to account for the border size
      return;
    }

    const onMouseMove = (event: MouseEvent) => {
      this.onResize(event.clientX + offset);
    };

    const onMouseUp = (event: MouseEvent) => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      this.onResizeEnd(event.clientX + offset);
    };

    event.preventDefault();
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  private onTouchStart = (event: React.TouchEvent) => {
    const touch = event.changedTouches[0];
    const { identifier } = touch;
    const { right } = event.currentTarget.getBoundingClientRect();
    const offset = right - touch.clientX;

    if (offset > 11) { // +1px to account for the border size
      return;
    }

    function getTouch(event: TouchEvent) {
      for (const touch of event.changedTouches) {
        if (touch.identifier === identifier) return touch;
      }
      return null;
    }

    const onTouchMove = (event: TouchEvent) => {
      const touch = getTouch(event);
      if (touch) {
        this.onResize(touch.clientX + offset);
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      const touch = getTouch(event);
      if (!touch) return;
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      this.onResizeEnd(touch.clientX + offset);
    };

    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
  };

  private onResize(x: number) {
    const { onResize } = this.props;
    if (onResize) {
      const width = this.getWidthFromMouseEvent(x);
      if (width > 0) {
        onResize(this.props.column, width);
      }
    }
  }

  private onResizeEnd(x: number) {
    const width = this.getWidthFromMouseEvent(x);
    this.props.onResizeEnd(this.props.column, width);
  }

  private getWidthFromMouseEvent(x: number): number {
    return x - this.cell.current!.getBoundingClientRect().left;
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
    const node = this.cell.current;
    if (node) {
      node.style.transform = `translateX(${scrollLeft}px)`;
    }
  }

  removeScroll() {
    const node = this.cell.current;
    if (node) {
      node.style.transform = null;
    }
  }

  render() {
    const { column, rowType, height } = this.props;

    const className = classNames('react-grid-HeaderCell', {
      'rdg-header-cell-resizable': column.resizable,
      'react-grid-HeaderCell--frozen': isFrozen(column)
    }, this.props.className, column.cellClass);

    const style: React.CSSProperties = {
      width: column.width,
      left: column.left,
      height
    };

    const cell = (
      <div
        className={className}
        style={style}
        ref={this.cell}
        onMouseDown={column.resizable ? this.onMouseDown : undefined}
        onTouchStart={column.resizable ? this.onTouchStart : undefined}
      >
        {this.getCell()}
      </div>
    );

    const DraggableHeaderCell = this.props.draggableHeaderCell;
    if (rowType === HeaderRowType.HEADER && column.draggable && DraggableHeaderCell) {
      return (
        <DraggableHeaderCell
          column={column}
          onHeaderDrop={this.props.onHeaderDrop!}
        >
          {cell}
        </DraggableHeaderCell>
      );
    }

    return cell;
  }
}
