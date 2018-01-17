const React              = require('react');
import PropTypes from 'prop-types';
const joinClasses         = require('classnames');
const DEFINE_SORT = {
  ASC: 'ASC',
  DESC: 'DESC',
  NONE: 'NONE'
};

class SortableHeaderCell extends React.Component {
  static propTypes = {
    columnKey: PropTypes.string.isRequired,
    column: PropTypes.shape({ name: PropTypes.node }),
    onSort: PropTypes.func.isRequired,
    sortDirection: PropTypes.oneOf(Object.keys(DEFINE_SORT)),
    descendingFirst: PropTypes.bool
  };

  onClick = () => {
    let direction;
    switch (this.props.sortDirection) {
    default:
    case null:
    case undefined:
    case DEFINE_SORT.NONE:
      if (this.props.descendingFirst) {
        direction = DEFINE_SORT.DESC;
      } else {
        direction = DEFINE_SORT.ASC;
      }
      break;
    case DEFINE_SORT.ASC:
      if (this.props.descendingFirst) {
        direction = DEFINE_SORT.NONE;
      } else {
        direction = DEFINE_SORT.DESC;
      }
      break;
    case DEFINE_SORT.DESC:
      if (this.props.descendingFirst) {
        direction = DEFINE_SORT.ASC;
      } else {
        direction = DEFINE_SORT.NONE;
      }
      break;
    }
    this.props.onSort(
      this.props.columnKey,
      direction);
  };

  getSortByText = () => {
    let unicodeKeys = {
      ASC: '9650',
      DESC: '9660'
    };
    return this.props.sortDirection === 'NONE' ? '' : String.fromCharCode(unicodeKeys[this.props.sortDirection]);
  };

  render(): ?ReactElement {
    let className = joinClasses({
      'react-grid-HeaderCell-sortable': true,
      'react-grid-HeaderCell-sortable--ascending': this.props.sortDirection === 'ASC',
      'react-grid-HeaderCell-sortable--descending': this.props.sortDirection === 'DESC'
    });

    return (
      <div className={className}
        onClick={this.onClick}
        style={{cursor: 'pointer'}}>
        <span className="pull-right">{this.getSortByText()}</span>
        {this.props.column.name}
      </div>
    );
  }
}

module.exports = SortableHeaderCell;
module.exports.DEFINE_SORT = DEFINE_SORT;
