import { cloneElement } from 'react';
import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import type { DataGridProps } from '../../../src/DataGrid';

export function DataGridExport<R, SR>({
  children
}: {
  children: ReactElement<DataGridProps<R, SR>>;
}) {
  function exportToCsv() {
    const grid = document.createElement('content');
    grid.innerHTML = renderToStaticMarkup(cloneElement(children, {
      enableVirtualization: false
    }));

    const csv = [];
    const gridRows = grid.querySelectorAll<HTMLDivElement>('.rdg-header-row, .rdg-row, .rdg-summary-row');

    for (const gridRow of gridRows) {
      const gridCells = gridRow.querySelectorAll<HTMLDivElement>('.rdg-cell');
      const rows = [];

      for (const gridCell of gridCells) {
        rows.push(gridCell.innerText);
      }

      csv.push(rows.join(','));
    }


    const csvFile = new Blob([csv.join('\n')], { type: 'text/csv' });
    const downloadLink = document.createElement('a');
    downloadLink.download = 'CommonFeatures.csv';
    downloadLink.href = URL.createObjectURL(csvFile);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <>
      <button onClick={exportToCsv}>
        Export
      </button>
      {children}
    </>
  );
}
