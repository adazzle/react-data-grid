import React from 'react';
import PropTypes from 'prop-types';
import { CellExpand } from 'common/constants';

class CellExpander extends React.Component {
  static propTypes = {
    expandableOptions: PropTypes.object.isRequired,
    onCellExpand: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const expanded = props.expandableOptions && props.expandableOptions.expanded;
    this.state = { expanded: expanded };
  }

  componentWillReceiveProps(nextProps) {
    const expanded = nextProps.expandableOptions && nextProps.expandableOptions.expanded;
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
      <div className="rdg-cell-expand">
        <span onClick={this.onCellExpand}>
          {this.state.expanded ? CellExpand.DOWN_TRIANGLE : CellExpand.RIGHT_TRIANGLE}
        </span>
      </div>
    );
  }
}

export default CellExpander;
