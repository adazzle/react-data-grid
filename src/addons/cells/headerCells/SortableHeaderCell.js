/* @flow */
/**
 * @jsx React.DOM


 */
'use strict';

var React              = require('react');
var joinClasses         = require('classnames');
var ExcelColumn = require('../../grids/ExcelColumn');

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
        direction = DEFINE_SORT.ASC;
      break;
      case DEFINE_SORT.ASC:
        direction = DEFINE_SORT.DESC;
      break;
      case DEFINE_SORT.DESC:
        direction = null;
      break;
    }
    this.props.onSort(
      this.props.columnKey,
      direction);
  },

  getSortByClass : function(){
    var sorted = this.props.sortDirection;
    return joinClasses({
      'pull-right' : true,
      'glyphicon glyphicon-arrow-up' : sorted === 'ASC',
      'glyphicon glyphicon-arrow-down' : sorted === 'DESC'
    });
  },

  render: function(): ?ReactElement {

    return (
      <div
        onClick={this.onClick}
        style={{cursor: 'pointer'}}>
        {this.props.column.name}
        <span className={this.getSortByClass()}/>
      </div>
    );
  }
});

module.exports = SortableHeaderCell;
