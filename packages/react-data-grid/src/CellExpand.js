import React, { PropTypes } from 'react';

const CellExpand = React.createClass({
  getInitialState() {
    let expanded = this.props.expandableOptions && this.props.expandableOptions.expanded;
    return { expanded: expanded };
  },
  propTypes: {
    expandableOptions: PropTypes.object.isRequired,
    onCellExpand: PropTypes.func.isRequired
  },
  onCellExpand(e) {
    this.setState({ expanded: !this.state.expanded });
    this.props.onCellExpand(e);
  },
  render() {
    return (<span className="rdg-cell-expand" onClick={this.onCellExpand} >{this.state.expanded ? String.fromCharCode('9650') : String.fromCharCode('9660')}</span>);
  }
});

export default CellExpand;
