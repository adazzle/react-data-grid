import React from 'react';
import DataGrid from 'react-data-grid';
import { Toolbar, Filters, Data } from 'react-data-grid-addons';
import Wrapper from './Wrapper';

const { NumericFilter, AutoCompleteFilter, MultiSelectFilter, SingleSelectFilter } = Filters;
const { Selectors } = Data;

export default class extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
        key: 'id',
        name: 'ID',
        width: 120,
        filterable: true,
        filterRenderer: NumericFilter
      },
      {
        key: 'task',
        name: 'Title',
        filterable: true
      },
      {
        key: 'priority',
        name: 'Priority',
        filterable: true,
        filterRenderer: MultiSelectFilter
      },
      {
        key: 'issueType',
        name: 'Issue Type',
        filterable: true,
        filterRenderer: SingleSelectFilter
      },
      {
        key: 'developer',
        name: 'Developer',
        filterable: true,
        filterRenderer: AutoCompleteFilter
      },
      {
        key: 'complete',
        name: '% Complete',
        filterable: true,
        filterRenderer: NumericFilter
      },
      {
        key: 'startDate',
        name: 'Start Date',
        filterable: true
      },
      {
        key: 'completeDate',
        name: 'Expected Complete',
        filterable: true
      }
    ];

    this.state = { rows: this.createRows(1000), filters: {}, enableHeaderFilters: false };
  }

  getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  };

  createRows = (numberOfRows) => {
    const rows = [];
    for (let i = 1; i < numberOfRows; i++) {
      rows.push({
        id: i,
        task: `Task ${i}`,
        complete: Math.min(100, Math.round(Math.random() * 110)),
        priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
        issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
        developer: ['James', 'Tim', 'Daniel', 'Alan'][Math.floor((Math.random() * 3) + 1)],
        startDate: this.getRandomDate(new Date(2015, 3, 1), new Date()),
        completeDate: this.getRandomDate(new Date(), new Date(2016, 0, 1))
      });
    }
    return rows;
  };

  rowGetter = (index) => {
    return Selectors.getRows(this.state)[index];
  };

  rowsCount = () => {
    return Selectors.getRows(this.state).length;
  };

  handleFilterChange = (filter) => {
    const newFilters = { ...this.state.filters };
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    this.setState({ filters: newFilters });
  };

  getValidFilterValues = (columnId) => {
    const values = this.state.rows.map(r => r[columnId]);
    return values.filter((item, i, a) => { return i === a.indexOf(item); });
  };

  onToggleFilter = () => {
    this.setState(prevState => {
      const enableHeaderFilters = !prevState.enableHeaderFilters;

      if (!enableHeaderFilters) {
        return {
          enableHeaderFilters,
          filters: {}
        };
      }

      return { enableHeaderFilters };
    });
  };

  render() {
    return (
      <Wrapper title="Custom Filters Example">
        <Toolbar
          enableFilter
          onToggleFilter={this.onToggleFilter}
        />
        <DataGrid
          enableCellSelect
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this.rowsCount()}
          minHeight={500}
          enableHeaderFilters={this.state.enableHeaderFilters}
          onAddFilter={this.handleFilterChange}
          getValidFilterValues={this.getValidFilterValues}
        />
      </Wrapper>
    );
  }
}
