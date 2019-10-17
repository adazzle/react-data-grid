import classNames from 'classnames';
import React from 'react';

import Cell from './Cell';
import { IRowRendererProps } from './common/types';
import { isPositionStickySupported } from './utils';
import { isFrozen } from './utils/columnUtils';

export default class Row<R> extends React.Component<IRowRendererProps<R>> {
  static displayName = 'Row';

  static defaultProps = {
    cellRenderer: Cell,
    isSelected: false,
    height: 35
  };

  handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    // Prevent default to allow drop
    e.preventDefault();
    const { idx, cellMetaData } = this.props;
    cellMetaData.onDragEnter(idx);
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
      cellMetaData,
      columns,
      height,
      idx,
      isRowSelected,
      onRowSelectionChange,
      row,
      scrollLeft,
      isSummaryRow
    } = this.props;
    const Renderer = this.props.cellRenderer!;
    const canSticky = isPositionStickySupported();

    // FIXME: do we need this, considering columnsMetrics should have these columns sorted already?
    const frozenColumns = columns.slice(0, this.props.lastFrozenColumnIndex + 1);
    const nonFrozenColumn = columns.slice(this.props.colOverscanStartIdx, this.props.colOverscanEndIdx + 1).filter(c => !isFrozen(c));

    return nonFrozenColumn.concat(frozenColumns).map(column => {
      const { key } = column;

      return (
        <Renderer
          key={`${key as keyof R}-${idx}`} // FIXME: fix key type
          idx={column.idx}
          rowIdx={idx}
          height={height}
          column={column}
          cellMetaData={cellMetaData}
          value={this.getCellValue(key || String(column.idx) as keyof R) as R[keyof R]} // FIXME: fix types
          rowData={row}
          expandableOptions={this.getExpandableOptions(key)}
          scrollLeft={!canSticky && isFrozen(column) ? scrollLeft : undefined}
          isRowSelected={isRowSelected}
          onRowSelectionChange={onRowSelectionChange}
          isSummaryRow={isSummaryRow}
        />
      );
    });
  }

  getCellValue(key: keyof R) {
    const { isRowSelected, row } = this.props;
    if (key === 'select-row') {
      return isRowSelected;
    }

    return row[key];
  }

  getExpandableOptions(columnKey: keyof R) {
    const { subRowDetails } = this.props;
    if (!subRowDetails) return;

    const { field, expanded, children, treeDepth } = subRowDetails;
    return {
      canExpand: field === columnKey && ((children && children.length > 0) || subRowDetails.group === true),
      field,
      expanded,
      children,
      treeDepth,
      subRowDetails
    };
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
