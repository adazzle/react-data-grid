import { useMemo, useState } from 'react';

import type { Column } from '../../src';
import DataGrid from '../../src';
import type { Props } from './types';

interface Row {
  label: string;
  first: number;
  second: number;
  third: number;
  fourth: number;
  fifth: number;
}

const allColumns: Column<Row>[] = ['Label', 'First', 'Second', 'Third', 'Fourth', 'Fifth'].map(
  (x) => ({ key: x.toLowerCase(), name: x })
);

const rows: Row[] = Array.from({ length: 8 }, (_, i) => ({
  label: `Attribute #${i + 1}`,
  first: 0.5 + Math.random() * 2,
  second: 0.5 + Math.random() * 2,
  third: 0.5 + Math.random() * 2,
  fourth: 0.5 + Math.random() * 2,
  fifth: 0.5 + Math.random() * 2
}));

export default function AddOrRemoveColumns({ direction }: Props) {
  const [nbCols, setNbCols] = useState(4);
  const columns = useMemo(() => allColumns.slice(0, nbCols), [nbCols]);

  return (
    <>
      <div style={{ width: '300px', marginBlock: "1rem" }}>
        <label htmlFor="nbcols">Choose the number of columns:</label>
        <br />
        <input
          type="range"
          id="nbcols"
          list="markers"
          min="1"
          max="5"
          step="2"
          onChange={(e) => setNbCols(parseInt(e.target.value, 10))}
        />

        <datalist id="markers">
          <option value="1" />
          <option value="3" />
          <option value="5" />
        </datalist>
      </div>

      <DataGrid
        columns={columns}
        rows={rows}
        style={{ resize: 'both', width: '800px', height: '3OOpx' }}
        direction={direction}
      />
    </>
  );
}
