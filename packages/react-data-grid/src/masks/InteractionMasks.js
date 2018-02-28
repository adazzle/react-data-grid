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
    const {
      selectedPosition: { rowIdx }
    } = this.props;
    const next = { ...selectedPosition, ...{ rowIdx: rowIdx - 1 } };
    this.selectCell(next);
  };

  moveDown = () => {
    const {
      onHitBottomBoundary,
      selectedPosition,
      selectedPosition: { rowIdx },
      visibleEnd
    } = this.props;
    const nextRowIdx = rowIdx + 1;
    const next = { ...selectedPosition, ...{ rowIdx: nextRowIdx } };
    const scrollBoundary = visibleEnd - 2;
    console.log('row = ' + nextRowIdx);
    console.log('scroll boundary ' + scrollBoundary);
    if (nextRowIdx === scrollBoundary ) {
      this.setState({lockedPosition: this.getSelectedCellPosition()});
      onHitBottomBoundary();
      setTimeout(() => {
        this.selectCell(next);
      }, 50);
    } else {
      this.selectCell(next);
    }
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

  getSelectedCellPosition() {
    const {lockedPosition} = this.state;
    return lockedPosition ? lockedPosition : getSelectedDimensions(this.props);
  }

  selectCell = cell => {
    if (this.isCellWithinBounds(cell)) {
      this.props.selectCell(cell);
    }
  };

  render() {
    const { isEditorEnabled, firstEditorKeyPress, onCommit, onCommitCancel } = this.props;
    const { width, left, top, height } = this.getSelectedCellPosition();
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
            lockedPosition={this.state.lockedPosition}
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
