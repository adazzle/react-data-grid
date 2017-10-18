import React from 'react';
import PropTypes from 'prop-types';
import AppConstants from './AppConstants';

class CellExpand extends React.Component {
  static propTypes = {
    expandableOptions: PropTypes.object.isRequired,
    onCellExpand: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    let expanded = props.expandableOptions && props.expandableOptions.expanded;
    this.state = { expanded: expanded };
  }

  componentWillReceiveProps(nextProps) {
    let expanded = nextProps.expandableOptions && nextProps.expandableOptions.expanded;
    if (this.state.expanded !== expanded) {
      this.setState({expanded});
    }
  }

  onCellExpand = (e) => {
    this.setState({ expanded: !this.state.expanded });
    this.props.onCellExpand(e);
  };

  render() {
    return (
      <span className="rdg-cell-expand" onClick={this.onCellExpand} >
        {this.state.expanded ? AppConstants.CellExpand.DOWN_TRIANGLE : AppConstants.CellExpand.RIGHT_TRIANGLE}
      </span>
    );
  }
}

export default CellExpand;
