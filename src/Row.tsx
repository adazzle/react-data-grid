import classNames from 'classnames';
import React from 'react';

import Cell from './Cell';
import { IRowRendererProps } from './common/types';
import { isFrozen } from './utils/columnUtils';

export default class Row<R> extends React.Component<IRowRendererProps<R>> {
  static displayName = 'Row';

  static defaultProps = {
    cellRenderer: Cell
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
      colOverscanEndIdx,
      colOverscanStartIdx,
      columns,
      idx,
      isRowSelected,
      lastFrozenColumnIndex,
      onRowSelectionChange,
      row,
      scrollLeft,
      isSummaryRow
    } = this.props;
    const Renderer = this.props.cellRenderer!;
    const cellElements = [];

    for (let colIdx = 0; colIdx <= colOverscanEndIdx; colIdx++) {
      const column = columns[colIdx];
      const colIsFrozen = isFrozen(column);

      if (colIdx < colOverscanStartIdx && !colIsFrozen) continue;

      const { key } = column;

      cellElements.push(
        <Renderer
          key={key as string} // FIXME: fix key type
          idx={colIdx}
          rowIdx={idx}
          column={column}
          lastFrozenColumnIndex={lastFrozenColumnIndex}
          cellMetaData={cellMetaData}
          rowData={row}
          expandableOptions={this.getExpandableOptions(key)}
          scrollLeft={colIsFrozen && typeof scrollLeft === 'number' ? scrollLeft : undefined}
          isRowSelected={isRowSelected}
          onRowSelectionChange={onRowSelectionChange}
          isSummaryRow={isSummaryRow}
        />
      );
    }

    return cellElements;
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
