const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');
const {AreaChart, Area} = require('Recharts');

const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const ExpensiveFormatter = () => {
  const items = [...Array(1000).keys()].map(i => ({name: `Page ${i}`, uv: getRandom(0, 4000), pv: getRandom(0, 4000), amt: getRandom(0, 4000)})).slice(0, 50);
  return (
    <AreaChart width={500} height={50} data={items}
          margin={{top: 5, right: 0, left: 0, bottom: 5}}>
      <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  );
};

const createColumns = (numberCols) => [...Array(numberCols).keys()].map(i => {
  const column = {
    key: `col${i}`,
    name: `col${i}`
  };
  if (i === 3) {
    column.formatter = ExpensiveFormatter;
    column.width = 500;
  }
  return column;
});

const createRows = (numberRows) => [...Array(numberRows).keys()].map(i => {
  return [...Array(numberRows).keys()].reduce((row, j) => ({...row, ...{[`col${j}`]: `row ${i} col ${j}`} }), {});
});

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {columns: createColumns(50), rows: createRows(200)};
  }

  rowGetter = (i) => {
    return this.state.rows[i];
  };

  render() {
    return (
      <div>
        <ReactDataGrid
          columns={this.state.columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={800}
          onScroll={this.onScroll}
        /></div>);
  }
}

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Efficient windowing demonstration',
  exampleDescription: 'Scroll the grid in different directions to see how efficient invisible content is rendered in order to achieve smooth scrolling',
  examplePath: './scripts/example30-efficient-windowing.js',
  examplePlaygroundLink: 'https://jsfiddle.net/f6mbnb8z/1/'
});
