import React from 'react';

import { CellExpand } from './common/constants';

interface Props {
  expandableOptions?: { expanded?: boolean };
  onCellExpand: () => void;
}

interface State {
  expanded?: boolean;
}

export default class CellExpander extends React.Component<Props, State> {
  readonly state: Readonly<State> = {
    expanded: this.props.expandableOptions && this.props.expandableOptions.expanded
  };

  componentWillReceiveProps(nextProps: Props) {
    const expanded = nextProps.expandableOptions && nextProps.expandableOptions.expanded;
    if (this.state.expanded !== expanded) {
      this.setState({ expanded });
    }
  }

  onCellExpand = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    this.setState({ expanded: !this.state.expanded });
    this.props.onCellExpand();
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
