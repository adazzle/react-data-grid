const React = require('react');

const ExpandFormatter = React.createClass({

  propTypes: {
    dependentValues: React.PropTypes.object,
    onRowExpand: React.PropTypes.func.isRequired,
    rowIdx: React.PropTypes.number
  },

  onClick: function(e) {
    e.stopPropagation();
    this.props.onRowExpand(this.props.rowIdx);
  },

  render(): ?ReactElement {
    let row = this.props.dependentValues;
    if (typeof row.childRows !== 'undefined' && row.childRows !== null && row.childRows.length > 0) {
      let expanded = row.expanded || false;
      let className = expanded ? 'fa fa-chevron-down' : 'fa fa-chevron-right';
      return <i className={className} onClick={this.onClick}></i>;
    }
    return <i></i>;
  }
});

module.exports = ExpandFormatter;
