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
const SCROLL_CELL_INCREMENT = 1;

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
    const keyPressMaps = {
      ArrowDown: this.moveDown,
      ArrowUp: this.moveUp,
      ArrowLeft: this.moveLeft,
      ArrowRight: this.moveRight,
      Tab: this.onPressTab,
      Enter: this.editCell
    };
    const action = keyPressMaps[e.key];
    if (action) {
      action(e);
    } else if (isKeyPrintable(e.keyCode)) {
      this.toggleCellEdit(e.keyCode);
    }
  };

  toggleCellEdit = e => {
    const { isEditorEnabled, toggleCellEdit } = this.props;
    const enableEdit = !isEditorEnabled;
    toggleCellEdit(enableEdit, e.key);
    if (enableEdit === false) {
      this.focus();
    }
  };

  onPressTab = e => {
    if (e.shiftKey === true) {
      this.moveLeft();
    } else {
      this.moveRight();
    }
  };

  moveUp = () => {
    const currentPosition = this.getSelectedCellPosition();
    const next = { ...currentPosition, ...{ rowIdx: currentPosition.rowIdx - SCROLL_CELL_INCREMENT } };
    this.selectCell(next);
  };

  moveDown = () => {
    const {
      onHitBottomBoundary
    } = this.props;
    const currentPosition = this.getSelectedCellPosition();
    const nextRowIdx = currentPosition.rowIdx + SCROLL_CELL_INCREMENT;
    const next = { ...currentPosition, ...{ rowIdx: nextRowIdx } };
    if (this.isCellAtBottomBoundary(next)) {
      this.setScrollingMetrics(next);
      onHitBottomBoundary();
    } else {
      this.resetScrollingMetrics();
      this.selectCell(next);
    }
  };

  moveLeft = () => {
    const current = this.props.selectedPosition;
    const next = { ...current, ...{ idx: current.idx - SCROLL_CELL_INCREMENT } };
    this.selectCell(next);
  };

  moveRight = () => {
    const current = this.props.selectedPosition;
    const next = { ...current, ...{ idx: current.idx + SCROLL_CELL_INCREMENT } };
    this.selectCell(next);
  };

  isCellAtBottomBoundary(cell) {
    const {visibleEnd} = this.props;
    const scrollBoundary = visibleEnd - SCROLL_CELL_BUFFER;
    return cell.rowIdx === scrollBoundary;
  }

  isCellWithinBounds = ({ idx, rowIdx }) => {
    return rowIdx >= 0 && idx >= 0 && idx < this.props.columns.length;
  };

  isGridSelected = () => {
    return this.isCellWithinBounds(this.props.selectedPosition);
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
    this._scrollingMetrics = {
      dimensions: this.getSelectedCellDimensions(),
      position: next
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
