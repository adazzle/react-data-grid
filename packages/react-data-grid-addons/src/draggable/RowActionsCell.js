import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

class RowActionsCell extends React.Component {
  static propTypes = {
    rowIdx: PropTypes.number.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    isRowHovered: PropTypes.bool,
    column: PropTypes.object,
    dependentValues: PropTypes.object
  };

  static defaultProps = {
    rowIdx: 0
  };

  render() {
    const { connectDragSource } = this.props;
    const rowHandleStyle = { position: 'absolute', marginTop: '5px' };
    const editorClass = this.props.isRowSelected ? 'rdg-actions-checkbox selected' : 'rdg-actions-checkbox';

    return connectDragSource(
      <div>
        <div className="rdg-drag-row-handle" style={rowHandleStyle} />
        <div className={editorClass}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

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
