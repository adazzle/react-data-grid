const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.createRows();

    const extraColumns = [...Array(50).keys()].map(i => ({key: `col${i}`, name: `col${i}`}));
    const columns = [
      {
        key: 'id',
        name: 'ID',
        locked: true
      },
      {
        key: 'task',
        name: 'Title',
        width: 200,
        locked: true
      },
      {
        key: 'priority',
        name: 'Priority',
        width: 200,
        locked: true
      },
      {
        key: 'issueType',
        name: 'Issue Type',
        width: 200,
        locked: true
      },
      {
        key: 'complete',
        name: '% Complete',
        width: 200
      },
      {
        key: 'startDate',
        name: 'Start Date',
        width: 200
      },
      {
        key: 'completeDate',
        name: 'Expected Complete',
        width: 200
      },
      ...extraColumns];

    this._columns = columns;
    this.state = null;
  }

  getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  };

  createRows = () => {
    let rows = [];
    for (let i = 1; i < 1000; i++) {
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

const exampleDescription = <p>To make a given column locked, set <code>column.locked = true</code>. In this example, the ID columns has been locked and will remain in position as you scroll horizontally</p>

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Frozen Columns Example',
  exampleDescription,
  examplePath: './scripts/example03-frozen-cols.js',
  examplePlaygroundLink: 'https://jsfiddle.net/k7tfnw1n/5/'
});
