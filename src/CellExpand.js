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
    let marginLeft = this.props.expandableOptions ? (this.props.expandableOptions.treeDepth * 30) : 0;
    return (<span style={{ float: 'left', marginLeft: marginLeft }} onClick={this.onCellExpand} >{this.state.expanded ? String.fromCharCode('9660') : String.fromCharCode('9658')}</span>);
  }
});

export default CellExpand;
