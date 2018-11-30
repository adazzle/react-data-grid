const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');

import PropTypes from 'prop-types';

// Custom Formatter component
class PercentCompleteFormatter extends React.Component {
  static propTypes = {
    value: PropTypes.number.isRequired
  };

  render() {
    const percentComplete = this.props.value + '%';
    return (
      <div className="progress">
        <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: percentComplete}}>
          {percentComplete}
        </div>
      </div>);
  }
}

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.createRows();
    this._columns = [
      {
        key: 'id',
        name: 'ID',
        width: 80
      },
      {
        key: 'task',
        name: 'Title'
      },
      {
        key: 'priority',
        name: 'Priority'
      },
      {
        key: 'issueType',
        name: 'Issue Type'
      },
      {
        key: 'complete',
        name: '% Complete',
        formatter: PercentCompleteFormatter
      },
      {
        key: 'startDate',
        name: 'Start Date'
      },
      {
        key: 'completeDate',
        name: 'Expected Complete'
      }
    ];

    this.state = null;
  }

  getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  };

  createRows = () => {
    let rows = [];
    for (let i = 1; i < 100; i++) {
      rows.push({
        id: i,
        task: 'Task ' + i,
        complete: Math.min(100, Math.round(Math.random() * 110)),
        priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
        issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
        startDate: this.getRandomDate(new Date(2015, 3, 1), new Date()),
        completeDate: this.getRandomDate(new Date(), new Date(2016, 0, 1))
      });
    }

    this._rows = rows;
  };

  rowGetter = (i) => {
    return this._rows[i];
  };

  render() {
    return  (
      <ReactDataGrid
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this._rows.length}
        minHeight={500} />);
  }
}

const exampleDescription = (
  <p>Its possible to create your own formatters for a given column by setting its <code>formatter</code> property. Here a React component is used to format the %complete column. A custom formatter will always receive a <code>value</code> prop, the value of the cell and this can be used however needed. Here we render a progress bar based on the <code>props.value</code></p>);

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Custom Formatter Example',
  exampleDescription,
  examplePath: './scripts/example05-custom-formatters.js',
  examplePlaygroundLink: 'https://jsfiddle.net/k7tfnw1n/7/'
});

