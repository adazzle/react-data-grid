import React from 'react';
import classNames from 'classnames';

import rowComparer from './common/utils/RowComparer';
import Cell from './Cell';
import { isFrozen } from './ColumnUtils';
import { Column, RowRenderer, RowRendererProps, CellRenderer, CellRendererProps } from './common/types';

export default class Row extends React.Component<RowRendererProps> implements RowRenderer {
  static displayName = 'Row';

  static defaultProps = {
    cellRenderer: Cell,
    isSelected: false,
    height: 35
  };

  private readonly row = React.createRef<HTMLDivElement>();
  private readonly cells = new Map<string, CellRenderer | null>();

  shouldComponentUpdate(nextProps: RowRendererProps) {
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

  getCell(column: Column) {
    const Renderer = this.props.cellRenderer;
    const { idx, cellMetaData, isScrolling, row, isSelected, scrollLeft, lastFrozenColumnIndex } = this.props;
    const { key } = column;

    const cellProps: CellRendererProps & { ref: (cell: CellRenderer | null) => void } = {
      ref: (cell) => {
        this.cells.set(key, cell);
      },
      idx: column.idx!, // TODO: fix idx type
      rowIdx: idx,
      height: this.getRowHeight(),
      column,
      cellMetaData,
      value: this.getCellValue(key || String(column.idx)), // TODO: fix idx type
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
    const frozenColumns = columns.filter((c?: Column) => isFrozen(c!)) as Column[];
    const nonFrozenColumn = columns.slice(colOverscanStartIdx, colOverscanEndIdx + 1).filter((c?: Column) => !isFrozen(c!)) as Column[];
    return nonFrozenColumn.concat(frozenColumns)
      .map((c?: Column) => this.getCell(c!));
  }

  getRowTop(): number {
    const { current } = this.row;
    return current ? current.offsetTop : 0;
  }

  getRowHeight(): number {
    return this.props.height;
  }

  getCellValue(key: string) {
    const { isSelected, row } = this.props;
    if (key === 'select-row') {
      return isSelected;
    }

    if (typeof row.get === 'function') {
      return row.get(key);
    }

    return row[key];
  }

  getExpandableOptions(columnKey: string) {
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
    this.props.columns.forEach(((column?: Column) => {
      if (column && isFrozen(column)) {
        const cell = this.cells.get(column.key);
        if (!cell) return;
        cell.setScrollLeft(scrollLeft);
      }
    }));
  }

  render() {
    const className = classNames(
      'react-grid-Row',
      `react-grid-Row--${this.props.idx % 2 === 0 ? 'even' : 'odd'}`,
      { 'row-selected': this.props.isSelected },
      this.props.extraClasses,
      { 'rdg-scrolling': this.props.isScrolling }
    );

    const style = {
      height: this.getRowHeight(),
      overflow: 'hidden'
    };

    return (
      <div
        ref={this.row}
        className={className}
        style={style}
        onDragEnter={this.handleDragEnter}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      >
        {this.getCells()}
      </div>
    );
  }
}
