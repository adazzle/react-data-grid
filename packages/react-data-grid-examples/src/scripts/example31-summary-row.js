import React from 'react';
import PropTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';
import exampleWrapper from '../components/exampleWrapper';

const sum = (rowsCount, rowGetter, column) => {
  let result = 0;
  for (let index = 0; index < rowsCount; index += 1) {
    result += rowGetter(index)[column.key];
  }
  return result;
};

const average = (rowsCount, rowGetter, column) => {
  return rowsCount ? sum(rowsCount, rowGetter, column) / rowsCount : 0;
};

const distinctCount = (rowsCount, rowGetter, column) => {
  const set = new Set([]);
  for (let index = 0; index < rowsCount; index += 1) {
    set.add(rowGetter(index)[column.key]);
  }
  return set.size;
};

const SummaryCount = (props) => {
  return (
    <div>{props.rowsCount}</div>
  );
};

SummaryCount.propTypes = {
  rowsCount: PropTypes.number
};

const SummaryDistinctCount = (props) => {
  const { rowsCount, rowGetter, column } = props;

  return (
    <div>{distinctCount(rowsCount, rowGetter, column)}</div>
  );
};

SummaryDistinctCount.propTypes = {
  rowsCount: PropTypes.number,
  rowGetter: PropTypes.func,
  column: PropTypes.any
};

const SummaryAverage = (props) => {
  const { rowsCount, rowGetter, column } = props;

  return (
    <div>{average(rowsCount, rowGetter, column)}</div>
  );
};

SummaryAverage.propTypes = {
  rowsCount: PropTypes.number,
  rowGetter: PropTypes.func,
  column: PropTypes.any
};


const SummarySum = (props) => {
  const { rowsCount, rowGetter, column } = props;

  return (
    <div>{sum(rowsCount, rowGetter, column)}</div>
  );
};

SummarySum.propTypes = {
  rowsCount: PropTypes.number,
  rowGetter: PropTypes.func,
  column: PropTypes.any
};

const colunsDef = [
  {
    key: 'id',
    name: 'ID',
    summary: SummarySum
  },
  {
    key: 'task',
    name: 'Title',
    width: 200,
    summary: SummaryCount
  },
  {
    key: 'priority',
    name: 'Priority',
    width: 200,
    summary: SummaryDistinctCount
  },
  {
    key: 'issueType',
    name: 'Issue Type',
    width: 200,
    summary: SummaryDistinctCount
  },
  {
    key: 'complete',
    name: '% Complete',
    width: 200,
    summary: SummarySum
  },
  {
    key: 'startDate',
    name: 'Start Date',
    width: 200,
    summary: SummaryCount
  },
  {
    key: 'completeDate',
    name: 'Expected Complete',
    width: 200,
    summary: SummaryCount
  }
];

const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
};

const createRows = () => {
  let rows = [];
  for (let i = 1; i < 100; i++) {
    rows.push({
      id: i,
      task: 'Task ' + i,
      complete: Math.min(100, Math.round(Math.random() * 110)),
      priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
      issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
      startDate: getRandomDate(new Date(2015, 3, 1), new Date()),
      completeDate: getRandomDate(new Date(), new Date(2016, 0, 1))
    });
  }

  return rows;
};

class Example extends React.Component {
  constructor(props) {
    super(props);
    let rows = createRows();
    this.state = { rows };
  }

  rowGetter = (i) => {
    return this.state.rows[i];
  };

  render() {
    return  (
      <ReactDataGrid
        columns={colunsDef}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.length}
        enableSummary
        minHeight={500} />);
  }
}

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Summary Example',
  examplePath: './scripts/example31-summary-row.js'
});
