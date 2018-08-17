import ReactDataGrid from 'react-data-grid';
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
        key: 'id',
        name: 'ID',
        frozen: true
      },
      {
        key: 'task',
        name: 'Title',
        width: 200,
        sortable: true
      },
      {
        key: 'priority',
        name: 'Priority',
        width: 200,
        sortable: true
      },
      {
        key: 'issueType',
        name: 'Issue Type',
        width: 200,
        sortable: true
      },
      {
        key: 'complete',
        name: '% Complete',
        width: 200,
        sortable: true
      },
      {
        key: 'startDate',
        name: 'Start Date',
        width: 200,
        sortable: true
      },
      {
        key: 'completeDate',
        name: 'Expected Complete',
        width: 200,
        sortable: true,
        sortDescendingFirst: true
      }
    ];

    let originalRows = this.createRows(1000);
    let rows = originalRows.slice(0);
    this.state = { originalRows, rows };
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

    return rows;
  };

  handleGridSort = (sortColumn, sortDirection) => {
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
      } else if (sortDirection === 'DESC') {
        return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
      }
    };

    const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);

    this.setState({ rows });
  };

  rowGetter = (i) => {
    return this.state.rows[i];
  };

  render() {
    return  (
      <ReactDataGrid
        onGridSort={this.handleGridSort}
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.length}
        minHeight={500} />);
  }
}

const exampleDescription = (<p>While ReactDataGrid does not provide the ability to sort directly, it does provide hooks that allow you to provide your own sort function. This is done via the <code>onGridSort</code> prop. To enable sorting for a given column, set <code>column.sortable = true</code> for that column. Now when the header cell is clicked for that column, <code>onGridSort</code> will be triggered passing the column name and the sort direction. To enable your column to be sorted in descending order first set <code>column.descendingFirst = true</code> prop.</p>);

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Sort Descending First Sortable Columns Example',
  exampleDescription,
  examplePath: './scripts/example29-descendingFirstSortable.js',
  examplePlaygroundLink: 'https://jsfiddle.net/k7tfnw1n/8/'
});
