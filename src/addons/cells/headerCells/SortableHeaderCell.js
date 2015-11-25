/* @flow */
/**
 * @jsx React.DOM


 */
'use strict';

var React              = require('react');
var joinClasses         = require('classnames');
var ExcelColumn = require('../../grids/ExcelColumn');
var DEFINE_SORT = {
  ASC : 'ASC',
  DESC : 'DESC',
  NONE  : 'NONE'
}

var SortableHeaderCell = React.createClass({
  propTypes: {
    columnKey : React.PropTypes.string.isRequired,
    onSort    : React.PropTypes.func.isRequired,
    sortDirection : React.PropTypes.oneOf(['ASC', 'DESC', 'NONE'])
  },

  onClick: function() {
    var direction;
    switch(this.props.sortDirection){
      case null:
      case undefined:
      case DEFINE_SORT.NONE:
        direction = DEFINE_SORT.ASC;
      break;
      case DEFINE_SORT.ASC:
        direction = DEFINE_SORT.DESC;
      break;
    case DEFINE_SORT.DESC:
        direction = DEFINE_SORT.NONE;
      break;
    }
    this.props.onSort(
      this.props.columnKey,
      direction);
  },

  getSortByText : function(){
    var unicodeKeys = {
      'ASC' : '9650',
      'DESC' : '9660',
      'NONE' : ''
    }
    return String.fromCharCode(unicodeKeys[this.props.sortDirection]);
  },

  render: function(): ?ReactElement {
    var className = joinClasses({
      'react-grid-HeaderCell-sortable': true,
      'react-grid-HeaderCell-sortable--ascending': this.props.sortDirection === 'ASC',
      'react-grid-HeaderCell-sortable--descending': this.props.sortDirection === 'DESC'
    });

    return (
      <div className={className}
        onClick={this.onClick}
        style={{cursor: 'pointer'}}>
        {this.props.column.name}
        <span className="pull-right">{this.getSortByText()}</span>
      </div>
    );
  }
});

module.exports = SortableHeaderCell;
