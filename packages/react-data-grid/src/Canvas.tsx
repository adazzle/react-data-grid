import React from 'react';
import { isElement } from 'react-is';

import Row from './Row';
import RowsContainerDefault from './RowsContainer';
import RowGroup from './RowGroup';
import { InteractionMasks } from './masks';
import { getColumnScrollPosition, isPositionStickySupported } from './utils';
import { EventTypes } from './common/enums';
import { CalculatedColumn, Position, ScrollPosition, SubRowDetails, RowRenderer, RowRendererProps, RowData } from './common/types';
import { ViewportProps } from './Viewport';
import { HorizontalRangeToRender, VerticalRangeToRender } from './utils/viewportUtils';

type SharedViewportProps<R> = Pick<ViewportProps<R>,
| 'rowKey'
| 'rowGetter'
| 'rowsCount'
| 'selectedRows'
| 'onSelectedRowsChange'
| 'rowRenderer'
| 'cellMetaData'
| 'rowHeight'
| 'scrollToRowIndex'
| 'contextMenu'
| 'getSubRowDetails'
| 'rowGroupRenderer'
| 'enableCellSelect'
| 'enableCellAutoFocus'
| 'cellNavigationMode'
| 'eventBus'
| 'RowsContainer'
| 'editorPortalTarget'
| 'interactionMasksMetaData'
>;

type SharedViewportState = ScrollPosition & HorizontalRangeToRender & VerticalRangeToRender;

export interface CanvasProps<R> extends SharedViewportProps<R>, SharedViewportState {
  columns: CalculatedColumn<R>[];
  height: number;
  width: number;
  lastFrozenColumnIndex: number;
  isScrolling?: boolean;
  onScroll(position: ScrollPosition): void;
}

type RendererProps<R> = Pick<CanvasProps<R>, 'columns' | 'cellMetaData' | 'colOverscanEndIdx' | 'colOverscanStartIdx' | 'lastFrozenColumnIndex' | 'isScrolling'> & {
  ref(row: (RowRenderer<R> & React.Component<RowRendererProps<R>>) | null): void;
  key: number;
  idx: number;
  row: R;
  subRowDetails?: SubRowDetails;
  height: number;
  isRowSelected: boolean;
  onRowSelectionChange(rowIdx: number, row: R, checked: boolean, isShiftClick: boolean): void;
  scrollLeft: number;
};

export default class Canvas<R> extends React.PureComponent<CanvasProps<R>> {
  static displayName = 'Canvas';

  private readonly canvas = React.createRef<HTMLDivElement>();
  private readonly interactionMasks = React.createRef<InteractionMasks<R>>();
  private readonly rows = new Map<number, RowRenderer<R> & React.Component<RowRendererProps<R>>>();
  private lastSelectedRowIdx = -1;
  private unsubscribeScrollToColumn?(): void;

  componentDidMount() {
    this.unsubscribeScrollToColumn = this.props.eventBus.subscribe(EventTypes.SCROLL_TO_COLUMN, this.scrollToColumn);
  }

  componentWillUnmount() {
    this.unsubscribeScrollToColumn!();
  }

  componentDidUpdate(prevProps: CanvasProps<R>) {
    const { scrollToRowIndex } = this.props;
    if (scrollToRowIndex && prevProps.scrollToRowIndex !== scrollToRowIndex) {
      this.scrollToRow(scrollToRowIndex);
    }
  }

  handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft, scrollTop } = e.currentTarget;
    // Freeze columns on legacy browsers
    this.setScrollLeft(scrollLeft);
    this.props.onScroll({ scrollLeft, scrollTop });
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

  scrollToColumn = (idx: number) => {
    const { current } = this.canvas;
    if (!current) return;

    const { scrollLeft, clientWidth } = current;
    const newScrollLeft = getColumnScrollPosition(this.props.columns, idx, scrollLeft, clientWidth);
    if (newScrollLeft !== 0) {
      current.scrollLeft = scrollLeft + newScrollLeft;
    }
  };

  getRows(rowOverscanStartIdx: number, rowOverscanEndIdx: number) {
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

  getClientScrollTopOffset(node: HTMLDivElement) {
    const { rowHeight } = this.props;
    const scrollVariation = node.scrollTop % rowHeight;
    return scrollVariation > 0 ? rowHeight - scrollVariation : 0;
  }

  isRowSelected(row: R): boolean {
    return this.props.selectedRows !== undefined && this.props.selectedRows.has(row[this.props.rowKey]);
  }

  handleRowSelectionChange = (rowIdx: number, row: R, checked: boolean, isShiftClick: boolean) => {
    if (!this.props.onSelectedRowsChange) return;

    const { rowKey } = this.props;
    const newSelectedRows = new Set(this.props.selectedRows);

    if (checked) {
      newSelectedRows.add(row[rowKey]);
      const previousRowIdx = this.lastSelectedRowIdx;
      this.lastSelectedRowIdx = rowIdx;
      if (isShiftClick && previousRowIdx !== -1 && previousRowIdx !== rowIdx) {
        const step = Math.sign(rowIdx - previousRowIdx);
        for (let i = previousRowIdx + step; i !== rowIdx; i += step) {
          newSelectedRows.add(this.props.rowGetter(i)[rowKey]);
        }
      }
    } else {
      newSelectedRows.delete(row[rowKey]);
      this.lastSelectedRowIdx = -1;
    }

    this.props.onSelectedRowsChange(newSelectedRows);
  };

  setScrollLeft(scrollLeft: number) {
    if (isPositionStickySupported()) return;
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

  renderCustomRowRenderer(props: RendererProps<R>) {
    const { ref, ...otherProps } = props;
    const CustomRowRenderer = this.props.rowRenderer!;
    const customRowRendererProps = { ...otherProps, renderBaseRow: (p: RowRendererProps<R>) => <Row ref={ref} {...p} /> };

    if (isElement(CustomRowRenderer)) {
      if (CustomRowRenderer.type === Row) {
        // In the case where Row is specified as the custom render, ensure the correct ref is passed
        return <Row<R> {...props} />;
      }
      return React.cloneElement(CustomRowRenderer, customRowRendererProps);
    }

    return <CustomRowRenderer {...customRowRendererProps} />;
  }

  renderGroupRow(props: RendererProps<R>) {
    const { ref, columns, ...rowGroupProps } = props;
    const row = props.row as RowData;

    return (
      <RowGroup
        {...rowGroupProps}
        {...row.__metaData!}
        columns={columns as CalculatedColumn<unknown>[]}
        name={row.name!}
        eventBus={this.props.eventBus}
        renderer={this.props.rowGroupRenderer}
        renderBaseRow={(p: RowRendererProps<R>) => <Row ref={ref} {...p} />}
      />
    );
  }

  renderRow(props: RendererProps<R>) {
    const row = props.row as RowData;

    if (row.__metaData && row.__metaData.getRowRenderer) {
      return row.__metaData.getRowRenderer(this.props, props.idx);
    }
    if (row.__metaData && row.__metaData.isGroup) {
      return this.renderGroupRow(props);
    }

    if (this.props.rowRenderer) {
      return this.renderCustomRowRenderer(props);
    }

    return <Row<R> {...props} />;
  }

  renderPlaceholder(key: string, height: number) {
    return (
      <div key={key} style={{ height }} />
    );
  }

  render() {
    const { rowOverscanStartIdx, rowOverscanEndIdx, cellMetaData, columns, colOverscanStartIdx, colOverscanEndIdx, colVisibleStartIdx, colVisibleEndIdx, lastFrozenColumnIndex, rowHeight, rowsCount, width, height, rowGetter, contextMenu, isScrolling, scrollLeft } = this.props;
    const RowsContainer = this.props.RowsContainer || RowsContainerDefault;

    const rows = this.getRows(rowOverscanStartIdx, rowOverscanEndIdx)
      .map(({ row, subRowDetails }, idx) => {
        const rowIdx = rowOverscanStartIdx + idx;
        return row && this.renderRow({
          key: rowIdx,
          ref: (row: (RowRenderer<R> & React.Component<RowRendererProps<R>>) | null) => {
            if (row) {
              this.rows.set(rowIdx, row);
            } else {
              this.rows.delete(rowIdx);
            }
          },
          idx: rowIdx,
          row,
          height: rowHeight,
          columns,
          isRowSelected: this.isRowSelected(row),
          onRowSelectionChange: this.handleRowSelectionChange,
          cellMetaData,
          subRowDetails,
          colOverscanStartIdx,
          colOverscanEndIdx,
          lastFrozenColumnIndex,
          isScrolling,
          scrollLeft
        });
      });

    if (rowOverscanStartIdx > 0) {
      rows.unshift(this.renderPlaceholder('top', rowOverscanStartIdx * rowHeight));
    }

    if (rowsCount - rowOverscanEndIdx > 0) {
      rows.push(this.renderPlaceholder('bottom', (rowsCount - rowOverscanEndIdx) * rowHeight));
    }

    return (
      <div
        className="react-grid-Canvas"
        style={{ height }}
        ref={this.canvas}
        onScroll={this.handleScroll}
      >
        <InteractionMasks<R>
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
          scrollLeft={scrollLeft}
          scrollTop={this.props.scrollTop}
          getRowHeight={this.getRowHeight}
          getRowTop={this.getRowTop}
          getRowColumns={this.getRowColumns}
          editorPortalTarget={this.props.editorPortalTarget}
          {...this.props.interactionMasksMetaData}
        />
        <RowsContainer id={contextMenu ? contextMenu.props.id : 'rowsContainer'}>
          {/* Set minHeight to show horizontal scrollbar when there are no rows */}
          <div style={{ width, minHeight: 1 }}>{rows}</div>
        </RowsContainer>
      </div>
    );
  }
}
