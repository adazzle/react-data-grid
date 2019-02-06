import React from 'react';
import PropTypes from 'prop-types';
import joinClasses from 'classnames';
import { DefineSort } from 'common/constants';

class SortableHeaderCell extends React.Component {
  static propTypes = {
    columnKey: PropTypes.string.isRequired,
    column: PropTypes.shape({ name: PropTypes.node }),
    onSort: PropTypes.func.isRequired,
    sortDirection: PropTypes.oneOf(Object.keys(DefineSort)),
    headerRenderer: PropTypes.node,
    sortDescendingFirst: PropTypes.bool
  };

  onClick = () => {
    let direction;
    const { sortDirection, sortDescendingFirst } = this.props;
    switch (sortDirection) {
    default:
    case null:
    case undefined:
    case DefineSort.NONE:
      direction = sortDescendingFirst ? DefineSort.DESC : DefineSort.ASC;
      break;
    case DefineSort.ASC:
      direction = sortDescendingFirst ? DefineSort.NONE : DefineSort.DESC;
      break;
    case DefineSort.DESC:
      direction = sortDescendingFirst ? DefineSort.ASC : DefineSort.NONE;
      break;
    }
    this.props.onSort(
      this.props.columnKey,
      direction);
  };

  getSortByText = () => {
    const unicodeKeys = {
      ASC: '9650',
      DESC: '9660'
    };
    return this.props.sortDirection === 'NONE' ? '' : String.fromCharCode(unicodeKeys[this.props.sortDirection]);
  };

  render() {
    const className = joinClasses({
      'react-grid-HeaderCell-sortable': true,
      'react-grid-HeaderCell-sortable--ascending': this.props.sortDirection === 'ASC',
      'react-grid-HeaderCell-sortable--descending': this.props.sortDirection === 'DESC'
    });
    const content = this.props.headerRenderer ? React.cloneElement(this.props.headerRenderer, this.props) :  this.props.column.name;
    return (
      <div className={className}
        onClick={this.onClick}
        style={{ cursor: 'pointer' }}>
        <span className="pull-right">{this.getSortByText()}</span>
        {content}
      </div>
    );
  }
}

export default SortableHeaderCell;
