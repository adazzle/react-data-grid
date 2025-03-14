import { screen } from '@testing-library/react';
import { page, userEvent } from '@vitest/browser/context';
import { css } from '@linaria/core';

import { DataGrid } from '../../src';
import type { DataGridProps } from '../../src';

export function setup<R, SR, K extends React.Key = React.Key>(props: DataGridProps<R, SR, K>) {
  page.render(
    <DataGrid
      {...props}
      className={css`
        block-size: 1080px;
        scrollbar-width: none;
      `}
    />
  );
}

export function getGrid() {
  return page.getByRole('grid');
}

export function getTreeGrid() {
  return page.getByRole('treegrid');
}

export function getRows() {
  return page.getByRole('row').elements().slice(1);
}

export function queryRowsOld() {
  return screen.queryAllByRole('row').slice(1);
}

export function getCellsAtRowIndex(rowIdx: number) {
  return page.getByRole('row').all()[rowIdx + 1].getByRole('gridcell').elements();
}

export function getCells() {
  return page.getByRole('gridcell').elements();
}

export function getHeaderCells() {
  return page.getByRole('columnheader').elements();
}

export function getSelectedCell() {
  const selectedGridCell = page.getByRole('gridcell', { selected: true });
  // TODO use `or` when available
  if (selectedGridCell.elements().length > 0) {
    return selectedGridCell;
  }

  return page.getByRole('columnheader', { selected: true });
}

export function validateCellPosition(columnIdx: number, rowIdx: number) {
  const cell = getSelectedCell().element();
  expect(cell).toHaveAttribute('aria-colindex', `${columnIdx + 1}`);
  expect(cell.parentNode).toHaveAttribute('aria-rowindex', `${rowIdx + 1}`);
}

export function copySelectedCell() {
  return userEvent.keyboard('{Control>}c{/Control}');
}

export function pasteSelectedCell() {
  return userEvent.keyboard('{Control>}v{/Control}');
}

export function scrollGrid({ scrollLeft, scrollTop }: { scrollLeft?: number; scrollTop?: number }) {
  const grid = getGrid().element();

  if (scrollLeft !== undefined) {
    grid.scrollLeft = scrollLeft;
  }
  if (scrollTop !== undefined) {
    grid.scrollTop = scrollTop;
  }

  if (scrollLeft !== undefined || scrollTop !== undefined) {
    grid.dispatchEvent(new Event('scroll'));
  }
}
