import React from 'react';
import classNames from 'classnames';
import { isElement } from 'react-is';
import { isFrozen } from './utils/columnUtils';
import { HeaderRowType } from './common/enums';
import { CalculatedColumn, HeaderRowProps } from './common/types';

function SimpleCellRenderer<R>({ column, rowType }: HeaderRowProps<R>) {
  const headerText = rowType === HeaderRowType.HEADER ? column.name : '';
  return <>{headerText}</>;
}

export interface HeaderCellProps<R> {
  renderer?: React.ReactElement | React.ComponentType<HeaderRowProps<R>>;
  column: CalculatedColumn<R>;
  lastFrozenColumnIndex: number;
  rowType: HeaderRowType;
  height: number;
  onResize(column: CalculatedColumn<R>, width: number): void;
  onHeaderDrop?(): void;
  allRowsSelected: boolean;
  onAllRowsSelectionChange(checked: boolean): void;
  draggableHeaderCell?: React.ComponentType<{ column: CalculatedColumn<R>; onHeaderDrop(): void }>;
  className?: string;
}

export default class HeaderCell<R> extends React.Component<HeaderCellProps<R>> {
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

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
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
    };

    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
  };

  private onResize(x: number) {
    const width = this.getWidthFromMouseEvent(x);
    if (width > 0) {
      this.props.onResize(this.props.column, width);
    }
  }

  private getWidthFromMouseEvent(x: number): number {
    return x - this.cell.current!.getBoundingClientRect().left;
  }

  getCell() {
    const { height, column, rowType, allRowsSelected, onAllRowsSelectionChange } = this.props;
    const renderer = this.props.renderer || SimpleCellRenderer;
    if (isElement(renderer)) {
      // if it is a string, it's an HTML element, and column is not a valid property, so only pass height
      if (typeof renderer.type === 'string') {
        return React.cloneElement(renderer, { height });
      }
      return React.cloneElement(renderer, { column, height });
    }
    return React.createElement(renderer, { column, rowType, allRowsSelected, onAllRowsSelectionChange });
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
      node.style.transform = 'none';
    }
  }

  render() {
    const { column, rowType } = this.props;
    const colIsFrozen = isFrozen(column);

    const className = classNames('rdg-cell', {
      'rdg-cell-frozen': colIsFrozen,
      'rdg-cell-frozen-last': colIsFrozen && column.idx === this.props.lastFrozenColumnIndex
    }, this.props.className, column.cellClass);

    const cell = (
      <div
        ref={this.cell}
        className={className}
        style={{
          width: column.width,
          left: column.left
        }}
        onMouseDown={column.resizable ? this.onMouseDown : undefined}
        onTouchStart={column.resizable ? this.onTouchStart : undefined}
      >
        {this.getCell()}
        {column.resizable && <div className="rdg-header-cell-resizer" />}
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
