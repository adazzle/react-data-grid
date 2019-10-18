import React from 'react';
import DataGrid from 'react-data-grid';
import { Toolbar, Data } from 'react-data-grid-addons';
import Wrapper from './Wrapper';

const { Selectors } = Data;

export default class extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
        key: 'id',
        name: 'ID',
        width: 80,
        filterable: true
      },
      {
        key: 'task',
        name: 'Title',
        filterable: true
      },
      {
        key: 'priority',
        name: 'Priority',
        filterable: true
      },
      {
        key: 'issueType',
        name: 'Issue Type',
        filterable: true
      },
      {
        key: 'complete',
        name: '% Complete',
        filterable: true
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

    this.state = { rows: this.createRows(), filters: {}, enableHeaderFilters: false };
  }

  getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  };

  createRows = () => {
    const rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        task: `Task ${i}`,
        complete: Math.min(100, Math.round(Math.random() * 110)),
        priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
        issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
        startDate: this.getRandomDate(new Date(2015, 3, 1), new Date()),
        completeDate: this.getRandomDate(new Date(), new Date(2016, 0, 1))
      });
    }

    return rows;
  };

  getRows = () => {
    return Selectors.getRows(this.state);
  };

  getSize = () => {
    return this.getRows().length;
  };

  rowGetter = (rowIdx) => {
    const rows = this.getRows();
    return rows[rowIdx];
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
      <Wrapper title="Filterable Columns Example">
        <Toolbar
          enableFilter
          onToggleFilter={this.onToggleFilter}
        />
        <DataGrid
          columns={this._columns}
          rowGetter={this.rowGetter}
          enableCellSelect
          rowsCount={this.getSize()}
          minHeight={500}
          enableHeaderFilters={this.state.enableHeaderFilters}
          onAddFilter={this.handleFilterChange}
        />
      </Wrapper>
    );
  }
}
