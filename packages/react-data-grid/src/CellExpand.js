import React, { PropTypes } from 'react';
import AppConstants from './AppConstants';

const CellExpand = React.createClass({
  getInitialState() {
    let expanded = this.props.expandableOptions && this.props.expandableOptions.expanded;
    return { expanded: expanded };
  },
  componentWillReceiveProps(nextProps) {
    let expanded = nextProps.expandableOptions && nextProps.expandableOptions.expanded;
    if (this.state.expanded !== expanded) {
      this.setState({expanded});
    }
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
    return (
      <span className="rdg-cell-expand" onClick={this.onCellExpand} >
        {this.state.expanded ? AppConstants.CellExpand.DOWN_TRIANGLE : AppConstants.CellExpand.RIGHT_TRIANGLE}
      </span>
    );
  }
});

export default CellExpand;
