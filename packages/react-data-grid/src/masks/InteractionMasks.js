import React from 'react';
import PropTypes from 'prop-types';
import { cellEventListener } from '../cellEvents/CellEventListener';
import SelectionMask from './SelectionMask';
import CellEventTypes from '../cellEvents/CellEventTypes';
import { isCtrlKeyHeldDown } from '../utils/keyboardUtils';

class InteractionMasks extends React.Component {
  static propTypes = {
    visibleStart: PropTypes.number,
    visibleEnd: PropTypes.number,
    columns: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
    onHitBottomBoundary: PropTypes.func,
    onHitTopBoundary: PropTypes.func,
    selectedPosition: PropTypes.object,
    cellEvents: PropTypes.func,
    rowHeight: PropTypes.number,
    editCell: PropTypes.func
  };
  state = {
    selectedPosition: {
      idx: -1,
      rowIdx: -1
    }
  };

  componentDidMount() {
    const { cellEvents } = this.props;
    cellEvents.subscribe(CellEventTypes.onClick, cell => {
      this.selectCell(cell);
      this.node.focus();
    });
  }

  onKeyDown = e => {
    e.preventDefault();
    const keyPressMaps = {
      ArrowDown: this.moveDown,
      ArrowUp: this.moveUp,
      ArrowLeft: this.moveLeft,
      ArrowRight: this.moveRight,
      Tab: this.onPressTab,
      Enter: this.editCell
    };
    const action = keyPressMaps[e.key];
    action && action(e);
  };

  editCell = (e) => {
    this.props.editCell(this.state.selectedPosition, e.keyCode);
  };

  onPressTab = e => {
    if (isCtrlKeyHeldDown(e)) {
      this.moveLeft();
    } else {
      this.moveRight();
    }
  };

  moveUp = () => {
    const current = this.state.selectedPosition;
    const next = { ...current, ...{ rowIdx: current.rowIdx - 1 } };
    this.selectCell(next);
  };

  moveDown = () => {
    const current = this.state.selectedPosition;
    const next = { ...current, ...{ rowIdx: current.rowIdx + 1 } };
    this.selectCell(next);
  };

  moveLeft = () => {
    const current = this.state.selectedPosition;
    const next = { ...current, ...{ idx: current.idx - 1 } };
    this.selectCell(next);
  };

  moveRight = () => {
    const current = this.state.selectedPosition;
    const next = { ...current, ...{ idx: current.idx + 1 } };
    this.selectCell(next);
  };

  isCellWithinBounds = ({ idx, rowIdx }) => {
    return rowIdx >= 0 && idx >= 0 && idx <= this.props.columns.length;
  };

  isGridSelected = () => {
    return this.isCellWithinBounds(this.state.selectedPosition);
  };

  selectCell = cell => {
    if (this.isCellWithinBounds(cell)) {
      this.setState({ selectedPosition: cell });
    }
  };

  render() {
    return (
      <div
        tabIndex='0'
        onKeyDown={this.onKeyDown}
        ref={node => {
          this.node = node;
        }}
      >
        {this.isGridSelected() && (
          <SelectionMask
            {...this.props}
            selectedPosition={this.state.selectedPosition}
          />
        )}
      </div>
    );
  }
}

export default cellEventListener(InteractionMasks);
