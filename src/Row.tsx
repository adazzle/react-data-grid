import classNames from 'classnames';
import React from 'react';

import Cell from './Cell';
import { IRowRendererProps, Position } from './common/types';
import { EventTypes } from './common/enums';

export default class Row<R> extends React.Component<IRowRendererProps<R>> {
  static displayName = 'Row';

  static defaultProps = {
    cellRenderer: Cell
  };

  handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    // Prevent default to allow drop
    e.preventDefault();
    const { idx, eventBus } = this.props;
    eventBus.dispatch(EventTypes.DRAG_ENTER, idx);
  };

  handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    // The default in Firefox is to treat data in dataTransfer as a URL and perform navigation on it, even if the data type used is 'text'
    // To bypass this, we need to capture and prevent the drop event.
    e.preventDefault();
  };

  selectCell = (position: Position, openEditor?: boolean) => {
    this.props.eventBus.dispatch(EventTypes.SELECT_CELL, position, openEditor);
  };

  getCellPosition = (e: React.MouseEvent<HTMLDivElement>): Position => {
    const target = e.target as HTMLDivElement;
    const closest = target.closest('.rdg-cell');
    return { rowIdx: this.props.idx, idx: Number(closest?.getAttribute('data-idx') || 0) };
  };

  handleCellClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const position = this.getCellPosition(e);
    this.selectCell(position);
    this.props.onRowClick?.(this.props.idx, this.props.row, this.props.columns[position.idx]);
  };

  handleCellMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    this.props.eventBus.dispatch(EventTypes.SELECT_START, this.getCellPosition(e));

    const handleWindowMouseUp = () => {
      this.props.eventBus.dispatch(EventTypes.SELECT_END);
      window.removeEventListener('mouseup', handleWindowMouseUp);
    };

    window.addEventListener('mouseup', handleWindowMouseUp);
  };

  handleCellContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    this.selectCell(this.getCellPosition(e));
  };

  handleCellDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const position = this.getCellPosition(e);
    this.props.onRowDoubleClick?.(this.props.idx, this.props.row, this.props.columns[position.idx]);
    this.selectCell(position, true);
  };

  getCells() {
    const {
      idx,
      isRowSelected,
      lastFrozenColumnIndex,
      onRowSelectionChange,
      row,
      scrollLeft,
      isSummaryRow,
      eventBus,
      onRowClick,
      onRowDoubleClick,
      enableCellRangeSelection
    } = this.props;
    const Renderer = this.props.cellRenderer!;

    return this.props.viewportColumns.map(column => {
      const { key } = column;
      return (
        <Renderer
          key={key as string} // FIXME: fix key type
          idx={column.idx}
          rowKey={key}
          rowIdx={idx}
          column={column}
          lastFrozenColumnIndex={lastFrozenColumnIndex}
          rowData={row}
          scrollLeft={column.frozen && typeof scrollLeft === 'number' ? scrollLeft : undefined}
          isRowSelected={isRowSelected}
          onRowSelectionChange={onRowSelectionChange}
          isSummaryRow={isSummaryRow}
          eventBus={eventBus}
          onRowClick={onRowClick}
          onRowDoubleClick={onRowDoubleClick}
          enableCellRangeSelection={enableCellRangeSelection}
        />
      );
    });
  }

  render() {
    const { idx, isRowSelected, extraClasses, isSummaryRow } = this.props;
    const className = classNames(
      'rdg-row',
      `rdg-row-${idx % 2 === 0 ? 'even' : 'odd'}`,
      { 'rdg-row-selected': isRowSelected },
      extraClasses
    );

    const events = !isSummaryRow && {
      onDragEnter: this.handleDragEnter,
      onDragOver: this.handleDragOver,
      onDrop: this.handleDrop,
      onClick: this.handleCellClick,
      onDoubleClick: this.handleCellDoubleClick,
      onContextMenu: this.handleCellContextMenu
    };

    if (this.props.enableCellRangeSelection && events) {
      (events as { [key: string]: Function }).onMouseDown = this.handleCellMouseDown;
    }

    return (
      <div
        className={className}
        style={{ width: this.props.width, height: this.props.height }}
        {...events}
      >
        {this.getCells()}
      </div>
    );
  }
}
