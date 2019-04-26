import React from 'react';
import { isElement } from 'react-is';

import Row from './Row';
import RowsContainer, { RowsContainerProps } from './RowsContainer';
import RowGroup from './RowGroup';
import { InteractionMasks, EventBus } from './masks';
import { isRowSelected } from './RowUtils';
import { getColumnScrollPosition } from './utils/canvasUtils';
import { EventTypes, CellNavigationMode } from './common/enums';
import { Column, RowData, ColumnList, Position, RowGetter, CellMetaData, ScrollPosition, SubRowDetails, RowRenderer, InteractionMasksMetaData, RowRendererProps, RowSelection } from './common/types';

export interface Props {
  rowRenderer?: React.ReactElement | React.ComponentType;
  rowHeight: number;
  height: number;
  width?: number;
  totalWidth?: number | string;
  style?: string;
  className?: string;
  rowOverscanStartIdx: number;
  rowOverscanEndIdx: number;
  rowVisibleStartIdx: number;
  rowVisibleEndIdx: number;
  colVisibleStartIdx: number;
  colVisibleEndIdx: number;
  colOverscanStartIdx: number;
  colOverscanEndIdx: number;
  rowsCount: number;
  rowGetter: RowGetter;
  columns: ColumnList;
  cellMetaData: CellMetaData;
  selectedRows?: RowData[];
  rowKey: string;
  scrollToRowIndex?: number;
  contextMenu?: React.ReactElement;
  rowSelection?: RowSelection;
  rowGroupRenderer?: React.ComponentType;
  isScrolling: boolean;
  length?: number;
  enableCellSelect: boolean;
  enableCellAutoFocus: boolean;
  cellNavigationMode: CellNavigationMode;
  eventBus: EventBus;
  editorPortalTarget: Element;
  RowsContainer: React.ComponentType<RowsContainerProps>;
  lastFrozenColumnIndex?: number;
  totalColumnWidth: number;
  interactionMasksMetaData: InteractionMasksMetaData;
  onScroll(position: ScrollPosition): void;
  getSubRowDetails?(rowIdx: RowData): SubRowDetails;
}

type RendererProps = Pick<Props, 'rowVisibleStartIdx' | 'rowVisibleEndIdx' | 'columns' | 'cellMetaData' | 'colVisibleStartIdx' | 'colVisibleEndIdx' | 'colOverscanEndIdx' | 'colOverscanStartIdx' | 'lastFrozenColumnIndex' | 'isScrolling'> & {
  ref(row: (RowRenderer & React.Component<RowRendererProps>) | null): void;
  key: number;
  idx: number;
  row: RowData;
  subRowDetails?: SubRowDetails;
  height: number;
  isSelected: boolean;
  scrollLeft: number;
};

export default class Canvas extends React.PureComponent<Props> {
  static displayName = 'Canvas';

  static defaultProps = {
    RowsContainer
  };

  private readonly canvas = React.createRef<HTMLDivElement>();
  private readonly interactionMasks = React.createRef<InteractionMasks>();
  private readonly rows = new Map<number, RowRenderer & React.Component<RowRendererProps>>();
  private unsubscribeScrollToColumn?(): void;
  private _scroll = { scrollTop: 0, scrollLeft: 0 };

  componentDidMount() {
    this.unsubscribeScrollToColumn = this.props.eventBus.subscribe(EventTypes.SCROLL_TO_COLUMN, this.scrollToColumn);
  }

  componentWillUnmount() {
    this.unsubscribeScrollToColumn!();
  }

  componentDidUpdate(prevProps: Props) {
    const { scrollToRowIndex } = this.props;
    if (scrollToRowIndex && prevProps.scrollToRowIndex !== scrollToRowIndex) {
      this.scrollToRow(scrollToRowIndex);
    }
  }

  handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft, scrollTop } = e.currentTarget;
    this._scroll = { scrollTop, scrollLeft };
    if (this.props.onScroll) {
      this.props.onScroll(this._scroll);
    }
  };

  onHitBottomCanvas = () => {
    const { current } = this.canvas;
    if (current) {
      current.scrollTop += this.props.rowHeight + this.getClientScrollTopOffset(current);
    }
  };

  onHitTopCanvas = () => {
    const { current } = this.canvas;
    if (current) {
      current.scrollTop -= this.props.rowHeight - this.getClientScrollTopOffset(current);
    }
  };

  handleHitColummBoundary = ({ idx }: Position) => {
    this.scrollToColumn(idx);
  };

  scrollToRow(scrollToRowIndex: number) {
    const { current } = this.canvas;
    if (!current) return;
    const { rowHeight, rowsCount, height } = this.props;
    current.scrollTop = Math.min(
      scrollToRowIndex * rowHeight,
      rowsCount * rowHeight - height
    );
  }

  scrollToColumn(idx: number) {
    const { current } = this.canvas;
    if (!current) return;

    const { scrollLeft, clientWidth } = current;
    const newScrollLeft = getColumnScrollPosition(this.props.columns, idx, scrollLeft, clientWidth);
    if (newScrollLeft !== 0) {
      current.scrollLeft = scrollLeft + newScrollLeft;
    }
  }

  getRows(rowOverscanStartIdx: number, rowOverscanEndIdx: number) {
    if (Array.isArray(this.props.rowGetter)) {
      return this.props.rowGetter.slice(rowOverscanStartIdx, rowOverscanEndIdx);
    }
    const rows = [];
    let i = rowOverscanStartIdx;
    while (i < rowOverscanEndIdx) {
      const row = this.props.rowGetter(i);
      let subRowDetails: SubRowDetails | undefined;
      if (this.props.getSubRowDetails) {
        subRowDetails = this.props.getSubRowDetails(row);
      }
      rows.push({ row, subRowDetails });
      i++;
    }
    return rows;
  }

  getScroll() {
    const { scrollTop, scrollLeft } = this.canvas.current!;
    return { scrollTop, scrollLeft };
  }

  getClientScrollTopOffset(node: HTMLDivElement) {
    const { rowHeight } = this.props;
    const scrollVariation = node.scrollTop % rowHeight;
    return scrollVariation > 0 ? rowHeight - scrollVariation : 0;
  }

  isRowSelected(idx: number, row: RowData) {
    // Use selectedRows if set
    if (this.props.selectedRows) {
      const selectedRow = this.props.selectedRows.find(r => {
        const rowKeyValue = typeof row.get === 'function' ? row.get(this.props.rowKey) : row[this.props.rowKey];
        return r[this.props.rowKey] === rowKeyValue;
      });
      return !!(selectedRow && selectedRow.isSelected);
    }

    // Else use new rowSelection props
    if (this.props.rowSelection) {
      const { keys, indexes, isSelectedKey } = this.props.rowSelection as { [key: string]: unknown };
      return isRowSelected(keys as { rowKey?: string; values?: string[] } | null, indexes as number[] | null, isSelectedKey as string | null, row, idx);
    }

    return false;
  }

  setScrollLeft(scrollLeft: number) {
    const { current } = this.interactionMasks;
    if (current) {
      current.setScrollLeft(scrollLeft);
    }

    this.rows.forEach((r, idx) => {
      const row = this.getRowByRef(idx);
      if (row && row.setScrollLeft) {
        row.setScrollLeft(scrollLeft);
      }
    });
  }

  getRowByRef = (i: number) => {
    // check if wrapped with React DND drop target
    if (!this.rows.has(i)) return;

    const row = this.rows.get(i)!;
    const wrappedRow = row.getDecoratedComponentInstance ? row.getDecoratedComponentInstance(i) : null;
    return wrappedRow ? wrappedRow.row : row;
  };

  getRowTop = (rowIdx: number) => {
    const row = this.getRowByRef(rowIdx);
    if (row && row.getRowTop) {
      return row.getRowTop();
    }
    return this.props.rowHeight * rowIdx;
  };

  getRowHeight = (rowIdx: number) => {
    const row = this.getRowByRef(rowIdx);
    if (row && row.getRowHeight) {
      return row.getRowHeight();
    }
    return this.props.rowHeight;
  };

  getRowColumns = (rowIdx: number) => {
    const row = this.getRowByRef(rowIdx);
    return row && row.props ? row.props.columns : this.props.columns;
  };

  renderCustomRowRenderer(props: RendererProps) {
    const { ref, ...otherProps } = props;
    const CustomRowRenderer = this.props.rowRenderer!;
    const customRowRendererProps = { ...otherProps, renderBaseRow: (p: RowRendererProps) => <Row ref={ref} {...p} /> };

    if (isElement(CustomRowRenderer)) {
      if (CustomRowRenderer.type === Row) {
        // In the case where Row is specified as the custom render, ensure the correct ref is passed
        return <Row {...props} />;
      }
      return React.cloneElement(CustomRowRenderer, customRowRendererProps);
    }

    return <CustomRowRenderer {...customRowRendererProps} />;
  }

  renderGroupRow(props: RendererProps) {
    const { ref, ...rowGroupProps } = props;
    return (
      <RowGroup
        {...rowGroupProps}
        {...props.row.__metaData!}
        name={props.row.name as string}
        eventBus={this.props.eventBus}
        renderer={this.props.rowGroupRenderer}
        renderBaseRow={(p: RowRendererProps) => <Row ref={ref} {...p} />}
      />
    );
  }

  renderRow(props: RendererProps) {
    const { row } = props;

    if (row.__metaData && row.__metaData.getRowRenderer) {
      return row.__metaData.getRowRenderer(this.props, props.idx);
    }
    if (row.__metaData && row.__metaData.isGroup) {
      return this.renderGroupRow(props);
    }

    if (this.props.rowRenderer) {
      return this.renderCustomRowRenderer(props);
    }

    return <Row {...props} />;
  }

  renderPlaceholder(key: string, height: number) {
    // just renders empty cells
    // if we wanted to show gridlines, we'd need classes and position as with renderScrollingPlaceholder
    return (
      <div key={key} style={{ height }}>
        {
          (this.props.columns as Column[]).map(
            (column) => <div style={{ width: column.width }} key={column.key} />
          )
        }
      </div>
    );
  }

  render() {
    const { rowOverscanStartIdx, rowOverscanEndIdx, cellMetaData, columns, colOverscanStartIdx, colOverscanEndIdx, colVisibleStartIdx, colVisibleEndIdx, lastFrozenColumnIndex, rowHeight, rowsCount, totalColumnWidth, totalWidth, height, rowGetter, RowsContainer, contextMenu } = this.props;

    const rows = this.getRows(rowOverscanStartIdx, rowOverscanEndIdx)
      .map(({ row, subRowDetails }, idx) => {
        const rowIdx = rowOverscanStartIdx + idx;
        return row && this.renderRow({
          key: rowIdx,
          ref: (row: (RowRenderer & React.Component<RowRendererProps>) | null) => {
            if (row) {
              this.rows.set(rowIdx, row);
            } else {
              this.rows.delete(rowIdx);
            }
          },
          idx: rowIdx,
          rowVisibleStartIdx: this.props.rowVisibleStartIdx,
          rowVisibleEndIdx: this.props.rowVisibleEndIdx,
          row,
          height: rowHeight,
          columns,
          isSelected: this.isRowSelected(rowIdx, row),
          cellMetaData,
          subRowDetails,
          colVisibleStartIdx,
          colVisibleEndIdx,
          colOverscanStartIdx,
          colOverscanEndIdx,
          lastFrozenColumnIndex,
          isScrolling: this.props.isScrolling,
          scrollLeft: this._scroll.scrollLeft
        });
      });

    if (rowOverscanStartIdx > 0) {
      rows.unshift(this.renderPlaceholder('top', rowOverscanStartIdx * rowHeight));
    }

    if (rowsCount - rowOverscanEndIdx > 0) {
      rows.push(this.renderPlaceholder('bottom', (rowsCount - rowOverscanEndIdx) * rowHeight));
    }

    const style: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      overflowX: 'auto',
      overflowY: 'scroll',
      width: totalWidth,
      height
    };

    return (
      <div
        ref={this.canvas}
        style={style}
        onScroll={this.handleScroll}
        className="react-grid-Canvas"
      >
        <InteractionMasks
          ref={this.interactionMasks}
          rowGetter={rowGetter}
          rowsCount={rowsCount}
          rowHeight={rowHeight}
          columns={columns}
          rowVisibleStartIdx={this.props.rowVisibleStartIdx}
          rowVisibleEndIdx={this.props.rowVisibleEndIdx}
          colVisibleStartIdx={colVisibleStartIdx}
          colVisibleEndIdx={colVisibleEndIdx}
          enableCellSelect={this.props.enableCellSelect}
          enableCellAutoFocus={this.props.enableCellAutoFocus}
          cellNavigationMode={this.props.cellNavigationMode}
          eventBus={this.props.eventBus}
          contextMenu={this.props.contextMenu}
          onHitBottomBoundary={this.onHitBottomCanvas}
          onHitTopBoundary={this.onHitTopCanvas}
          onHitLeftBoundary={this.handleHitColummBoundary}
          onHitRightBoundary={this.handleHitColummBoundary}
          scrollLeft={this._scroll.scrollLeft}
          scrollTop={this._scroll.scrollTop}
          getRowHeight={this.getRowHeight}
          getRowTop={this.getRowTop}
          getRowColumns={this.getRowColumns}
          editorPortalTarget={this.props.editorPortalTarget}
          {...this.props.interactionMasksMetaData}
        />
        <RowsContainer id={contextMenu ? contextMenu.props.id : 'rowsContainer'}>
          <div style={{ width: totalColumnWidth }}>{rows}</div>
        </RowsContainer>
      </div>
    );
  }
}
