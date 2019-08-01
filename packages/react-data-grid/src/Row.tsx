import React from 'react';
import classNames from 'classnames';

import rowComparer from './common/utils/RowComparer';
import Cell from './Cell';
import { isFrozen } from './ColumnUtils';
import * as rowUtils from './RowUtils';
import { RowRenderer, RowRendererProps, CellRenderer, CellRendererProps, CalculatedColumn } from './common/types';

export default class Row<R extends {}> extends React.Component<RowRendererProps<R>> implements RowRenderer<R> {
  static displayName = 'Row';

  static defaultProps = {
    cellRenderer: Cell,
    isSelected: false,
    height: 35
  };

  private readonly row = React.createRef<HTMLDivElement>();
  private readonly cells = new Map<keyof R, CellRenderer>();

  shouldComponentUpdate(nextProps: RowRendererProps<R>) {
    return rowComparer(nextProps, this.props);
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
    const Renderer = this.props.cellRenderer;
    const { idx, cellMetaData, isScrolling, row, isSelected, scrollLeft, lastFrozenColumnIndex } = this.props;
    const { key } = column;

    const cellProps: CellRendererProps<unknown, unknown, R> & { ref: (cell: CellRenderer | null) => void } = {
      ref: (cell) => cell ? this.cells.set(key, cell) : this.cells.delete(key),
      idx: column.idx,
      rowIdx: idx,
      height: this.getRowHeight(),
      column,
      cellMetaData,
      value: this.getCellValue(key || String(column.idx) as keyof R), // TODO: fix idx type
      rowData: row,
      isRowSelected: isSelected,
      expandableOptions: this.getExpandableOptions(key),
      isScrolling,
      scrollLeft,
      lastFrozenColumnIndex
    };

    return <Renderer key={`${key}-${idx}`} {...cellProps} />;
  }

  getCells() {
    const { colOverscanStartIdx, colOverscanEndIdx, columns } = this.props;
    const frozenColumns = columns.filter(c => isFrozen(c));
    const nonFrozenColumn = columns.slice(colOverscanStartIdx, colOverscanEndIdx + 1).filter(c => !isFrozen(c));
    return nonFrozenColumn.concat(frozenColumns).map(c => this.getCell(c));
  }

  getRowTop(): number {
    const { current } = this.row;
    return current ? current.offsetTop : 0;
  }

  getRowHeight(): number {
    return this.props.height;
  }

  getCellValue(key: keyof R) {
    const { isSelected, row } = this.props;
    if (key === 'select-row') {
      return isSelected;
    }

    return rowUtils.get(row, key);
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
      'react-grid-Row',
      `react-grid-Row--${this.props.idx % 2 === 0 ? 'even' : 'odd'}`,
      { 'row-selected': this.props.isSelected },
      this.props.extraClasses,
      { 'rdg-scrolling': this.props.isScrolling }
    );

    return (
      <div
        ref={this.row}
        className={className}
        style={{ height: this.getRowHeight() }}
        onDragEnter={this.handleDragEnter}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      >
        {this.getCells()}
      </div>
    );
  }
}
