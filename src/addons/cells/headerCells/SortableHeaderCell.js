/* @flow */
/**
 * @jsx React.DOM


 */
'use strict';

var React              = require('react/addons');
var cx             = React.addons.classSet;
var ExcelColumn = require('../../grids/ExcelColumn');

var SortableHeaderCell = React.createClass({
  propTypes: {
    column: React.PropTypes.shape(ExcelColumn).isRequired
  },
  onClick: function() {
    this.props.column.sortBy(
      this.props.column,
      this.props.column.sorted);
  },

  getSortByClass : function(){
    var sorted = this.props.column.sorted;
    return cx({
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
