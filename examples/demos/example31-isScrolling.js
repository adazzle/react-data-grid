import React, { useState, useEffect } from 'react';
import DataGrid, { valueCellContentRenderer } from 'react-data-grid';
import { AreaChart, Area } from 'Recharts';
import Wrapper from './Wrapper';

const supportsIdleCallback = typeof window.requestIdleCallback === 'function';

const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
};

function ExpensiveFormatter() {
  const [isReady, setReady] = useState(false);
  const [items] = useState(() => {
    return [...Array(1000).keys()].map(i => ({ name: `Page ${i}`, uv: getRandom(0, 4000), pv: getRandom(0, 4000), amt: getRandom(0, 4000) })).slice(0, 50);
  });

  useEffect(supportsIdleCallback
    ? () => {
      const handle = window.requestIdleCallback(() => setReady(true), { timeout: 300 });

      return () => {
        window.cancelIdleCallback(handle);
      };
    }
    : () => {
      const handle = window.setTimeout(() => setReady(true), 1000);

      return () => {
        window.clearTimeout(handle);
      };
    }, [isReady]);

  if (!isReady) return <div>delayed rendering...</div>;

  return (
    <AreaChart
      width={500}
      height={50}
      data={items}
      margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
    >
      <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  );
}

const createColumns = (numberCols) => [...Array(numberCols).keys()].map(i => {
  const column = {
    key: `col${i}`,
    name: `col${i}`
  };
  if (i === 3) {
    column.cellContentRenderer = () => <ExpensiveFormatter />;
    column.width = 500;
  }
  return column;
});

const createRows = (numberRows) => [...Array(numberRows).keys()].map(i => {
  return [...Array(numberRows).keys()].reduce((row, j) => ({ ...row, [`col${j}`]: `row ${i} col ${j}` }), {});
});

export default class extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { columns: createColumns(6), rows: createRows(200) };
  }

  rowGetter = (i) => {
    return this.state.rows[i];
  };

  render() {
    return (
      <Wrapper title="Efficient windowing demonstration">
        <DataGrid
          columns={this.state.columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={800}
          defaultCellContentRenderer={valueCellContentRenderer}
        />
      </Wrapper>
    );
  }
}
