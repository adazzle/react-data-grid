import React from 'react';
import Canvas from './Canvas';
import { GridProps } from './Grid';
import { SCROLL_DIRECTION } from './common/enums';

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

export interface ViewportProps<R> extends SharedGridProps<R> {
  onScroll(scrollState: ScrollState): void;
  viewportWidth: number;
}

export default function Viewport<R>({
  minHeight,
  rowHeight,
  rowOffsetHeight,
  rowsCount,
  onScroll,
  columnMetrics,
  overscanRowCount,
  overscanColumnCount,
  enableIsScrolling,
  viewportWidth,
  ...props
}: ViewportProps<R>) {
  return (
    <div
      onKeyDown={props.onViewportKeydown}
      onKeyUp={props.onViewportKeyup}
    >
      <Canvas<R>
        rowKey={props.rowKey}
        columnMetrics={columnMetrics}
        viewportWidth={viewportWidth}
        width={columnMetrics.totalColumnWidth}
        columns={columnMetrics.columns}
        lastFrozenColumnIndex={columnMetrics.lastFrozenColumnIndex}
        rowGetter={props.rowGetter}
        rowsCount={rowsCount}
        selectedRows={props.selectedRows}
        rowRenderer={props.rowRenderer}
        enableIsScrolling={enableIsScrolling}
        cellMetaData={props.cellMetaData}
        height={minHeight - rowOffsetHeight}
        rowHeight={rowHeight}
        onScroll={onScroll}
        scrollToRowIndex={props.scrollToRowIndex}
        contextMenu={props.contextMenu}
        rowSelection={props.rowSelection}
        getSubRowDetails={props.getSubRowDetails}
        rowGroupRenderer={props.rowGroupRenderer}
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
