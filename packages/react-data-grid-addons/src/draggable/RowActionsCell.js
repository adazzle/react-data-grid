import '../../../../themes/react-data-grid-row.css';
import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { CheckboxEditor } from 'common/editors';

class RowActionsCell extends React.Component {

  renderRowIndex() {
    return (<div className="rdg-row-index">
      { this.props.rowIdx + 1 }
    </div>);
  }

  render() {
    const {connectDragSource, rowSelection} = this.props;
    let rowHandleStyle = rowSelection != null ? {position: 'absolute', marginTop: '5px'} : {};
    let isSelected = this.props.value;
    let editorClass = isSelected ? 'rdg-actions-checkbox selected' : 'rdg-actions-checkbox';

    return connectDragSource(
      <div>
        <div className="rdg-drag-row-handle" style={rowHandleStyle}></div>
        {!isSelected ? this.renderRowIndex() : null}
        {rowSelection != null && <div className={editorClass}>
          <CheckboxEditor column={this.props.column} rowIdx={this.props.rowIdx} dependentValues={this.props.dependentValues} value={this.props.value}/>
        </div>}
      </div>);
  }
}

RowActionsCell.propTypes = {
  rowIdx: PropTypes.number.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isRowHovered: PropTypes.bool,
  column: PropTypes.object,
  dependentValues: PropTypes.object,
  value: PropTypes.bool,
  rowSelection: PropTypes.object.isRequired
};

RowActionsCell.defaultProps = {
  rowIdx: 0
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview()
  };
}

const rowIndexSource = {
  beginDrag(props) {
    return { idx: props.rowIdx, data: props.dependentValues };
  },
  endDrag(props) {
    return { idx: props.rowIdx, data: props.dependentValues };
  }
};

export default DragSource('Row', rowIndexSource, collect)(RowActionsCell);
