import { cloneElement } from 'react';
import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { DataGridProps } from '../../src';

function serialiseCellValue(value: unknown) {
  if (typeof value === 'string') {
    const formattedValue = value.replace(/"/g, '""');
    return formattedValue.includes(',') ? `"${formattedValue}"` : formattedValue;
  }
  return value;
}

export function exportToCsv<R, SR>(gridElement: ReactElement<DataGridProps<R, SR>>, fileName: string) {
  const grid = document.createElement('content');
  grid.innerHTML = renderToStaticMarkup(cloneElement(gridElement, {
    enableVirtualization: false
  }));

  const csv = [];
  const gridRows = grid.querySelectorAll<HTMLDivElement>('.rdg-header-row, .rdg-row, .rdg-summary-row');

  for (const gridRow of gridRows) {
    const gridCells = gridRow.querySelectorAll<HTMLDivElement>('.rdg-cell');
    const rows = [];

    for (const gridCell of gridCells) {
      rows.push(serialiseCellValue(gridCell.innerText));
    }

    csv.push(rows.join(','));
  }


  const csvFile = new Blob([csv.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const downloadLink = document.createElement('a');
  downloadLink.download = fileName;
  downloadLink.href = URL.createObjectURL(csvFile);
  downloadLink.style.display = 'none';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
