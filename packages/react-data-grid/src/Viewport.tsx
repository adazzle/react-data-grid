import React from 'react';
import Canvas from './Canvas';
import { SCROLL_DIRECTION } from './common/enums';
import { ScrollPosition } from './common/types';
import { GridProps } from './Grid';
import { HorizontalRangeToRender, VerticalRangeToRender } from './utils/viewportUtils';

export interface ScrollState {
  scrollTop: number;
  scrollLeft: number;
  scrollDirection: SCROLL_DIRECTION;
}

type SharedGridProps<R> = Pick<GridProps<R>,
'rowKey'
| 'rowHeight'
| 'rowRenderer'
| 'rowGetter'
| 'rowsCount'
| 'selectedRows'
| 'columnMetrics'
| 'cellMetaData'
| 'rowOffsetHeight'
| 'minHeight'
| 'scrollToRowIndex'
| 'contextMenu'
| 'rowSelection'
| 'getSubRowDetails'
| 'rowGroupRenderer'
| 'enableCellSelect'
| 'enableCellAutoFocus'
| 'cellNavigationMode'
| 'eventBus'
| 'interactionMasksMetaData'
| 'RowsContainer'
| 'editorPortalTarget'
| 'overscanRowCount'
| 'overscanColumnCount'
| 'enableIsScrolling'
| 'onViewportKeydown'
| 'onViewportKeyup'
>;

// TODO: completely remove this layer
export interface ViewportProps<R> extends SharedGridProps<R> {
  scrollLeft: number;
  scrollTop: number;
  viewportWidth: number;
  verticalRangeToRender: VerticalRangeToRender;
  horizontalRangeToRender: HorizontalRangeToRender;
  isScrolling?: boolean;
  onVerticalScroll(position: ScrollPosition): void;
}

export default function Viewport<R>({
  minHeight,
  rowHeight,
  rowOffsetHeight,
  rowsCount,
  columnMetrics,
  overscanRowCount,
  overscanColumnCount,
  enableIsScrolling,
  viewportWidth,
  scrollLeft,
  scrollTop,
  verticalRangeToRender,
  horizontalRangeToRender,
  isScrolling,
  onVerticalScroll,
  ...props
}: ViewportProps<R>) {
  const canvasHeight = minHeight - rowOffsetHeight;

  return (
    <div
      onKeyDown={props.onViewportKeydown}
      onKeyUp={props.onViewportKeyup}
    >
      <Canvas<R>
        {...verticalRangeToRender}
        {...horizontalRangeToRender}
        rowKey={props.rowKey}
        width={columnMetrics.width}
        totalColumnWidth={columnMetrics.totalColumnWidth}
        columns={columnMetrics.columns}
        lastFrozenColumnIndex={columnMetrics.lastFrozenColumnIndex}
        rowGetter={props.rowGetter}
        rowsCount={rowsCount}
        selectedRows={props.selectedRows}
        rowRenderer={props.rowRenderer}
        scrollTop={scrollTop}
        scrollLeft={scrollLeft}
        cellMetaData={props.cellMetaData}
        height={canvasHeight}
        rowHeight={rowHeight}
        onVerticalScroll={onVerticalScroll}
        scrollToRowIndex={props.scrollToRowIndex}
        contextMenu={props.contextMenu}
        rowSelection={props.rowSelection}
        getSubRowDetails={props.getSubRowDetails}
        rowGroupRenderer={props.rowGroupRenderer}
        isScrolling={isScrolling}
        enableCellSelect={props.enableCellSelect}
        enableCellAutoFocus={props.enableCellAutoFocus}
        cellNavigationMode={props.cellNavigationMode}
        eventBus={props.eventBus}
        RowsContainer={props.RowsContainer}
        editorPortalTarget={props.editorPortalTarget}
        interactionMasksMetaData={props.interactionMasksMetaData}
      />
    </div>
  );
}
