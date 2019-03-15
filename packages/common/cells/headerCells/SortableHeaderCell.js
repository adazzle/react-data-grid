import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const DEFINE_SORT = {
  ASC: 'ASC',
  DESC: 'DESC',
  NONE: 'NONE'
};

export default class SortableHeaderCell extends React.Component {
  static propTypes = {
    columnKey: PropTypes.string.isRequired,
    column: PropTypes.shape({ name: PropTypes.node }),
    onSort: PropTypes.func.isRequired,
    sortDirection: PropTypes.oneOf(Object.keys(DEFINE_SORT)),
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
      case DEFINE_SORT.NONE:
        direction = sortDescendingFirst ? DEFINE_SORT.DESC : DEFINE_SORT.ASC;
        break;
      case DEFINE_SORT.ASC:
        direction = sortDescendingFirst ? DEFINE_SORT.NONE : DEFINE_SORT.DESC;
        break;
      case DEFINE_SORT.DESC:
        direction = sortDescendingFirst ? DEFINE_SORT.ASC : DEFINE_SORT.NONE;
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
    const className = classNames({
      'react-grid-HeaderCell-sortable': true,
      'react-grid-HeaderCell-sortable--ascending': this.props.sortDirection === 'ASC',
      'react-grid-HeaderCell-sortable--descending': this.props.sortDirection === 'DESC'
    });
    const content = this.props.headerRenderer ? React.cloneElement(this.props.headerRenderer, this.props) : this.props.column.name;
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
