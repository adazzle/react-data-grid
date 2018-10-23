const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.createRows();
    this._columns = [
      {
        key: 'id',
        name: 'ID',
        resizable: true,
        width: 40
      },
      {
        key: 'task',
        name: 'Title',
        resizable: true
      },
      {
        key: 'priority',
        name: 'Priority',
        resizable: true
      },
      {
        key: 'issueType',
        name: 'Issue Type',
        resizable: true
      },
      {
        key: 'complete',
        name: '% Complete',
        resizable: true
      },
      {
        key: 'startDate',
        name: 'Start Date',
        resizable: true
      },
      {
        key: 'completeDate',
        name: 'Expected Complete',
        resizable: true
      }
    ];

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
        minHeight={500}
        minColumnWidth={120} 
      />);
  }
}

const exampleDescription = (
  <div>
    <p>To make a given column resizable, set <code>column.resizable = true</code></p>
    <p>If you need to know when a column has been resized, use the <code>onColumnResize</code> prop. This will be triggered when a column is
    resized and will report the column index and its new width. These can be saved on the back-end and used to restore column widths when
    the component is initialized, by setting <code>width</code> key in each column.</p>
  </div>);

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Resizable Columns Example',
  exampleDescription,
  examplePath: './scripts/example02-resizable-cols.js',
  examplePlaygroundLink: 'https://jsfiddle.net/k7tfnw1n/2/'
});
