import classNames from 'classnames';
import React from 'react';

import Cell from './Cell';
import { IRowRendererProps } from './common/types';
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

  getCells() {
    const {
      idx,
      isRowSelected,
      lastFrozenColumnIndex,
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
      onDrop: this.handleDrop
    };

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
