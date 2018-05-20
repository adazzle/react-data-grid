const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');

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
    sortable: true
  }
];

class Example extends React.Component {
  constructor(props) {
    super(props);

    let originalRows = this.createRows(1000);
    let rows = originalRows.slice(0);
    // Store the original rows array, and make a copy that can be used for modifying eg.filtering, sorting
    this.state = { originalRows, rows };
  }

  getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  }

  createRows() {
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
  }

  handleSort = (sort) => {
    const valueComparer = (v1, v2, direction) => {
      if (v1 === v2) return 0;
      if (direction === 'ASC') {
        return (v1 > v2) ? 1 : -1;
      } else if (direction === 'DESC') {
        return (v1 < v2) ? 1 : -1;
      }
    };

    const comparer = (a, b) => {
      let cmp = 0;
      for (let i = 0; i < sort.length; ++i) {
        cmp = valueComparer(a[sort[i].column], b[sort[i].column], sort[i].direction);
        if (cmp) {
          break;
        }
      }
      return cmp;
    };

    const rows = sort.length === 0 ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);
    this.setState({ rows });
  }

  getRowAt = (i) => {
    return this.state.rows[i];
  }

  render() {
    return  (
      <ReactDataGrid
        onGridMultipleColumnsSort={this.handleSort}
        multipleColumnsSort={true}
        columns={columns}
        sort={[{
          column: 'task',
          direction: 'ASC'}
        ]}
        rowGetter={this.getRowAt}
        rowsCount={this.state.rows.length}
        minHeight={500} />);
  }
}

const exampleDescription = (<p>To enable multiple column sort, set <code>{'multipleColumnsSort={true}'}</code> on ReactDataGrid component. To enable sorting for a given column, set <code>column.sortable = true</code> for that column. Unlike single sort, when the header cell is clicked for a column, <code>onGridMultipleColumnsSort</code> will be triggered passing the array of <code>{'{columnKey, sortDirection}'}</code> pairs. Also, there is an option to provide initial sort array for the grid via <code>sort</code> property which can be passed to ReactDataGrid</p>);

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Multiple Column Sort Example',
  exampleDescription,
  examplePath: './scripts/example27-multiple-column-sort.js'
});
