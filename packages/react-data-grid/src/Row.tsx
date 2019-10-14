import React from 'react';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';

import Cell from './Cell';
import { isFrozen } from './utils/columnUtils';
import { RowRenderer, RowRendererProps, CellRenderer, CellRendererProps, CalculatedColumn } from './common/types';

export default class Row<R> extends React.Component<RowRendererProps<R>> implements RowRenderer {
  static displayName = 'Row';

  static defaultProps = {
    cellRenderer: Cell,
    isSelected: false,
    height: 35
  };

  private readonly row = React.createRef<HTMLDivElement>();
  private readonly cells = new Map<keyof R, CellRenderer>();

  shouldComponentUpdate(nextProps: RowRendererProps<R>) {
    const { scrollLeft, ...rest } = this.props;
    const { scrollLeft: nextScrollLeft, ...nextRest } = nextProps;

    return !shallowEqual(rest, nextRest);
  }

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

  getCell(column: CalculatedColumn<R>) {
    const Renderer = this.props.cellRenderer!;
    const { idx, cellMetaData, row, scrollLeft, isRowSelected, onRowSelectionChange } = this.props;
    const { key } = column;

    const cellProps: CellRendererProps<R> & { ref: (cell: CellRenderer | null) => void } = {
      ref: (cell) => cell ? this.cells.set(key, cell) : this.cells.delete(key),
      idx: column.idx,
      rowIdx: idx,
      height: this.props.height,
      column,
      cellMetaData,
      value: this.getCellValue(key || String(column.idx) as keyof R) as R[keyof R], // FIXME: fix types
      rowData: row,
      expandableOptions: this.getExpandableOptions(key),
      scrollLeft,
      isRowSelected,
      onRowSelectionChange
    };

    return <Renderer key={`${key as keyof R}-${idx}`} {...cellProps} />; // FIXME: fix key type
  }

  getCells() {
    const { colOverscanStartIdx, colOverscanEndIdx, columns, lastFrozenColumnIndex } = this.props;
    const frozenColumns = columns.slice(0, lastFrozenColumnIndex + 1);
    const nonFrozenColumn = columns.slice(colOverscanStartIdx, colOverscanEndIdx + 1).filter(c => !isFrozen(c));
    return nonFrozenColumn.concat(frozenColumns).map(c => this.getCell(c));
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

  setScrollLeft(scrollLeft: number) {
    for (const column of this.props.columns) {
      const { key } = column;
      if (isFrozen(column) && this.cells.has(key)) {
        this.cells.get(key)!.setScrollLeft(scrollLeft);
      }
    }
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
        ref={this.row}
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
