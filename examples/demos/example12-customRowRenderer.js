import React from 'react';
import PropTypes from 'prop-types';
import DataGrid from 'react-data-grid';
import Wrapper from './Wrapper';

class RowRenderer extends React.Component {
  static propTypes = {
    idx: PropTypes.string.isRequired,
    renderBaseRow: PropTypes.func.isRequired
  };

  getRowStyle = () => {
    return {
      color: this.getRowBackground()
    };
  };

  getRowBackground = () => {
    return this.props.idx % 2 ? 'green' : 'blue';
  };

  render() {
    // here we are just changing the style
    // but we could replace this with anything we liked, cards, images, etc
    // usually though it will just be a matter of wrapping a div, and then calling back through to the grid
    return <div style={this.getRowStyle()}>{this.props.renderBaseRow(this.props)}</div>;
  }
}

export default class extends React.Component {
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

    this._rows = rows;
  };

  rowGetter = (i) => {
    return this._rows[i];
  };

  render() {
    return (
      <Wrapper title="Overriding the row renderer">
        <DataGrid
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this._rows.length}
          minHeight={500}
          rowRenderer={RowRenderer}
        />
      </Wrapper>
    );
  }
}
