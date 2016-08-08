import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import CheckboxEditor from '../editors/CheckboxEditor';

class RowActionsCell extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {connectDragSource, connectDragPreview} = this.props;
    return connectDragPreview(connectDragSource(
      <div className="rdg-drag-row-handle">
        <div className="rdg-row-index">
          { this.props.rowIdx + 1 }
        </div>
        <div className="rdg-actions-checkbox">
          <CheckboxEditor/>
        </div>
      </div>));
  }
}

RowActionsCell.propTypes = {
  rowIdx: PropTypes.number.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isRowHovered: PropTypes.bool
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
    return { rowIdx: props.rowIdx };
  },
  endDrag(props) {
    return { rowIdx: props.rowIdx };
  }
};

export default DragSource('Row', rowIndexSource, collect)(RowActionsCell);
