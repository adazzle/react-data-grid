import React from 'react';
import ReactDataGrid from 'react-data-grid';
import { Toolbar, Data, Filters } from 'react-data-grid-addons';
import exampleWrapper from '../components/exampleWrapper';

/* Columns definition */
const columnsDef =  [
  {
    key: 'id',
    name: 'ID',
    filterable: true,
    filterRenderer: Filters.YafFilter
  },
  {
    key: 'task',
    name: 'Title',
    filterable: true,
    filterRenderer: Filters.YafFilter
  },
  {
    key: 'priority',
    name: 'Priority',
    filterable: true,
    filterRenderer: Filters.YafFilter
  },
  {
    key: 'issueType',
    name: 'Issue Type',
    filterable: true,
    filterRenderer: Filters.YafFilter
  },
  {
    key: 'complete',
    name: '% Complete',
    filterable: true,
    filterRenderer: Filters.YafFilter
  },
  {
    key: 'startDate',
    name: 'Start Date',
    filterable: true,
    filterRenderer: Filters.YafFilter
  },
  {
    key: 'completeDate',
    name: 'Expected Complete',
    filterable: true,
    filterRenderer: Filters.YafFilter
  }
];

const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
};

const createRows = () => {
  let rows = [];
  for (let i = 1; i < 1000; i++) {
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
  constructor(props, context) {
    super(props, context);
    this._columns = columnsDef;
    this.state = {
      columns: columnsDef,
      rows: createRows(1000),
      filters: {}
    };
  }

  onClearFilters = () => {
    this.setState({ filters: {} });
  };

  getValidFilterValues = (columnId) => {
    const rows = Data.Selectors.getRows(this.state);
    const values = rows.map(r => r[columnId]);
    return values.filter((item, i, a) => {
      return i === a.indexOf(item);
    });
  };

  getRows = () => {
    return Data.Selectors.getRows(this.state);
  };

  getSize = () => {
    return this.getRows().length;
  };

  handleFilterChange = (filter) => {
    if (filter) {
      const newFilters = Object.assign({}, this.state.filters);
      if (filter.filterTerm) {
        newFilters[filter.column.key] = filter;
      } else {
        delete newFilters[filter.column.key];
      }
      this.setState({ filters: newFilters });
    }
  };

  rowGetter = (rowIdx) => {
    const rows = this.getRows();
    return rows[rowIdx];
  };

  render() {
    return (
      <ReactDataGrid
        columns={this.state.columns}
        rowGetter={this.rowGetter}
        rowsCount={this.getSize()}
        minHeight={500}
        onAddFilter={this.handleFilterChange}
        onClearFilters={this.onClearFilters}
        getValidFilterValues={this.getValidFilterValues}
        toolbar={<Toolbar enableFilter={true}/>}
      />
    );
  }
}

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Yet Another Filter Filter',
  examplePath: './scripts/example30-yafFilter.js'
});
