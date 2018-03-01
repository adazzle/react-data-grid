import React from 'react';
import PropTypes from 'prop-types';
import SelectionMask from './SelectionMask';
import EditorContainer from '../editors/EditorContainer';
import { isKeyPrintable } from '../utils/keyboardUtils';
import {
  getSelectedDimensions,
  getSelectedCellValue,
  getSelectedRowIndex,
  getSelectedRow,
  getSelectedColumn
} from '../utils/SelectedCellUtils';

const SCROLL_CELL_BUFFER = 2;

class InteractionMasks extends React.Component {
  static propTypes = {
    visibleStart: PropTypes.number,
    visibleEnd: PropTypes.number,
    columns: PropTypes.array,
    selectedPosition: PropTypes.object,
    rowHeight: PropTypes.number,
    toggleCellEdit: PropTypes.func,
    selectCell: PropTypes.func,
    onHitBottomBoundary: PropTypes.func,
    onHitTopBoundary: PropTypes.func,
    onCommit: PropTypes.func,
    onCommitCancel: PropTypes.func,
    isEditorEnabled: PropTypes.bool,
    firstEditorKeyPress: PropTypes.number,
    rowGetter: PropTypes.func
  };

  state = {
    lockedPosition: null
  };

  componentDidUpdate(nextProps) {
    if (this.props.selectedPosition !== nextProps.selectedPosition) {
      this.focus();
    }
  }

  onKeyDown = e => {
    e.preventDefault();
    if (this.isKeyboardNavigationEvent(e)) {
      this.move(e);
    } else if (isKeyPrintable(e.keyCode)) {
      this.toggleCellEdit(e.keyCode);
    }
  };

  toggleCellEdit = (e) => {
    const { isEditorEnabled, toggleCellEdit } = this.props;
    const enableEdit = !isEditorEnabled;
    toggleCellEdit(enableEdit, e.key);
    if (enableEdit === false) {
      this.focus();
    }
  };

  onPressTab = e => {
    if (e.shiftKey === true) {
      this.move();
    } else {
      this.move();
    }
  };

  isKeyboardNavigationEvent(e) {
    return this.getNavigationAction(e) != null;
  }

  getNavigationAction(e) {
    const keyNavActions = {
      ArrowDown: {
        getNext: current => ({...current, ...{rowIdx: current.rowIdx + 1}}),
        isCellAtBoundary: cell => {
          const {visibleEnd} = this.props;
          const scrollBoundary = visibleEnd - SCROLL_CELL_BUFFER;
          return cell.rowIdx >= scrollBoundary;
        },
        onHitBoundary: this.props.onHitBottomBoundary
      },
      ArrowUp: {
        getNext: current => ({...current, ...{rowIdx: current.rowIdx - 1}}),
        isCellAtBoundary: cell => {
          const {visibleStart} = this.props;
          return cell.rowIdx !== 0 && cell.rowIdx < visibleStart + SCROLL_CELL_BUFFER;
        },
        onHitBoundary: this.props.onHitTopBoundary
      },
      ArrowRight: {
        getNext: current => ({...current, ...{cellIdx: current.cellIdx + 1}}),
        isCellAtBoundary: () => false, // to do
        onHitBoundary: this.props.onRightBoundary//to do
      },
      ArrowLeft: {
        getNext: current => ({...current, ...{cellIdx: current.cellIdx - 1}}),
        isCellAtBoundary: () => false, // to do
        onHitBoundary: this.props.onHitLeftBoundary//to do
      }
    };
    return keyNavActions[e.key];
  }

  move(e) {
    const action = this.getNavigationAction(e);
    const currentPosition = this.getSelectedCellPosition();
    const next = action.getNext(currentPosition);
    if (action.isCellAtBoundary(next)) {
      if (this.isReadyToScrollWithKeyboard()) {
        this.setScrollingMetrics(next);
        action.onHitBoundary();
      }
    } else {
      this.resetScrollingMetrics();
      this.selectCell(next);
    }
  }

  isCellWithinBounds = ({ idx, rowIdx }) => {
    return rowIdx >= 0 && idx >= 0 && idx < this.props.columns.length;
  };

  isGridSelected = () => {
    return this.isCellWithinBounds(this.props.selectedPosition);
  };

  isReadyToScrollWithKeyboard = () => {
    if (this._scrollingMetrics == null) {
      return true;
    }
    const {visibleEnd} = this.props;
    return this._scrollingMetrics && this._scrollingMetrics.visibleEnd === visibleEnd - 1;
  };

  focus = () => {
    if (this.node && document.activeElement !== this.node) {
      this.node.focus();
    }
  };

  getSelectedCellDimensions() {
    return this._scrollingMetrics ? this._scrollingMetrics.dimensions : getSelectedDimensions(this.props);
  }

  getSelectedCellPosition() {
    return this._scrollingMetrics ? this._scrollingMetrics.position : this.props.selectedPosition;
  }

  selectCell = cell => {
    if (this.isCellWithinBounds(cell)) {
      this.props.selectCell(cell);
    }
  };

  setScrollingMetrics(next) {
    const {visibleEnd} = this.props;
    this._scrollingMetrics = {
      dimensions: this.getSelectedCellDimensions(),
      position: next,
      visibleEnd
    };
  }

  resetScrollingMetrics() {
    this._scrollingMetrics = null;
  }

  render() {
    const { isEditorEnabled, firstEditorKeyPress, onCommit, onCommitCancel } = this.props;
    const { width, left, top, height } = this.getSelectedCellDimensions();
    const value = getSelectedCellValue(this.props);
    const rowIdx = getSelectedRowIndex(this.props);
    return (
      <div
        ref={node => {
          this.node = node;
        }}
        tabIndex="0"
        onKeyDown={this.onKeyDown}
        ref={node => {
          this.node = node;
        }}
      >
        {!isEditorEnabled && this.isGridSelected() && (
          <SelectionMask
            {...this.props}
            width={width}
            left={left}
            top={top}
            height={height}
            isFixed={this._cellPositionWhileScrolling != null}
          />
        )}
        {isEditorEnabled && (
          <EditorContainer
            width={width}
            left={left}
            top={top}
            height={height}
            rowData={getSelectedRow(this.props)}
            column={getSelectedColumn(this.props)}
            rowIdx={rowIdx}
            value={value}
            firstEditorKeyPress={firstEditorKeyPress}
            onCommit={onCommit}
            onCommitCancel={onCommitCancel}
          />
        )}
      </div>
    );
  }
}

export default InteractionMasks;
