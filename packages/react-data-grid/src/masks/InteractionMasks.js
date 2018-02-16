import React from 'react';
import PropTypes from 'prop-types';
import SelectionMask from './SelectionMask';
import EditorContainer from '../editors/EditorContainer';
import { isKeyPrintable, isCtrlKeyHeldDown } from '../utils/keyboardUtils';
import {
  getSelectedDimensions,
  getSelectedCellValue,
  getSelectedRowIndex,
  getSelectedRow,
  getSelectedColumn
} from '../utils/SelectedCellUtils';

class InteractionMasks extends React.Component {
  static propTypes = {
    visibleStart: PropTypes.number,
    visibleEnd: PropTypes.number,
    columns: PropTypes.array,
    selectedPosition: PropTypes.object,
    rowHeight: PropTypes.number,
    editCell: PropTypes.func,
    selectCell: PropTypes.func,
    onHitBottomBoundary: PropTypes.func,
    onHitTopBoundary: PropTypes.func,
    isEditorEnabled: PropTypes.bool,
    firstEditorKeyPress: PropTypes.number,
    rowGetter: PropTypes.func
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
      this.editCell(e.keyCode);
    }
  };

  editCell = e => {
    const { editCell } = this.props;
    editCell(e.keyCode);
  };

  onPressTab = e => {
    if (isCtrlKeyHeldDown(e)) {
      this.moveLeft();
    } else {
      this.moveRight();
    }
  };

  moveUp = () => {
    const current = this.props.selectedPosition;
    const next = { ...current, ...{ rowIdx: current.rowIdx - 1 } };
    this.selectCell(next);
  };

  moveDown = () => {
    const current = this.props.selectedPosition;
    const next = { ...current, ...{ rowIdx: current.rowIdx + 1 } };
    this.selectCell(next);
  };

  moveLeft = () => {
    const current = this.props.selectedPosition;
    const next = { ...current, ...{ idx: current.idx - 1 } };
    this.selectCell(next);
  };

  moveRight = () => {
    const current = this.props.selectedPosition;
    const next = { ...current, ...{ idx: current.idx + 1 } };
    this.selectCell(next);
  };

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

  selectCell = cell => {
    if (this.isCellWithinBounds(cell)) {
      this.props.selectCell(cell);
    }
  };

  render() {
    const { isEditorEnabled, firstEditorKeyPress, onCommit, onCommitCancel } = this.props;
    const { width, left, top, height } = getSelectedDimensions(this.props);
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
        {this.isGridSelected() && (
          <SelectionMask
            {...this.props}
            width={width}
            left={left}
            top={top}
            height={height}
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
