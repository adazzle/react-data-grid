import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import CheckboxEditor from '../editors/CheckboxEditor';

class RowActionsCell extends React.Component {

  constructor(props) {
    super(props);
  }

  getRowPreview() {
    let rowData = this.props.dependentValues;
    let cells = '';
    let width = 100;
    let left = 0;
    for (let property in rowData) {
      if (rowData.hasOwnProperty(property)) {
        cells += `<td style="height:35px; background-color: white; border: 1px solid #eee; width: 80px; padding: 5px">${rowData[property]}</td>`;
        left += width;
      }
    }
    return `<tr>${cells}</tr>`;
  }

  createDragPreview() {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let data = '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="40" style="cursor: -webkit-grabbing">' +
      '<foreignObject width="100%" height="100%">' +
      '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:28px; background-color: white; opacity: 1; ">' +
      this.getRowPreview() +
      '</div>' +
      '</foreignObject>' +
      '</svg>';

    let DOMURL = window.URL || window.webkitURL || window;

    let img = new Image();
    let svg = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    let url = DOMURL.createObjectURL(svg);

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      DOMURL.revokeObjectURL(url);
    };

    img.src = url;
    this.props.connectDragPreview(img);
  }

  componentDidMount() {
    this.createDragPreview();
  }

  renderRowIndex() {
    return (<div className="rdg-row-index">
      { this.props.rowIdx + 1 }
    </div>);
  }

  render() {
    let isSelected = this.props.value;
    let editorClass = isSelected ? 'rdg-actions-checkbox selected' : 'rdg-actions-checkbox';
    const {connectDragSource} = this.props;
    return connectDragSource(
      <div>
        <div className="rdg-drag-row-handle"></div>
        {!isSelected ? this.renderRowIndex() : null}
        <div className={editorClass}>
          <CheckboxEditor column={this.props.column} rowIdx={this.props.rowIdx} dependentValues={this.props.dependentValues} value={this.props.value}/>
        </div>
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
  value: PropTypes.bool
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
