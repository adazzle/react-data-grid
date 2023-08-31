import type {
  CalculatedColumn,
  CalculatedColumnParent,
  CellNavigationMode,
  Maybe,
  Position
} from '../types';
import { getColSpan } from './colSpanUtils';

interface IsSelectedCellEditableOpts<R, SR> {
  selectedPosition: Position;
  columns: readonly CalculatedColumn<R, SR>[];
  rows: readonly R[];
}

export function isSelectedCellEditable<R, SR>({
  selectedPosition,
  columns,
  rows
}: IsSelectedCellEditableOpts<R, SR>): boolean {
  const column = columns[selectedPosition.idx];
  const row = rows[selectedPosition.rowIdx];
  return isCellEditable(column, row);
}

export function isCellEditable<R, SR>(column: CalculatedColumn<R, SR>, row: R): boolean {
  return (
    column.renderEditCell != null &&
    (typeof column.editable === 'function' ? column.editable(row) : column.editable) !== false
  );
}

interface GetNextSelectedCellPositionOpts<R, SR> {
  cellNavigationMode: CellNavigationMode;
  columns: readonly CalculatedColumn<R, SR>[];
  colSpanColumns: readonly CalculatedColumn<R, SR>[];
  rows: readonly R[];
  topSummaryRows: Maybe<readonly SR[]>;
  bottomSummaryRows: Maybe<readonly SR[]>;
  minRowIdx: number;
  mainHeaderIndex: number;
  maxRowIdx: number;
  currentPosition: Position;
  nextPosition: Position;
  lastFrozenColumnIndex: number;
  isCellWithinBounds: (position: Position) => boolean;
}

function getSelectedCellColSpan<R, SR>({
  rows,
  topSummaryRows,
  bottomSummaryRows,
  rowIdx,
  lastFrozenColumnIndex,
  column
}: Pick<
  GetNextSelectedCellPositionOpts<R, SR>,
  'rows' | 'topSummaryRows' | 'bottomSummaryRows' | 'lastFrozenColumnIndex'
> & {
  rowIdx: number;
  column: CalculatedColumn<R, SR>;
}) {
  const topSummaryRowsCount = topSummaryRows?.length ?? 0;
  const minRowIdx = -1 - topSummaryRowsCount;
  if (rowIdx === minRowIdx) {
    return getColSpan(column, lastFrozenColumnIndex, { type: 'HEADER' });
  }

  if (topSummaryRows && rowIdx > minRowIdx && rowIdx <= topSummaryRowsCount + minRowIdx) {
    return getColSpan(column, lastFrozenColumnIndex, {
      type: 'SUMMARY',
      row: topSummaryRows[rowIdx + topSummaryRowsCount]
    });
  }

  if (rowIdx >= 0 && rowIdx < rows.length) {
    const row = rows[rowIdx];
    return getColSpan(column, lastFrozenColumnIndex, { type: 'ROW', row });
  }

  if (bottomSummaryRows) {
    return getColSpan(column, lastFrozenColumnIndex, {
      type: 'SUMMARY',
      row: bottomSummaryRows[rowIdx - rows.length]
    });
  }

  return undefined;
}

export function getNextSelectedCellPosition<R, SR>({
  cellNavigationMode,
  columns,
  colSpanColumns,
  rows,
  topSummaryRows,
  bottomSummaryRows,
  minRowIdx,
  mainHeaderIndex,
  maxRowIdx,
  currentPosition: { idx: currentIdx, rowIdx: currentRowIdx },
  nextPosition,
  lastFrozenColumnIndex,
  isCellWithinBounds
}: GetNextSelectedCellPositionOpts<R, SR>): Position {
  let { idx: nextIdx, rowIdx: nextRowIdx } = nextPosition;
  const moveRight = nextIdx - currentIdx > 0;
  const moveLeft = nextIdx - currentIdx < 0;
  const moveDown = nextRowIdx - currentRowIdx > 0;
  const moveUp = nextRowIdx - currentRowIdx < 0;

  const setColSpan = (moveRight: boolean) => {
    // If a cell within the colspan range is selected then move to the
    // previous or the next cell depending on the navigation direction
    for (const column of colSpanColumns) {
      const colIdx = column.idx;
      if (colIdx > nextIdx) break;
      const colSpan = getSelectedCellColSpan({
        rows,
        topSummaryRows,
        bottomSummaryRows,
        rowIdx: nextRowIdx,
        lastFrozenColumnIndex,
        column
      });

      if (colSpan && nextIdx > colIdx && nextIdx < colSpan + colIdx) {
        nextIdx = colIdx + (moveRight ? colSpan : 0);
        break;
      }
    }
  };

  if (isCellWithinBounds(nextPosition)) {
    setColSpan(nextIdx - currentIdx > 0);
  }

  if (cellNavigationMode === 'CHANGE_ROW') {
    const columnsCount = columns.length;
    const isAfterLastColumn = nextIdx === columnsCount;
    const isBeforeFirstColumn = nextIdx === -1;

    if (isAfterLastColumn) {
      const isLastRow = nextRowIdx === maxRowIdx;
      if (!isLastRow) {
        nextIdx = 0;
        nextRowIdx += 1;
      }
    } else if (isBeforeFirstColumn) {
      const isFirstRow = nextRowIdx === minRowIdx;
      if (!isFirstRow) {
        nextRowIdx -= 1;
        nextIdx = columnsCount - 1;
      }
      setColSpan(false);
    }
  }

  const getParentRowIdx = (parent: CalculatedColumnParent<R, SR>) => {
    return parent.level + mainHeaderIndex;
  };

  const setParentCompatibleWithNewPosition = () => {
    let found = false;
    const column = columns[nextIdx];
    let parent = column.parent;
    const nextHeaderRowIdx = nextRowIdx;
    while (parent !== undefined) {
      const parentRowIdx = getParentRowIdx(parent);
      if (parentRowIdx >= nextHeaderRowIdx) {
        nextRowIdx = parentRowIdx;
        nextIdx = parent.idx;
        found = true;
      }
      parent = parent.parent;
    }

    if (!found) {
      nextRowIdx = mainHeaderIndex;
    }
  };

  if (nextRowIdx < mainHeaderIndex) {
    if (moveUp) {
      const column = columns[currentIdx];
      let parent = column.parent;
      let found = false;
      while (parent !== undefined) {
        const parentRowIdx = getParentRowIdx(parent);
        if (nextRowIdx >= parentRowIdx) {
          nextRowIdx = parentRowIdx;
          nextIdx = parent.idx;
          found = true;
          break;
        }
        parent = parent.parent;
      }
      if (!found) {
        nextRowIdx = minRowIdx - 1;
      }
    } else if (moveDown) {
      setParentCompatibleWithNewPosition();
    } else if (moveRight) {
      const column = columns[currentIdx];
      let parent = column.parent;
      // find the parent matching the level
      while (parent !== undefined) {
        const parentRowIdx = getParentRowIdx(parent);
        if (nextRowIdx === parentRowIdx) {
          nextIdx = parent.idx + parent.colSpan;
          break;
        }
        parent = parent.parent;
      }

      setParentCompatibleWithNewPosition();
    } else if (moveLeft) {
      const nextColumn = columns[nextIdx];
      let parent = nextColumn.parent;
      // find the parent matching the level
      while (parent !== undefined) {
        const parentRowIdx = getParentRowIdx(parent);
        if (nextRowIdx === parentRowIdx) {
          nextIdx = parent.idx;
          break;
        }
        parent = parent.parent;
      }

      setParentCompatibleWithNewPosition();
    }
  }

  return { idx: nextIdx, rowIdx: nextRowIdx };
}

interface CanExitGridOpts {
  maxColIdx: number;
  minRowIdx: number;
  maxRowIdx: number;
  selectedPosition: Position;
  shiftKey: boolean;
}

export function canExitGrid({
  maxColIdx,
  minRowIdx,
  maxRowIdx,
  selectedPosition: { rowIdx, idx },
  shiftKey
}: CanExitGridOpts): boolean {
  // Exit the grid if we're at the first or last cell of the grid
  const atLastCellInRow = idx === maxColIdx;
  const atFirstCellInRow = idx === 0;
  const atLastRow = rowIdx === maxRowIdx;
  const atFirstRow = rowIdx === minRowIdx;

  return shiftKey ? atFirstCellInRow && atFirstRow : atLastCellInRow && atLastRow;
}
