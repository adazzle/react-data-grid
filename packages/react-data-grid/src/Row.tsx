import React from 'react';
import classNames from 'classnames';

import Cell from './Cell';
import { isFrozen } from './utils/columnUtils';
import { IRowRendererProps } from './common/types';

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
      scrollLeft
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
          value={this.getCellValue(key || String(colIdx) as keyof R) as R[keyof R]} // FIXME: fix types
          rowData={row}
          expandableOptions={this.getExpandableOptions(key)}
          scrollLeft={colIsFrozen && typeof scrollLeft === 'number' ? scrollLeft : undefined}
          isRowSelected={isRowSelected}
          onRowSelectionChange={onRowSelectionChange}
        />
      );
    }

    return cellElements;
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
    const className = classNames(
      'rdg-row',
      `rdg-row-${this.props.idx % 2 === 0 ? 'even' : 'odd'}`,
      { 'rdg-row-selected': this.props.isRowSelected },
      this.props.extraClasses
    );

    return (
      <div
        className={className}
        style={{ height: this.props.height }}
        onDragEnter={this.handleDragEnter}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      >
        {this.getCells()}
      </div>
    );
  }
}
